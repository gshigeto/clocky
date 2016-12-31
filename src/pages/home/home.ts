import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HistoryPage } from '../history/history';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public nav: NavController) {}

  clockedIn = false;

  toggleIn() {
    this.clockedIn = !this.clockedIn;
  }

  public navigate(page: string) {
    switch(page) {
      case 'home':
        this.nav.setRoot(HomePage);
        break;
      case 'history':
        this.nav.push(HistoryPage);
        break;
    }
  }
}
