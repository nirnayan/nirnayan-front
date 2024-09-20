import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT, isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser for SSR
import AOS from 'aos';
import { MasterService } from '../../service/master.service';
import { SeoService } from '../../service/seo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css'],

})
export class CareerComponent implements OnInit {
  jobList: any = [];
  p: number = 1;
  requirementForm: FormGroup;
  submitted: boolean = false;
  jobApplyForm: FormGroup;
  SlideOptionn = {
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      750: { items: 4 },
    },
    dots: true,
    nav: false
  };
  pageData: any;

  constructor(
    private _master: MasterService,
    private fb: FormBuilder,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object ,// Inject PLATFORM_ID
    @Inject(DOCUMENT) private document: Document 
  ) {
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
    if (isPlatformBrowser(this.platformId)) {
    this.getJobs();
    this.getPageDataById();
    this.documentSsr();
    }
  }

  documentSsr(){
    if (isPlatformBrowser(this.platformId)) {
      AOS.init(); // Initialize AOS only in the browser
      $(document).ready(() => {
        $('.careerBottomLft ul li .knowMore').on('click', function () {
          $(this).parent().parent().toggleClass("active");
          $(this).parent().parent().siblings().removeClass("active");
        });
      });
    }
  }

  get f(): {} {
    return this.requirementForm.controls;
  }

  toggleOpen(event: any) {
    if (isPlatformBrowser(this.platformId)) {
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
        if (descript_box.classList.contains("active")) {
          descript_box.classList.remove("active");
        } else {
          descript_box.classList.add("active");
        }
      }
    }
  }

  findAncestor(el: any, cls: string) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }

  getJobs() {
    this._master.getJobsPost().subscribe((res: any) => {
      if (res.message === 'Success') {
        this.jobList = res.data.filter((item: any) => item.status == 1);
        console.log(this.jobList);
      }
    }, err => {
      console.log(err);
    });
  }

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
      const name = formValues.firstName + formValues.lastName;
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
      formData.append('document', formValues.resume);
      this._master.storeEnquiry(formData).subscribe((res: any) => {
        if (res.message === 'Success') {
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

  getPageDataById() {
    const payload = {
      page_id: 17
    };
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if (res.status === 1) {
        this.pageData = res.data.seoContent;
        this.changeTitleMetaTag();
      }
    });
  }

  changeTitleMetaTag() {
    console.log(this.pageData);
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
}
