import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { MasterService } from 'src/app/service/master.service';
declare var $: any;

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css', './slide.component.css']
})
export class TestListComponent implements OnInit {
  groupList: any;
  testList:any;
  activeGroup:any = "Organ";
  activeGroupName:any;
  constructor(private _master:MasterService, private _spiner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllGroups();
    AOS.init();
    $(window).scroll(function() {    
      var scroll = $(window).scrollTop();
  
      if (scroll >= 800) {
          $(".tlMiddleBr").addClass("fxd");
          $(".tstLst").addClass("fxdd");
          $(".tlMiddle").addClass("scrll");
          $(".tstTopSec").addClass("fixx");
      } else {
          $(".tlMiddleBr").removeClass("fxd");
          $(".tstLst").removeClass("fxdd");
          $(".tlMiddle").removeClass("scrll");
          $(".tstTopSec").removeClass("fixx");
      }
    });
  }

  changeGroupList(group_type){
    this.activeGroup = group_type;
    this.activeGroupName = null;
    const formData = new FormData();
    formData.append("group_type", group_type);
    this._master.getAllGroups(formData).subscribe((response:any) => {
      if(response.message == "Success"){
        this.groupList = response.data;
        this._master.getAllGroupTests(formData).subscribe((response:any) => {
          if(response.message == "Success"){
            this.testList = response.data;
          }else if(response.message == "Error"){
            this.testList = [];
          }
        });
      }
    });
  }

  filterTests(group_id, group_name){
    $("#loader").show();
    this.activeGroupName = group_name;
    const formData = new FormData();
    formData.append("group_id", group_id);
    formData.append("group_type", this.activeGroup);
    this._master.getSpecificGroupTests(formData).subscribe((response:any) => {
      $("#loader").hide();
      if(response.message == "Success"){
        this.testList = response.data;
      }else{
        this.testList = [];
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    });
  }

  // Get All Groups
  getAllGroups(){
    const formData = new FormData();
    formData.append("group_type", "Organ");
    this._master.getAllGroups(formData).subscribe((response:any) => {
      $("#loader").hide();
      if(response.message == "Success"){
        this.groupList = response.data;
        this._master.getAllGroupTests(formData).subscribe((response:any) => {
          if(response.message == "Success"){
            this.testList = response.data;
          }
        });
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    });
  }

  SlideOptionn = { responsive:{
    0:{
        items:1
    },
    950:{
      items:2
    },
  }, dots: true, nav: false}; 

  SlideOption = { responsive:{
    0:{
        items:2
    },
    400:{
      items:3
    },
    800:{
      items:5
    },
    1300:{
      items:6
    },
    1400:{
        items:8
    },
    1450:{
      items:10
    },
  }, dots: true, nav: false}; 
  
}
