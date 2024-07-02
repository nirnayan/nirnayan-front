import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
import { MasterService } from 'src/app/service/master.service';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-encyclopedia',
  templateUrl: './encyclopedia.component.html',
  styleUrls: ['./encyclopedia.component.css']
})
export class EncyclopediaComponent implements OnInit {
  pageItem:any;
  groupItem:any = [];
  p: number = 1;


  customOptions = { responsive:{
    0:{
        items:1
    },
    400:{
      items:2
    },
    800:{
      items:3
    },
    1200:{
        items:4
    },
    1920:{
      items:4
    },

  }, dots: true, nav: false}; 

  SlideOptioon = { responsive:{
    0:{
        items:1
    },
    400:{
      items:2
    },
    800:{
      items:3
    },
    1200:{
        items:3
    },
    1700:{
      items:3
    },

  }, dots: false, nav: true}; 

  form = {
    contact_name: '',
    contact_email: '',
    contact_mobile: '',
    address: '',
    contact_enquiry: '',
    enquiry_type: null
  };

  
  constructor(private _master: MasterService) { }

  ngOnInit(): void {
    AOS.init();

    $(document).ready(function(){
      $(".stpRow .mat-expansion-panel-header").click(function(){
        $(this).parent().parent('.stpRow').toggleClass('sgtp');
        $(this).parent().parent().siblings().removeClass('sgtp');
      });
    });

    this._master.getPageContent().subscribe((res:any) => {
      if(res.message == 'Success') {
        let pages = [];
        for(let item of res.data) {
          if(item.id == 17) {
            pages.push(item)
          }
          this.pageItem = pages;
        }
      }
    })

    this.getGroup('Organ');

    // Tab Click Script
    const blogTabs = document.getElementById("majorTabs") as HTMLDivElement;
    window.onload = () => {
      $(".blgTbHd").click(function(){
        $(".blgTbHd").removeClass("active show");
        $(this).addClass("active show");
        let tabId = $(this).attr("href");
        $(".blogTabs").removeClass("active show");
        $(`.blogTabs${tabId}`).addClass("active show");
      });
    };
  }
  

  getGroup(data:any) {
    $("#loader").show();
    const formData = new FormData();
    formData.append('group_type', data);
    this._master.getGroupMaster(formData).subscribe((res:any) => {
      if(res.message == 'Success') {
        this.groupItem = res.data;
        this.changeGroupData(res.data[0].id);
        $("#loader").hide();
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    })
  }
  groupInfo:any;
  changeGroupData(group_id){
    const formData = new FormData();
    formData.append('group_id', group_id);
    if(this._master.encyclopediaItem) {
      this.groupInfo = this._master.encyclopediaItem
    } else {
      this._master.getGroupWiseItem(formData).subscribe((res:any) => {
        let group = [];
        if(res.message == 'Success') {
          group.push(res.data);
        }
        this.groupInfo = group;
        this._master.encyclopediaItem = group
      })
    }
  }

  onSubmitQuery() {
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
          enquiry_type: null
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
