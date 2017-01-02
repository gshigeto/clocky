import { Injectable } from '@angular/core';
import { GooglePlus } from 'ionic-native';
import { User } from '../../models/index';
import 'rxjs/add/operator/map';

const SCOPES: string = 'https://www.googleapis.com/auth/spreadsheets';
const CLIENT_ID: string = '31810046095-3bh1fa9sfp8s87noq9jd3882mjmcnvq3.apps.googleusercontent.com';

/*
  Generated class for the Google provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Google {

  private currUser: User;
  constructor() {
    this.clearUser();
  }

  logout() {
    GooglePlus.logout().then(() => {
      this.clearUser();
    });
  }

  login() {
    GooglePlus.login(
      {
        scopes: SCOPES,
        webClientId: CLIENT_ID,
        offline: true
      }
    ).then(res => {
      this.currUser.email = res.email;
      this.currUser.userId = res.userId;
      this.currUser.displayName = res.displayName;
      this.currUser.imageUrl = res.imageUrl;
      this.currUser.idToken = res.idToken;
      this.currUser.serverAuthCode = res.serverAuthCode;
      this.currUser.accessToken = res.accessToken;
    });
  }

  trySilentLogin(): Promise<boolean> {
    let promise = new Promise((resolve,reject) => {
      GooglePlus.trySilentLogin(
        {
          scopes: SCOPES,
          webClientId: CLIENT_ID,
          offline: true
        }
      ).then(res => {
        this.currUser.email = res.email;
        this.currUser.userId = res.userId;
        this.currUser.displayName = res.displayName;
        this.currUser.imageUrl = res.imageUrl;
        this.currUser.idToken = res.idToken;
        this.currUser.serverAuthCode = res.serverAuthCode;
        this.currUser.accessToken = res.accessToken;
        resolve(true);
      }).catch(err => {
        reject();
      });
    });
    return promise;
  }

  clearUser() {
    this.currUser = {
      email: null,
      userId: null,
      displayName: null,
      imageUrl: null,
      idToken: null,
      serverAuthCode: null,
      accessToken: null
    }
  }

  user() {
    return this.currUser;
  }

}
