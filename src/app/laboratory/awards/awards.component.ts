import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/service/master.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {
  award:any = [];
  awardData:any []
  basePath = environment.BaseLimsApiUrl
  constructor(
    private _master :MasterService
  ) { }

  ngOnInit(): void {
    this.getAllAward();
  }
  getAllAward() {
    
    this._master.getAllAward().subscribe((res:any)=>{
      this.awardData=res.data
     for(let item of this.awardData){
      if(item.status === 1){
        this.award.push(item)
      }
     }
    })
  }
}
