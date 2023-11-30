import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MyOrderComponent } from './my-order/my-order.component';

const routes: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path: 'my-order', component: MyOrderComponent}
]

@NgModule({
  declarations: [
    ProfileComponent,
    MyOrderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MyAccountModule { }
