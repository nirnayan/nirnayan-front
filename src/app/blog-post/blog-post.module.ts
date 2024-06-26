import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { BlogViewSliderComponent } from './blog-view-slider/blog-view-slider.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../shared/shared.module';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BloggrSliderComponent } from './bloggr-slider/bloggr-slider.component';
import { BlogSliderComponent } from './blog-slider/blog-slider.component';
import { NgxPaginationModule } from 'ngx-pagination';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: 'blog', component: BlogComponent},
  {path: 'blog-details/:id', component: BlogDetailsComponent}
]


@NgModule({
  declarations: [
    BlogComponent,
    BlogViewSliderComponent,
    BlogDetailsComponent,
    BloggrSliderComponent,
    BlogSliderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    CarouselModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule,
    // Ng2SearchPipeModule,
    ReactiveFormsModule
  ]
})
export class BlogPostModule { }
