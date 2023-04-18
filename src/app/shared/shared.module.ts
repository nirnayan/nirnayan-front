import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SliderModule } from '../slider/slider.module';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = []

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SliderModule,
    RouterModule.forChild(routes),
  ],
   exports: [HeaderComponent, FooterComponent]
})
export class SharedModule { }
