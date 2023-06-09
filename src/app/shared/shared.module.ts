import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SliderModule } from '../slider/slider.module';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  {path: 'search-filter', component: SearchComponent}
]

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    SliderModule,
    RouterModule.forChild(routes),
  ],
   exports: [HeaderComponent, FooterComponent]
})
export class SharedModule { }
