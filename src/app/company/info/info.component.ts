import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  refaund: boolean = false;
  privacy: boolean = false;
  disclamier: boolean = false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((res:any) => {
      if(res.content == 'refaund') {
        this.refaund = true;
        this.disclamier = false;
        this.privacy = false;
      }
      else if(res.content == 'privacy') {
        this.refaund = false;
        this.disclamier = false;
        this.privacy = true;
      }
      else if(res.content == 'disclamer') {
        this.refaund = false;
        this.privacy = false;
        this.disclamier = true;
      }

      console.log(res.content)
    })
  }

}
