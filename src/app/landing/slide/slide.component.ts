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

  constructor(private _master: MasterService) { }

  ngOnInit(): void {
    AOS.init();
    this.Test('Popular Test');
    this._master.getTestMaster().subscribe((res:any) => {
      if(res.message == 'Success') {
        this.testItems = Object.entries(res.data.tests);
      }
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

  Package(data: any) {
    this.activeModule = "Popular Packages";
    this.data = data;
    this.SldSecOne = false;
    this._master.getPackageMaster().subscribe((res:any) => {
      if(res.message == 'Success') {
        // this.testItems = Object.entries(res.data.tests);
        this.packageItems = res.data;
        console.log(this.packageItems);
      }
    })
  };
  

  getData(image:any) {
    localStorage.setItem('TEST_IMAGE',image);
  }
}
