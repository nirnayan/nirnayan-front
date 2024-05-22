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
  eventListFormer:any
  isUpcomingEvents: boolean = true
  isFormerEvents: boolean = false
  eventType = 'Upcoming'

  SlideOptionn = { responsive:{
    0:{
        items:1
    },
    370:{
      items:1
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
    this.isUpcoming()
  }

  isUpcoming() {
    this.isFormerEvents = false
    this.isUpcomingEvents = true
    this.eventType = 'Upcoming'
    $("#loader").show();
    this._master.getEvents().subscribe((res:any) => {
      if(res.status == 200) {
        let upcomingItem =[]
        for (let index = 0; index < res.data['upcoming'].length; index++) {
          const element = res.data['upcoming'][index];
          if(element.status == 1) {
            upcomingItem.push(element)
          }
        }
        this.eventList = upcomingItem
        $("#loader").hide();
      }
    }, err=> {
      console.log(err)
      $("#loader").hide();
    })
  }
  async isFormer() {
    this.isFormerEvents = true
    this.isUpcomingEvents = false
    this.eventType = 'Former'
    $("#loader").show();
    this._master.getEvents().subscribe((res:any) => {
      $("#loader").hide();
      if(res.status == 200) {
        let formerItem =[]
        for (let index = 0; index < res.data['former'].length; index++) {
          const element = res.data['former'][index];
          if(element.status == 1) {
            formerItem.push(element)
          }
        }
        this.eventListFormer = formerItem
      }
    },err=> {
      console.log(err)
      $("#loader").hide();
    })
  }
}
