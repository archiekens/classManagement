import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
 
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
    this.storage.get('user').then(response => {
      if (response) {
        this.authenticationState.next(true);
      }
    })
  }
 
  login(user) {
    this.apiService.loginInstructor(user).subscribe((response: any) => {
      if (response.status === 'success') {
        this.storage.set('user', response.data[0]['Instructor']);
        this.authenticationState.next(true);
      } else {
        // Display error message
      }
    }, (error) => {
      // Display flash or something
    });
  }
 
  logout() {
    this.storage.remove('user');
    this.authenticationState.next(false);
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
}