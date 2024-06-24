import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import AOS from 'aos';
import { MasterService } from 'src/app/service/master.service';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {
  jobList: any = [];
  p: number = 1;
  requirementForm: FormGroup;
  submitted: boolean = false;
  jobApplyForm:FormGroup
  SlideOptionn = {
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      750: {
        items: 4
      },

    }, dots: true, nav: false
  };


  form = {
    name: '',
    email: '',
    mobile: '',
    city: '',
    exp_year: '',
    current_role: '',
    current_employer: '',
    current_salary: '',
    exp_salary: '',
    message: ''
  };


  constructor(private _master: MasterService , private fb: FormBuilder) {
    this.jobApplyForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      city: ['', Validators.required],
      exp_year: ['', Validators.required],
      current_role: ['', Validators.required],
      current_employer: ['', Validators.required],
      current_salary: ['', Validators.required],
      exp_salary: ['', Validators.required],
      message: ['', Validators.required],
      resume: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    AOS.init();
    $(document).ready(function () {
      $('.careerBottomLft ul li .knowMore').on('click', function () {
        $(this).parent().parent().toggleClass("active");
        $(this).parent().parent().siblings().removeClass("active");
      });
    })

    this.getJobs();
  }

  get f(): {} {
    return this.requirementForm.controls;
  };


  toggleOpen(event: any) {
    // event.target.classList.add("active");
    const knowMore_btn = event.target as HTMLDivElement;
    const knowMore = knowMore_btn.parentElement;
    const parentBox = knowMore.parentNode;
    let descript_box;
    const children = parentBox.childNodes;
    for (let index = 0; index < children.length; index++) {
      children[index].childNodes.forEach((child: any) => {
        if (child.classList != undefined && child.classList.contains("job_description")) {
          descript_box = child.parentNode;
        }
      });
    }
    $(".jbDes").removeClass("active");
    if (descript_box != undefined) {
      if (descript_box.classList.contains("active")) descript_box.classList.remove("active");
      else descript_box.classList.add("active");
    }
  }
  findAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }

  getJobs() {
    this._master.getJobsPost().subscribe((res: any) => {
      if (res.message == 'Success') {
        this.jobList = res.data.filter((item: any) => item.status == 1);
        console.log(this.jobList)
      }
    }, err => {
      console.log(err);
    })
  };

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.jobApplyForm.patchValue({
        resume: file
      });
    }
  }
  
  submitForm() {
    if (this.jobApplyForm.valid) {
      const formData = new FormData();
      const formValues = this.jobApplyForm.value;
      let name = formValues.firstName + formValues.lastName
      formData.append('name', name);
      formData.append('email', formValues.email);
      formData.append('mobile', formValues.mobile);
      formData.append('city', formValues.city);
      formData.append('exp_year', formValues.exp_year);
      formData.append('current_role', formValues.current_role);
      formData.append('current_employer', formValues.current_employer);
      formData.append('current_salary', formValues.current_salary);
      formData.append('exp_salary', formValues.exp_salary);
      formData.append('message', formValues.message);
      // formData.append('resume', formValues.resume);
      this._master.storeEnquiry(formData).subscribe((res: any) => {
        if (res.message == 'Success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Enquiry Sent Successfully!',
            showConfirmButton: false,
            timer: 1500
          });
          this.jobApplyForm.reset();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      });
    } else {
      this.jobApplyForm.markAllAsTouched();
    }
  }
}
