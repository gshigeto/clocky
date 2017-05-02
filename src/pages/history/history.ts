import { NavController, AlertController, ItemSliding, LoadingController } from 'ionic-angular';
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
  loading: boolean = false;
  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public nav: NavController,
    public shift: ShiftService,
    public sql: Sql
  ) {
    this.shifts = [];
  }

  ionViewWillEnter() {
    this.loading = true;
    let loader = this.loadingCtrl.create({
      content: "Loading Timesheet"
    });
    loader.present();
    this.sql.query(`SELECT * FROM shift`).then((response) => {
      for (let i = 0; i < response.res.rows.length; i++) {
        this.shifts.push(this.historyItem(response.res.rows.item(i)))
      }
    }).then(_ => {
      this.shifts = this.shifts.reverse();
      setTimeout(_ => {
        this.loading = false;
        loader.dismiss();
      }, 500);
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
