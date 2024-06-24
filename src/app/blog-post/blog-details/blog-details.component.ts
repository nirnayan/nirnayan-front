import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/service/master.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  details:any;
  form ={
    contact_name:'',
    contact_email:'',
    contact_mobile:'',
    address:'',
    contact_enquiry:''
  }


  constructor(
    private _route: ActivatedRoute,
    private _master: MasterService,
  ) 
    { 

    }

  ngOnInit(): void {
    this._route.params.subscribe((param:any) => {
      const formData = new FormData();
      formData.append('id', param.id);
      this._master.getBlogsById(formData).subscribe((res:any) => {
        $("#loader").hide();
        // console.log(res);
        if(res.message == 'Success') {
          this.details = res.data;
        }
      }, err => {
        console.log(err);
        $("#loader").hide();
      })
    })
  }


  submitForm(f: NgForm) {
    if (f.valid) {
      const formData = new FormData();
      formData.append('contact_name', this.form.contact_name);
      formData.append('contact_email', this.form.contact_email);
      formData.append('contact_mobile', this.form.contact_mobile);
      formData.append('address', this.form.address);
      formData.append('contact_enquiry', this.form.contact_enquiry);

      $("#loader").show();

      this._master.storeContactUs(formData).subscribe((res: any) => {
        $("#loader").hide();
        if (res.message == 'Success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Sent Successfully!',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      }, err => {
        console.log(err);
        $("#loader").hide();
      });
    }
  }
}
