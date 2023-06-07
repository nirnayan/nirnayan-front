import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindCenterComponent } from './find-center/find-center.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TestReferenceComponent } from './test-reference/test-reference.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TestListComponent } from './test-list/test-list.component';
import { TestDetailsComponent } from './test-details/test-details.component';


const routes: Routes = [
  {path: 'find-center', component: FindCenterComponent},
  {path: 'test-reference', component: TestReferenceComponent},
  {path: 'test-list', component: TestListComponent},
  {path: 'test-details', component: TestDetailsComponent}
]



@NgModule({
  declarations: [
    FindCenterComponent,
    TestReferenceComponent,
    TestListComponent,
    TestDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CarouselModule,
    SharedModule
  ]
})
export class PatientModule { }
