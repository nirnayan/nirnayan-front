import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser for SSR
import AOS from 'aos';
import { MasterService } from '../../service/master.service';
import { SeoService } from '../../service/seo.service';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FAQItem, FAQItems } from './faq-data';
import { event } from 'jquery';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],

})
export class FaqComponent implements OnInit {

  faqItems: FAQItem[] = FAQItems;
  filteredFaqItems: FAQItem[] = FAQItems;
  
  form = {
    contact_name: '',
    contact_email: '',
    contact_mobile: '',
    address: '',
    contact_enquiry: '',
    enquiry_type: 'association'
  };
  pageData: any;

  
  constructor(
    private _master: MasterService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object, // Inject PLATFORM_ID to check platform
    private uiloader : NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      AOS.init();
      this.uiloader.start('master')
    }
    this.getPageDataById();
    this.uiloader.stop('master');
  }


  onSearch(query: any): void {
    // Convert query to lower case for case-insensitive search
    let values = query.target.value
    const lowerCaseQuery = values.toLowerCase();

    // Filter faqItems based on title and description
    this.filteredFaqItems = this.faqItems.filter(item => 
      item.title.toLowerCase().includes(lowerCaseQuery) ||
      item.description.toLowerCase().includes(lowerCaseQuery)
    );
  }

  onSubmitQuery(form:any) {
    if(form.valid){
    const formData = new FormData();
    formData.append('contact_name', this.form['contact_name']);
    formData.append('contact_email', this.form['contact_email']);
    formData.append('contact_mobile', this.form['contact_mobile']);
    formData.append('address', this.form['address']);
    formData.append('contact_enquiry', this.form['contact_enquiry']);
    formData.append('enquiry_type', this.form['enquiry_type']);

    if (isPlatformBrowser(this.platformId)) { // Check if in browser
      // $("#loader").show();
      this.uiloader.start('master')
    }

    this._master.storeContactUs(formData).subscribe((res: any) => {
      if (isPlatformBrowser(this.platformId)) { // Check if in browser
        // $("#loader").hide();
        this.uiloader.stop('master')
      }
      if (res.message == 'Success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Sent Successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        form.resetForm()
        this.form = {
          contact_name: '',
          contact_email: '',
          contact_mobile: '',
          address: '',
          contact_enquiry: '',
          enquiry_type: 'association',
        };
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    }, err => {
      console.log(err);
      if (isPlatformBrowser(this.platformId)) { // Check if in browser
        // $("#loader").hide();
        this.uiloader.stop('master')
      }
    });
  }
  }

  getPageDataById() {
    const payload = {
      page_id: 20
    }
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.pageData = res.data.seoContent;
        this.changeTitleMetaTag();
      }
    });
  }

  changeTitleMetaTag() {
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
