import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  private user = {
    username: null,
    password: null
  };

  errorMessage = '';

  constructor(private authService: AuthenticationService) {
    this.authService.errorMessage.subscribe(message => {
      this.errorMessage = message;
    });
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.user);
  }

}
