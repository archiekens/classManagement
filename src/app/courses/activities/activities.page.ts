import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ApiService } from '../../services/api.service';
import { ModalController } from '@ionic/angular';
import { AddActivityPage } from '../../modals/add-activity/add-activity.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {

  selectedCourse = null;
  activities = [];

  constructor(
    public modalController: ModalController,
    private dataService: DataService,
    private apiService: ApiService,
    public alertController: AlertController,
  ) {
    this.selectedCourse = dataService.selectedCourse;
    this.getActivities();
  }

  ngOnInit() {
  }

  getActivities() {
    this.apiService.getActivities(this.selectedCourse.id).subscribe((response: any) => {
      if (response.status === 'success') {
        this.activities = response.data;
      }
    });
  }

  selectActivity(activity) {
    this.dataService.selectedActivity = activity;
  }

  async addActivity() {
    const modal = await this.modalController.create({
      component: AddActivityPage
    });
 
    modal.onDidDismiss().then((activity) => {
      if (activity.data !== false) {
        this.apiService.addActivity(activity.data).subscribe(response => {
          this.dataService.showFlash();
          this.getActivities();
        }, error => {
          this.dataService.showFlash('Failed to save. Please try again.', 'error');
      });
      }
    });
 
    return await modal.present();
  }

  async editActivity(activity) {
    this.dataService.selectedActivityForEdit = activity;
    const modal = await this.modalController.create({
      component: AddActivityPage
    });
 
    modal.onDidDismiss().then((activity) => {
      if (activity.data !== false) {
        this.apiService.editActivity(activity.data).subscribe(response => {
          this.dataService.showFlash();
          this.getActivities();
        }, error => {
          this.dataService.showFlash('Failed to save. Please try again.', 'error');
      });
      }
    });
 
    return await modal.present();
  }

  async deleteActivity(activityId) {
    const alert = await this.alertController.create({
      header: 'Delete Activity',
      message: "Are you sure you want to delete this activity?\n" + 
      "Note: This will also delete the results associated.",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Confirm',
          handler: () => {
            this.apiService.deleteActivity(activityId).subscribe(response => {
              this.dataService.showFlash('Successfuly deleted.');
              this.getActivities();
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
