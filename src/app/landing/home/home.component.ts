import { Component, OnInit } from '@angular/core';
import {SeoService} from '../../service/seo.service'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService
  ) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      const title = 'Nirnayan ';
      const description = 'Nirnayan is a platform for the people who are looking';

      this.seoService.updateTitle(title);
      this.seoService.updateMetaTags([
        { name: 'description', content: description },
        { name: 'keywords', content: 'Nirnayan, Nirnayan, Nir'},
      ]);
    });

  }


  }

