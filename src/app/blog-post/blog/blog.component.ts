import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { NgxSpinnerService } from 'ngx-spinner';
import { BlogService } from 'src/app/service/blog.service';
import { MasterService } from 'src/app/service/master.service';
declare var $: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogPost:any = [];
  p: number = 1;
  postItem:any = [];
  searchText:any;

  constructor(private _blog: BlogService,
    private _spiner: NgxSpinnerService,
    private _master: MasterService) { }

  ngOnInit(): void {
    AOS.init();
    this._master.getPageContent().subscribe((res:any) => {
      if(res.message == 'Success') {
        let blog = res.data;
        for(let item of blog) {
          if(item.id == 1) {
            this.blogPost.push(item);
          }
        }
      }

      $("#loader").hide();
    })
    this.getPost(1);
  }

  getPost(id:any) {
    const formData = new FormData();
    formData.append('category_id', id);
    this._master.getAllPost(formData).subscribe((res:any) => {
      if(res.message == 'Success') {
        this.postItem = res.data;
      }
    })
  }

}
