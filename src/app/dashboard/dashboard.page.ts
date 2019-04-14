import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user = {};

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.get('user').then(response => {
      this.user = response;
    });
  }

}
