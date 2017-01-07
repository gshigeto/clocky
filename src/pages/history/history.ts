import { NavController, AlertController, ItemSliding } from 'ionic-angular';
import { Component } from '@angular/core';
import { Sql, ShiftService } from '../../providers'
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
  constructor(public sql: Sql, nav: NavController, public shift: ShiftService, public alertCtrl: AlertController) {
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

  confirmDelete(id: string, item: ItemSliding) {
    let confirm = this.alertCtrl.create({
      title: 'Delete this Shift?',
      message: `Do you want to delete this shift?`,
      buttons: [
        {
          text: 'Keep',
          handler: () => {
            item.close();
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Deleted shift.');
            this.sql.query('DELETE FROM shift WHERE id=?', [id]).then(() => {
              for (let i = 0; i < this.shifts.length; i++) {
                if (id == this.shifts[i].id) {
                  this.shifts.splice(i, 1);
                  break;
                }
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
