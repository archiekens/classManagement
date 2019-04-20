import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private user = {
    id: null,
    firstName: null,
    lastName: null,
    position: null,
    username: null,
    password: null,
    confirmPassword: null,
    gender: 2,
    birthday: null,
    contactNo: null,
  };

  private errors = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    public toastController: ToastController,
    private router: Router,
    private apiService: ApiService,
    private storage: Storage,
    private dataService: DataService,
  ) {
    this.storage.get('user').then(response => {
      this.user = response;
    });
  }

  ngOnInit() {
  }

  update() {
    this.apiService.updateInstructor(this.user).subscribe((response: any) => {
      if (response.status === 'success') {
        this.storage.set('user', this.user);
        this.presentToast();
        this.router.navigate(['dashboard']);
      } else {
        this.errors = response.errors;
      }
    }, (error) => {
      this.dataService.showFlash('Could not register. Please try again.', 'error');
    });
  }

  cancel() {
    this.router.navigate(['dashboard']);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Successfully updated.',
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }

}
