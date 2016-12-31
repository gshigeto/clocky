import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

/*
  Generated class for the History page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {

  constructor(public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

}
