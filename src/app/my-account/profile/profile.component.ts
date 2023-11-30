import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/service/profile.service';
import Swal from 'sweetalert2';
declare var $: any;
import {environment} from 'src/environments/environment.prod'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  patientForm: FormGroup
  submitted: boolean = false
  patients: any = []
  bloodGroup: any = []
  patientId:any
  isEdit: boolean = false
  username:any = ''
  isLandmark: boolean = false
  addressForm: FormGroup
  addressItems:any = []
  user_email: any = ''
  defaultImg: boolean = false


  cardImageBase64: string;
  previewImagePath: any;
  resetForm: FormGroup
  isLandmarkName:any
  addrId:any
  profileImg:any
  mediaUrl = environment.LimsEndpointBase
  coins:any
  
  constructor(private _fb: FormBuilder,
    private _profile: ProfileService,
    private _router: Router) {
    this.patientForm = this._fb.group({
      schemaName: ['nir1691144565'],
      user_id: [''],
      patientName: ['', Validators.required],
      age: ['', Validators.required],
      blood_group: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required]
    })

    this.addressForm = this._fb.group({
      schemaName: ['nir1691144565'],
      user_id: [''],
      addressName: ['',Validators.required],
      fullName: ['',Validators.required],
      contactNumber: ['',Validators.required],
      alt_contactNumber: [null,''],
      pinCode: ['',Validators.required],
      state: [''],
      city: [''],
      addressLine_1: ['',Validators.required],
      addressLine_2: ['', Validators.required],
      landMark: [null,'']
  })

  this.resetForm = this._fb.group({
    schemaName: 'nir1691144565',
    user_email: [''],
    old_password: [''],
    new_password: [''],
    confirm_password: ['']
  })
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('USER_NAME')
    this.user_email = localStorage.getItem('USER_EMAIL')
    let payload = {
      schemaName: 'nir1691144565',
      user_id: Number(localStorage.getItem('USER_ID'))
    }
    this._profile.getPatient(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.patients = res.data
      }
      else if(res.status == 503 || res.status == 403) {
        localStorage.clear();
        this._router.navigate(['/auth/login'])
      }
    })

    this.getAllAddress();

    this._profile.getBloodGroup().subscribe((res: any) => {
      if (res.status == 1) {
        this.bloodGroup = res.data
      }
    });
      $(document).ready(function () {
       
      });

      if(this._profile.profile) {
        this.profileImg = this._profile.profile
      } else {
        this._profile.getProfileImg(payload).subscribe((res:any) => {
          if(res.status == 1) {
            this.profileImg = res.data.profile_picture
            this._profile.profile = this.profileImg
          }
        })
      }

      this.getMyCoins()
  }

  clickme(i:any) {
      $('#ifff'+i).toggleClass("oppn");
  }
  
  savePatient() {
    this.submitted = true
    let userId = localStorage.getItem('USER_ID')
    let form = this.patientForm.value
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": Number(userId),
      "patientName": form.patientName,
      "age": Number(form.age),
      "blood_group": 1,
      "gender": Number(form.gender),
      "dob": form.dob,
      "height": Number(form.height),
      "weight": Number(form.weight)
    }

    if (this.patientForm.valid) {
      this._profile.storePatient(payload).subscribe((res: any) => {
        if (res.status == 1) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Added Successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          $("#exampleModal").hide();
          $('body').removeClass('modal-open');
          $(".modal-backdrop").removeClass("modal-backdrop show");
          this.ngOnInit()
        } 
        else if(res.status == 503 || res.status == 403) {
          $(".modal-backdrop").removeClass("modal-backdrop show");
          localStorage.clear();
          this._router.navigate(['/auth/login'])
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      })
    }
  }

  editPatient(id: any) {
    this.isEdit = true
    this.patientId = id
    let payload = {
      "schemaName": "nir1691144565",
      "patient_id": id
    }
    this._profile.getPatientById(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.patientForm.get("patientName").setValue(res.data.patient_name);
        this.patientForm.get("age").setValue(res.data.age);
        this.patientForm.get("blood_group").setValue(res.data.blood_group);
        this.patientForm.get("gender").setValue(res.data.gender);
        this.patientForm.get("dob").setValue(res.data.dob);
        this.patientForm.get("height").setValue(res.data.height);
        this.patientForm.get("weight").setValue(res.data.weight);
      }
    })
  }

  updatePatient() {
    this.submitted = true
    let form = this.patientForm.value
    let payload = {
      "schemaName": "nir1691144565",
      "patient_id": Number(this.patientId),
      "patientName": form.patientName,
      "age": Number(form.age),
      "blood_group": 1,
      "gender": Number(form.gender),
      "dob": form.dob,
      "height": Number(form.height),
      "weight": Number(form.weight)
    }
    this._profile.updatePatients(payload).subscribe((res:any) => {
      if(res.status == 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Added Successfully!',
          showConfirmButton: false,
          timer: 1500
        })
        $("#patientModal").hide();
        $('body').removeClass('modal-open');
        $(".modal-backdrop").removeClass("modal-backdrop show");
        this.ngOnInit();
        this.isEdit = false
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    })
  }

  deleteItem(id: any) {
    let payload = {
      "schemaName": "nir1691144565",
      "patient_id": id
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You want to remove this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Remove'
    }).then((result) => {
      if (result.isConfirmed) {
        this._profile.deletePatient(payload).subscribe((res: any) => {
          if (res.status == 1) {
            this.ngOnInit()
          }
        })
      }
    })

  }

  // Address Start
  saveAddress() {
    console.log(this.addressForm.value)
    this.addressForm.value['user_id'] = localStorage.getItem('USER_ID')
    this._profile.storeAddress(this.addressForm.value).subscribe((res:any) => {
      console.log(res)
      if(res.status == 1) {
        alert("Submitted Successfully !")
        this.addressForm.reset()
        this.getAllAddress()
        $("#addressModal").hide();
        $('body').removeClass('modal-open');
        $(".modal-backdrop").removeClass("modal-backdrop show");
      }
    })
  }

  getAllAddress() {
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID')
  }
    this._profile.getAddress(payload).subscribe((res:any) => {
      if(res.status == 1) {
        this.addressItems = res.data
      }
    })
  }

  profileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          let formData = new FormData();
          formData.append('schemaName', 'nir1691144565');
          formData.append('user_id', localStorage.getItem('USER_ID'));
          formData.append('profile_picture', event.target.files[0]);

          this._profile.storeProfileImg(formData).subscribe((res:any) => {
            if(res.status == 1) {
              Swal.fire({
                position: "center",
                text: "Profile has been changed!",
                showConfirmButton: false,
                timer: 1500
              });
              window.location.reload();
            }
          })
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  // Get Coins
   getMyCoins() {
    let payload = {
      "schemaName": "nir1691144565",
      "userID": localStorage.getItem('USER_ID')
  }
    this._profile.getCoins(payload).subscribe((res:any) => {
      if(res.status ==1) {
        this.coins = res.data
      }
    })
   }


  editAddr(id:any) {
    this.isEdit = true
    this.addrId = id
    let payload = {
      "schemaName": "nir1691144565",
      "addressID": id
  }

    this._profile.getAddressById(payload).subscribe((res:any) => {
      if(res.status == 1) {
        // this.patientForm.get("addressName").setValue(res.data[0].addressName);
        this.addressForm.get("fullName").setValue(res.data[0].fullName);
        this.addressForm.get("contactNumber").setValue(res.data[0].contactNumber);
        this.addressForm.get("alt_contactNumber").setValue(res.data[0].alt_contactNumber);
        this.addressForm.get("pinCode").setValue(res.data[0].pinCode);
        this.addressForm.get("state").setValue(res.data[0].state);
        this.addressForm.get("city").setValue(res.data[0].city);
        this.addressForm.get("addressLine_1").setValue(res.data[0].addressLine_1);
        this.addressForm.get("addressLine_2").setValue(res.data[0].addressLine_2);
        this.addressForm.get("landMark").setValue(res.data[0].landMark);
        this.isLandmarkName = res.data[0].addressName

      }
    })
  }

  updateAddress() {
    this.addressForm.value['user_id'] = localStorage.getItem('USER_ID')
    this.addressForm.value['addressID'] = this.addrId
    this._profile.updateAddress(this.addressForm.value).subscribe((res:any) => {
      if(res.status == 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Updated successfully !",
          showConfirmButton: false,
          timer: 150000
        });
        this.isEdit = false
        $("#addressModal").hide();
        $('body').removeClass('modal-open');
        $(".modal-backdrop").removeClass("modal-backdrop show");
        this.ngOnInit();
      } 
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    })
  }

  submitReset() {
    console.log(this.resetForm.value)
  }
  
}
