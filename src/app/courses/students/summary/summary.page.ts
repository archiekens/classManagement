import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  selectedStudent = null;
  selectedCourse = null;
  summary = {
    Criterion: [],
    final_grade: 0,
    present_count: 0,
    absent_count: 0,
  };

  constructor(
    private dataService: DataService,
    private apiService: ApiService,
    private _location: Location
  ) {
    this.selectedCourse = dataService.selectedCourse;
    this.selectedStudent = dataService.selectedStudent;
    this.apiService.getStudentFinalGrade(this.selectedStudent.Student.id).subscribe((response:any) => {
      if (response.status === 'success') {
        this.summary = response.data;
      }
    });
  }

  ngOnInit() {
  }

  goBack() {
    this._location.back();
  }


}
