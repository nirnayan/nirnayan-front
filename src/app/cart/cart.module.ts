import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCartComponent } from './my-cart/my-cart.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  {path: 'my-cart',component: MyCartComponent},
  {path: 'checkout', component: CheckoutComponent}
]



@NgModule({
  declarations: [
    MyCartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class CartModule { }
