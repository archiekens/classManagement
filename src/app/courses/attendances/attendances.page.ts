import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-attendances',
  templateUrl: './attendances.page.html',
  styleUrls: ['./attendances.page.scss'],
})
export class AttendancesPage implements OnInit {

  selectedCourse = null;
  selectedDate = new Date().toString();
  attendances = [];
  students = [];
  presentCount = 0;
  absentCount = 0;
  attendanceStatus = 'No attendance yet';

  constructor(
    private dataService: DataService,
    private datePipe: DatePipe,
    private apiService: ApiService,
  ) {
    this.selectedCourse = this.dataService.selectedCourse;
    this.apiService.getStudents(this.selectedCourse.id).subscribe((response: any) => {
      if (response.status === 'success') {
        this.students = response.data;
      }
      this.getAttendances();
    });
  }

  ngOnInit() {
  }

  changeDate() {
    this.getAttendances();
  }

  getAttendances() {
    let selectedDateString = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
    this.apiService.getAttendances(selectedDateString, this.selectedCourse.id).subscribe((response: any) => {
      this.attendances = [];
      if (response.status === 'success') {

        for(var data of response.data) {
          let attendance = {
            Attendance: {
              id: data.Attendance.id,
              course_id: data.Attendance.course_id,
              student_id: data.Attendance.student_id,
              date_taken: data.Attendance.date_taken,
              is_present: data.Attendance.is_present == 1 ? true : false,
              student_name: data.Attendance.student_name
            }
          }
          this.attendances.push(attendance);
        }

        this.attendanceStatus = 'Attendance taken';
      } else {
        this.attendanceStatus = 'No attendance yet';
        for(var student of this.students) {
          let attendace = {
            Attendance: {
              course_id: this.selectedCourse.id,
              student_id: student.Student.id,
              date_taken: selectedDateString,
              is_present: false,
              student_name: student.Student.name
            }
          }
          this.attendances.push(attendace);
        }
      }

      this.headcount();
    });
  }

  selectAllStudents() {
    for(var attendance of this.attendances) {
      attendance.Attendance.is_present = true;
    }
  }

  saveAttendances() {
    if (this.attendanceStatus === 'No attendance yet') {
      this.apiService.addAttendances(this.attendances).subscribe(response => {
        this.getAttendances();
      });
    } else {
      this.apiService.editAttendances(this.attendances).subscribe(response => {
        this.getAttendances();
      });
    }
  }

  // Count no of present/absent
  headcount() {
    this.absentCount = 0;
    this.presentCount = 0;
    let totalStudents = this.students.length;

    for(var attendance of this.attendances) {
      if (attendance.Attendance.is_present === false) {
        this.absentCount++;
      }
    }

    this.presentCount = totalStudents - this.absentCount;
  }

}
