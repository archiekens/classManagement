import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { ApiService } from '../../../services/api.service';
import { ModalController } from '@ionic/angular';
import { AddActivityPage } from '../../../modals/add-activity/add-activity.page';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  selectedCourse = null;
  selectedActivity = null;
  activityResults = [];
  students = [];
  hasActivityResults = false;

  constructor(
    public modalController: ModalController,
    private dataService: DataService,
    private apiService: ApiService
  ) {
    this.selectedCourse = dataService.selectedCourse;
    this.selectedActivity = dataService.selectedActivity;
    this.apiService.getStudents(this.selectedCourse.id).subscribe((response: any) => {
      if (response.status === 'success') {
        this.students = response.data;
      }
      this.getActivityResults();
    });
  }

  ngOnInit() {
  }

  getActivityResults() {
    this.apiService.getActivityResults(this.selectedActivity.Activity.id).subscribe((response: any) => {
      this.activityResults = [];
      if (response.status === 'success') {
        this.hasActivityResults = true;
        for(var data of response.data) {
          let activityResult = {
            ActivityResult: {
              id: data.ActivityResult.id,
              activity_id: data.ActivityResult.activity_id,
              student_id: data.ActivityResult.student_id,
              score: data.ActivityResult.score,
              student_name: data.Student.name
            }
          }
          this.activityResults.push(activityResult);
        }

      } else {
        this.hasActivityResults = false;
      }

      this.mergeStudentsIntoData();
    });
  }

  saveActivityResults() {
    if (this.hasActivityResults === false) {
      this.apiService.addActivityResults(this.activityResults).subscribe(response => {
        this.dataService.showFlash();
        this.getActivityResults();
      }, error => {
        this.dataService.showFlash('Failed to save. Please try again.', 'error');
      });
    } else {
      this.apiService.editActivityResults(this.activityResults).subscribe(response => {
        this.dataService.showFlash();
        this.getActivityResults();
      }, error => {
        this.dataService.showFlash('Failed to save. Please try again.', 'error');
      });
    }
  }

  mergeStudentsIntoData() {
    for(let student of this.students) {
      var result = this.activityResults.find(obj => {
        return obj.ActivityResult.student_id === student.Student.id
      })
      if (result === undefined) {
        let activityResult = {
          ActivityResult: {
            activity_id: this.selectedActivity.Activity.id,
            student_id: student.Student.id,
            score: null,
            student_name: student.Student.name
          }
        }
        this.activityResults.push(activityResult);
      }
    }

    this.dataService.sortArray(this.activityResults, 'ActivityResult');
  }

}
