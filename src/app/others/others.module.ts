import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssosiationComponent } from './assosiation/assosiation.component';
import { FaqComponent } from './faq/faq.component';
import { CareerComponent } from './career/career.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExploresComponent } from './explores/explores.component';


const routes: Routes = [
  {path: 'association', component: AssosiationComponent},
  {path: 'career', component: CareerComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'explore', component: ExploresComponent}
]



@NgModule({
  declarations: [
    AssosiationComponent,
    FaqComponent,
    CareerComponent,
    ExploresComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CarouselModule,
    MatExpansionModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OthersModule { }
