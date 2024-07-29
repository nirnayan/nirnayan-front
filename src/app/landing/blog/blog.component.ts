import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
import { MasterService } from 'src/app/service/master.service';
import { OwlOptions } from "ngx-owl-carousel-o";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  slideNum:any;
  blogs: any = [];
  products: any[]= [1,2,3,4,5,6,7,8,9,10];
  activeModule: any;
  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 400,
    nav: false,
    navText: ["", ""],
    center: false,
    startPosition: 0,
    items: 4,
    responsive: {
      0: {
        items: 2, // 2 items for mobile devices
      },
      768: {
        items: 3, // 3 items for tablets
      },
      900: {
        items: 4, // 5 items for larger screens
      },
    },
  };

  basePath = environment.LimsEndpointBase


  constructor(private _master: MasterService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    // AOS.init();
    
    // $(document).ready(function () {
    //   function detect_active() {
    //     // get active
    //     var get_active = $("#dp-slider .dp_item:first-child").data("class");
    //     $("#dp-dots li").removeClass("active");
    //     $("#dp-dots li[data-class=" + get_active + "]").addClass("active");
    //     $(".dp_item").removeClass("active");
    //     $(".dp_item[data-class=" + get_active + "]").addClass("active");
    //   }
    //   $("#dp-next, .dp_item").click(function () {
    //     var total = $(".dp_item").length;
    //     $("#dp-slider .dp_item:first-child").hide().appendTo("#dp-slider").fadeIn();
    //     $.each($(".dp_item"), function (index, dp_item) {
    //       $(dp_item).attr("data-position", index + 1);
    //     });
    //     detect_active();
    //   });
    
    //   $("#dp-prev").click(function () {
    //     var total = $(".dp_item").length;
    //     $("#dp-slider .dp_item:last-child").hide().prependTo("#dp-slider").fadeIn();
    //     $.each($(".dp_item"), function (index, dp_item) {
    //       $(dp_item).attr("data-position", index + 1);
    //     });
    
    //     detect_active();
    //   });
    
    
    //   $("#dp-dots li").click(function () {
    //     $("#dp-dots li").removeClass("active");
    //     $(this).addClass("active");
    //     var get_slide = $(this).attr("data-class");
    //     $("#dp-slider .dp_item[data-class=" + get_slide + "]")
    //       .hide()
    //       .prependTo("#dp-slider")
    //       .fadeIn();
    //     $.each($(".dp_item"), function (index, dp_item) {
    //       $(dp_item).attr("data-position", index + 1);
    //     });
    //   });
    
    //   $("body").on("click", "#dp-slider .dp_item:not(:first-child)", function () {
    //     var get_slide = $(this).attr("data-class");
    //     $("#dp-slider .dp_item[data-class=" + get_slide + "]")
    //       .hide()
    //       .prependTo("#dp-slider")
    //       .fadeIn();
    //     $.each($(".dp_item"), function (index, dp_item) {
    //       $(dp_item).attr("data-position", index + 1);
    //     });
    
    //     detect_active();
    //   });
      
    // });

    this.getAllBlogs();
  }



  getAllBlogs() {
    if(this._master.blogPostItem) {
      this.blogs = this._master.blogPostItem
    } else {
      this._master.getBlogs().subscribe((res:any) => {
        if(res.status == 1) {
          this.blogs = res.data
        }
      })
    }
  }

  formattedName:any = ''
  blogDetails(id:string,name:any) {
    this.formattedName = name.replace(/[\s.,-]+/g, '-').trim();
    localStorage.setItem('BLOG_ID', id);
    this._router.navigate(['page/blog-details/'+this.formattedName])
  }
}
