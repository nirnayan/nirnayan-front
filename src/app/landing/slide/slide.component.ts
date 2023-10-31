import { Component, OnInit } from '@angular/core';
declare var $: any;
import AOS from 'aos';
import { AuthService } from 'src/app/service/auth.service';
import { MasterService } from 'src/app/service/master.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  SldSecOne: boolean = true;
  data: any;
  testItems: any;
  packageItems: any = [];
  activeModule: any = "Popular Test";
  testWithParamtr: any = [];
  cartTestArr: any = []



  constructor(private _master: MasterService,
    private _auth: AuthService,
    private _profile: ProfileService) { }

  ngOnInit(): void {
    AOS.init();
    this.Test('Popular Test');
    // $("#loader").show();
    if (this._master.testMasterItem) {
      this.testItems = this._master.testMasterItem
    } else {
      this._master.getTestMaster().subscribe((res: any) => {
        if (res.message == 'Success') {
          $("#loader").hide();
          this.testItems = Object.entries(res.data.tests);
          this._master.testMasterItem = Object.entries(res.data.tests);
        }
      }, err => {
        console.log(err);
        $("#loader").hide();
      })
    }
    $(document).ready(function () {
      $('.pPkg').on('click', function () {
        $(this).addClass("active");
        $('.pTest').addClass("inactive");
      });
      $('.pTest').on('click', function () {
        $('.pPkg').removeClass("active");
        $(this).removeClass("inactive");
      });
    })
  }
  SlideOptions = {
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      900: {
        items: 3
      },
      1500: {
        items: 4
      },
      1650: {
        items: 5
      }
    }, dots: false, nav: true
  };


  Test(data: any) {
    this.activeModule = "Popular Test";
    this.data = data;
    this.SldSecOne = true;
  };

  parameter: any = [];
  Package(data: any) {
    $("#loader").show();
    this.activeModule = "Popular Packages";
    this.data = data;
    this.SldSecOne = false;
    if (this._master.packageItem) {
      this.packageItems = this._master.packageItem
      $("#loader").hide();
    } else {
      this._master.getPackageMaster().subscribe((res: any) => {
        if (res.message == 'Success') {
          $("#loader").hide();
          this.packageItems = res.data;
          this._master.packageItem = res.data
        }
      }, err => {
        console.log(err);
        $("#loader").hide();
      })
    }
  };


  getData(image: any) {
    localStorage.setItem('TEST_IMAGE', image);
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
    this._auth.sendQtyNumber(this.cartTestArr.length);

    this._profile.addToCart(test).subscribe((res:any) => {
      console.log(res)
    })
  }
}
