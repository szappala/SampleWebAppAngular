import { Component, OnInit } from '@angular/core';
import { RebarAuthService } from './core/rebarauth/rebar.auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';

  isVisible: boolean;
  constructor(private auth: RebarAuthService) { }

  ngOnInit() {
    // show app content only if user is authenticated or app is running in 
    // mock eso configuration using npm run start:local command
    //if (!this.auth.authenticationEnabled())
    //    this.isVisible = true;
    //if (this.auth.authenticationEnabled() && this.auth.IsUserAuthenticated())
    this.isVisible = true;
  }
}
