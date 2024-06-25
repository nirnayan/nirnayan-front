import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import AOS from 'aos';
import { MasterService } from 'src/app/service/master.service';
import Swal from 'sweetalert2';
declare var $: any;



@Component({
  selector: 'app-find-center',
  templateUrl: './find-center.component.html',
  styleUrls: ['./find-center.component.css']
})
export class FindCenterComponent implements OnInit {
  centers: any = [];
  centerTiming: any = [];
  bookingEnqryForm: FormGroup;
  uploadfile: any;
  loader: boolean = false;
  isPopupVisible: boolean = false;
  isFieldActive: boolean = false;
  mapUrl:any
  centerName:any;
  FirstmapUrl:any = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236.92912422571106!2d88.43633662588678!3d22.618438688727995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89fb9576093d9%3A0x2e3f00e638f7bf9c!2sNirnayan%20Pathology!5e0!3m2!1sen!2sin!4v1718968611652!5m2!1sen!2sin")
  SecondmapUrl:any = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d273.7337665386661!2d88.43680775215864!3d22.619914625936822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89e2c5d1e7bf9%3A0x5a2a57f4779732e9!2sNirnayan%20Health%20Care%20Private%20Limited!5e0!3m2!1sen!2sin!4v1718877694834!5m2!1sen!2sin")
 
  formModel = {
    name: '',
    mobile: '',
    book_date: '',
    address: '',
    gender: '',
    document: null
  };

  currentLocationName: string;
  currentShareUrl: string;

  constructor(
    private _master: MasterService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.mapUrl = this.FirstmapUrl
     AOS.init();
    this.getAllCenter();
  }

  getAllCenter() {
    this._master.getCenter().subscribe((res: any) => {
      if (res.message == 'Success') {
        this.centers = res.data;
        let time = [];
        for (let item of this.centers) {
          time = Object.entries(item['timing']);
        }
        this.centerTiming = time;
      }
    })
  };

  togglePopup(center:any): void {
    this.isPopupVisible = !this.isPopupVisible;
    this.centerName = center
    if(center == 'Nirnayan Healthcare Pvt. Ltd. Unit 1'){
      this.currentShareUrl = 'https://maps.app.goo.gl/PD485378RLwMUMjAA'
    }else if(center == 'Nirnayan Healthcare Pvt. Ltd. Unit 2'){
    this.currentShareUrl = 'https://maps.app.goo.gl/kiLDQZMdjzxJ8VZ87'
  }

}

  copyLink(inputElement: HTMLInputElement) {
    inputElement.select();
    document.execCommand('copy');
    this.isFieldActive = true;
    setTimeout(() => {
      this.isFieldActive = false;
    }, 2000);
  }

   saveEnquary(form: NgForm) {
    if (form.valid) {
      const formData = new FormData();
      formData.append('name', this.formModel.name);
      formData.append('mobile', this.formModel.mobile);
      formData.append('gender', this.formModel.gender);
      formData.append('book_date', this.formModel.book_date);
      formData.append('address', this.formModel.address);
      formData.append('document', this.formModel.document);

      this.loader = true;
      this._master.storeBookingEnqury(formData).subscribe(
        (res: any) => {
          if (res.message === 'Success') {
            this.loader = false;
            form.resetForm();
            Swal.fire({
              position: 'center',
              icon: 'success',
              text: 'Enquiry Sent Successfully!',
              showConfirmButton: false,
              timer: 1500
            });
          }
        },
        err => {
          console.error('Error submitting enquiry:', err);
          this.loader = false;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: 'Please try again later.'
          });
        }
      );
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formModel.document = file;
    }
  }
  
  destinationChage(centerName: any) {
    console.log(centerName)
    if(centerName == 'Nirnayan Healthcare Pvt. Ltd. Unit 1'){
      this.mapUrl =  this.FirstmapUrl
    }else if(centerName == 'Nirnayan Healthcare Pvt. Ltd. Unit 2'){
      this.mapUrl =this.SecondmapUrl
    }
  }
  shareUsingWebShare() {
    const shareData = {
      title: 'Share Location Of Nirnayan Healthcare Pvt. Ltd.',
      text: `Check out this location: ${this.currentLocationName}`,
      url: this.currentShareUrl
    };
  
    if (navigator.share) {
      navigator.share(shareData).then(() => {
        console.log('Location shared successfully');
      }).catch((error) => {
        console.error('Error sharing location:', error);
      });
    } else {
      this.copyLinkFallback();
      alert('Web Share API is not supported in your browser. Link copied to clipboard.');
    }
  }
  
  copyLinkFallback() {
    const tempInput = document.createElement('input');
    tempInput.value = this.currentShareUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    this.isFieldActive = true;
    setTimeout(() => {
      this.isFieldActive = false;
    }, 2000);
  }
  
}
