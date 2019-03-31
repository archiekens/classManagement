import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Add Course',
      message: 'Enter the name of the course, its code, and its schedule.',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Basic Algebra'
        },
        {
          name: 'code',
          type: 'text',
          placeholder: 'METH-101'
        },
        {
          name: 'schedule',
          type: 'text',
          placeholder: 'MH 11:00 - 13:00'
        },
	    ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
