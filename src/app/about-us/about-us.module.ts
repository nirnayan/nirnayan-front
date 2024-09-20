import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { OurTeamComponent } from './our-team/our-team.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatTabsModule } from '@angular/material/tabs';
import { OurJourneyComponent } from './our-journey/our-journey.component';
import { LandingModule } from '../landing/landing.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';



const routes: Routes = [
  {path: 'about/:name', component: AboutComponent},
  {path: 'our-team', component: OurTeamComponent},
  {path: 'our-journey', component: OurJourneyComponent}
]


@NgModule({
  declarations: [
    AboutComponent,
    OurTeamComponent,
    OurJourneyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatTabsModule,
    LandingModule,
    CarouselModule,
    NgxUiLoaderModule
  ]
})
export class AboutUsModule { }
