import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthIntercepto } from './service/auth.interceptor';
// import { AgmCoreModule } from '@agm/core';
import { MatchPasswordDirectiveDirective } from './directives/match-password.directive.directive';
import { initializeApp } from "firebase/app";
initializeApp(environment.firebase);



@NgModule({
  declarations: [
    AppComponent,
    MatchPasswordDirectiveDirective,
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
    SharedModule,
    NgxSpinnerModule,
    HttpClientModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
    // }) as ModuleWithProviders<any>,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })
    

  ],
  exports: [
    RouterModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthIntercepto, multi: true}, Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
