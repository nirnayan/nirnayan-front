import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ProfileService } from 'src/app/service/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup
  submitted: boolean = false
  locations: any
  isLaoding: boolean = false

  constructor(private _auth: AuthService,
    private _fb: FormBuilder,
    private _router: Router,
    private _profile: ProfileService) 
    { 
      this.signInForm = this._fb.group({
        schemaName: "nir1691144565",
        user_email: ['', [Validators.required, Validators.email]],
        user_pass: ['', Validators.required]
      })
    }

  ngOnInit(): void {

  }


  getError(formControlName: string, validatorName: string): string {
    return this.determineErroMessage(formControlName, validatorName);
  }

  private determineErroMessage(formControlName: string, validatorName: string): string {
    switch (formControlName) {
      case 'email': return 'You must enter a valid email'
      default: return 'Email is required'
    }
  }

  submitSignIn() {
    this.submitted = true
    let email = this.signInForm.value['user_email'];
    this.signInForm.value['user_email'] = email.toLowerCase();
    if(this.signInForm.invalid) {
      return
    }
    this.isLaoding = true
    this._auth.signIn(this.signInForm.value).subscribe((res:any) => {
      this.isLaoding = false
      if(res.status == 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Login Successfully !',
          showConfirmButton: false,
          timer: 1500
        })
        localStorage.setItem('JWT_TOKEN',res.accessToken)
        localStorage.setItem('USER_ID',res.data.id)
        localStorage.setItem('USER_NAME',res.data.user_name)
        localStorage.setItem('USER_EMAIL',res.data.email)
        localStorage.setItem('MOBILE',res.data.mobileNumber)
        localStorage.setItem('ALT_EMAIL',res.data.recovery_email)
        this.getLocation()
        this._router.navigate(['/'])
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data,
        });
      }
    }, err => {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    })
  }


  passwordVisible = false; 
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }


  getLocation() {
    let ItemReq = {
      "schemaName": "nir1691144565"
    }
    this._profile.getAlllocations(ItemReq).subscribe((res:any) => {
      if(res.status == 1) {
        this.locations = res.data
        localStorage.setItem('LOCATION_ID',res.data[0].id)

      }
    })
  }
}
