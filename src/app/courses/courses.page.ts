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
      } else {
        this.courses = [];
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
        {
          name: 'year',
          type: 'number',
          placeholder: 'Year Level'
        },
        {
          name: 'section',
          type: 'text',
          placeholder: 'Section'
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

            if (data.name.length === 0 || data.code.length === 0) {
              this.dataService.showFlash('Course name and code is required.', 'error');
              return false;
            } else {
              let course = {
                instructorId: this.userId,
                name: data.name,
                code: data.code,
                schedule: data.schedule,
                year: data.year,
                section: data.section
              };
              this.apiService.addCourse(course).subscribe(response => {
                this.dataService.showFlash();
                this.getCourses();
              }, error => {
                this.dataService.showFlash('Failed to save. Please try again.', 'error');
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async editCourse(course) {
    const alert = await this.alertController.create({
      header: 'Edit Course',
      message: 'Enter the name of the course, its code, and its schedule.',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Basic Algebra',
          value: course.Course.name
        },
        {
          name: 'code',
          type: 'text',
          placeholder: 'METH-101',
          value: course.Course.code
        },
        {
          name: 'schedule',
          type: 'text',
          placeholder: 'MH 11:00 - 13:00',
          value: course.Course.schedule
        },
        {
          name: 'year',
          type: 'number',
          placeholder: 'Year Level',
          value: course.Course.year
        },
        {
          name: 'section',
          type: 'text',
          placeholder: 'Section',
          value: course.Course.section
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Update',
          handler: (data) => {
            if (data.name.length === 0 || data.code.length === 0) {
              this.dataService.showFlash('Course name and code is required.', 'error');
              return false;
            } else {
              let newCourse = {
                id: course.Course.id,
                instructorId: this.userId,
                name: data.name,
                code: data.code,
                schedule: data.schedule,
                year: data.year,
                section: data.section
              };
              this.apiService.editCourse(newCourse).subscribe(response => {
                this.dataService.showFlash();
                this.getCourses();
              }, error => {
                this.dataService.showFlash('Failed to save. Please try again.', 'error');
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteCourse(courseId) {
    const alert = await this.alertController.create({
      header: 'Delete Course',
      message: "Are you sure you want to delete this course?\n" + 
      "Note: This will also delete the students and other records associated.",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Confirm',
          handler: () => {
            this.apiService.deleteCourse(courseId).subscribe(response => {
              this.dataService.showFlash('Successfuly deleted.');
              this.getCourses();
            }, error => {
              this.dataService.showFlash('Failed to delete. Please try again.', 'error');
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
