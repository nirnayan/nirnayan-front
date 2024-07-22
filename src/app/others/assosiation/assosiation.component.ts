import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AOS from 'aos'; 
import { IndexedDbService } from 'src/app/service/indexed-db-service.service';
import { MasterService } from 'src/app/service/master.service';
import { environment } from 'src/environments/environment';
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



  constructor(private _master: MasterService) { }

  ngOnInit(): void {
    AOS.init();
    this.getPageItem();
    this.getAllAward();
    // this.loadItems();

    // console.log('this.items',this.items)
  }



  // async loadItems() {
  //   try {
  //     // this.items = await this.IndexedDbService.getAllItems();
  //   } catch (error) {
  //     console.error('Error loading items', error);
  //   }
  // }

  // addItem() {
  //   return
  //   // try {
  //   //   this.IndexedDbService.addItem('helooooooooo this is testing items');
  //   //   Swal.fire('Item added successfully');
  //   // } catch (error) {
  //   //   console.error('Error loading items', error);
      
  //   // }
  // }
  getPageItem() {
    $("#loader").hide();
    this._master.getPageContent().subscribe((res:any) => {
      if(res.message == 'Success') {
        let pageInfo = res.data;
        for(let item of pageInfo) {
          if(item.id == 14) {
            this.pageItem.push(item);
            this.pageCat = this.pageItem[0]?.category;
            this.getOffring(item.category[0].item_id);
            this.getHowDOit(this.pageCat[1]['item_id']);
            this.partners(item.category[1].item_id);
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
    formData.append('contact_name', this.form['contact_name']);
    formData.append('contact_email', this.form['contact_email']);
    formData.append('contact_mobile', this.form['contact_mobile']);
    formData.append('address', this.form['address']);
    formData.append('contact_enquiry', this.form['contact_enquiry']);
    formData.append('enquiry_type', 'association');

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
  activeBox(data:any){
   this.activeLogo = data
  }
  getAllAward() {
    this._master.getAllAward().subscribe((res:any)=>{
      if(res.status == 1){
        this.award=res.data
      }
    })
  }
}
