import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import $ from 'jquery';  // Import jQuery
import AOS from 'aos';
import { MasterService } from '../../../service/master.service';
import { SeoService } from '../../../service/seo.service';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  SlideOption = {
    responsive: {
      0: { items: 1 },
      799: { items: 2 },
      1200: { items: 3 },
    },
    dots: true,
    nav: false
  };

  eventItem: any;
  eventList: any[] = [];
  pageData: any;
  formarEvent: any[] = [];
  basePath = environment.BaseLimsApiUrl;
  isModalOpen = false;

  form = {
    contact_name: '',
    contact_email: '',
    contact_mobile: '',
    address: '',
    contact_enquiry: '',
    enquiry_type: null
  };

  private isBrowser: boolean;

  constructor(
    private _master: MasterService,
    private _route: ActivatedRoute,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      AOS.init();

      this._route.params.subscribe((param: any) => {
        const formData = new FormData();
        formData.append('id', param.id);
        this._master.getEventsById(formData).subscribe((res: any) => {
          if (this.isBrowser) {
            $("#loader").hide();  // Hide loader using jQuery in the browser
          }
          if (res.status === 200) {
            this.eventItem = res.data;
          }
        });
      });

      this._master.getEvents().subscribe((res: any) => {
        if (this.isBrowser) {
          $("#loader").hide();  // Hide loader using jQuery in the browser
        }
        if (res.status === 200) {
          this.eventList = res.data['upcoming'];
        }
      });

      this.isFormer();
      this.getPageDataById();
    }
  }

  async isFormer() {
    this._master.getEvents().subscribe((res: any) => {
      if (res.status == 200) {
        this.formarEvent = res.data['former'].filter(element => element.status == 1);
      }
    }, err => {
      console.log(err)
    })
  }

  getPageDataById() {
    const payload = { page_id: 19 };
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if (res.status === 1) {
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

  submitForm(f:any) {
    const formData = new FormData();
    formData.append('contact_name', this.form['contact_name']);
    formData.append('contact_email', this.form['contact_email']);
    formData.append('contact_mobile', this.form['contact_mobile']);
    formData.append('address', this.form['address']);
    formData.append('contact_enquiry', this.form['contact_enquiry']);
    formData.append('enquiry_type', 'event');

    if (this.isBrowser) {
      $("#loader").show();  // Show loader using jQuery in the browser
    }

    this._master.storeContactUs(formData).subscribe((res: any) => {
      if (this.isBrowser) {
        $("#loader").hide();  // Hide loader using jQuery in the browser
      }
      if (res.message === 'Success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Sent Successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        f.resetForm()
        this.form = {
          contact_name: '',
          contact_email: '',
          contact_mobile: '',
          address: '',
          contact_enquiry: '',
          enquiry_type: 'association',
        };
        this.closeModal();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    }, err => {
      console.log(err);
      if (this.isBrowser) {
        $("#loader").hide();  // Hide loader using jQuery in the browser
      }
    });
  }

  getBackgroundImage(): string {
    return this.eventItem?.event_image ? `url(${this.eventItem.event_image})` : '';
  }

  closeModal() {
    this.isModalOpen = false;
    if (this.isBrowser) {
      // Ensure modal-backdrop is only manipulated in the browser
      $(document).ready(() => {
        $('.modal-backdrop').fadeOut(() => {
          $('.modal-backdrop').remove();
        });
      });
    }
  }
}
