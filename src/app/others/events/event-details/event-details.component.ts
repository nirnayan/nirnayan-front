import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/service/master.service';
declare var $: any;


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  eventItem:any 

  constructor(private _master: MasterService,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {

    this._route.params.subscribe((param:any) => {
      const formData = new FormData();
      formData.append('id', param.id);
      this._master.getEventsById(formData).subscribe((res:any) => {
        $("#loader").hide();
        if(res.status == 200) {
          this.eventItem = res.data
        }
      })
    })
  }

}
