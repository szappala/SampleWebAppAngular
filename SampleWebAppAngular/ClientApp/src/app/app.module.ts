import { NgModule, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, ExtraOptions } from '@angular/router';

import { RebarAuthModule } from './core/rebarauth/rebar.auth.module';
import { MsalService } from '@azure/msal-angular';
import { REBAR_AUTH_GUARD } from './core/rebarauth/rebar.auth.module';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

const routerOptions: ExtraOptions = {
  useHash: false,
  enableTracing: true,
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '', component: HomeComponent, pathMatch: 'full',
        canActivate: [REBAR_AUTH_GUARD]
      },
      {
        path: 'counter', component: CounterComponent,
        canActivate: [REBAR_AUTH_GUARD]
      },
      {
        path: 'fetch-data', component: FetchDataComponent,
        canActivate: [REBAR_AUTH_GUARD]
      }], routerOptions),
    RebarAuthModule.forRoot()
  ],
  providers: [MsalService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
