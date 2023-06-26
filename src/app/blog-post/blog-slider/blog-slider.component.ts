import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import AOS from 'aos';
import { MasterService } from 'src/app/service/master.service';


@Component({
  selector: 'app-blog-slider',
  templateUrl: './blog-slider.component.html',
  styleUrls: ['./blog-slider.component.css']
})
export class BlogSliderComponent implements OnInit {

  details:any;



  constructor(private _route: ActivatedRoute,
    private _master: MasterService) { }

  ngOnInit(): void {
    AOS.init();
    this._route.params.subscribe((param:any) => {
      const formData = new FormData();
      formData.append('id', param.id);
      this._master.getBlogsById(formData).subscribe((res:any) => {
        $("#loader").hide();
        // console.log(res);
        if(res.message == 'Success') {
          this.details = res.data['most_viewed'];
        }
      }, err => {
        console.log(err);
        $("#loader").hide();
      })
    })
  }



  SlideOptions = { responsive:{
    0:{
      items:1
  },
  650:{
      items:2
  },
  1050:{
    items:3
  },
  1500:{
    items:4
  },

  }, dots: true, nav: false}; 
}
