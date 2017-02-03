import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the Toast provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Toast {

  constructor(public toastCtrl: ToastController) { }

  public showToast(message: string, duration?: number, showCloseButton?: boolean) {
    showCloseButton = (!showCloseButton) ? false : showCloseButton;
    duration = duration || 3000;
    let toastConfig: ToastOptions = {
      message: message,
      showCloseButton: showCloseButton,
      position: 'top',
      closeButtonText: 'OK'
    };
    if (!showCloseButton) {
      toastConfig.duration = duration;
    }
    let toast = this.toastCtrl.create(toastConfig);
    toast.present();
  }

}
