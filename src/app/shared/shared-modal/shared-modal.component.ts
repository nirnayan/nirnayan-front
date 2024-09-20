import { Component, ElementRef, EventEmitter, OnInit, Output, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CartService } from '../../service/cart.service';
import { MasterService } from '../../service/master.service';
import { ProfileService } from '../../service/profile.service';
import Swal from 'sweetalert2';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import $ from 'jquery';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.css']
})
export class SharedModalComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter<void>();
  basePath: any = environment.BaseLimsApiUrl;
  allPatients: any = [];
  itemInfo: any;
  patientForm: FormGroup;
  submitted: boolean = false;
  patients: any = [];
  bloodGroup: any = [];
  patientId: any;
  isPatientLoadData: boolean = false;
  isEdit: boolean = false;
  private isModalOpen = false;

  constructor(
    private _profile: ProfileService,
    private _cart: CartService,
    private _auth: AuthService,
    private master: MasterService,
    private _fb: FormBuilder,
    private _router: Router,
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
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
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.master.receivePriceInfo().subscribe((res: any) => {
        if (res) {
          this.itemInfo = res;
        }
      });
    
      const payload2 = {
        schemaName: 'nir1691144565',
        user_id: Number(localStorage.getItem('USER_ID'))
      };

      this._profile.getPatient(payload2).subscribe((res: any) => {
        if (res.status == 1) {
          this.allPatients = res.data;
        }
      });

      this._profile.getBloodGroup().subscribe((res: any) => {
        if (res.status == 1) {
          this.bloodGroup = res.data;
        }
      });

      this.initializeJQuery();
    }
  }

  initializeJQuery() {
    if (isPlatformBrowser(this.platformId)) {
      $(document).ready(() => {
        $('#newModal').on('hide.bs.modal', () => {
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
        });

        $('.search').click(() => {
          $('.topBar').toggleClass('srchMod');
        });

        $('.profilePic').on('click', (event: { stopPropagation: () => void; }) => {
          $('.profileName').toggleClass('openn');
          $('.loginSec').toggleClass('blkk');
          event.stopPropagation();
        });

        $('.profilePicc').on('click', (event: { stopPropagation: () => void; }) => {
          $('.profileNamee').toggleClass('openn');
          $('.loginSec').toggleClass('blkk');
          event.stopPropagation();
        });

        $(document).on('click', (event: { target: any; }) => {
          if (!$(event.target).closest('.profilePic').length && !$(event.target).closest('.profilePicc').length) {
            $('.loginSec').removeClass('blkk');
          }
        });
      });
    }
  }

  dismiss() {
    if (isPlatformBrowser(this.platformId)) {
      $('#newModal').hide();
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    }
  }

  async patientSelect(id: number, name: any) {
    if (this.isModalOpen) return; // Prevent further execution if the modal is in the process of closing

    this.isModalOpen = true;

    const payload = {
      schemaName: 'nir1691144565',
      user_id: localStorage.getItem('USER_ID')
    };

    const cartItemLength = await this._cart.getCartList(payload).toPromise();

    const payload2 = {
      schemaName: 'nir1691144565',
      user_id: localStorage.getItem('USER_ID'),
      patient_id: id,
      prod_type: this.itemInfo.type,
      prod_id: this.itemInfo.productId,
      price: this.itemInfo.amount,
      location_id: localStorage.getItem('LOCATION_ID')
    };

    this._cart.addToCart(payload2).subscribe(async (res: any) => {
      if (res.status == 1) {
        this._auth.sendQtyNumber(Number(cartItemLength.data.testCount) + 1);
        this.closeModalEvent.emit();
        this.dismiss() 
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: `Added successfully for ${name}`,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: res.data,
        });
      }
      this.isModalOpen = false; // Reset the flag once the operation is done
    });
  }

  addPatient(sectionId: string) {
    this._router.navigate(['/user/profile'], { fragment: sectionId });
    this.dismiss();
  }

  savePatient() {
    this.submitted = true;
    const userId = localStorage.getItem('USER_ID');
    const form = this.patientForm.value;
    const payload = {
      schemaName: 'nir1691144565',
      user_id: Number(userId),
      patientName: form.patientName,
      age: Number(this.patientForm.controls['age'].value),
      blood_group: Number(form.blood_group),
      gender: Number(form.gender),
      dob: form.dob,
      height: Number(form.height),
      weight: Number(form.weight),
      title: form.patientTitle,
    };

    if (this.patientForm.valid) {
      this.isPatientLoadData = true;
      this._profile.storePatient(payload).subscribe((res: any) => {
        this.isPatientLoadData = false;
        if (res.status == 1 || res.status == 2) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Added Successfully!',
            showConfirmButton: false,
            timer: 1500
          });
          this.dismiss();
          this.ngOnInit();
        } else if (res.status == 503 || res.status == 403) {
          localStorage.clear();
          this._router.navigate(['/auth/login']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      });
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
