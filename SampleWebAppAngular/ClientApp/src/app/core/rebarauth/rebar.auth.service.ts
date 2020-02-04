import { Injectable } from '@angular/core';

import { RebarAuthModule } from './rebar.auth.module';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { environment } from "../../../environments/environment";
import { User } from 'msal';

@Injectable({
  providedIn: RebarAuthModule,
})
export class RebarAuthService {

  configData: any = null;

  isIframe: boolean;
  subscription: any;
  loggedIn: boolean;
  user: User;

  constructor(private auth: MsalService,
    private broadcastService: BroadcastService,
     ) {

     
    this.isIframe = window !== window.parent && !window.opener;
  }

  ngOnInit(): void {
    this.subscription = this.broadcastService.subscribe("msal:loginSuccess",
      (payload) => {
        alert('login success');
        console.log("login success " + JSON.stringify(payload));
        this.loggedIn = true;
        this.user = this.auth.getUser();
      });
    this.subscription = this.broadcastService.subscribe("msal:acquireTokenSuccess",
      (payload) => {
        alert('acquireToken success');
        console.log("acquireToken success " + JSON.stringify(payload));
      }
    );
  }

  public IsUserAuthenticated(): boolean {
    return environment.providers !== 'mock' && !!this.auth.getUser();
  }

  public GetUser(): User {
    console.log("FROM AZURE START ->")
    console.log(this.auth.getUser())
    console.log("FROM AZURE END   <-")
    return this.auth.getUser();
  }

  public Logout(): void {
    this.auth.logout();
  }

  public authenticationEnabled(): boolean {
    return environment.providers !== 'mock';
  }

  ngOnDestroy() {
    // disconnect from broadcast service on component destroy
    this.broadcastService.getMSALSubject().next(1);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
