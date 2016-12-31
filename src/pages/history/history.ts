import { Component } from '@angular/core';
import { Sql } from '../../providers'
import { Shift } from '../../models'

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

  shifts: Shift[];
  constructor(public sql: Sql) {
    this.shifts = [];
  }

  ionViewWillEnter() {
    this.sql.query(`SELECT * FROM shift`).then((response) => {
      for (let i = 0; i < response.res.rows.length; i++) {
        this.shifts.push(this.historyItem(response.res.rows.item(i)))
      }
      response.res.rows.item()
    });
  }

  historyItem(item) {
    return {
      id: item.id,
      clockIn: item.clockIn,
      clockOut: item.clockOut || null
    }
  }

}
