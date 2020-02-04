import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RebarAuthService } from '../core/rebarauth/rebar.auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {
  userDisplayName = '';
  userEnterpriseId = '';
  isAuthenticated = false;
  claims: any = null;
  
  constructor(private auth: RebarAuthService) {
    if (this.auth.authenticationEnabled() && this.auth.IsUserAuthenticated()) {
      this.userEnterpriseId = this.auth.GetUser().displayableId.split("@")[0];
      this.userDisplayName = this.auth.GetUser().name;
      this.claims = JSON.stringify(this.auth.GetUser().idToken);
      this.isAuthenticated = this.auth.IsUserAuthenticated();
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
  logOut(event: any) {
    this.auth.Logout();
  }
}
