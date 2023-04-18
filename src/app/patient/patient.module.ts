import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindCenterComponent } from './find-center/find-center.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TestReferenceComponent } from './test-reference/test-reference.component';


const routes: Routes = [
  {path: 'find-center', component: FindCenterComponent},
  {path: 'test-reference', component: TestReferenceComponent}
]



@NgModule({
  declarations: [
    FindCenterComponent,
    TestReferenceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PatientModule { }
