import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department/department.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DocSliderComponent } from './doc-slider/doc-slider.component';
import { DepartSliderComponent } from './depart-slider/depart-slider.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AccreditationComponent } from './accreditation/accreditation.component';
import { SliderModule } from '../slider/slider.module';
import { AwardsComponent } from './awards/awards.component';
import { QualityComponent } from './quality/quality.component';


const routes: Routes = [
  {path: 'department/:id', component: DepartmentComponent},
  {path: 'accreditation', component: AccreditationComponent},
  {path: 'awards', component: AwardsComponent},
  {path: 'quality', component: QualityComponent}
]



@NgModule({
  declarations: [
    DepartmentComponent,
    DocSliderComponent,
    DepartSliderComponent,
    AccreditationComponent,
    AwardsComponent,
    QualityComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatExpansionModule,
    CarouselModule,
    MatTabsModule,
    SliderModule,
    SliderModule
  ]
})
export class LaboratoryModule { }
