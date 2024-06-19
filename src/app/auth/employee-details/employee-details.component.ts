import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/service/master.service';
import { environment } from 'src/environments/environment.prod';
declare var $: any;





@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  empDetails:any;
  empStatus:any
  limsBaseUrl = environment.LimsEndpointBase

  constructor(private _master: MasterService,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.params.subscribe((param:any) => {
      // const formData = new FormData();
      let payload = {
        "schemaName": "nir1691144565",
        "employee_code": param.emp
    }
      // formData.append('employee_code', param.emp);
      this._master.getEmpByCode(payload).subscribe((res:any) => {
        // console.log(res)
        this.empStatus = res.status
        if(res.status == 1) {
            this.empDetails = res.data;
          $("#loader").hide();
        }
      })
    }, err => {
      console.log(err);
      $("#loader").hide();
    })
  }

}
