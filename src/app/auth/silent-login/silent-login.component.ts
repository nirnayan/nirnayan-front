import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from '../../service/master.service';
import Swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-silent-login',
  templateUrl: './silent-login.component.html',
  styleUrls: ['./silent-login.component.css'],

})
export class SilentLoginComponent implements OnInit {

  form = {
    schemaName: 'nir1691144565',
    full_name: '',
    email: '',
    otp: '',
    mobile: ''
  };

  platformId: Object;

  constructor(
    private _master: MasterService,
    private _router: Router,
    @Inject(PLATFORM_ID) private platform: Object
  ) {
    this.platformId = platform;
  }

  ngOnInit(): void {}

  getOtp(email: any) {
    let payload = {
      "schemaName": "nir1691144565",
      "email": email.value
    };
    this._master.getEmailOtp(payload).subscribe((res: any) => {
      if (res.status == 1) {
        if (isPlatformBrowser(this.platformId)) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Your 6 digit OTP has been sent!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    });
  }

  onSubmit() {
    this._master.storeSilentRegister(this.form).subscribe((res: any) => {
      if (res.status == 1) {
        if (isPlatformBrowser(this.platformId)) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Welcome",
            showConfirmButton: false,
            timer: 1500
          });
        }
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('JWT_TOKEN', res.token);
          localStorage.setItem('USER_ID', res.data[0].id);
          localStorage.setItem('USER_NAME', res.data[0].user_name);
        }
        this._router.navigate(['/']);
      } else {
        if (isPlatformBrowser(this.platformId)) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data,
          });
        }
      }
    });
  }
}
