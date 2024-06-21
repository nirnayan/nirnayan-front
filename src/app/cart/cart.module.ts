import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCartComponent } from './my-cart/my-cart.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { TimeformatPipe } from './timeformat.pipe';
// import { AgmCoreModule } from '@agm/core';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';



const routes: Routes = [
  {path: 'my-cart',component: MyCartComponent},
  {path: 'checkout', component: CheckoutComponent}
]



@NgModule({
  declarations: [
    MyCartComponent,
    CheckoutComponent,
    TimeformatPipe
  ],
  imports: [
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw', // Replace with your API key
    // }) as ModuleWithProviders<any>,
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    // Ng2SearchPipeModule,
    ReactiveFormsModule
  ]
})
export class CartModule { }
