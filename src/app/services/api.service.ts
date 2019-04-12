import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  server = 'http://192.168.0.115:2022';

  constructor(private http: HttpClient) { }

  loginInstructor(credentials) {
    let body = new HttpParams()
      .set('username', credentials.username)
      .set('password', credentials.password);
    return this.http.post(this.server + '/instructors/login',
      body,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  registerInstructor(user) {
    let body = new HttpParams()
      .set('first_name', user.firstName)
      .set('last_name', user.lastName)
      .set('username', user.username)
      .set('password', user.password)
      .set('gender', user.gender)
      .set('birthday', user.birthday.substring(0,10))
      .set('contact_no', user.contactNo)
    return this.http.post(this.server + '/instructors/add',
      body,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

}
