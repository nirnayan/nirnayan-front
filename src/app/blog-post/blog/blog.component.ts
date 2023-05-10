import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { NgxSpinnerService } from 'ngx-spinner';
import { BlogService } from 'src/app/service/blog.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogPost:any = [];
  p: number = 1;

  constructor(private _blog: BlogService,
    private _spiner: NgxSpinnerService) { }

  ngOnInit(): void {
    AOS.init();
    this._spiner.show();
    this._blog.getallBlog().subscribe((res:any) => {
      this._spiner.hide();
      if(res.message == 'Success') {
        let blogItem = res.data;

        for(let item of blogItem) {
          if(item.status == 1) {
            this.blogPost.push(item);
          }
        }

      }
    })
  }

}
