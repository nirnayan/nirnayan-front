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
import { AssociationComponent } from './association/association.component'


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
  {path: 'association', component: AssociationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
