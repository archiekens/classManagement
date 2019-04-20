import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public selectedCourse: any = {};
  public selectedActivity: any ={};
  public selectedActivityForEdit: any ={};
  public selectedStudent: any ={};
  public refreshPage = new BehaviorSubject(false);

  constructor(
    public toastController: ToastController
  ) { }

  sortArray(data, key) {
    return data.sort(this.sortByName(key));
  }

  sortByName(key) {
    return function(a, b) {
      // Use toUpperCase() to ignore character casing
      const nameA = a[key].student_name.toUpperCase();
      const nameB = b[key].student_name.toUpperCase();

      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return comparison;
    };
  }

  async showFlash(message = 'Successfuly saved.', type = '') {
    const toast = await this.toastController.create({
      message: message,
      position: 'middle',
      duration: 2000,
      color: type == 'error' ? 'danger' : ''
    });
    toast.present();
  }
}
