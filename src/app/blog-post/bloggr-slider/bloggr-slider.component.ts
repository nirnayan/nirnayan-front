import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import AOS from 'aos';
import { MasterService } from 'src/app/service/master.service';


@Component({
  selector: 'app-bloggr-slider',
  templateUrl: './bloggr-slider.component.html',
  styleUrls: ['./bloggr-slider.component.css']
})
export class BloggrSliderComponent implements OnInit {

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
          this.details = res.data['related_blogs'];
        }
      }, err => {
        console.log(err);
        $("#loader").hide();
      })
    })
  }

  
  blgSlideOption = { responsive:{
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
