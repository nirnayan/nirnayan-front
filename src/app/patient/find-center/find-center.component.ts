import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import AOS from 'aos';
import { MasterService } from '../../service/master.service';
import { SeoService } from '../../service/seo.service';
import Swal from 'sweetalert2';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastService } from '../../service/toast.service';
declare var $: any;



@Component({
  selector: 'app-find-center',
  templateUrl: './find-center.component.html',
  styleUrls: ['./find-center.component.css'],

})
export class FindCenterComponent implements OnInit {
  centers: any = [
    {
      "id": "1",
      "centre_name": "Nirnayan Health Care Pvt. Ltd. Unit 1",
      "address": "145, Jyangra Rajarhat Road, Kolkata-700059",
      "phone_numbers": [
        {
          "contact": "(033) 25700075"
        }
      ],
    },

    {
      "id": "2",
      "centre_name": "Nirnayan Health Care Pvt. Ltd. Unit 2",
      "address": "Dafodil Labella building, 1st floor,\r\nnear Chinar Park Lokenath Mandir, Kolkata-700157",
      "phone_numbers": [
        {
          "contact": "(033) 25700070"
        }
      ],
    },
    {
      "id": "3",
      "centre_name": "Nirnayan Health Care Pvt. Ltd. Siliguri Branch",
      "address": "Capital One, Upper Ground Floor, Burdwan Road, P.O. Siliguri Bazar, P.S. Siliguri, Pin Code - 734005, West Bengal",
      "phone_numbers": [
        {
          "contact": "(033) 25700070"
        }
      ],
    }
  ];
  centerTiming: any = [];
  bookingEnqryForm: FormGroup;
  uploadfile: any;
  loader: boolean = false;
  isPopupVisible: boolean = false;
  isFieldActive: boolean = false;
  centerName: any;
  FirstmapUrl: SafeResourceUrl;
  SecondmapUrl: SafeResourceUrl;
  mapUrl: SafeResourceUrl;
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
  pageData: any;

  constructor(
    private _master: MasterService,
    private sanitizer: DomSanitizer,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private uiLoader: NgxUiLoaderService,
    private toastService: ToastService
  ) {
    
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.uiLoader.start();
      AOS.init();
      this.getPageDataById();
      this.uiLoader.stop();
    }
    if (isPlatformBrowser(this.platformId)) {
      this.FirstmapUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236.92912422571106!2d88.43633662588678!3d22.618438688727995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89fb9576093d9%3A0x2e3f00e638f7bf9c!2sNirnayan%20Pathology!5e0!3m2!1sen!2sin!4v1718968611652!5m2!1sen!2sin");
      this.SecondmapUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d273.7337665386661!2d88.43680775215864!3d22.619914625936822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89e2c5d1e7bf9%3A0x5a2a57f4779732e9!2sNirnayan%20Health%20Care%20Private%20Limited!5e0!3m2!1sen!2sin!4v1718877694834!5m2!1sen!2sin");
    this.mapUrl = this.FirstmapUrl;
  }
  }

  // getAllCenter() {
  //   this.uiLoader.start()
  //   this._master.getCenter().subscribe((res: any) => {
  //     if (res.message == 'Success') {
  //       this.uiLoader.stop()
  //       this.centers = res.data;
  //       let time = [];
  //       for (let item of this.centers) {
  //         time = Object.entries(item['timing']);
  //       }
  //       this.centerTiming = time;
  //     }
  //   })
  // };

  togglePopup(center: any): void {
    this.isPopupVisible = !this.isPopupVisible;
    this.centerName = center
    if (center == 'Nirnayan Health Care Pvt. Ltd. Unit 1') {
      this.currentShareUrl = 'https://maps.app.goo.gl/PD485378RLwMUMjAA'
    } else if (center == 'Nirnayan Health Care Pvt. Ltd. Unit 2') {
      this.currentShareUrl = 'https://maps.app.goo.gl/kiLDQZMdjzxJ8VZ87'
    }else if(center == 'Nirnayan Health Care Pvt. Ltd. Siliguri Branch') {
      this.currentShareUrl = 'Share url map'
    }

  }

  copyLink(inputElement: HTMLInputElement) {
    if (isPlatformBrowser(this.platformId)) {
      inputElement.select();
      document.execCommand('copy');
      this.isFieldActive = true;
      setTimeout(() => {
        this.isFieldActive = false;
      }, 2000);
    }
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
    if (centerName == 'Nirnayan Health Care Pvt. Ltd. Unit 1') {
      this.mapUrl = this.FirstmapUrl
    } else if (centerName == 'Nirnayan Health Care Pvt. Ltd. Unit 2') {
      this.mapUrl = this.SecondmapUrl
    } else if (centerName == 'Nirnayan Health Care Pvt. Ltd. Siliguri Branch') {
      this.toastService.showToast('Map Coming Soon', 'warning');
    }
  }
  shareUsingWebShare() {
    const shareData = {
      title: 'Share Location Of Nirnayan Health Care Pvt. Ltd.',
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
    if (isPlatformBrowser(this.document)) {
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
  getPageDataById() {
    const payload = {
      page_id: 10
    }
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.pageData = res.data.seoContent;
        this.changeTitleMetaTag()
      }
    })
  }


  changeTitleMetaTag() {
    console.log(this.pageData);
    if (this.pageData) {

      this.seoService.updateTitle(this.pageData.title);

      const metaTags = this.pageData.name.map(nameObj => ({
        name: nameObj.title,
        content: nameObj.description
      }));
      this.seoService.updateMetaTags(metaTags);

      const propertyTags = this.pageData.propertyType.map(propertyObj => ({
        property: propertyObj.title,
        content: propertyObj.description
      }));
      this.seoService.updatePropertyTags(propertyTags);
    }
  }
}
