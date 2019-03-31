import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public toastController: ToastController, private router: Router) { }

  ngOnInit() {
  }

  register() {
  	this.presentToast();
  	this.router.navigate(['login']);
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
