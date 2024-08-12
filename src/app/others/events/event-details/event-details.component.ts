import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import AOS from 'aos';
import { MasterService } from 'src/app/service/master.service';
import { SeoService } from 'src/app/service/seo.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  SlideOption = { responsive:{
    0:{
        items:1
    },
    799:{
      items:2
    },
    1200:{
        items:3
    },

  }, dots: true, nav: false};
  
  eventItem:any 
  eventList:any = []
  pageData: any;
  formarEvent:any = []
  basePath = environment.BaseLimsApiUrl
  isModalOpen: boolean = true;

  
  form = {
    contact_name: '',
    contact_email: '',
    contact_mobile: '',
    address: '',
    contact_enquiry: '',
    enquiry_type: null
  };


  constructor(private _master: MasterService,
    private _route: ActivatedRoute , private seoService:SeoService) { }

  ngOnInit(): void {
    AOS.init();
    this._route.params.subscribe((param:any) => {
      const formData = new FormData();
      formData.append('id', param.id);
      this._master.getEventsById(formData).subscribe((res:any) => {
        $("#loader").hide();
        if(res.status == 200) {
          this.eventItem = res.data
        }
      })
    })

    this._master.getEvents().subscribe((res:any) => {
      $("#loader").hide();
      if(res.status == 200) {
        this.eventList = res.data['upcoming']
      }
    })
    this.isFormer();
    this.getPageDataById();
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
    const payload = {
      page_id: 19
    }
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if(res.status == 1){
        this.pageData = res.data.seoContent;
        this.changeTitleMetaTag()
      }
    })
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
  

  submitForm() {
    const formData = new FormData();
    formData.append('contact_name', this.form['contact_name']);
    formData.append('contact_email', this.form['contact_email']);
    formData.append('contact_mobile', this.form['contact_mobile']);
    formData.append('address', this.form['address']);
    formData.append('contact_enquiry', this.form['contact_enquiry']);
    formData.append('enquiry_type', 'event');

    $("#loader").show();
    this._master.storeContactUs(formData).subscribe((res:any) => {
      $("#loader").hide();
      if(res.message == 'Success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Sent Successfully!',
          showConfirmButton: false,
          timer: 1500
        })
        this.form = {
          contact_name: '',
          contact_email: '',
          contact_mobile: '',
          address: '',
          contact_enquiry: '',
          enquiry_type: 'association',
        };
        $("#loader").hide();
        this.closeModal();
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
        $("#loader").hide();
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    })
  }

  closeModal() {
    this.isModalOpen = false;
    $(document).ready(() => {
      $('.modal-backdrop').fadeOut(() => {
        // Optional: Remove the backdrop element from the DOM after fade out
        $('.modal-backdrop').remove();
      });
    });
  }
}
