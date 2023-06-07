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



  constructor(private _master: MasterService) { }

  ngOnInit(): void {
    AOS.init();
    this.Test('Popular Test');
    this._master.getTestMaster().subscribe((res:any) => {
      if(res.message == 'Success') {
        this.testItems = Object.entries(res.data.tests);
      }
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
      1000: {
        items: 4
      },
      1200: {
        items: 4
      },
      1600: {
        items: 5
      },
      1800: {
        items: 5
      }
    }, dots: false, nav: true
  };


  // CarouselOptions = {
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     600: {
  //       items: 2
  //     },
  //     900: {
  //       items: 3
  //     },
  //     1000: {
  //       items: 4
  //     },
  //     1200: {
  //       items: 4
  //     },
  //     1600: {
  //       items: 5
  //     },
  //     1800: {
  //       items: 5
  //     }
  //   }, dots: false, nav: true
  // };


  Test(data: any) {
    this.data = data;
    this.SldSecOne = true;
  };

  Package(data: any) {
    this.data = data;
    this.SldSecOne = false;
  }
}
