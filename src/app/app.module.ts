import { NgModule, APP_INITIALIZER, PLATFORM_ID } from '@angular/core';
import { BrowserModule, Meta, Title, provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { BlogState } from './store/Blog_State';
import { ProductState } from './store/Product_State';
import { TestState } from './store/Test_State';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './service/auth.interceptor';
import { LocationStrategy, PathLocationStrategy, isPlatformBrowser } from '@angular/common';
import { RazorpayService } from './service/razorpayservice.service';
import { IndexedDbService } from './service/indexed-db-service.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AuthService } from './service/auth.service';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
} from "ngx-ui-loader";
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { GraphQLModule } from './graph.module';
// import { GoogleMapsModule } from '@angular/google-maps';


const ngxUiLoaderConfig: NgxUiLoaderConfig =  {
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.chasingDots, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
}

export function initializeApp(authService: AuthService, platformId: Object) {
  return () => {
    if (isPlatformBrowser(platformId)) {
      authService.getToken();
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    ApolloModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    // GoogleMapsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    CarouselModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxsModule.forRoot([ProductState, TestState, BlogState]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    GraphQLModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LocationStrategy, useClass: PathLocationStrategy },

    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService, PLATFORM_ID],
      multi: true
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://192.168.1.14:4001/b2c/user/infoDetails', // Replace with your GraphQL endpoint
          }),
        };
      },
      deps: [HttpLink],
    },
    // blog component
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://192.168.1.14:4001/b2c/getB2CPageData',
          }),
        };
      },
      deps: [HttpLink],
    },
    { provide: 'AIzaSyAeQzuOcT3aIg5Ql2__hJ2bDli20jCA-Bo',
      useValue: environment.googleMapsApiKey
    },
    RazorpayService,
    IndexedDbService,
    Title,
    Meta,
    provideHttpClient(withFetch()), 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
