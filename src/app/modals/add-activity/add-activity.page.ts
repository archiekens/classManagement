import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.page.html',
  styleUrls: ['./add-activity.page.scss'],
})
export class AddActivityPage implements OnInit {

  selectedCourse = null;
  criteria = [];
  activity = {
    id: '',
    name: '',
    criteriaId: '',
    courseId: ''
  };
  errorMessage = '';

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private dataService: DataService,
    private apiService: ApiService
  ) {
    this.selectedCourse = this.dataService.selectedCourse;
    this.apiService.getCriteria(this.selectedCourse.id).subscribe((response: any) => {
      if (response.status === 'success') {
        this.criteria = response.data;
      }
    });
  }

  ngOnInit() {
    if (this.dataService.selectedActivityForEdit !== {}) {
      let selectedActivity = this.dataService.selectedActivityForEdit.Activity;
      this.activity.id = selectedActivity.id;
      this.activity.name = selectedActivity.name;
      this.activity.criteriaId = selectedActivity.criteria_id;
    }
  }

  async addActivity() {
    if (this.activity.name.length === 0 || this.activity.criteriaId.length === 0) {
      this.errorMessage = 'Activity name and criteria is required.';
    } else {
      this.activity.courseId = this.selectedCourse.id;
      await this.modalController.dismiss(this.activity);
    }
    
  }

  async closeModal() {
    await this.modalController.dismiss(false);
  }

}
