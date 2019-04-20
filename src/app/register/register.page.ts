import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private user = {
    firstName: '',
    lastName: '',
    position: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '2',
    birthday: this.datePipe.transform(new Date().toString(), 'yyyy-MM-dd'),
    contactNo: '',
  };

  private errors = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  constructor(

    private router: Router,
    private apiService: ApiService,
    private dataService: DataService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
  }

  register() {
    this.apiService.registerInstructor(this.user).subscribe((response: any) => {
      if (response.status === 'success') {
        this.dataService.showFlash('Successfuly registered.');
        this.router.navigate(['login']);
      } else {
        this.errors = response.errors;
      }
    }, (error) => {
      this.dataService.showFlash('Could not register. Please try again.', 'error');
    });
  }

  cancel() {
    this.router.navigate(['login']);
  }

}
