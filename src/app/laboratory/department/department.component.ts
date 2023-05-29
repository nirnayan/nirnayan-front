import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import AOS from 'aos'; 
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MasterService } from 'src/app/service/master.service';
declare var $: any;


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  department:any = [];
  departItem:any = [];
  doctors:any = [];


  constructor(private _master: MasterService,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    AOS.init();
    var str = $( this );
    $(document).ready(function(){
      $(".stpRow .mat-expansion-panel .mat-expansion-panel-header").click(function(){
        $(this).parent().parent('.stpRow').toggleClass('sptxt');
        $(this).parent().parent().siblings().removeClass('sptxt');
      });
      
      $(".accreBoxRow").click(function(){
        $(this).toggleClass('accreAct');
        $(this).siblings().removeClass('accreAct');
      });
    });

    this._route.params.subscribe((param:any) => {
      // $("#loader").hide();
      this.departmentDetail(param.id);
    })
    this.getPage();
  }

  SlideOptionn = { responsive:{
    0:{
        items:1
    },
    600:{
      items:2
    },
    900:{
        items:2.7
    },

  }, dots: true, nav: false}; 

  SlideOptions = { responsive:{
    0:{
        items:2.5
    },
    600:{
        items:2.5
    },
    

}, dots: true, nav: false, center: true, loop: true,}; 

customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  autoplay:false,
  pullDrag: false,
  center: true,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 3
    },
    400: {
      items: 3
    },
    740: {
      items: 3
    },
    940: {
      items: 3
    }
  },
  nav: true
}

  getPage() {
    this._master.getPageContent().subscribe((res:any) => {
      let depart = [];
      
      if(res.message == 'Success') {
        for(let item of res.data) {
          if(item.id == 15) {
            depart.push(item)
          }
        }
        this.department = depart;
      }
    })
    this.getPageItem();
  }

  getPageItem() {
    this._master.getDepartments().subscribe((res:any) => {
      if(res.message == 'Success') {
        this.departItem = res.data;
      }
    })
  }

  departmentDetail(id:any) {
    let formData = new FormData();
    formData.append('department_id', id);

    this._master.getDoctors(formData).subscribe((res:any) => {
      $("#loader").hide();
      if(res.message == 'Success') {
        this.doctors = res.data;
      }
    }, err => {
      console.log(err);
      // $("#loader").hide();
    })
  }
}
