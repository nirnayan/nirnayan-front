import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
import AOS from 'aos';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent implements OnInit {

  details:any;
  parameters:any;
  testImage:any;

  constructor(private _master: MasterService,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    AOS.init();
    $(document).ready(function() {
      $('.parameterBoxHead').on('click', function() {
        $(this).parent(".parameterBox").toggleClass("open");
        $(this).parent().siblings().removeClass("open");
      });
    });

    this._route.params.subscribe((param:any) => {
      const formData = new FormData();
      formData.append('id', param.id);
      this._master.getPackageById(formData).subscribe((res:any) => {
        $("#loader").hide();
        if(res.message == 'Success') {
          this.details = res.data;
          this.testImage = localStorage.getItem('TEST_IMAGE');
          
        }
      }, err => {
        console.log(err)
        $("#loader").hide();
      })
    })
  }

}
