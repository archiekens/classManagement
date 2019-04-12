import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private user = {
    firstName: null,
    lastName: null,
    username: null,
    password: null,
    confirmPassword: null,
    gender: 2,
    birthday: null,
    contactNo: null,
  };

  constructor(
    public toastController: ToastController,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  register() {
    this.apiService.registerInstructor(this.user).subscribe((response) => {
      if (response.status !== 'failed') {
        this.presentToast();
        this.router.navigate(['login']);
      } else {
        // Display error message
      }
    }, (error) => {
      // Display flash or something
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Successfully registered.',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }


}
