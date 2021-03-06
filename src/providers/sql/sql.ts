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
      SQLite.openDatabase({
        name: '__ionicstorage',
        location: 'default'
      })
        .then((db: SQLite) => {
          this._db = db;
          this.query(`CREATE TABLE IF NOT EXISTS shift (
                    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                    clockIn TEXT,
                    clockOut TEXT)`)
            .catch(err => {
              reject();
              console.error('Storage: Unable to create initial storage tables', JSON.stringify(err.tx), JSON.stringify(err.err));
            });
          this.query('CREATE TABLE IF NOT EXISTS kv (key TEXT PRIMARY KEY, value TEXT)').catch(err => {
            reject();
            console.error('Storage: Unable to create initial storage tables', JSON.stringify(err.tx), JSON.stringify(err.err));
          });
          resolve(true);
        }).catch(error => {
          reject();
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

  /**
   * Get the value in the database identified by the given key.
   * @param {string} key the key
   * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
   */
  get(key: string): Promise<any> {
    return this.query('SELECT key, value FROM kv WHERE key = ? limit 1', [key]).then(data => {
      if (data.res.rows.length > 0) {
        return data.res.rows.item(0).value;
      }
    });
  }

  /**
   * Set the value in the database for the given key. Existing values will be overwritten.
   * @param {string} key the key
   * @param {string} value The value (as a string)
   * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
   */
  set(key: string, value: string): Promise<any> {
    return this.query('INSERT OR REPLACE INTO kv(key, value) VALUES (?, ?)', [key, value]);
  }

  /**
   * Remove the value in the database for the given key.
   * @param {string} key the key
   * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
   */
  remove(key: string): Promise<any> {
    return this.query('DELETE FROM kv WHERE key = ?', [key]);
  }
}
