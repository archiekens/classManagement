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

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  login() {
    let result = this.authService.login(this.user);
  }

}
