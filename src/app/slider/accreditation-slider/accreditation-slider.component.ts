import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-accreditation-slider',
  templateUrl: './accreditation-slider.component.html',
  styleUrls: ['./accreditation-slider.component.css']
})
export class AccreditationSliderComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.refreshComponent();
    }
  }

  refreshComponent() {
    // Reload the current route to refresh the component
    this.router.navigate([this.router.url]);
  }

  f() {
    if (isPlatformBrowser(this.platformId)) {
      // Ensure that the global `test` variable is available
      // Note: Direct access to global variables should be avoided if possible
      (window as any).test = (window as any).test || function() {};
      new (window as any).test();
    }
  }
}
