import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
 
const TOKEN_KEY = 'auth-token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  authenticationState = new BehaviorSubject(false);
 
  constructor(private storage: Storage, private plt: Platform, private apiService: ApiService) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }
 
  login(user) {
    this.apiService.loginInstructor(user).subscribe((response) => {
      if (response.status !== 'failed') {
        this.authenticationState.next(true);
      } else {
        // Display error message
      }
    }, (error) => {
      // Display flash or something
    });
  }
 
  logout() {
    this.authenticationState.next(false);
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
}