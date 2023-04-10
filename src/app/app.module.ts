import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './banner/banner.component';
import { AboutMenuSlideComponent } from './about-menu-slide/about-menu-slide.component';
import {MatTabsModule} from '@angular/material/tabs';
import { GreenBarComponent } from './green-bar/green-bar.component';
import { SlideComponent } from './slide/slide.component';
import { JourneyComponent } from './journey/journey.component';
import { AccreditationComponent } from './accreditation/accreditation.component';
import { ExploreComponent } from './explore/explore.component';
import { DownloadComponent } from './download/download.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { OurJourneyComponent } from './our-journey/our-journey.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { BlogComponent } from './blog/blog.component';
import { FlexsliderComponent } from './flexslider/flexslider.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MedicalEncyclopediaComponent } from './medical-encyclopedia/medical-encyclopedia.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderslideComponent } from './headerslide/headerslide.component';
import { AwardsAccoladesComponent } from './awards-accolades/awards-accolades.component';
import { AaSliderComponent } from './aa-slider/aa-slider.component';
import { AccreditationSliderComponent } from './accreditation-slider/accreditation-slider.component';
import { AccreditationnComponent } from './accreditationn/accreditationn.component';
import { QualityAssuranceComponent } from './quality-assurance/quality-assurance.component';
import { TestReferenceComponent } from './test-reference/test-reference.component';
import { PatientMenuSlideComponent } from './patient-menu-slide/patient-menu-slide.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogSliderComponent } from './blog-slider/blog-slider.component';
import { BlogSliderrComponent } from './blog-sliderr/blog-sliderr.component';
import { FindCenterComponent } from './find-center/find-center.component';
import { DepartmentComponent } from './department/department.component';
import { DepartSliderComponent } from './depart-slider/depart-slider.component';
import { DocSliderComponent } from './doc-slider/doc-slider.component';
import { AssociationComponent } from './association/association.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BloggComponent } from './blogg/blogg.component';
import { BlogViewSliderComponent } from './blog-view-slider/blog-view-slider.component';
import { CareerComponent } from './career/career.component';
import { CartComponent } from './cart/cart.component';
import { FaqComponent } from './faq/faq.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BannerComponent,
    AboutMenuSlideComponent,
    GreenBarComponent,
    SlideComponent,
    JourneyComponent,
    AccreditationComponent,
    ExploreComponent,
    DownloadComponent,
    FooterComponent,
    AboutComponent,
    OurJourneyComponent,
    OurTeamComponent,
    BlogComponent,
    FlexsliderComponent,
    MedicalEncyclopediaComponent,
    HeaderslideComponent,
    AwardsAccoladesComponent,
    AaSliderComponent,
    AccreditationSliderComponent,
    AccreditationnComponent,
    QualityAssuranceComponent,
    TestReferenceComponent,
    PatientMenuSlideComponent,
    BlogPageComponent,
    BlogSliderComponent,
    BlogSliderrComponent,
    FindCenterComponent,
    DepartmentComponent,
    DepartSliderComponent,
    DocSliderComponent,
    AssociationComponent,
    BloggComponent,
    BlogViewSliderComponent,
    CareerComponent,
    CartComponent,
    FaqComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    

  ],
  exports: [
  ],
  providers: [ Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
