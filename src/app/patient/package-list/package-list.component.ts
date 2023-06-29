import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { MasterService } from 'src/app/service/master.service';
declare var $: any;


@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {

  groupList: any;
  packageList:any;
  activeGroup:any = "Organ";
  activeGroupName:any;
  searchText:any;
  p: number = 1;
  lastId:any;
  loading: boolean = false;



  constructor(private _master:MasterService,
    private _route: Router) { }

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



  changeGroupList(group_type){
    this.activeGroup = group_type;
    this.activeGroupName = null;
    const formData = new FormData();
    formData.append("group_type", group_type);
    this._master.getAllGroups(formData).subscribe((response:any) => {
      if(response.message == "Success"){
        this.groupList = response.data;
        this._master.getpackages('').subscribe((response:any) => {
          if(response.message == "Success"){
            this.packageList = response.data;
          }else if(response.message == "Error"){
            this.packageList = [];
          }
        });
      }
    });
  }

  filterTests(group_id, group_type){
    $("#loader").show();
    this.activeGroupName = group_type;
    const formData = new FormData();
    formData.append("group_id", group_id);
    formData.append("group_type", this.activeGroup);
    this._master.getSpecificPackages(formData).subscribe((response:any) => {
      $("#loader").hide();
      if(response.message == "Success"){
        this.packageList = response.data;
      }else{
        this.packageList = [];
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    });
  }

  // Get All Groups
  getAllGroups(){
    $("#loader").show();
    const formData = new FormData();
    formData.append("group_type", "Organ");
    this._master.getAllGroups(formData).subscribe((response:any) => {
      if(response.message == "Success"){
        this.groupList = response.data;
        this._master.getpackages('').subscribe((response:any) => {
          if(response.message == "Success"){
            $("#loader").hide();
            this.packageList = response.data['packages'];
            let lastElement = this.packageList[this.packageList.length - 1];
            this.lastId = lastElement.id;

          }
        });
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    });
  };

  packageDetails(id:any, img:any) {
    this._route.navigate(['patient/package-details',id])
  }


  loadMore() {
    this.loading = true;
    let lastElement = this.packageList[this.packageList.length - 1];
    this.lastId = lastElement.id;
    const formData = new FormData();
    formData.append("last_id", this.lastId);
    let packagesItem = [];
    this._master.getpackages(formData).subscribe((res:any) => {
      if(res.message == 'Success') {
        this.loading = false;
        packagesItem = res.data['packages'];
        packagesItem = this.packageList.concat(packagesItem);
        this.packageList = packagesItem;
      }
    })
  }
}
