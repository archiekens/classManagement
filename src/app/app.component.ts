import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.page.scss'],
})
export class AppComponent {

   showHeader: boolean = false;
   showMenu: boolean = false;
   headerText: string = '';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['login']);
        }
      });

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          let sub = event.url.split('/');
          this.showHeader = true;
          this.showMenu = true;
          switch (event.url) {
            case "/login":
              this.headerText = '';
              this.showHeader = false;
              break;
            case "/register":
              this.headerText = 'Register';
              this.showMenu = false;
              break;
            case "/dashboard":
              this.headerText = 'Dashboard';
              break;
            case "/courses":
              this.headerText = 'My Courses';
              break;
            case "/students":
              this.headerText = 'My Students';
              break;
            case "/profile":
              this.headerText = 'My Profile';
              break;
          }

          if (sub.length > 2) {
            switch (sub[3]) {
              case "attendances":
                this.headerText = 'Attendance';
                break;
              case "students":
                this.headerText = 'Students';
                break;
              case "activities":
                this.headerText = 'Activities';
                break;
              case "grading":
                this.headerText = 'Grading';
                break;
            }
          }
        }
      });
    });
  }

  logout() {
    this.authenticationService.logout();
  }
}
