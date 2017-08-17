import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdInputModule, MdButtonModule, MdCheckboxModule, MdRadioModule } from '@angular/material';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppGlobalServiceProvider } from '../providers/app-global-service/app-global-service';
import { DefaultSyncServiceProvider } from '../providers/default-sync-service/default-sync-service';
import { FeedbackDataServiceProvider } from '../providers/feedback-data-service/feedback-data-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  
    HttpModule,
    MdInputModule,
    MdButtonModule,
    MdCheckboxModule,
    MdRadioModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppGlobalServiceProvider,
    DefaultSyncServiceProvider,
    FeedbackDataServiceProvider
  ]
})
export class AppModule {}
