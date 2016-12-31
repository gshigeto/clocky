import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { HistoryPage } from '../history/history';
import { Google } from '../../providers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public nav: NavController, public google: Google, public alertCtrl: AlertController) {}

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

  confirmLogout() {
    let confirm = this.alertCtrl.create({
      title: 'Logout of Google?',
      message: `Do you want to logout of ${this.google.user().displayName}'s accont?`,
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Logout',
          handler: () => {
            this.google.logout();
          }
        }
      ]
    });
    confirm.present();
  }
}
