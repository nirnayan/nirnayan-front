import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private _router: Router) 
    { 
      this.signUpForm = this._fb.group({
        schemaName: "nir1691144565",
        user_name: ['', Validators.required],
        user_email: ['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        new_pass: [null, [Validators.required,Validators.pattern(this.StrongPasswordRegx)]],
        user_pass: [null, Validators.required],
        terms_conditions: 1
      },
      {
        validator: ConfirmPasswordValidator("new_pass", "user_pass")
      })
    }

    get f() { return this.signUpForm.controls; }
 
    get userEmail(){
      return this.signUpForm.get('user_email')
      }

      get passwordFormField() {
        return this.signUpForm.get('new_pass');
      }


  ngOnInit(): void {
    $("#loader").hide();
  }

  termsCondition(event:any) {
    this.termsValue = event.target.checked
    if(event.target.checked == true) {
      this.validFrom = false
    } else {
      this.validFrom = true
    }
  }
  
  SubmitSignUp() {
    this.submitted = true

    if(this.signUpForm.valid && this.termsValue == true) {
      this.spiner = true
      delete this.signUpForm.value['new_pass']
      this.signUpForm.value['terms_conditions'] = 1

      this._auth.signUp(this.signUpForm.value).subscribe((res:any) => {
        this.spiner = false
        if(res.status == 1) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Registered Successfully !',
            showConfirmButton: false,
            timer: 1500
          })
          this._router.navigate(['/auth/login'])
        } 
        else if(res.status == 2) {
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
}
