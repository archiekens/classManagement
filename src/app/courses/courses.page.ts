import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

  courses: any = [];
  userId = null;

  constructor(
    public alertController: AlertController,
    private storage: Storage,
    private apiService: ApiService,
    private dataService: DataService
  ) {
    this.storage.get('user').then(response => {
      this.userId = response.id;
      this.getCourses();
    });
  }

  ngOnInit() {
  }

  selectCourse(course) {
    this.dataService.selectedCourse = course.Course;
  }

  getCourses() {
    this.apiService.getCourses(this.userId).subscribe((response: any) => {
      if (response.status === 'success') {
        this.courses = response.data;
      }
    });
  }

  async addCourse() {
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
        }, {
          text: 'Ok',
          handler: (data) => {
            let course = {
              instructorId: this.userId,
              name: data.name,
              code: data.code,
              schedule: data.schedule
            };
            this.apiService.addCourse(course).subscribe(response => {
              this.getCourses();
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
