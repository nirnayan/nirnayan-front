import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import { ConfirmPasswordValidator } from '../confirm-password.validator';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  signUpForm: FormGroup
  submitted: boolean = false
  termsValue: boolean = false
  validFrom: boolean = true
  spiner: boolean = false
  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  remainingTime: number = 30; // Initial remaining time in seconds
  timerInterval: any;
  otpRequested: boolean = false;
  getOtp: any


  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private _router: Router,
    private _master: MasterService
  ) {
    this.signUpForm = this._fb.group({
      // schemaName: "nir1691144565",
      user_first_name: ['', Validators.required],
      user_last_name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      user_dob: ['', [Validators.required]],
      // new_pass: [null, [Validators.required, Validators.pattern(this.StrongPasswordRegx)]],
      // user_pass: [null, Validators.required],
      terms_conditions: [false, Validators.required],
      customOtp1: ['', Validators.required],
      customOtp2: ['', Validators.required],
      customOtp3: ['', Validators.required],
      customOtp4: ['', Validators.required],
      customOtp5: ['', Validators.required],
      customOtp6: ['', Validators.required],

    }
    )
  }

  get f() { return this.signUpForm.controls; }

  get userEmail() {
    return this.signUpForm.get('user_email')
  }

  get passwordFormField() {
    return this.signUpForm.get('new_pass');
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

  ngOnInit(): void {
    $("#loader").hide();
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

  termsCondition(event: any) {
    this.termsValue = event.target.checked
    if (event.target.checked == true) {
      this.validFrom = true
    } else {
      this.validFrom = false
    }
  }

  SubmitSignUp() {
    const otp = this.signUpForm.get('customOtp1').value + this.signUpForm.get('customOtp2').value + this.signUpForm.get('customOtp3').value + this.signUpForm.get('customOtp4').value + this.signUpForm.get('customOtp5').value + this.signUpForm.get('customOtp6').value
    this.submitted = true
    // let email = this.signUpForm.value['user_email'];
    // this.signUpForm.value['user_email'] = email.toLowerCase()
    if (otp == this.getOtp) {
      if (this.termsValue == true) {
        // delete this.signUpForm.value['new_pass']
        // this.signUpForm.value['terms_conditions'] = 1
        const payload = {
          first_name: this.signUpForm.value['user_first_name'],
          last_name: this.signUpForm.value['user_last_name'],
          user_email: this.signUpForm.value['user_email'],
          mobileNumber: this.signUpForm.value['mobileNumber'],
          dob: this.signUpForm.value['user_dob']
        }
        this.spiner = true
        this._auth.register(payload).subscribe((res: any) => {
          this.spiner = false
          if (res.status == 1) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              text: 'Registered Successfully !',
              showConfirmButton: false,
              timer: 1500
            })
            this._router.navigate(['/auth/login'])
          }
          else if (res.status == 2) {
            Swal.fire({
              icon: "error",
              title: "Sorry",
              text: "User name already exist!",
            });
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong !',
            })
          }
        })
      } else {
        $("#loader").hide();
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: 'Enter Your Correct OTP!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  confpasswordVisible: boolean = false
  passwordVisible: boolean = false
  togglePasswordVisibility(msg: any): void {
    if (msg == 'new') {
      this.passwordVisible = !this.passwordVisible
    } else {
      this.confpasswordVisible = !this.confpasswordVisible
    }
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
  getOTP() {
    const otpFill = document.getElementById('otp-fill');
    otpFill.style.display = 'block';
    this.otpRequested = true;
    this.getOtp = this._master.generateOTP()
    let payload = {
      "keyword": "DEMO",
      "timestamp": "28112022173433",
      "dataSet": [
        {
          "UNIQUE_ID": "test uid",
          "MESSAGE": `Your OTP for Nirnayan Healthcare login is ${this.getOtp} and is valid for 10 mins. Please do not share this with anyone.https://nirnayanhealthcare.com/  – Nirnayan Healthcare.`,
          "OA": "NHPLOP",
          "MSISDN": this.signUpForm.get('mobileNumber').value,
          "CHANNEL": "SMS",
          "CAMPAIGN_NAME": "nirhealth_ht",
          "DLT_CT_ID": "1007110658450886630",
          "DLT_PE_ID": "1001896439179873851",
          "DLT_TM_ID": "1001096933494158",
          "CIRCLE_NAME": "DLT_SERVICE_IMPLICT",
          "USER_NAME": "nirhealth_htsi1"
        }
      ]
    }
    this._master.getSMS(payload).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: `OTP has been sent your ${this.signUpForm.get('mobileNumber').value}`,
          timer: 1000
        })
      },
      (err: any) => {
        console.log(err)
      }
    )
    this.startTimer();
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

  }

}
