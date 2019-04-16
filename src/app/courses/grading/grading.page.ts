import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-grading',
  templateUrl: './grading.page.html',
  styleUrls: ['./grading.page.scss'],
})
export class GradingPage implements OnInit {

  selectedCourse = null;
  criteria = [];

  constructor(
    public alertController: AlertController,
    private dataService: DataService,
    private apiService: ApiService
  ) {
    this.selectedCourse = dataService.selectedCourse;
    this.getCriteria();
  }

  ngOnInit() {
  }

  getCriteria() {
    this.apiService.getCriteria(this.selectedCourse.id).subscribe((response: any) => {
      if (response.status === 'success') {
        this.criteria = response.data;
      }
    });
  }

  async addCriteria() {
    const alert = await this.alertController.create({
      header: 'Add Grading Criteria',
      message: 'Enter the name of the criteria and its percentage.',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Quizzes'
        },
        {
          name: 'percentage',
          type: 'number',
          placeholder: '10%'
        },
	    ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: (data) => {
            let criterion = {
              name: data.name,
              percentage: data.percentage,
              courseId: this.selectedCourse.id
            };
            this.apiService.addCriteria(criterion).subscribe(response => {
              this.getCriteria();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async editCriteria(criterion) {
    const alert = await this.alertController.create({
      header: 'Edit Grading Criteria',
      message: 'Enter the name of the criteria and its percentage.',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Quizzes',
          value: criterion.Criterion.name
        },
        {
          name: 'percentage',
          type: 'number',
          placeholder: '10%',
          value: criterion.Criterion.percentage
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
            let newCriterion = {
              id: criterion.Criterion.id,
              name: data.name,
              percentage: data.percentage,
              courseId: this.selectedCourse.id
            };
            this.apiService.editCriteria(newCriterion).subscribe(response => {
              this.getCriteria();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteCriteria(criterionId) {
    const alert = await this.alertController.create({
      header: 'Delete Grading Criteria',
      message: "Are you sure you want to delete this criteria?\n" + 
      "Note: This will also delete the activities associated.",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Confirm',
          handler: () => {
            this.apiService.deleteCriteria(criterionId).subscribe(response => {
              this.getCriteria();
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
