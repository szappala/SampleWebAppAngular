import { NgModule, ModuleWithProviders, InjectionToken } from "@angular/core";
import {
  MsalModule,
  MsalConfig,
  MsalInterceptor,
  MsalGuard
} from "@azure/msal-angular";
import {
  MSAL_CONFIG,
  MsalService
} from "@azure/msal-angular/dist/msal.service";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LogLevel } from "msal";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { environment } from "../../../environments/environment";

export const REBAR_AUTH_GUARD = new InjectionToken<string>("REBAR_AUTH_GUARD");


@NgModule({
  imports: [MsalModule]
})
export class RebarAuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RebarAuthModule,
      providers: PROVIDERS[environment["providers"]]
    };
  }
}

export function AuthConfigFactory() {
  
  let cfg = Object.assign({},
    {
      authority: "https://login.microsoftonline.com/0bfab41e-b84e-4305-a96f-3194740d0008",
      clientID: "b7b39b48-bfe2-46a7-b34e-314a080322ce",
      redirectUri: "https://localhost:44315/",
      postLogoutRedirectUri: "https://localhost:44315/angular/dist/signoutcallback"
    },
    {
      level: LogLevel.Verbose,
      storeAuthStateInCookie: false,
      validateAuthority: true,
      cacheLocation: "localStorage",
      //navigateToLoginRequestUrl: false,
      navigateToLoginRequestUrl: true,
      popUp: false,
      logger: loggerCallback,
      piiLoggingEnabled: false,
    });

  return cfg as MsalConfig;
}

export function emptyGuard(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) {
  return true;
}

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log("client logging" + message);
}

/*
  When running locally `npm run start:local` or `npm run test` or `npm run e2e`
  use mock values, to turn off security.  This is set at build time.
*/

export const PROVIDERS = {
  mock: [
    {
      provide: MSAL_CONFIG,
      useValue: { 'client': 'mock', "authority": 'https://login.microsoftonline.com/mocktenant' }

    },
    {
      provide: REBAR_AUTH_GUARD,
      useValue: emptyGuard
    }
  ],
  app: [
    {
      provide: MSAL_CONFIG,
      useFactory: AuthConfigFactory,
      deps: []
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalService,
    { provide: REBAR_AUTH_GUARD, useClass: MsalGuard }
  ]
};
