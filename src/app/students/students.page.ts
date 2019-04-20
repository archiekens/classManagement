import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {

  query = {
    userId: null,
    name: ''
  };

  students = [];

  constructor(
    private storage: Storage,
    private apiService: ApiService
  ) {
    this.storage.get('user').then(response => {
      this.query.userId = response.id;
      this.getStudents();
    });
  }

  ngOnInit() {
  }

  getStudents() {
    this.apiService.searchStudent(this.query).subscribe((response: any) => {
      if (response.status === 'success') {
        this.students = response.data;
      } else {
        this.students = [];
      }
    });
  }

}
