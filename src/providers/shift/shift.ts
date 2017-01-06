import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Google } from '../google/google';
import { Sql } from '../sql/sql';

const API_BASE_URL = 'http://api.clockyapp.com';

/*
  Generated class for the Shift provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Shift {

  clockedIn: boolean = false;
  shiftId: number = -1;
  constructor(public http: Http, public sql: Sql, public google: Google) {

  }

  set(clockedIn: boolean, shiftId: number = 0) {
    this.clockedIn = clockedIn;
    this.shiftId = shiftId;
  }

  toggle() {
    this.clockedIn = !this.clockedIn
    if (this.clockedIn) {
      this.clockIn();
    } else {
      this.clockOut();
    }
  }

  clockIn() {
    let now = new Date().getTime();
    this.sql.query('INSERT INTO shift(clockIn) VALUES(?)', [now]).then(resp => {
      this.shiftId = resp.res.insertId;
      this.sql.set('shiftId', this.shiftId.toString());
      this.sql.get('sheetId').then(id => {
        id = id || -1;
        this.clock(`in/${id}`, JSON.stringify(now));
      })
    })
  }

  clockOut() {
    let now = new Date().getTime();
    this.sql.query(`UPDATE shift SET clockOut = ? WHERE id = ?`, [now, this.shiftId]).then(resp => {
      this.sql.remove('shiftId');
      this.shiftId = -1;
      this.sql.get('sheetId').then(id => {
        id = id || -1;
        this.clock(`out/${id}`, JSON.stringify(now));
      })
    })
  }

  createNewSpreadsheet() {
    this.clock(`spreadsheet/create`, null);
  }

  clock(type: string, now: string) {
    if (this.google.user().accessToken) {
      let body = JSON.stringify({
        timestamp: now,
        access_token: this.google.user().accessToken,
        refresh_token: this.google.user().refreshToken,
        token_type: 'Bearer'
      });
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({headers: headers});
      this.http.post(`${API_BASE_URL}/${type}`, body, options).subscribe(resp => {
        this.sql.set('sheetId', resp.json().docId);
      })
    }
  }

}
