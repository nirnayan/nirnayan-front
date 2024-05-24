import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { MasterService } from 'src/app/service/master.service';
import { ProfileService } from 'src/app/service/profile.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery'
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.css']
})
export class SharedModalComponent implements OnInit {
  basePath:any = environment.BaseLimsApiUrl
  allPatients:any = []
  itemInfo:any 
  patientForm: FormGroup
  submitted: boolean = false
  patients: any = []
  bloodGroup: any = []
  patientId: any
  isPatientLoadData: boolean = false
  isEdit: boolean = false

  constructor(
    private _profile: ProfileService,
    private _cart: CartService,
    private _auth: AuthService,
    private master: MasterService,
    private _fb:FormBuilder,
    private _router:Router
  ) { 
    this.patientForm = this._fb.group({
      schemaName: ['nir1691144565'],
      user_id: [''],
      patientTitle: ['', Validators.required],
      patientName: ['', Validators.required],
      dob: ['', Validators.required],
      age: [{ value: '', disabled: true }],
      blood_group: ['', Validators.required],
      gender: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.master.receivePriceInfo().subscribe((res:any) => {
      if(res) {
        this.itemInfo = res
      }
    })
    
    let payload2 = {
      schemaName: 'nir1691144565',
      user_id: Number(localStorage.getItem('USER_ID'))
    }

    this._profile.getPatient(payload2).subscribe((res:any) => {
      if(res.status==1) {
        this.allPatients = res.data
      }
    })
    this._profile.getBloodGroup().subscribe((res: any) => {
      if (res.status == 1) {
        this.bloodGroup = res.data
      }
    });
  }

  dismiss(){
    $("#newModal").hide();
    $('body').removeClass('modal-open');
    $(".modal-backdrop").removeClass("modal-backdrop show");
  }

    prodDetails:any = {}
  async patientSelect(id:number, name:any) {
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID')
    }
    let cartItemLength = await this._cart.getCartList(payload).toPromise();
    // if (cartItemLength.status == 1) {
      let payload2 = {
        "schemaName": "nir1691144565",
        "user_id": localStorage.getItem('USER_ID'),
        "patient_id": id,
        "prod_type": this.itemInfo.type,
        "prod_id": this.itemInfo.productId,
        "price": this.itemInfo.amount,
        "location_id": localStorage.getItem('LOCATION_ID')
      }
      
      this._cart.addToCart(payload2).subscribe(async(res: any) => {
        if (res.status == 1) {
          this._auth.sendQtyNumber(Number(cartItemLength.data.testCount) + 1);
          $("#newModal").hide();
          $('body').removeClass('modal-open');
          $(".modal-backdrop").removeClass("modal-backdrop show");
          Swal.fire({
            position: "center",
            icon: "success",
            text: `Added successfully for ${name}`,
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          alert(res.data)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data,
          });
          // this.toast.presentAlert('Already added!',"Same test you cant't repeat",'Please add another test.')
        }
      })
    // }
  }
  addPatient(){
    // this._router.navigate(['/user/profile'])
    this.patientForm.reset()
  }
  savePatient() {
    this.submitted = true
    let userId = localStorage.getItem('USER_ID')
    let form = this.patientForm.value
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": Number(userId),
      "patientName": form.patientName,
      "age": Number($('#totalAge').val()),
      "blood_group": Number(form.blood_group),
      "gender": Number(form.gender),
      "dob": form.dob,
      "height": Number(form.height),
      "weight": Number(form.weight),
      "title": form.patientTitle,
    }

    if (this.patientForm.valid) {
      this.isPatientLoadData = true
      this._profile.storePatient(payload).subscribe((res: any) => {
        this.isPatientLoadData = false
        if (res.status == 1) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Added Successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          $("#newModal").hide();
          $('body').removeClass('modal-open');
          $(".modal-backdrop").removeClass("modal-backdrop show");
          this.ngOnInit()
        }
        else if (res.status == 503 || res.status == 403) {
          $(".modal-backdrop").removeClass("modal-backdrop show");
          localStorage.clear();
          this._router.navigate(['/auth/login'])
        }
        else if(res.status == 2 ){
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Added Successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          $("#newModal").hide();
          $('body').removeClass('modal-open');
          $(".modal-backdrop").removeClass("modal-backdrop show");
          this.ngOnInit()
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
  
  calculateAge(selectedDate: Date) {
    const today = new Date();
    const birthDate = new Date(selectedDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  onDateChange(event: any) {
    const selectedDate = new Date(event.target.value);
    const age = this.calculateAge(selectedDate);
    this.patientForm.controls['age'].setValue(age);
  }
}
