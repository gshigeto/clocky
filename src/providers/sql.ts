import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import 'rxjs/add/operator/map';

/*
  Generated class for the Sql provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Sql {

  private _db: any;
  constructor() {}

  initializeDB(): Promise<boolean> {
    let promise = new Promise((resolve, reject) => {
      resolve(true);
      SQLite.openDatabase({
        name: '__ionicstorage',
        location: 'default'
      })
        .then((db: SQLite) => {
          this._db = db;
          this.query(`CREATE TABLE IF NOT EXISTS shift (
                    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                    in TEXT,
                    out TEXT)`)
            .catch(err => {
              console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
            });
          this.query('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)').catch(err => {
            console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
          });
        }).catch(error => {
          console.error('Error openening database', error);
        });
    });
    return promise;
  }

  /**
   * Perform an arbitrary SQL operation on the database. Use this method
   * to have full control over the underlying database through SQL operations
   * like SELECT, INSERT, and UPDATE.
   *
   * @param {string} query the query to run
   * @param {array} params the additional params to use for query placeholders
   * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
   */
  query(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this._db.transaction((tx: any) => {
          tx.executeSql(query, params,
            (tx: any, res: any) => resolve({ tx: tx, res: res }),
            (tx: any, err: any) => reject({ tx: tx, err: err }));
        },
          (err: any) => reject({ err: err }));
      } catch (err) {
        reject({ err: err });
      }
    });
  }
}
