import { NgModule, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { SilentLoginComponent } from './silent-login/silent-login.component';
import { isPlatformBrowser } from '@angular/common';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'employee/:emp', component: EmployeeDetailsComponent},
  {path: "forgot-password", component: ForgotPassComponent},
  {path: 'process', component: SilentLoginComponent}
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EmployeeDetailsComponent,
    ForgotPassComponent,
    SilentLoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: []
})
export class AuthModule { }
