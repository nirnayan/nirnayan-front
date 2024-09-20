import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import $ from 'jquery'
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],

})
export class EmployeeDetailsComponent implements OnInit {
  empDetails: any;
  empStatus: any;
  limsBaseUrl = environment.LimsEndpointBase;
  platformId: Object;

  constructor(
    private _master: MasterService,
    private _route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platform: Object
  ) {
    this.platformId = platform;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      $("#loader").show(); // Show loader when in browser
    }

    this._route.params.subscribe((param: any) => {
      let payload = {
        "schemaName": "nir1691144565",
        "employee_code": param.emp
      };

      this._master.getEmpByCode(payload).subscribe((res: any) => {
        this.empStatus = res.status;
        if (res.status === 1) {
          this.empDetails = res.data;
          if (isPlatformBrowser(this.platformId)) {
            $("#loader").hide(); // Hide loader when in browser
          }
        }
      }, err => {
        console.log(err);
        if (isPlatformBrowser(this.platformId)) {
          $("#loader").hide(); // Hide loader on error
        }
      });
    });
  }
}
