import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import AOS from 'aos'; 
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MasterService } from 'src/app/service/master.service';
import Swal from 'sweetalert2';
import $ from 'jquery';



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
  allMembers:any

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
}, dots: true, nav: false, center: true, loop: false,}; 

customOptions: OwlOptions = {
  loop: false,
  mouseDrag: true,
  touchDrag: true,
  autoplay:false,
  pullDrag: false,
  center: false,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 3
    }
  },
  nav: true,
};

SlideOptioon = { responsive:{
  0:{
      items:1
  },
  320:{
    items:1.5
  },
  400:{
    items:2
  },
  600:{
    items:3
  },

}, dots: true, nav: false};


form = {
  contact_name: '',
  contact_email: '',
  contact_mobile: '',
  address: '',
  contact_enquiry: '',
  enquiry_type: null
};

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
        // console.log(this.departItem)
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
        let mebers = []
        for (let index = 0; index < res.data.members.length; index++) {
          const element = res.data.members[index];
          if(element.status==1) {
            mebers.push(element)
          }
        }
        this.allMembers = mebers
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
    const formData = new FormData();
    formData.append('contact_name', this.form['contact_name']);
    formData.append('contact_email', this.form['contact_email']);
    formData.append('contact_mobile', this.form['contact_mobile']);
    formData.append('address', this.form['address']);
    formData.append('contact_enquiry', this.form['contact_enquiry']);
    formData.append('enquiry_type', 'association');

    $("#loader").show();
    this._master.storeContactUs(formData).subscribe((res:any) => {
      $("#loader").hide();
      if(res.message == 'Success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Sent Successfully!',
          showConfirmButton: false,
          timer: 1500
        })
        this.form = {
          contact_name: '',
          contact_email: '',
          contact_mobile: '',
          address: '',
          contact_enquiry: '',
          enquiry_type: 'department',
        };
        $("#loader").hide();
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
        $("#loader").hide();
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    })
  }

}
