import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/service/master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-silent-login',
  templateUrl: './silent-login.component.html',
  styleUrls: ['./silent-login.component.css']
})
export class SilentLoginComponent implements OnInit {

  
  form = {
    schemaName: 'nir1691144565',
    full_name: '',
    email: '',
    otp: '',
    mobile: ''
  };



  constructor(private _master: MasterService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  getOtp(email:any) {
    let payload = {
      "schemaName": "nir1691144565",
      "email": email.value
    }
    this._master.getEmailOtp(payload).subscribe((res:any) => {
      if(res.status ==1) {
        console.log(res)
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Your 6 digit OTP has been sent!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  onSubmit() {
    this._master.storeSilentRegister(this.form).subscribe((res:any) => {
      if(res.status == 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Welcome",
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.setItem('JWT_TOKEN',res.token)
        localStorage.setItem('USER_ID',res.data.id)
        this._router.navigate(['/'])
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data,
        });
      }
    })
  }
}
