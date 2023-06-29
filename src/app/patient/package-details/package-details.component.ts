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
  pckgeImage:any;

  constructor(private _master: MasterService,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    AOS.init();
    $(document).ready(function() {
      $(document).on("click", ".parameterBoxHead", function(){
        $(this).closest(".parameterBox").toggleClass("open");
        $(this).closest(".parameterBox").siblings(".parameterBox").removeClass("open")
      });
    });

    this._route.params.subscribe((param:any) => {
      const formData = new FormData();
      formData.append('id', param.id);
      this._master.getPackageById(formData).subscribe((res:any) => {
        $("#loader").hide();
        if(res.message == 'Success') {
          this.details = res.data;
          this.pckgeImage = localStorage.getItem('PACKG_IMAGE');
          // let paraArray = Object.entries(res.data['parameters']);
          // let totalItem = [];
          // let parameter = [];
          // for (let i = 0; i < paraArray.length; i++) {
          //   totalItem.push(paraArray[i][1]);
          //   this.parameters = totalItem;
          //   for(let item of totalItem[i]) {
          //     parameter.push(item);
          //   }
          // }

          // this.parameters = parameter;
          // for(let item of paraArray) {
          //   totalItem.push( item[1]);
          //   for(let arr of totalItem) {
          //     console.log(arr);

          //   }
          // }
          
        }
      }, err => {
        console.log(err)
        $("#loader").hide();
      })
    })
  }

}
