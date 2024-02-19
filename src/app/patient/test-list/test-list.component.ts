import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
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
  searchText:any;
  p: number = 1;
  isLogin: boolean = false
  cartTestArr: any = []
  cartlist:any = []


  constructor(private _master:MasterService, private _spiner:NgxSpinnerService,
    private _route: Router,
    private _auth: AuthService, private _cart: CartService,
    private _router: Router) { }

  ngOnInit(): void {

    this.isLogin = this._auth.isLoggedIn()
    $("#loader").show();
    this.getAllGroups();
    AOS.init();
    $(window).scroll(function() {    
      var scroll = $(window).scrollTop();
  
      if (scroll >= 400) {
          $(".tlMiddleBr").addClass("fxd");
          $(".tstLst").addClass("fxdd");
          $(".tlMiddle").addClass("scrll");
          $(".tstTopSec").addClass("fixx");
          $(".testListSec").addClass("mtpp");
      } else {
          $(".tlMiddleBr").removeClass("fxd");
          $(".tstLst").removeClass("fxdd");
          $(".tlMiddle").removeClass("scrll");
          $(".tstTopSec").removeClass("fixx");
          $(".testListSec").removeClass("mtpp");
      }
    });

    let payload1 = {
      "schemaName": "nir1691144565",
      "user_id": Number(localStorage.getItem('USER_ID')),
      "location_id": Number(localStorage.getItem('LOCATION_ID'))
    }
    this._cart.getCartList(payload1).subscribe((res:any) => {
      if(res.status == 1) {
        this.cartlist = res.data
      }
      else if(res.status == 503 || res.status == 403) {
        localStorage.clear();
        this._router.navigate(['/auth/login'])
      }
    })
  }

  changeGroupList(group_type){
    $("#loader").show();
    this.activeGroup = group_type;
    this.activeGroupName = null;
    const formData = new FormData();
    formData.append("group_type", group_type);
    this._master.getAllGroups(formData).subscribe((response:any) => {
      if(response.message == "Success"){
        this.groupList = response.data;
        $("#loader").hide();
        // this._master.getAllGroupTests(formData).subscribe((response:any) => {
        //   if(response.message == "Success"){
        //     this.testList = response.data;
        //   }else if(response.message == "Error"){
        //     this.testList = [];
        //   }
        // });
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
    $("#loader").show()
    const formData = new FormData();
    formData.append("group_type", "");
    this._master.getAllGroups(formData).subscribe((response:any) => {
      if(response.message == "Success"){
        this.groupList = response.data;
        if(this._master.testMasterAllItem) {
          this.testList = this._master.testMasterAllItem
          $("#loader").hide();
        } else {
          this._master.getAllGroupTests(formData).subscribe((response:any) => {
            $("#loader").hide();
            if(response.message == "Success"){
              this.testList = response.data;
              this._master.testMasterAllItem = response.data
            }
          }, err => {
            console.log(err);
            $("#loader").hide();
          });
        }
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
        items:3
    },
    500:{
      items:5
    },
    800:{
      items:9
    },
    1000:{
      items: 9
    },
    1450:{
      items:12
    },
  }, dots: false, nav: true,}; 
  

  testDetails(id:any, img:any) {
    this._route.navigate(['patient/test-details/',id])
  }

  addToCart(testId: any, type: any) {
    let test = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID'),
      "patient_id": 0,
      "prod_type": type,
      "prod_id": testId
    }
    this.cartTestArr.push(test)
    this._auth.sendQtyNumber(this.cartlist.length + 1);

    this._cart.addToCart(test).subscribe((res:any) => {
      if(res.status ==1) {
        this.ngOnInit()

      }
    })
  }
}
