import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AOS from 'aos'; 
import { IndexedDbService } from '../../service/indexed-db-service.service';
import { MasterService } from '../../service/master.service';
import { SeoService } from '../../service/seo.service';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';
declare var $: any;


@Component({
  selector: 'app-assosiation',
  templateUrl: './assosiation.component.html',
  styleUrls: ['./assosiation.component.css'],

})
export class AssosiationComponent implements OnInit {
  pageItem:any = [];
  pageCat:any;
  offering:any;
  howDoweIt:any;
  allPartners:any;
  enquiryForm: FormGroup
  activeLogo:any
  basePath = environment.BaseLimsApiUrl
  SlideOptionn = { responsive:{
    0:{
        items:1
    },
    600:{
      items:1
    },
    750:{
        items:2
    },
    1250:{
      items:3
    },
    1650:{
      items:4
    },

  }, dots: true, nav: true}; 

  form = {
    contact_name: '',
    contact_email: '',
    contact_mobile: '',
    address: '',
    contact_enquiry: '',
    enquiry_type: null
  };
  carosole = { responsive:{
    0:{
        items:1
    },
    600:{
      items:1
    },
    750:{
        items:1
    },
    1250:{
      items:2
    },
    1650:{
      items:3
    },

  }, dots: true, nav: true};
  award: any;
  pageData: any;
  contactForm: FormGroup;



  constructor(
    private _master: MasterService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object, // Inject PLATFORM_ID
    private fb: FormBuilder
  ) { 
    this.contactForm = this.fb.group({
      contact_name: ['', [Validators.required]],
      contact_email: ['', [Validators.required, Validators.email]],
      contact_mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      address: ['', [Validators.required]],
      contact_enquiry: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init(); // Initialize AOS only in the browser
    }
    this.getPageItem();
    this.getAllAward();
    this.getPageDataById();
  }

  getPageItem() {
    if (isPlatformBrowser(this.platformId)) {
      $("#loader").show(); // Show loader only in the browser
    }
    this._master.getPageContent().subscribe((res: any) => {
      if (res.message === 'Success') {
        let pageInfo = res.data;
        for (let item of pageInfo) {
          if (item.id == 14) {
            this.pageItem.push(item);
            this.pageCat = this.pageItem[0]?.category;
            this.getOffring(item.category[0].item_id);
            this.getHowDOit(this.pageCat[1]['item_id']);
            this.partners(item.category[1].item_id);
          }
        }
        if (isPlatformBrowser(this.platformId)) {
          $("#loader").hide(); // Hide loader only in the browser
        }
      }
    }, err => {
      console.log(err);
      if (isPlatformBrowser(this.platformId)) {
        $("#loader").hide(); // Hide loader only in the browser
      }
    });
  }

  getOffring(id: any) {
    const formData = new FormData();
    formData.append('category_id', id);
    this._master.getAllPost(formData).subscribe((res: any) => {
      if (res.message === 'Success') {
        this.offering = res.data;
      }
    });
  }

  getHowDOit(id: any) {
    const formData = new FormData();
    formData.append('category_id', id);
    this._master.getAllPost(formData).subscribe((res: any) => {
      if (res.message === 'Success') {
        this.howDoweIt = res.data;
      }
    });
  }

  partners(id: any) {
    const formData = new FormData();
    formData.append('category_id', id);
    this._master.getAllPost(formData).subscribe((res: any) => {
      if (res.message === 'Success') {
        this.allPartners = res.data;
      }
    });
  }

  submitForm(): void {
    const formData = new FormData();
    formData.append('contact_name', this.contactForm.get('contact_name')?.value);
    formData.append('contact_email', this.contactForm.get('contact_email')?.value);
    formData.append('contact_mobile', this.contactForm.get('contact_mobile')?.value);
    formData.append('address', this.contactForm.get('address')?.value);
    formData.append('contact_enquiry', this.contactForm.get('contact_enquiry')?.value);
    formData.append('enquiry_type', 'association');

    if (isPlatformBrowser(this.platformId)) {
      $("#loader").show(); // Show loader only in the browser
    }

    this._master.storeContactUs(formData).subscribe((res: any) => {
      if (isPlatformBrowser(this.platformId)) {
        $("#loader").hide(); // Hide loader only in the browser
      }
      if (res.message === 'Success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Sent Successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        this.contactForm.reset(); // Reset form after successful submission
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    }, err => {
      console.log(err);
      if (isPlatformBrowser(this.platformId)) {
        $("#loader").hide(); // Hide loader only in the browser
      }
    });
  }

  activeBox(data: any) {
    this.activeLogo = data;
  }

  getAllAward() {
    this._master.getAllAward().subscribe((res: any) => {
      if (res.status === 1) {
        this.award = res.data;
      }
    });
  }

  getPageDataById() {
    const payload = {
      page_id: 16
    };
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if (res.status === 1) {
        this.pageData = res.data.seoContent;
        this.changeTitleMetaTag();
      }
    });
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
