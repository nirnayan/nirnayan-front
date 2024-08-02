import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/service/master.service';
import { SeoService } from 'src/app/service/seo.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  details: any;
  form = {
    contact_name: '',
    contact_email: '',
    contact_mobile: '',
    address: '',
    contact_enquiry: ''
  };

  isLogin: boolean = false
  pageData: any;
  myContent: any;
  relatedTest:any =[]
  activeGroupName: any = ''
  basePath = environment.BaseLimsApiUrl
  constructor(
    private _route: ActivatedRoute,
    private _master: MasterService,
    private seoService: SeoService,
    private http: HttpClient
  ) {

  }

  ngOnInit(): void {

    $("#loader").show();
    // this._route.params.subscribe((param: any) => {

    const payload = {
      blogId: localStorage.getItem('BLOG_ID'),
      limit: 1,
      state: 36
    }
    this._master.getBlogsById(payload).subscribe((res: any) => {
      $("#loader").hide();
      if (res.status == 1) {
        this.details = res.data.blogData;
        this.pageData = res.data.metaContent;
        this.relatedTest = res.data.relatedTests
        this.changeTitleMetaTag()
        this.fetchContent(this.basePath+res.data.blogData.blogContent)
        if (window.innerWidth > 992) {
          this.initTicker();
        }
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    });
    // });
  }

  initTicker(): void {
    const container = $('.sideBarBox');
    const tickerItems = container.find('.ListBox');
    const tickerHeight = tickerItems.outerHeight();

    container.css('marginTop', -tickerHeight);

    function moveTop() {
      container.animate({
        marginTop: 0
      }, {
        duration: 600,
        easing: 'swing',
        complete: function () {
          container.find('.ListBox').first().appendTo(container);
          container.css('marginTop', -tickerHeight);
        }
      });
    }

    setInterval(moveTop, 3000);
  }

  fetchContent(url: string) {
    this.http.get(url, { responseType: 'text' }).subscribe((data: string) => {
      this.myContent = data;
    }, err => {
      console.log(err);
    });
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

  // getPageDataById() {
  //   const payload = {
  //     page_id: 15
  //   }
  //   this._master.getDataPageById(payload).subscribe((res: any) => {
  //     if (res.status == 1) {
  //       this.pageData = res.data.seoContent;
  //       this.changeTitleMetaTag()
  //     }
  //   })
  // }

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

  formattedName: string
  detailsPage(testId:string,testName:string , groupName:string) {
    this.activeGroupName = groupName.replace(/[\s.,()-]+/g, '-').trim()
    this.formattedName = testName.replace(/[\s.,-]+/g, '-').trim();
    localStorage.setItem('TEST_ID', testId);
  }
}
