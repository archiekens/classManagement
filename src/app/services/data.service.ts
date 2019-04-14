import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public selectedCourse: any = {};

  constructor() { }
}
