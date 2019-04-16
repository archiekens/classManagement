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
    name: null,
    criteriaId: null,
    courseId: null
  };

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
  }

  async addActivity() {
    this.activity.courseId = this.selectedCourse.id;
    await this.modalController.dismiss(this.activity);
  }

  async closeModal() {
    await this.modalController.dismiss(false);
  }

}
