import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos';
import { MasterService } from 'src/app/service/master.service';
declare var $: any;


@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {

  SlideOptionn = {
    responsive: {
      0: {
        items: 1
      },
      950: {
        items: 2
      },
    }, dots: true, nav: false
  };

  SlideOption = {
    responsive: {
      0: {
        items: 3
      },
      500: {
        items: 5
      },
      800: {
        items: 9
      },
      1000: {
        items: 9
      },
      1450: {
        items: 12
      },
    }, dots: false, nav: true,
  };

  groupList: any;
  packageList: any;
  activeGroup: any = "Organ";
  activeGroupName: any;
  searchText: any;
  p: number = 1;
  lastId: any;
  loading: boolean = false;
  packageItems: any;
  lastItemId: any = 0


  constructor(private _master: MasterService,
    private _route: Router) { }

  ngOnInit(): void {
    this.getAllGroups();
    AOS.init();
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();

      if (scroll >= 400) {
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
    const state = 36;
    const limit = 16;
    const lastId = 0;
    const groupId = null
    this._master.getAllNewPackages(state, limit, lastId, groupId).subscribe((res: any) => {
      if (res.status == 1) {
        $("#loader").hide();
        this.packageItems = res.data;
        this.lastItemId = this.packageItems[this.packageItems.length - 1].id
        // this._master.packageItem = res.data
      }
    })
  }


  changeGroupList(group_type) {
    this.activeGroup = group_type;
    this.activeGroupName = null;
    const formData = new FormData();
    formData.append("group_type", group_type);
    this._master.getAllGroups(formData).subscribe((response: any) => {
      if (response.message == "Success") {
        this.groupList = response.data;
        this._master.getpackages('').subscribe((response: any) => {
          if (response.message == "Success") {
            this.packageList = response.data;
          } else if (response.message == "Error") {
            this.packageList = [];
          }
        });
      }
    });
  }

  filterTests(group_id:any, group_type:any) {
    // $("#loader").show();
    // this.activeGroupName = group_type;
    // const formData = new FormData();
    // formData.append("group_id", group_id);
    // formData.append("group_type", this.activeGroup);
    // this._master.getSpecificPackages(formData).subscribe((response: any) => {
    //   $("#loader").hide();
    //   if (response.message == "Success") {
    //     this.packageList = response.data.packages;
    //   } else {
    //     this.packageList = [];
    //   }
    // }, err => {
    //   console.log(err);
    //   $("#loader").hide();
    // });
    const state = 36;
    const limit = 16;
    const lastId = 0;
    const groupId = group_id
    this._master.getAllNewPackages(state, limit, lastId, groupId).subscribe((res: any) => {
      if (res.status == 1) {
        this.packageItems = res.data;
        // this._master.packageItem = res.data
      }
    })
  }

  // Get All Groups
  getAllGroups() {
    $("#loader").show();
    const formData = new FormData();
    formData.append("group_type", "Organ");
    this._master.getAllGroups(formData).subscribe((response: any) => {
      if (response.message == "Success") {
        this.groupList = response.data;
        if (this._master.packageListItem) {
          this.packageList = this._master.packageListItem
          $("#loader").hide();
        } else {
          // this._master.getpackages('').subscribe((response: any) => {
          //   if (response.message == "Success") {
          //     $("#loader").hide();
          //     this.packageList = response.data['packages'];
          //     this._master.packageListItem = response.data['packages'];
          //     let lastElement = this.packageList[this.packageList.length - 1];
          //     this.lastId = lastElement.id;

          //   }
          // });
        }
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    });
  };

  packageDetails(id: any, img: any) {
    this._route.navigate(['patient/package-details', id])
  }

  isLoading: boolean = false;
  loadMore() {
    this.isLoading = true;
    const state = 36;
    const limit = 16;
    const lastId = this.lastItemId;
    this._master.getAllNewPackages(state, limit, lastId).subscribe((res: any) => {
      if (res.status == 1) {
        this.isLoading = false;
        this.packageItems = res.data;
        this.lastItemId = this.packageItems[this.packageItems.length - 1].id
        // this._master.packageItem = res.data
      }
    })
  }
}
