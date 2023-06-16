import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
import { MasterService } from 'src/app/service/master.service';


@Component({
  selector: 'app-find-center',
  templateUrl: './find-center.component.html',
  styleUrls: ['./find-center.component.css']
})
export class FindCenterComponent implements OnInit {
  centers:any = [];
  centerTiming: any = [];




  constructor(private _master: MasterService) { }

  ngOnInit(): void {
    AOS.init();
    this.getAllCenter();
  }


  getAllCenter() {
    this._master.getCenter().subscribe((res:any) => {
      if(res.message == 'Success') {
        this.centers = res.data;
        // this.centerTiming = res.data['timing'][0]
        let time = [];
        for(let item of this.centers) {
          time = Object.entries(item['timing'][0]);
        }
        this.centerTiming = time;
        console.log(this.centerTiming);
      }
    })
  }
}
