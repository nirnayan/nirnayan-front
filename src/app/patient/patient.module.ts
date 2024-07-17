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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BlogDetailsComponent } from '../blog-post/blog-details/blog-details.component';



const routes: Routes = [
  {path: 'find-center', component: FindCenterComponent},
  {path: 'test-reference', component: TestReferenceComponent},
  {path: 'test-list', component: TestListComponent},
  {path: 'test-details/:groupname/:testname', component: TestDetailsComponent},
  {path: 'package-list', component: PackageListComponent},
  {path: 'package-details/:groupname/:packagename', component: PackageDetailsComponent},
  {path: 'blog-details/:id', component: BlogDetailsComponent}
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
    SharedModule,
    FormsModule,
    NgxPaginationModule,
    // Ng2SearchPipeModule,
    ReactiveFormsModule,
  ]
})
export class PatientModule { }
