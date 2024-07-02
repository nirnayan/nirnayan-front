import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ProfileService } from 'src/app/service/profile.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { style } from '@angular/animations';
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
  digitOne: any;
  digitTwo: any;
  digitThree: any;
  digitFour: any;
  digitFive: any;
  digitSix: any;
  remainingTime: number = 30; // Initial remaining time in seconds
  timerInterval: any;
  otpRequested: boolean = false;




  constructor(private _auth: AuthService,
    private _fb: FormBuilder,
    private _router: Router,
    private _profile: ProfileService) {
    const userOtp = this.digitOne + this.digitTwo + this.digitThree + this.digitFour
    this.signInForm = this._fb.group({
      schemaName: "nir1691144565",
      user_user: ['', [Validators.required,]],
      customOtp1: ['', [Validators.required]],
      customOtp2: ['', [Validators.required]],
      customOtp3: ['', [Validators.required]],
      customOtp4: ['', [Validators.required]],
      customOtp5: ['', [Validators.required]],
      customOtp6: ['', [Validators.required]]
    });

  }
  ngOnInit() {
    $('.digit-group')
      .find('input')
      .each(function () {
        $(this).attr('maxlength', 1);
        $(this).on('keyup', function (e) {
          var parent = $($(this).parent());

          if (e.keyCode === 8 || e.keyCode === 37) {
            var prev = parent.find('input#' + $(this).data('previous'));

            if (prev.length) {
              $(prev).select();
            }
          } else if (
            (e.keyCode >= 48 && e.keyCode <= 57) ||
            (e.keyCode >= 65 && e.keyCode <= 90) ||
            (e.keyCode >= 96 && e.keyCode <= 105) ||
            e.keyCode === 39
          ) {
            var next = parent.find('input#' + $(this).data('next'));

            if (next.length) {
              $(next).select();
            } else {
              if (parent.data('autosubmit')) {
                parent.submit();
              }
            }
          }
        });
      });
  }

  toggleOTP(event: any) {
    const input = event.target.value.trim();
    const otpButton = document.getElementById('otpButton');

    if (input !== '') {
      otpButton.style.display = 'block';
    } else {
      otpButton.style.display = 'none';
    }
  }

  showToast(icon: any, title: string, message: string) {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
      toast: true,
      position: 'top-end',
      customClass: {
        popup: 'colored-toasts'
      },
      showConfirmButton: false,
      timer: 10000
    });
  }
  

  getOTP() {
    const userName = this.signInForm.get('user_user').value;
    console.log(userName)
    this._profile.getSignInOtp(userName).subscribe(
      (res: any) => {
        console.log(res)
         this.showToast('success',' Success',`Your Otp is ${res.otpDets.otp}`)
        
        // Swal.fire({
        //   position: 'center',
        //   icon: 'success',
        //   text: `OTP has been sent your ${userName}`,
        //   showConfirmButton: false,
        //   timer: 1500
        // })
      },
      (err: any) => {
        console.log(err)
      }
    )
    this.otpRequested = true;
    this.startTimer();
  }
  resendOtp() {

  }
  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
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
    const otp = this.signInForm.get('customOtp1').value + this.signInForm.get('customOtp2').value + this.signInForm.get('customOtp3').value + this.signInForm.get('customOtp4').value + this.signInForm.get('customOtp5').value + this.signInForm.get('customOtp6').value
    let payload = {
      "email_or_mobile": this.signInForm.get('user_user').value,
      "otp": otp
    }

    this.isLaoding = true;
    this._profile.signInWithOtp(payload).subscribe(res => {
      this.isLaoding = false;
      if (res.status == 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Login Successfully!',
          showConfirmButton: false,
          timer: 1500
        })
        localStorage.setItem('JWT_TOKEN', res.accessToken)
        localStorage.setItem('USER_NAME_FISRT', res.data.first_name)
        localStorage.setItem('USER_NAME_LAST', res.data.last_name)
        localStorage.setItem('USER_MOBILE', res.data.mobileNumber)
        localStorage.setItem('USER_EMAIL', res.data.email)
        localStorage.setItem('PROFILE_IMG', res.data.profile_picture)
        localStorage.setItem('USER_ID', res.data.id)
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
    this._profile.getAlllocations(ItemReq).subscribe((res: any) => {
      if (res.status == 1) {
        this.locations = res.data
        localStorage.setItem('LOCATION_ID', res.data[0].id)

      }
    })
  }
}
