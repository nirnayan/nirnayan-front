import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/service/master.service';
declare var $: any;





@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  empDetails:any;


  constructor(private _master: MasterService,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.params.subscribe((param:any) => {
      const formData = new FormData();
      formData.append('employee_code', param.emp);
      this._master.getEmpByCode(formData).subscribe((res:any) => {
        // console.log(res)
        if(res.message == 'Success') {
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
