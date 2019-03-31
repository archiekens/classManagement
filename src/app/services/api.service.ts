import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    })
  };

  server = 'http://192.168.1.106:2022';

  constructor(private http: HttpClient) { }

  loginInstructor(credentials) {
    return this.http.post(this.server + '/instructors/login', this.httpOptions);
  }

}
