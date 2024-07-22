import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { IndexedDbService } from 'src/app/service/indexed-db-service.service';
import { MasterService } from 'src/app/service/master.service';
import { SeoService } from 'src/app/service/seo.service';
import { environment } from 'src/environments/environment.prod';
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
        items: 9
      },
    }, dots: false, nav: true,
  };

  groupList: any = [];
  packageList: any;
  activeGroup: any = "Organ";
  activeGroupName: any;
  searchText: any;
  p: number = 1;
  lastId: any;
  loading: boolean = false;
  packageItems: any = [];
  lastItemId: any = 0
  cartTestArr: any[];
  public cartlist: any = []
  isLogin: boolean;
  groupId: any;
  testItems: any;
  BasePath: string = environment.BaseLimsApiUrl
  pageData: any;
  searchTxt:any
  constructor(private _master: MasterService,
    private _router: Router,
    private _cart: CartService,
    private _auth: AuthService,
    private IndexedDbService: IndexedDbService,
    private seoService:SeoService,

  ) { 
    setTimeout(() => {
      this.syncOrganWise();
      this.loadTypeWise('Organ');
    }, 500);

  }

  ngOnInit(): void {
    // this.getAllGroupss();
    AOS.init();
    this.isLogin = this._auth.isLoggedIn()
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

    // const state = 36;
    // const limit = 16;
    // const lastId = 0;
    // const groupId = null
    // const groupTyp = this.activeGroup
    // this._master.getAllNewPackages(state, limit, lastId, groupId,groupTyp).subscribe((res: any) => {
    //   if (res.status == 1) {
    //     $("#loader").hide();
    //     this.packageItems = res.data;
    //     this.lastItemId = this.packageItems[this.packageItems.length - 1].id
    //     // this._master.packageItem = res.data
    //   }
    // })
    // $("#loader").hide();
    this.getPageDataById();
  }


  async loadTypeWise(groupType:string) {
    if(groupType == 'Organ') {
      let organData = await this.IndexedDbService.getAllItems('Organ_wise');
      this.groupList = organData;
      console.log('organData', organData)
      this.groupId = organData[0].id
      this.filterTests(organData[0].id,organData[0].group_name,organData[0].packages,0)
    } else {
      this.syncConditionWise();
      let condition = await this.IndexedDbService.getAllItems('condtion_wise');
      this.groupList = condition;
      console.log('Condition', condition)
      this.groupId = condition[0].id
      this.filterTests(condition[0].id,condition[0].group_name,condition[0].packages,0)
    }
    this.activeGroup = groupType;

  }

  async syncOrganWise() {
    await this.IndexedDbService.syncDataFromApi('Organ_wise', 'https://limsapi.nirnayanhealthcare.com/global/getJSON?type=organ&limit=100');
  }
  async syncConditionWise() {
    await this.IndexedDbService.syncDataFromApi('condtion_wise', 'https://limsapi.nirnayanhealthcare.com/global/getJSON?type=condition&limit=100');
  }

  // async getOrganWise() {
  //   const organWiseData = await this.IndexedDbService.getAllItems('Organ_wise');
  //   console.log('Organ Wise Data:', organWiseData);
  // }

  // changeGroupList(group_type) {
  //   this.activeSlideIndex = 0
  //   this.activeGroup = group_type;
  //   this.activeGroupName = null;
  //   $('#nodata').text('')
  //   const formData = new FormData();
  //   formData.append("group_type", group_type);
  //   this._master.getAllGroups(formData).subscribe((response: any) => {
  //     if (response.message == "Success") {
  //       this.groupList = response.data;
  //       this.filterTests(response.data[0].id, response.data[0].name, 0)
  //       this._master.getpackages('').subscribe((response: any) => {
  //         if (response.message == "Success") {
  //           this.packageList = response.data;
  //         } else if (response.message == "Error") {
  //           this.packageList = [];
  //         }
  //       });
  //     }
  //   });
  // }

  formattedName: string
  detailsPage(pkgid:string,pkgName:string) {
    this.formattedName = pkgName.replace(/[\s.,()-]+/g, '-').trim();
    localStorage.setItem('PACKAGE_ID', pkgid);
  }


  // Get All Groups
  getAllGroupss() {
    $("#loader").show();
    const formData = new FormData();
    formData.append("group_type", "Organ");
    this._master.getAllGroups(formData).subscribe((res: any) => {
      if (res.message == "Success") {
        this.groupList = res.data;
        this.activeGroupName = res.data[0].name
        // this.filterTests(res.data[0].id, res.data[0].name, 0)
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

  activeSlideIndex: any = 0
  async filterTests(group_id: any, group_name: any, packages:any, index: any) {
    this.packageItems = await packages;
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
    this.activeGroupName = group_name;

    // this.activeGroupId = group_id;
    this.activeSlideIndex = index
    // this.groupId = group_id
    // const state = 36;
    // const limit = 16;
    // const lastId = 0;
    // const groupId = group_id
    // const groupTyp = this.activeGroup
    // this._master.getAllNewPackages(state, limit, lastId, groupId,groupTyp).subscribe((res: any) => {
    //   if (res.status == 1) {
    //     this.packageItems = res.data;
    //     // this._master.packageItem = res.data
    //   } else if (res.status == 0) {
    //     this.packageItems = [];
    //   }
    // })
  }


  isLoading: boolean = false;
  loadMore() {
    this.isLoading = true;
    let localArr = this.packageItems
    const state = 36;
    const limit = 18;
    const lastId = this.lastItemId;
    const groupId = this.groupId
    const groupTyp = this.activeGroup
    this._master.getAllNewPackages(state, limit, lastId, groupId,groupTyp).subscribe((res: any) => {
      if (res.status == 1) {
        // this.testItems = res.data
        this.isLoading = false;
        this.lastItemId = this.packageItems[this.packageItems.length - 1].id
        this.packageItems = localArr.concat(res.data)
        // this.lastItemId = this.testItems[this.testItems.length - 1].id
      } else if (res.status == 0) {
        this.isLoading = false;
        $('#nodata').text('No more data found.')
      }
    })
  }

  // addToCart(itemId: any, type: any, amount: any) {
  //   const test = {
  //     "schemaName": "nir1691144565",
  //     "user_id": localStorage.getItem('USER_ID'),
  //     "patient_id": 0,
  //     "prod_type": type,
  //     "prod_id": itemId,
  //     "price": amount,
  //     "location_id": localStorage.getItem('LOCATION_ID')
  //   };

  //   // Ensure cartTestArr is initialized properly
  //   if (!Array.isArray(this.cartTestArr)) {
  //     this.cartTestArr = [];
  //   }

  //   this.cartTestArr.push(test);
  //   this._cart.addToCart(test).subscribe((res: any) => {
  //     if (res) {
  //       this._auth.sendQtyNumber(this.cartlist.length + 1);
  //     }
  //   });
  // }

  prodDetails: any = {}
  addToCart(productId: number, type: string, amount: number) {
    if (!this.isLogin) {
      this._router.navigate(['/pages/login']);
      return
    } else {
      this.prodDetails = {
        'productId': productId,
        'type': type,
        'amount': amount
      }
      this._master.sharePriceInfo(this.prodDetails)
    }
  }
  searchFilter(data: any) {
    const test: any = 'package';
    const key = data;
    const state = 36;
    const groupId = this.groupId
    this._master.getSearchItem(test, key, state, groupId).subscribe((res: any) => {
      if (res.status == 1) {
        this.packageItems = res.data;
      }
    })
  }
  closeAllModals() {
    $('#patientModal').removeClass('show');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

  getPageDataById() {
    const payload = {
      page_id: 13
    }
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if(res.status == 1){
        this.pageData = res.data.seoContent;
        this.changeTitleMetaTag()
      }
    })
  }


  changeTitleMetaTag() {
    console.log(this.pageData);
    if (this.pageData) {

      this.seoService.updateTitle(this.pageData.title);

      const metaTags = this.pageData.name.map(nameObj => ({
        name: nameObj.title,
        content: nameObj.description
      }));
      this.seoService.updateMetaTags(metaTags);

      const propertyTags = this.pageData.propertyType.map(propertyObj => ({
        property: propertyObj.title,
        content: propertyObj.description
      }));
      this.seoService.updatePropertyTags(propertyTags);
    }
  }
  
}
