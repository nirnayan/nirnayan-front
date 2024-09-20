import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-headerslide',
  templateUrl: './headerslide.component.html',
  styleUrls: ['./headerslide.component.css']
})
export class HeaderslideComponent implements OnInit {
  department: any = [];

  SlideOptions = {
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 2
      },
    },
    dots: true,
    nav: false
  };

  constructor(
    private _router: Router,
    private _master: MasterService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getPageItem();
    }
  }

  getPageItem() {
    const formData = new FormData();
    formData.append('environment', 'user');
    this._master.getDepartments(formData).subscribe((res: any) => {
      if (res.message === 'Success') {
        this.department = res.data;
      }
    });
  }

  redirect(id: any) {
    this._router.navigate(['/laboratory/department', id]);
  }
}
