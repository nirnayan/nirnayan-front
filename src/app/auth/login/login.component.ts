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

  constructor(private _auth: AuthService,
    private _fb: FormBuilder,
    private _router: Router,
    private _profile: ProfileService) 
    { 
      this.signInForm = this._fb.group({
        schemaName: "nir1691144565",
        user_email: ['', Validators.required],
        user_pass: ['', Validators.required]
      })
    }

  ngOnInit(): void {

  }

  submitSignIn() {
    this.submitted = true
    $("#loader").show();
    this._auth.signIn(this.signInForm.value).subscribe((res:any) => {
      if(res.status == 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Login Successfully !',
          showConfirmButton: false,
          timer: 1500
        })
        localStorage.setItem('JWT_TOKEN',res.token)
        localStorage.setItem('USER_ID',res.data.id)
        localStorage.setItem('USER_NAME',res.data.user_name)
        this.getLocation()
        $("#loader").hide();
        this._router.navigate(['/'])
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.data,
        })
      }
    })
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
