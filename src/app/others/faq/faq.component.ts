import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AOS from 'aos';
import { MasterService } from 'src/app/service/master.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  enquiryForm: FormGroup;





  constructor(private _master: MasterService,
    private _fb: FormBuilder) 
    { 
      this.enquiryForm = this._fb.group({
        contact_name: ['', Validators.required],
        contact_email: ['', Validators.required],
        contact_mobile: ['', Validators.required],
        contact_enquiry: ['', Validators.required]
      })
    }

  ngOnInit(): void {
    AOS.init();
  }


  submitForm() {
    const formData = new FormData();
    let form = this.enquiryForm.value;
    formData.append('contact_name', form['contact_name']);
    formData.append('contact_email', form['contact_email']);
    formData.append('contact_mobile', form['contact_mobile']);
    formData.append('contact_enquiry', form['contact_enquiry']);
    if(this.enquiryForm.invalid) {
      Swal.fire('All fields are mandatory !');
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
