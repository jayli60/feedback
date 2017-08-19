import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppGlobalServiceProvider } from '../../providers/app-global-service/app-global-service';
import { FeedbackDataServiceProvider } from '../../providers/feedback-data-service/feedback-data-service';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public appService : AppGlobalServiceProvider
    ,public feedbackDataService : FeedbackDataServiceProvider
    ,public geolocation : Geolocation) {

  }

  public getList() : void {
    let list = this.feedbackDataService.getHouseholdData("");
    this.appService.setCurrentHouseholdList(list);
  }

  public scanQRCode() : void {
    alert("we");
  }

  private setLocation(): void {
    this.geolocation.getCurrentPosition().then((position) => {
       this.appService.setCurrentLocation(position);
    });
  }

  ionViewDidLoad() {
    this.setLocation();
  }


}
