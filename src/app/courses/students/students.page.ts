import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { ApiService } from '../../services/api.service';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

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
    private apiService: ApiService,
    private fileChooser: FileChooser,
    private transfer: FileTransfer
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
      message: 'Enter the student number and name of the student',
      inputs: [
        {
          name: 'number',
          type: 'text',
          placeholder: 'Student Number'
        },
        {
          name: 'name',
          type: 'text',
          placeholder: 'Student Name'
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
            if (data.name.length === 0 || data.number.length === 0) {
              this.dataService.showFlash('Student number and name are required', 'error')
              return false;
            } else {
              let student = {
                number: data.number,
                name: data.name,
                courseId: this.selectedCourse.id
              };
              this.apiService.addStudent(student).subscribe((response: any) => {
                if (response.status === 'success') {
                  this.dataService.showFlash();
                  this.getStudents();
                } else {
                  this.dataService.showFlash(response.message, 'error');
                  return false;
                }
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

  async editStudent(student) {
    const alert = await this.alertController.create({
      header: 'Edit Student',
      message: 'Enter the number and name of the student',
      inputs: [
        {
          name: 'number',
          type: 'text',
          placeholder: 'Student Number',
          value: student.Student.number
        },
        {
          name: 'name',
          type: 'text',
          placeholder: 'Student Name',
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
            if (data.name.length === 0 || data.number.length === 0) {
              this.dataService.showFlash('Student number and name are required', 'error')
              return false;
            } else {
              let newStudent = {
                id: student.Student.id,
                number: data.number,
                name: data.name,
                courseId: this.selectedCourse.id
              };
              this.apiService.editStudent(newStudent).subscribe((response: any) => {
                if (response.status === 'success') {
                  this.dataService.showFlash();
                  this.getStudents();
                } else {
                  this.dataService.showFlash(response.message, 'error');
                  return false;
                }
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
              this.dataService.showFlash('Successfuly deleted.');
              this.getStudents();
            }, error => {
              this.dataService.showFlash('Failed to delete. Please try again.', 'error');
            });
          }
        }
      ]
    });

    await alert.present();
  }

  selectStudent(student) {
    this.dataService.selectedStudent = student;
  }

  uploadCsv() {
    this.fileChooser.open()
    .then(uri => {
      const fileTransfer: FileTransferObject = this.transfer.create();
      const uploadOpts: FileUploadOptions = {
         fileKey: 'file',
         fileName: 'students.csv'
      };

      fileTransfer.upload(uri, this.apiService.server + '/students/upload_csv/' + this.selectedCourse.id, uploadOpts)
        .then((data: any) => {
          let response = JSON.parse(data.response);
          if (response.status === 'success') {
            this.dataService.showFlash('CSV uploaded successfully');
            this.getStudents();
          } else {
            this.dataService.showFlash(response.message, 'error', 5000);
          }
        }, (err) => {
          this.dataService.showFlash('Failed to upload CSV. Please try again.', 'error');
        });
    })
    .catch(e => {
      this.dataService.showFlash('Unable to open file.', 'error')
    });
  }

}
