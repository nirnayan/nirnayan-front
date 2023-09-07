import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import AOS from 'aos'; 
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MasterService } from 'src/app/service/master.service';
import Swal from 'sweetalert2';
declare var $: any;



@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  department:any = [];
  departItem:any = [];
  departItems:any = [];
  contectUsForm: FormGroup;
  gallery:any = [];
  active1:any;
  description:any = '';
  titile:any = '';

  constructor(private _master: MasterService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder) 
    { 
      this.contectUsForm = this._fb.group({
        contact_name: ['', Validators.required],
        contact_email: ['', Validators.required],
        contact_mobile: ['', Validators.required],
        contact_enquiry: ['', Validators.required]
      })

    }

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
      this.departmentDetail(param.id,'','');
    })
    this.getPage();

    window.onload = () => {
      $(".blgTbHd").click(function(){
        $(".blgTbHd").removeClass("active show");
        $(this).addClass("active show");
        let tabId = $(this).attr("href");
        $(".blogTab").removeClass("active show");
        $(`.blogTab${tabId}`).addClass("active show");
      });
    };
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
};

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
  };

  getPageItem() {
    const formData = new FormData();
    formData.append('environment', 'user');
    this._master.getDepartments(formData).subscribe((res:any) => {
      if(res.message == 'Success') {
        this.departItem = res.data;
      }
    })
  };

  departmentDetail(id:any,desc:any, name:any) {
    let item = id
    this.active1 = item;
    this.titile = name;
    this.description = desc;
    let formData = new FormData();
    formData.append('department_id', id);

    this._master.getDoctors(formData).subscribe((res:any) => {
      $("#loader").hide();
      if(res.message == 'Success') {
        this.departItems = res.data;
      }
    }, err => {
      console.log(err);
      // $("#loader").hide();
    })
    formData.append('department', id);
    this._master.getGallery(formData).subscribe((res:any) => {
      if(res.message == 'Success') {
        this.gallery = res.data;
      }
    })
  };

  saveForm() {
    if(this.contectUsForm.invalid) {
      return;
    }
    let formItems = this.contectUsForm.value;
    const formData = new FormData();
    formData.append('contact_name', formItems['contact_name']);
    formData.append('contact_email', formItems['contact_email']);
    formData.append('contact_mobile', formItems['contact_mobile']);
    formData.append('contact_enquiry', formItems['contact_enquiry']);
    formData.append('enquiry_type', 'department');
    $("#loader").show();
    this._master.contectUs(formData).subscribe((res:any) => {
      $("#loader").hide();
      if(res.message == 'Success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your Enquiry has been submitted!',
          showConfirmButton: false,
          timer: 1500
        })
        this.contectUsForm.reset();
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    })
  }
  SlideOptioon = { responsive:{
    0:{
        items:1
    },
    320:{
      items:1.5
    },
    600:{
      items:2
    },
    900:{
      items:2.3
    },

  }, dots: false, nav: true};
}
