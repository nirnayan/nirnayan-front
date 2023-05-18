import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
import { MasterService } from 'src/app/service/master.service';
declare var $: any;


@Component({
  selector: 'app-assosiation',
  templateUrl: './assosiation.component.html',
  styleUrls: ['./assosiation.component.css']
})
export class AssosiationComponent implements OnInit {
  pageItem:any = [];
  pageCat:any;
  offering:any;
  howDoweIt:any;

  constructor(private _master: MasterService) { }

  ngOnInit(): void {
    AOS.init();
    this.getPageItem();
  }
  SlideOptionn = { responsive:{
    0:{
        items:1
    },
    600:{
      items:1
    },
    750:{
        items:2
    },
    1250:{
      items:3
    },
    1650:{
      items:4
    },

  }, dots: true, nav: false}; 


  getPageItem() {
    this._master.getPageContent().subscribe((res:any) => {
      if(res.message == 'Success') {
        let pageInfo = res.data;
        for(let item of pageInfo) {
          if(item.id == 14) {
            this.pageItem.push(item);
            this.pageCat = this.pageItem[0]?.category;
            this.getOffring(this.pageCat[0]['item_id']);
            this.getHowDOit(this.pageCat[1]['item_id']);
          }
        }
        $("#loader").hide();
      }
    })

  }

  getOffring(id:any) {
    const formData = new FormData();
    formData.append('category_id', id);
    this._master.getAllPost(formData).subscribe((res:any) => {
      if(res.message == 'Success') {
        this.offering = res.data;
      }
    })
  }

  getHowDOit(id:any) {
    const formData = new FormData();
    formData.append('category_id', id);
    this._master.getAllPost(formData).subscribe((res:any) => {
      if(res.message == 'Success') {
        this.howDoweIt = res.data;
      }
    })
  }
}
