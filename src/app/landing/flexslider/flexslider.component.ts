import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos'; 
import { MasterService } from 'src/app/service/master.service';
declare var $: any;

@Component({
  selector: 'app-flexslider',
  templateUrl: './flexslider.component.html',
  styleUrls: ['./flexslider.component.css']
})
export class FlexsliderComponent implements OnInit {
  pageItem:any;
  groupItem:any = [];
  p: number = 1;



  constructor(private router: Router,
    private _master: MasterService) { }

  ngOnInit(): void {
    AOS.init();
    this.getGroup('Organ');
  }

  getGroup(data:any) {
    const formData = new FormData();
    formData.append('group_type', data);
    this._master.getGroupMaster(formData).subscribe((res:any) => {
      if(res.message == 'Success') {
        this.groupItem = res.data;
        this.changeGroupData(res.data[0].id)
      }
    })
  }
  groupInfo:any;
  changeGroupData(group_id){
    const formData = new FormData();
    formData.append('group_id', group_id);
    this._master.getGroupWiseItem(formData).subscribe((res:any) => {
      let group = [];
      if(res.message == 'Success') {
        group.push(res.data);
      }
      this.groupInfo = group;
    })
  }
}
