import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { MasterService } from 'src/app/service/master.service';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  eventList:any = []
  upcomingItem: boolean = true
  formerItem: boolean = true

  constructor(private _master: MasterService) { }

  ngOnInit(): void {
    AOS.init();
    window.onload = () => {
      $(".blgTbHd").click(function(){
        $(".blgTbHd").removeClass("active show");
        $(this).addClass("active show");
        let tabId = $(this).attr("href");
        $(".blogTab").removeClass("active show");
        $(`.blogTab${tabId}`).addClass("active show");
      });
    };
    
    $("#loader").show();
    this._master.getEvents().subscribe((res:any) => {
      $("#loader").hide();
      if(res.status == 200) {
        this.eventList = res.data
      }
    })
  }

  isUpcoming() {
    this.formerItem = false
    this.upcomingItem = true
  }
  isFormer() {
    this.upcomingItem = false
    this.formerItem = true
  }

  SlideOptionn = { responsive:{
    0:{
        items:1
    },
    370:{
      items:2
    },

    1200:{
        items:4
    },

  }, dots: false, nav: true};

  SlideOption = { responsive:{
    0:{
        items:1
    },
    799:{
      items:2
    },
    1200:{
        items:3
    },

  }, dots: true, nav: false};
}
