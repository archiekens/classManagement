import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ApiService } from '../../services/api.service';
import { ModalController } from '@ionic/angular';
import { AddActivityPage } from '../../modals/add-activity/add-activity.page';

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
    private apiService: ApiService
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

   async addActivity() {
    const modal = await this.modalController.create({
      component: AddActivityPage
    });
 
    modal.onDidDismiss().then((activity) => {
      if (activity !== false) {
        this.apiService.addActivity(activity.data).subscribe(response => {
          this.getActivities();
        });
      }
    });
 
    return await modal.present();
  }

}
