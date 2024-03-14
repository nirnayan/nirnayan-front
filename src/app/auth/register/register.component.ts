import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import { ConfirmPasswordValidator } from '../confirm-password.validator';

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

  constructor(private _auth: AuthService,
    private _fb: FormBuilder,
    private _router: Router) {
    this.signUpForm = this._fb.group({
      schemaName: "nir1691144565",
      user_name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      new_pass: [null, [Validators.required, Validators.pattern(this.StrongPasswordRegx)]],
      user_pass: [null, Validators.required],
      terms_conditions: [false, Validators.required]
    },
      {
        validator: ConfirmPasswordValidator("new_pass", "user_pass")
      })
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
    this.submitted = true
    let email = this.signUpForm.value['user_email'];
    this.signUpForm.value['user_email'] = email.toLowerCase()
    if (this.signUpForm.valid && this.termsValue == true) {
      delete this.signUpForm.value['new_pass']
      this.signUpForm.value['terms_conditions'] = 1
      
      this.spiner = true
      this._auth.signUp(this.signUpForm.value).subscribe((res: any) => {
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
}
