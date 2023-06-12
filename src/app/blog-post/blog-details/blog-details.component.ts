import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/service/master.service';
declare var $: any;

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  details:any;



  constructor(private _route: ActivatedRoute,
    private _master: MasterService) { }

  ngOnInit(): void {
    this._route.params.subscribe((param:any) => {
      const formData = new FormData();
      formData.append('id', param.id);
      this._master.getBlogsById(formData).subscribe((res:any) => {
        $("#loader").hide();
        console.log(res);
        if(res.message == 'Success') {
          this.details = res.data;
        }
      }, err => {
        console.log(err);
        $("#loader").hide();
      })
    })
  }

}
