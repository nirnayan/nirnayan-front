import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import Swal from 'sweetalert2';
import { ConfirmPasswordValidator } from '../confirm-password.validator';
import { isPlatformBrowser } from '@angular/common';
import $ from 'jquery'
@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css'],

})
export class ForgotPassComponent implements OnInit {
  submitted: boolean = false;
  forgotPassForm: FormGroup;
  email: string = '';
  forgSubmit: boolean = false;
  isOtpValid: boolean = false;
  isLoadingShow: boolean = false;
  isLoadingSubmit: boolean = false;

  userEmailValidate: string = '';

  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  platformId: Object;

  constructor(
    private _fb: FormBuilder,
    private _profile: ProfileService,
    private _router: Router,
    @Inject(PLATFORM_ID) private platform: Object
  ) {
    this.forgotPassForm = this._fb.group({
      schemaName: "nir1691144565",
      user_email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      old_password: null,
      new_password: [null, [Validators.required, Validators.pattern(this.StrongPasswordRegx)]],
      confirm_password: ['', Validators.required]
    }, {
      validator: ConfirmPasswordValidator("new_password", "confirm_password")
    });

    this.platformId = platform;
  }

  get f() { return this.forgotPassForm.controls; }
 
  get userEmail() {
    return this.forgotPassForm.get('user_email');
  }

  get passwordFormField() {
    return this.forgotPassForm.get('new_password');
  }

  ngOnInit(): void {}

  getOtp(email: string) {
    let payload = {
      "user_email": email.toLowerCase(),
    };
    this.email = email;
    this.isLoadingShow = true;
    this._profile.getOtpByemail(payload).subscribe((res: any) => {
      this.isLoadingShow = false;
      if (res.status == 1) {
        this.forgSubmit = true;
        Swal.fire({
          title: "Success!",
          text: "OTP has been sent to your given email!",
          icon: "success"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data,
        });
      }
    });
  }

  submitWithOtp() {
    if (isPlatformBrowser(this.platformId)) {
      let otp = ($('#user_otp') as unknown as HTMLInputElement).value;
      let payload = {
        "otp": otp
      };
      this.isLoadingShow = true;
      this._profile.verifyOtp(payload).subscribe((res: any) => {
        this.isLoadingShow = false;
        if (res.status == 1) {
          this.isOtpValid = true;
          this.forgotPassForm.get('user_email')?.setValue(this.email);
          Swal.fire({
            position: "center",
            icon: "success",
            text: "OTP matched successfully!",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data,
          });
        }
      });
    }
  }
  
  submitForm() {
    this.submitted = true;
    if (this.forgotPassForm.valid) {
      this.isLoadingSubmit = true;
      this._profile.forgotPassword(this.forgotPassForm.value).subscribe((res: any) => {
        this.isLoadingSubmit = false;
        if (res.status == 1) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Changed Successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          this._router.navigate(['/auth/login']);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data,
          });
        }
      });
    }
  }

  passwordVisible: boolean = false;
  passwordVisible2: boolean = false;

  togglePasswordVisibility(pass: string): void {
    if (pass === 'new') {
      this.passwordVisible = !this.passwordVisible;
    } else {
      this.passwordVisible2 = !this.passwordVisible2;
    }
  }
}
