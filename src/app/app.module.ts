import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';

import { Google, Sql } from '../providers'

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '620d8363'
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HistoryPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HistoryPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Google,
    Sql
  ]
})
export class AppModule {}
