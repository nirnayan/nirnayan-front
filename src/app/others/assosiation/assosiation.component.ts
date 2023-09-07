import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AOS from 'aos'; 
import { MasterService } from 'src/app/service/master.service';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-assosiation',
  templateUrl: './assosiation.component.html',
  styleUrls: ['./assosiation.component.css']
})
export class AssosiationComponent implements OnInit {
  pageItem:any = [];
  pageCat:any;
  offering:any;
  howDoweIt:any;
  allPartners:any;
  enquiryForm: FormGroup

  constructor(private _master: MasterService,
    private _fb: FormBuilder) { 
    this.enquiryForm = this._fb.group({
      contact_name: ['', Validators.required],
      contact_email: ['', Validators.required],
      contact_mobile: ['', Validators.required],
      address: ['', Validators.required],
      contact_enquiry: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    AOS.init();
    this.getPageItem();
  }

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


  getPageItem() {
    this._master.getPageContent().subscribe((res:any) => {
      if(res.message == 'Success') {
        let pageInfo = res.data;
        for(let item of pageInfo) {
          if(item.id == 14) {
            this.pageItem.push(item);
            this.pageCat = this.pageItem[0]?.category;
            this.getOffring(this.pageCat[0]['item_id']);
            this.getHowDOit(this.pageCat[1]['item_id']);
            this.partners(this.pageCat[2]['item_id']);
          }
        }
        $("#loader").hide();
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    })

  }

  getOffring(id:any) {
    const formData = new FormData();
    formData.append('category_id', id);
    this._master.getAllPost(formData).subscribe((res:any) => {
      if(res.message == 'Success') {
        this.offering = res.data;
      }
    })
  };

  getHowDOit(id:any) {
    const formData = new FormData();
    formData.append('category_id', id);
    this._master.getAllPost(formData).subscribe((res:any) => {
      if(res.message == 'Success') {
        this.howDoweIt = res.data;
      }
    })
  };

  partners(id:any) {
    const formData = new FormData();
    formData.append('category_id', id);
    this._master.getAllPost(formData).subscribe((res:any) => {
      if(res.message == 'Success') {
        this.allPartners = res.data;
      }
    })
  };

  submitForm() {
    const formData = new FormData();
    let form = this.enquiryForm.value;
    formData.append('contact_name', form['contact_name']);
    formData.append('contact_email', form['contact_email']);
    formData.append('contact_mobile', form['contact_mobile']);
    formData.append('address', form['address']);
    formData.append('contact_enquiry', form['contact_enquiry']);
    formData.append('enquiry_type', 'association');
    if(this.enquiryForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'All fields are mandatory!',
      })
      return;
    }
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
        this.enquiryForm.reset();
        $("#loader").hide();
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
}
