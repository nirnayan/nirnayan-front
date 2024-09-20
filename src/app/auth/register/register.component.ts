import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';
import { MasterService } from '../../service/master.service';
import { isPlatformBrowser } from '@angular/common';
import $ from 'jquery'
import { ToastService } from '../../service/toast.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  submitted: boolean = false;
  termsValue: boolean = false;
  validFrom: boolean = true;
  spiner: boolean = false;
  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  remainingTime: number = 30; // Initial remaining time in seconds
  timerInterval: any;
  otpRequested: boolean = false;
  getOtp: any;
  platformId: Object;

  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private _router: Router,
    private _master: MasterService,
    @Inject(PLATFORM_ID) private platform: Object,
    private toastr : ToastService
  ) {
    this.platformId = platform;
    this.signUpForm = this._fb.group({
      user_first_name: ['', Validators.required],
      user_last_name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      user_dob: ['', [Validators.required]],
      terms_conditions: [false, Validators.required],
      customOtp1: ['', Validators.required],
      customOtp2: ['', Validators.required],
      customOtp3: ['', Validators.required],
      customOtp4: ['', Validators.required],
      customOtp5: ['', Validators.required],
      customOtp6: ['', Validators.required],
    });
  }

  get f() { return this.signUpForm.controls; }
  get userEmail() { return this.signUpForm.get('user_email'); }
  get passwordFormField() { return this.signUpForm.get('new_pass'); }

  getError(formControlName: string, validatorName: string): string {
    return this.determineErrorMessage(formControlName, validatorName);
  }

  private determineErrorMessage(formControlName: string, validatorName: string): string {
    switch (formControlName) {
      case 'email': return 'You must enter a valid email';
      default: return 'Field is required';
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      $("#loader").hide();
      $('.digit-group').find('input').each(function () {
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
  }

  termsCondition(event: any) {
    this.termsValue = event.target.checked;
    this.validFrom = this.termsValue;
  }

  SubmitSignUp() {
    const otp = this.signUpForm.get('customOtp1').value +
      this.signUpForm.get('customOtp2').value +
      this.signUpForm.get('customOtp3').value +
      this.signUpForm.get('customOtp4').value +
      this.signUpForm.get('customOtp5').value +
      this.signUpForm.get('customOtp6').value;

    this.submitted = true;
    if (otp === this.getOtp) {
      if (this.termsValue) {
        const payload = {
          first_name: this.signUpForm.value['user_first_name'],
          last_name: this.signUpForm.value['user_last_name'],
          user_email: this.signUpForm.value['user_email'],
          mobileNumber: this.signUpForm.value['mobileNumber'],
          dob: this.signUpForm.value['user_dob']
        };
        this.spiner = true;
        this._auth.register(payload).subscribe((res: any) => {
          this.spiner = false;
          if (res.status === 1) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              text: 'Registered Successfully!',
              showConfirmButton: false,
              timer: 1500
            });
            this._router.navigate(['/auth/login']);
          } else if (res.status === 2) {
            Swal.fire({
              icon: 'error',
              title: 'Sorry',
              text: 'User name already exists!',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        });
      } else {
        if (isPlatformBrowser(this.platformId)) {
          $("#loader").hide();
        }
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: 'Enter Your Correct OTP!',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  confpasswordVisible: boolean = false;
  passwordVisible: boolean = false;

  togglePasswordVisibility(msg: any): void {
    if (msg === 'new') {
      this.passwordVisible = !this.passwordVisible;
    } else {
      this.confpasswordVisible = !this.confpasswordVisible;
    }
  }

  toggleOTP(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      const input = event.target.value.trim();
      const otpButton = document.getElementById('otpButton');
      if (otpButton) {
        otpButton.style.display = input !== '' ? 'block' : 'none';
      }
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
    if (isPlatformBrowser(this.platformId)) {
      const otpFill = document.getElementById('otp-fill');
      if (otpFill) {
        otpFill.style.display = 'block';
      }
      this.otpRequested = true;
      this.getOtp = this._master.generateOTP();
      // let payload = {
      //   "keyword": "DEMO",
      //   "timestamp": "28112022173433",
      //   "dataSet": [
      //     {
      //       "UNIQUE_ID": "test uid",
      //       "MESSAGE": `Your OTP for Nirnayan Healthcare login is ${this.getOtp} and is valid for 10 mins. Please do not share this with anyone.https://nirnayanhealthcare.com/  – Nirnayan Healthcare.`,
      //       "OA": "NHPLOP",
      //       "MSISDN": this.signUpForm.get('mobileNumber').value,
      //       "CHANNEL": "SMS",
      //       "CAMPAIGN_NAME": "nirhealth_ht",
      //       "DLT_CT_ID": "1007110658450886630",
      //       "DLT_PE_ID": "1001896439179873851",
      //       "DLT_TM_ID": "1001096933494158",
      //       "CIRCLE_NAME": "DLT_SERVICE_IMPLICT",
      //       "USER_NAME": "nirhealth_htsi1"
      //     }
      //   ]
      // };
      // this._master.getSMS(payload).subscribe(
      //   (res: any) => {
      //     Swal.fire({
      //       position: 'center',
      //       icon: 'success',
      //       text: `OTP has been sent to your ${this.signUpForm.get('mobileNumber').value}`,
      //       timer: 1000
      //     });
      //   },
      //   (err: any) => {
      //     console.log(err);
      //   }
      // );
      const payload = {
        "mobile": this.signUpForm.get('mobileNumber').value
    }
      this._auth.requestSignUpOtp(payload).subscribe((res:any)=>{
        if(res.status == 1){
          const otp = res.otpDets
          this.showToast('success', 'Success', `Your OTP is ${res.otpDets.otp}`);
        }

      })
      this.startTimer();
    }
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

  resendOtp() {
    // Implement resend OTP functionality here
  }
}
