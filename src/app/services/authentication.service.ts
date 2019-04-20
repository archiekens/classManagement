import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { DataService } from './data.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  authenticationState = new BehaviorSubject(false);
  errorMessage = new BehaviorSubject('');
 
  constructor(
    private storage: Storage,
    private plt: Platform,
    private apiService: ApiService,
    private dataService: DataService
  ) { 
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
        this.errorMessage.next('');
        let data = response.data[0]['Instructor'];
        let user = {
          id: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          position: data.position,
          username: data.username,
          password: null,
          confirmPassword: null,
          gender: data.gender,
          birthday: data.birthday,
          contactNo: data.contact_no
        };
        this.storage.set('user', user);
        this.authenticationState.next(true);
      } else {
        this.errorMessage.next('Username or password incorrect');
      }
    }, (error) => {
      this.dataService.showFlash('Could not login. Please try again.', 'error');
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