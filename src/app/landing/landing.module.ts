import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { SlideComponent } from './slide/slide.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { GreenBarComponent } from './green-bar/green-bar.component';
import { JourneyComponent } from './journey/journey.component';
import { BlogComponent } from './blog/blog.component';
import { FlexsliderComponent } from './flexslider/flexslider.component';
import { AccreditationComponent } from './accreditation/accreditation.component';
import { ExploreComponent } from './explore/explore.component';
import { DownloadComponent } from './download/download.component';


const routes: Routes = [
  {path: '', component: HomeComponent}
]



@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    SlideComponent,
    GreenBarComponent,
    JourneyComponent,
    BlogComponent,
    FlexsliderComponent,
    AccreditationComponent,
    ExploreComponent,
    DownloadComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LandingModule { }
