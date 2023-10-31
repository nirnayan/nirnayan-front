import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/service/profile.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  patientForm: FormGroup
  submitted: boolean = false
  patients: any = []
  bloodGroup: any  =[]

  constructor(private _fb: FormBuilder,
    private _profile: ProfileService) {
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
  }

  ngOnInit(): void {
    let payload = {
      schemaName: 'nir1691144565',
      user_id: localStorage.getItem('USER_ID')
    }
    this._profile.getPatient(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.patients = res.data
      }
    })

    this._profile.getBloodGroup().subscribe((res:any) => {
      if(res.status == 1) {
        this.bloodGroup = res.data
      }
    })
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
            position: 'top-end',
            icon: 'success',
            text: 'Added Successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          $("#exampleModal").hide();
          $('body').removeClass('modal-open');
          // $(".modal-backdrop").removeClass("modal-backdrop show");
          this.ngOnInit()
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      })
    }
  }

  deleteItem(id:any) {
    let payload = {
      "schemaName": "nir1691144565",
      "patient_id": id
  }
  this._profile.deletePatient(payload).subscribe((res:any) => {
    if(res.status == 1) {
      this.ngOnInit()
    }
  })
  }
}
