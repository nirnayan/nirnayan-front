import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncyclopediaComponent } from './encyclopedia/encyclopedia.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { CarouselModule } from 'ngx-owl-carousel-o';


const routes: Routes = [
  {path: 'encyclopedia', component: EncyclopediaComponent}
]


@NgModule({
  declarations: [
    EncyclopediaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatTabsModule,
    MatExpansionModule,
    CarouselModule
  ]
})
export class ScienceModule { }
