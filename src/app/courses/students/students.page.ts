import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {

  students = [];
  selectedCourse = null;

  constructor(
    public alertController: AlertController,
    private dataService: DataService,
    private apiService: ApiService
  ) {
    this.selectedCourse = dataService.selectedCourse;
    this.getStudents();
  }

  ngOnInit() {
  }

  getStudents() {
    this.apiService.getStudents(this.selectedCourse.id).subscribe((response: any) => {
      if (response.status === 'success') {
        this.students = response.data;
      }
    });
  }

  async addStudent() {
    const alert = await this.alertController.create({
      header: 'Add Student',
      message: 'Enter the name of the student',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Dante Gulapa'
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
            let student = {
              name: data.name,
              courseId: this.selectedCourse.id
            };
            this.apiService.addStudent(student).subscribe(response => {
              this.getStudents();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async editStudent(student) {
    const alert = await this.alertController.create({
      header: 'Edit Student',
      message: 'Enter the name of the student',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Dante Gulapa',
          value: student.Student.name
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
            let newStudent = {
              id: student.Student.id,
              name: data.name,
            };
            this.apiService.editStudent(newStudent).subscribe(response => {
              this.getStudents();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteStudent(studentId) {
    const alert = await this.alertController.create({
      header: 'Delete Student',
      message: 'Are you sure you want to delete this student?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Confirm',
          handler: () => {
            this.apiService.deleteStudent(studentId).subscribe(response => {
              this.getStudents();
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
