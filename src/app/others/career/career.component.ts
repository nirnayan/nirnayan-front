import { Component, OnInit } from '@angular/core';
import {FormGroup } from '@angular/forms';
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


  constructor(private _master: MasterService) { }

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
        let jobs = [];
        for (let item of res.data) {
          if (item.status == 1) {
            jobs.push(item);
          }
        }
        this.jobList = jobs;
      }
    }, err => {
      console.log(err);
    })
  };


  submitForm() {
    const formData = new FormData();
    formData.append('name', this.form['name']);
    formData.append('email', this.form['email']);
    formData.append('mobile', this.form['mobile']);
    formData.append('city', this.form['city']);
    formData.append('exp_year', this.form['exp_year']);
    formData.append('current_role', this.form['current_role']);
    formData.append('current_employer', this.form['current_employer']);
    formData.append('current_salary', this.form['current_salary']);
    formData.append('exp_salary', this.form['exp_salary']);
    formData.append('message', this.form['message']);

    this._master.storeEnquiry(formData).subscribe((res: any) => {
      if (res.message == 'Success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Enquiry Sent Successfully!',
          showConfirmButton: false,
          timer: 1500
        })
        this.  form = {
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
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    })
  }
}
