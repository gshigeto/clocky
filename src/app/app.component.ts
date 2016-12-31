import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';

import { Google, Sql } from '../providers'

export const AvailablePages = {
  HOME: 'home',
  HISTORY: 'history'
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = HomePage;

  constructor(public platform: Platform, public google: Google, public sql: Sql) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.sql.initializeDB();
      this.google.trySilentLogin().then(() => {
        StatusBar.styleDefault();
        Splashscreen.hide();
      });
    });
  }
}
