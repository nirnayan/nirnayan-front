import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { OurJourneyComponent } from './our-journey/our-journey.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { AccreditationnComponent } from './accreditationn/accreditationn.component';
import { MedicalEncyclopediaComponent } from './medical-encyclopedia/medical-encyclopedia.component';
import { AwardsAccoladesComponent } from './awards-accolades/awards-accolades.component';
import { QualityAssuranceComponent } from './quality-assurance/quality-assurance.component';
import { TestReferenceComponent } from './test-reference/test-reference.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { FindCenterComponent } from './find-center/find-center.component';
import { DepartmentComponent } from './department/department.component';
import { AssociationComponent } from './association/association.component';
import { BloggComponent } from './blogg/blogg.component';
import { FaqComponent } from './faq/faq.component';
import { CareerComponent } from './career/career.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'ourjourney', component: OurJourneyComponent},
  {path: 'ourteam', component: OurTeamComponent},
  {path: 'accre', component: AccreditationnComponent},
  {path: 'encyclopedia', component: MedicalEncyclopediaComponent},
  {path: 'awards', component: AwardsAccoladesComponent},
  {path: 'qualityassurance', component: QualityAssuranceComponent},
  {path: 'testreference', component: TestReferenceComponent},
  {path: 'blog-details', component: BlogPageComponent},
  {path: 'find-center', component: FindCenterComponent},
  {path: 'department', component: DepartmentComponent},
  {path: 'association', component: AssociationComponent},
  {path: 'blog', component: BloggComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'career', component: CareerComponent},
  {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
