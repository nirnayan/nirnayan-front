import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
import AOS from 'aos';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {
  details:any;
  parameters:any;


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
      formData.append('test_id', param.id);
      this._master.getDetailsByTestId(formData).subscribe((res:any) => {
        $("#loader").hide();
        if(res.message == 'Success') {
          this.details = res.data;
          
        }
      }, err => {
        console.log(err)
        $("#loader").hide();
      })
    })
  }

}
