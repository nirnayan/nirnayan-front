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

  constructor(private _auth: AuthService,
    private _fb: FormBuilder,
    private _router: Router) 
    { 
      this.signUpForm = this._fb.group({
        schemaName: "nir1691144565",
        user_name: ['', Validators.required],
        user_email: ['', Validators.required],
        new_pass: ['', Validators.required],
        user_pass: ['', Validators.required],
        terms_conditions: [false, Validators.requiredTrue]
      },
      {
        validator: ConfirmPasswordValidator("new_pass", "user_pass")
      })
    }

    get f() { return this.signUpForm.controls; }

  ngOnInit(): void {
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
    let form = this.signUpForm.value
    $("#loader").show();
    if(form.new_pass === form.user_pass && this.signUpForm.valid && this.termsValue == true) {
      delete this.signUpForm.value['new_pass']
      this.signUpForm.value['terms_conditions'] = true
      this._auth.signUp(this.signUpForm.value).subscribe((res:any) => {
        $("#loader").hide();
        if(res.status == 1) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Registered Successfully !',
            showConfirmButton: false,
            timer: 1500
          })
          this._router.navigate(['/auth/login'])
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong !',
          })
        }
      })
    }
  }
}
