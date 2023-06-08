import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-headerslide',
  templateUrl: './headerslide.component.html',
  styleUrls: ['./headerslide.component.css']
})
export class HeaderslideComponent implements OnInit {
  department:any = [];




  constructor(private _router: Router,
    private _master: MasterService) { }

  ngOnInit(): void {
    this.getPageItem();
  }

  SlideOptions = {
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 2
      },

    }, dots: true, nav: false
  };


  getPageItem() {
    this._master.getDepartments().subscribe((res:any) => {
      if(res.message == 'Success') {
        this.department = res.data;
      }
    })
  }
  redirect(id:any) {
    this._router.navigate(['/laboratory/department',id]);
  };


}
