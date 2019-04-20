import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.page.scss'],
})
export class AppComponent {

   showHeader: boolean = false;
   showMenu: boolean = false;
   showFooter: boolean = false;
   headerText: string = '';
   selectedCourse = null;
   activeTab = {
     attendances: 'active',
     students: '',
     activities: '',
     grading: ''
   };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    private dataService: DataService
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
          this.resetActiveTab();
          let sub = event.url.split('/');
          this.showHeader = true;
          this.showMenu = true;
          this.showFooter = false;
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
                this.activeTab.attendances = 'active';
                this.dataService.refreshPage.next(true);
                break;
              case "students":
                this.headerText = 'Students';
                this.activeTab.students = 'active';
                if (sub.length > 4) {
                  this.headerText += ' - Summary';
                }
                break;
              case "activities":
                this.headerText = 'Activities';
                this.activeTab.activities = 'active';
                if (sub.length > 4) {
                  this.headerText += ' - Results';
                }
                break;
              case "grading":
                this.activeTab.grading = 'active';
                this.headerText = 'Grading';
                break;
            }
            this.selectedCourse = this.dataService.selectedCourse;
            this.showFooter = true;
          }
        }
      });
    });
  }

  resetActiveTab() {
    this.activeTab = {
      attendances: 'active',
      students: '',
      activities: '',
      grading: ''
    };
  }

  logout() {
    this.authenticationService.logout();
  }
}
