import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  centers:any = [];
  centerTiming: any = [];
  bookingEnqryForm: FormGroup;
  genterItem:any;
  uploadfile:any;
  loader: boolean = false;


  constructor(private _master: MasterService,
    private _fb: FormBuilder) 
    {
      this.bookingEnqryForm = this._fb.group({
        name: ['', Validators.required],
        gender: [''],
        mobile: ['', Validators.required],
        book_date: ['', Validators.required],
        address: ['', Validators.required],
        document: []
      })
    }

  ngOnInit(): void {

    AOS.init();
    this.getAllCenter();
  }


  getAllCenter() {
    this._master.getCenter().subscribe((res:any) => {
      if(res.message == 'Success') {
        this.centers = res.data;
        let time = [];
        for(let item of this.centers) {
          time = Object.entries(item['timing']);
        }
        this.centerTiming = time;
      }
    })
  };

  genderValue(event:any) {
    this.genterItem = event.target.value;
  };

  inputFile(event:any) {
    this.uploadfile = event.target.files[0];
  }
  saveEnquary() {
    this.loader = true;
    let form = this.bookingEnqryForm.value;
    const formData = new FormData();

    formData.append('name', form['name']);
    formData.append('mobile', form['mobile']);
    formData.append('gender', this.genterItem);
    formData.append('book_date', form['book_date']);
    formData.append('address', form['address']);
    formData.append('document', this.uploadfile);
    if(this.bookingEnqryForm.invalid) {
      this.loader = false;
      Swal.fire('All fields are mandatory !')
      return;
    }
    this._master.storeBookingEnqury(formData).subscribe((res:any) => {
      if(res.message == 'Success') {
        this.loader = false;
        this.bookingEnqryForm.reset();
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Enquiry Sent Successfully !',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    })
  }
}
