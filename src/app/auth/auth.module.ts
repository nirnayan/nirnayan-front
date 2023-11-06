import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'employee/:emp', component: EmployeeDetailsComponent},
  {path: "forgot-password", component: ForgotPassComponent}
]




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EmployeeDetailsComponent,
    ForgotPassComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class AuthModule { }
