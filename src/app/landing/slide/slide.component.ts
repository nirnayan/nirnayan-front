import { Component, OnInit } from '@angular/core';
declare var $: any;
import AOS from 'aos';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  SldSecOne: boolean = true;
  data: any;
  testItems:any;
  packageItems:any = [];
  activeModule:any = "Popular Test";
  testWithParamtr:any = [];

  constructor(private _master: MasterService) { }

  ngOnInit(): void {
    AOS.init();
    this.Test('Popular Test');
    // $("#loader").show();
    this._master.getTestMaster().subscribe((res:any) => {
      if(res.message == 'Success') {
        $("#loader").hide();
        this.testItems = Object.entries(res.data.tests);
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    })
    $(document).ready(function() {
      $('.pPkg').on('click', function() {
        $(this).addClass("active");
        $('.pTest').addClass("inactive");
      });
      $('.pTest').on('click', function() {
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

  parameter:any = [];
  Package(data: any) {
    // $("#loader").show();
    this.activeModule = "Popular Packages";
    this.data = data;
    this.SldSecOne = false;
    this._master.getPackageMaster().subscribe((res:any) => {
      if(res.message == 'Success') {
        $("#loader").hide();
        this.packageItems = res.data;
        // let paraCount = [];
        // for(let item of this.packageItems) {
        //   for(let test of item.parameters) {
        //     console.log(test)
        //     paraCount = test;
        //   }
        // }
        // this.parameter = paraCount;
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    })
  };
  

  getData(image:any) {
    localStorage.setItem('TEST_IMAGE',image);
  }
}
