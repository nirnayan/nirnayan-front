import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
  },

  {
    path: 'page',
    loadChildren: () => import('./blog-post/blog-post.module').then(m => m.BlogPostModule)
  },

  {
    path: 'laboratory',
    loadChildren: () => import('./laboratory/laboratory.module').then(m => m.LaboratoryModule)
  },

  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule)
  },

  {
    path: 'patient',
    loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule)
  },

  {
    path: 'others',
    loadChildren: () => import('./others/others.module').then(m => m.OthersModule)
  },

  {
    path: 'science',
    loadChildren: () => import('./science/science.module').then(m => m.ScienceModule)
  },

  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'company',
    loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./my-account/my-account.module').then(m => m.MyAccountModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule],
})
export class AppRoutingModule { }
