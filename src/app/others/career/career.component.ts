import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  jobList:any = [];
  p: number = 1;
  requirementForm: FormGroup;
  submitted: boolean = false;

  constructor(private _master: MasterService,
    private _fb: FormBuilder) 
  {
    this.requirementForm = this._fb.group({
      name: ['',Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
      exp_year: ['', Validators.required],
      current_role: ['', Validators.required],
      current_employer: ['', Validators.required],
      current_salary: ['', Validators.required],
      exp_salary: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  ngOnInit(): void {

      AOS.init();
      $(document).ready(function() {
        $('.careerBottomLft ul li .knowMore').on('click', function() {
          $(this).parent().parent().toggleClass("active");
          $(this).parent().parent().siblings().removeClass("active");
        });
      })

      this.getJobs();
  }

  get f(): { } {
    return this.requirementForm.controls;
  };

    SlideOptionn = { responsive:{
      0:{
          items:1
      },
      600:{
        items:2
      },
      750:{
          items:4
      },
  
    }, dots: true, nav: false};

    toggleOpen(event:any){
      // event.target.classList.add("active");
      const knowMore_btn = event.target as HTMLDivElement;
      const knowMore = knowMore_btn.parentElement;
      const parentBox = knowMore.parentNode;
      let descript_box;
      const children = parentBox.childNodes;
      for(let index = 0; index < children.length; index++){
        children[index].childNodes.forEach((child:any) => {
          console.log(child.classList != undefined && child.classList.contains("job_description"));
          if(child.classList != undefined && child.classList.contains("job_description")){
            descript_box = child.parentNode;
          }
        });
      }
      $(".jbDes").removeClass("active");
      if(descript_box != undefined){
        if(descript_box.classList.contains("active")) descript_box.classList.remove("active");
        else descript_box.classList.add("active");
      }
    }
    findAncestor (el, cls) {
      while ((el = el.parentElement) && !el.classList.contains(cls));
      return el;
    }

    getJobs() {
      this._master.getJobsPost().subscribe((res:any) => {
        $("#loader").hide();
        if(res.message == 'Success') {
          let jobs = [];
          for(let item of res.data) {
            if(item.status == 1) {
              jobs.push(item);
            }
          }
          this.jobList = jobs;
        }
      }, err => {
        console.log(err);
        $("#loader").hide();
      })
    };


    submitForm() {
      $("#loader").show();
      const formData = new FormData();
      let form = this.requirementForm.value;
      formData.append('name', form['name']);
      formData.append('email', form['email']);
      formData.append('mobile', form['mobile']);
      formData.append('city', form['city']);
      formData.append('exp_year', form['exp_year']);
      formData.append('current_role', form['current_role']);
      formData.append('current_employer', form['current_employer']);
      formData.append('current_salary', form['current_salary']);
      formData.append('exp_salary', form['exp_salary']);
      formData.append('message', form['message']);
      this.submitted = true;
      if(this.requirementForm.invalid) {
        Swal.fire('All fields are mandatory !');
        $("#loader").hide();
        return;
      }
      this._master.storeEnquiry(formData).subscribe((res:any) => {
        $("#loader").hide();
        if(res.message == 'Success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Enquiry Sent Successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          this.requirementForm.reset();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
          $("#loader").hide();
        }
      })
    }
}
