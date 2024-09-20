import { Component, ElementRef, OnInit, ViewChild, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { ProfileService } from '../../service/profile.service';
import { AuthService } from '../../service/auth.service';
import { CartService } from '../../service/cart.service';
import { isPlatformBrowser } from '@angular/common';
import $ from 'jquery'
@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css']
})
export class PrescriptionsComponent implements OnInit {

  allFiles: any[] = [];
  cardImageBase64: string;
  patients: any[] = [];
  allPrescriptions: any[] = [];
  BaseUrl = environment.LimsEndpointBase;
  @ViewChild('closeModel') closeModel!: ElementRef;
  prescriptionInfo: any;
  prescriptionId: any = null;
  cartlist: any[] = [];

  constructor(
    private _profile: ProfileService,
    private _router: Router,
    private _auth: AuthService,
    private _cart: CartService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      $('#loader').hide()
      this.initializeData();
    }
  }

  private initializeData(): void {
    this.loadPatients();
    this.loadPrescriptions();
    this.loadCart();
  }

  private loadPatients(): void {
    const payload = {
      schemaName: 'nir1691144565',
      user_id: Number(this.getUserId())
    };
    this._profile.getPatient(payload).subscribe((res: any) => {
      if (res.status === 1) {
        this.patients = res.data;
      } else if (res.status === 503 || res.status === 403) {
        this.handleUnauthorized();
      }
    });
  }

  private loadPrescriptions(): void {
    const payload = {
      schemaName: 'nir1691144565',
      userId: Number(this.getUserId())
    };
    this._profile.getPrescription(payload).subscribe((res: any) => {
      if (res.status === 1) {
        this.allPrescriptions = res.data;
      }
    }, err => {
      console.error(err);
    });
  }

  private loadCart(): void {
    const payload = {
      schemaName: 'nir1691144565',
      user_id: Number(this.getUserId()),
      location_id: Number(this.getLocationId())
    };
    this._cart.getCartList(payload).subscribe((res: any) => {
      if (res.status === 1) {
        this.cartlist = res.data;
      } else if (res.status === 503 || res.status === 403) {
        this.handleUnauthorized();
      }
    }, err => {
      console.error(err);
    });
  }

  private handleUnauthorized(): void {
    localStorage.clear();
    this._router.navigate(['/auth/login']);
  }

  private getUserId(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('USER_ID') : null;
  }

  private getLocationId(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('LOCATION_ID') : null;
  }

  fileSelect(event: any): void {
    for (let i = 0; i < event.target.files.length; i++) {
      this.allFiles.push(event.target.files[i]);
    }
  }

  removeFile(index: number): void {
    this.allFiles.splice(index, 1);
    if (isPlatformBrowser(this.platformId)) {
      const fileInput = document.getElementById('upldfile') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = null;
      }
    }
  }

  prescriptionSubmit(patientid: any, remarks: any): void {
    if (!patientid.value || this.allFiles.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are mandatory!"
      });
      return;
    }

    const formData = new FormData();
    if (isPlatformBrowser(this.platformId)) {
      const loader = document.getElementById('loader');
      if (loader) loader.style.display = 'block';
    }

    for (const file of this.allFiles) {
      formData.append("prescription", file);
    }
    formData.append('schemaName', 'nir1691144565');
    formData.append('cust_remarks', remarks);
    formData.append('patientId', patientid.value);

    this._profile.addPrescription(formData).subscribe((res: any) => {
      if (isPlatformBrowser(this.platformId)) {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
      }
      if (res.status === 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Prescription Submitted!",
          showConfirmButton: false,
          timer: 1500
        });
        this.initializeData();
        this.allFiles = [];
        if (isPlatformBrowser(this.platformId)) {
          const fileInput = document.getElementById('upldfile') as HTMLInputElement;
          if (fileInput) fileInput.value = null;
        }
      }
    }, err => {
      console.error(err);
      if (isPlatformBrowser(this.platformId)) {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
      }
    });
  }

  viewTest(id: any): void {
    this.prescriptionId = id;
    const payload = {
      schemaName: "nir1691144565",
      prescriptionId: id
    };
    this._profile.getPrescriptionByid(payload).subscribe((res: any) => {
      if (res.status === 1) {
        this.prescriptionInfo = res.data[0];
      }
    });
  }

  removePrescription(id: any): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete"
    }).then((result) => {
      if (result.isConfirmed) {
        const payload = {
          schemaName: "nir1691144565",
          prescriptionId: id
        };
        this._profile.deletePrescription(payload).subscribe((res: any) => {
          if (res.status === 1) {
            this.initializeData();
          }
        });
      }
    });
  }

  moveToCart(): void {
    const valueCount = this.prescriptionInfo.otherDetails.testIds.length;
    const payload = {
      schemaName: "nir1691144565",
      prescriptionId: this.prescriptionId
    };
    if (isPlatformBrowser(this.platformId)) {
      const loader = document.getElementById('loader');
      if (loader) loader.style.display = 'block';
    }
    this._profile.prescriptionMoveToCart(payload).subscribe((res: any) => {
      if (isPlatformBrowser(this.platformId)) {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
      }
      if (res.status === 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Added into your cart!",
          showConfirmButton: false,
          timer: 1500
        });
        this._auth.sendQtyNumber(this.cartlist.length + valueCount);
        this.closeModal();
      }
    }, err => {
      console.error(err);
      if (isPlatformBrowser(this.platformId)) {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
      }
    });
  }

  closeModal(): void {
    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        window.location.reload();
      }
    }, 1000);
  }
}
