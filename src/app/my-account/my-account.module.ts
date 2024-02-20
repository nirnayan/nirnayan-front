import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MyOrderComponent } from './my-order/my-order.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';

const routes: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path: 'my-order', component: MyOrderComponent},
  {path: 'prescription', component: PrescriptionsComponent}
]

@NgModule({
  declarations: [
    ProfileComponent,
    MyOrderComponent,
    PrescriptionsComponent
  ],
  imports: [
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw', // Replace with your API key
    // }),
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})
export class MyAccountModule { }
