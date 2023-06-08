import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutMenuSlideComponent } from './about-menu-slide/about-menu-slide.component';
import { HeaderslideComponent } from './headerslide/headerslide.component';
import { PatientMenuSlideComponent } from './patient-menu-slide/patient-menu-slide.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AccreditationSliderComponent } from './accreditation-slider/accreditation-slider.component';
import { AaSliderComponent } from './aa-slider/aa-slider.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AboutMenuSlideComponent,
    HeaderslideComponent,
    PatientMenuSlideComponent,
    AccreditationSliderComponent,
    AaSliderComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule
  ], 
  exports: [AboutMenuSlideComponent,HeaderslideComponent,PatientMenuSlideComponent,AccreditationSliderComponent,AaSliderComponent]
})
export class SliderModule { }
