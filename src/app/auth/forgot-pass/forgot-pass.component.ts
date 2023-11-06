import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/service/profile.service';
import Swal from 'sweetalert2';
declare var $: any;



@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
  submitted: boolean = false;
  forgotPassForm: FormGroup
  email: any = ''
  forgSubmit: boolean = false
  isOtpValid: boolean = false


  constructor(private _fb: FormBuilder,
    private _profile: ProfileService,
    private _router: Router) {
    this.forgotPassForm = this._fb.group({
      schemaName: "nir1691144565",
      user_email: ['', Validators.required],
      old_password: null,
      new_password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }


  getOtp(email: any) {
    let payload = {
      "user_email": email
    }
    this.email = email

    this._profile.getOtpByemail(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.forgSubmit = true
        Swal.fire({
          title: "Success!",
          text: "OTP has been sent to your given email !",
          icon: "success"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    })
  }

  submitWithOtp() {
    let payload = {
      "otp": $('#user_otp').val()
    }
    this._profile.verifyOtp(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.isOtpValid = true
        this.forgotPassForm.get('user_email').setValue(this.email)
        Swal.fire({
          position: "center",
          icon: "success",
          text: "OTP match successfully !",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    })
  }
  submitForm() {
    this.submitted = true
    let form = this.forgotPassForm.value
    if (form.new_password === form.confirm_password) {
      this._profile.forgotPassword(this.forgotPassForm.value).subscribe((res: any) => {
        if (res.status == 1) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Successfull !",
            showConfirmButton: false,
            timer: 1500
          });
          this._router.navigate(['/auth/login'])
        }
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }
}
