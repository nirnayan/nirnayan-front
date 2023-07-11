import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AOS from 'aos';
import { MasterService } from 'src/app/service/master.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogPost: any = [];
  p: number = 1;
  postItem: any = [];
  searchText: any;
  subscribeFrom: FormGroup;
  submitted: boolean = false;
  categoryName: any;

  constructor(
    private _master: MasterService,
    private _fb: FormBuilder) {
    this.subscribeFrom = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      mobile: ['', Validators.required]
    })
  }

  get f() { return this.subscribeFrom.controls; }


  ngOnInit(): void {
    AOS.init();
    this._master.getPageContent().subscribe((res: any) => {
      if (res.message == 'Success') {
        let blog = res.data;
        for (let item of blog) {
          if (item.id == 1) {
            this.blogPost.push(item);
            let categoryId = item.category[0].item_id;
            this.categoryName = item.category[0].item_text;
            $("#loader").hide();
            this.getPost(categoryId, this.categoryName);
          }
        }
      }

    })
    // Tab Click Script
    const blogTabs = document.getElementById("majorTabs") as HTMLDivElement;
    window.onload = () => {
      $(".blgTbHd").click(function(){
        $(".blgTbHd").removeClass("active show");
        $(this).addClass("active show");
        let tabId = $(this).attr("href");
        $(".blogTab").removeClass("active show");
        $(`.blogTab${tabId}`).addClass("active show");
      });
    };
  };

  getPost(id: any, cateName: any) {
    this.categoryName = cateName;
    const formData = new FormData();
    formData.append('category_id', id);
    this._master.getAllBlogs(formData).subscribe((res: any) => {
      if (res.message == 'Success') {
        let activeBlog = [];
        for (let item of res.data) {
          if (item.status == 1) {
            activeBlog.push(item);
          }
        }
        this.postItem = activeBlog;
      }
    });

    // $(".owl-item li").click(function(){
    //   $(this).parent().siblings().children("li").removeClass('active');
    //   });
  };

  saveSubcription() {
    this.submitted = true;
    let form = this.subscribeFrom.value;
    const formData = new FormData();
    if (this.subscribeFrom.invalid) {
      Swal.fire('All fields are mandatory !');
      return;
    }
    formData.append('name', form['name']);
    formData.append('email', form['email']);
    formData.append('mobile', form['mobile']);
    $("#loader").show();
    this._master.storeSubscription(formData).subscribe((res: any) => {
      if (res.message == 'Success') {
        $("#loader").hide();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Subscribed Successfully !',
          showConfirmButton: false,
          timer: 1500
        })

        this.subscribeFrom.reset();
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    })
  };
  SlideOptionn = { responsive:{
    0:{
        items:1
    },
    400:{
      items:2
    },
    900:{
      items:3
    },
    1200:{
        items:4
    },

  }, dots: false, nav: true};
}
