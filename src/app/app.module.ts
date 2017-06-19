import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';
import { Google, ShiftService, Sql, Toast } from '../providers';
import { Duration } from '../pipes';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { BrowserModule } from '@angular/platform-browser';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '620d8363'
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HistoryPage,
    Duration
  ],
  imports: [
    BrowserModule,
    HttpModule,
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
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Google,
    ShiftService,
    Sql,
    Toast
  ]
})
export class AppModule { }
