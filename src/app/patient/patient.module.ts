import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindCenterComponent } from './find-center/find-center.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TestReferenceComponent } from './test-reference/test-reference.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TestListComponent } from './test-list/test-list.component';
import { TestDetailsComponent } from './test-details/test-details.component';
import { PackageListComponent } from './package-list/package-list.component';
import { PackageDetailsComponent } from './package-details/package-details.component';


const routes: Routes = [
  {path: 'find-center', component: FindCenterComponent},
  {path: 'test-reference', component: TestReferenceComponent},
  {path: 'test-list', component: TestListComponent},
  {path: 'test-details/:id', component: TestDetailsComponent},
  {path: 'package-list', component: PackageListComponent},
  {path: 'package-details/:id', component: PackageDetailsComponent}
]



@NgModule({
  declarations: [
    FindCenterComponent,
    TestReferenceComponent,
    TestListComponent,
    TestDetailsComponent,
    PackageListComponent,
    PackageDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CarouselModule,
    SharedModule
  ]
})
export class PatientModule { }
