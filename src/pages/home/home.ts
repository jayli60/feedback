import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppGlobalServiceProvider } from '../../providers/app-global-service/app-global-service';
import { FeedbackDataServiceProvider } from '../../providers/feedback-data-service/feedback-data-service';
import { Geolocation } from '@ionic-native/geolocation';
import { IHousehold } from '../../app/entities/household';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  feedbacks: Array<{household: IHousehold, icon: string}>;

  constructor(public appService : AppGlobalServiceProvider
    ,public feedbackDataService : FeedbackDataServiceProvider
    ,public geolocation : Geolocation) {

  }

  public getList() : void {
    let list = this.feedbackDataService.getHouseholdData("");
    this.appService.setCurrentHouseholdList(list);
    this.feedbackDataService.getFeedbackData();
    this.setFeedbacks();
  }

  private setLocation(): void {
    this.geolocation.getCurrentPosition().then((position) => {
       this.appService.setCurrentLocation(position);
    });
  }

  private setFeedbacks(): void {
    let list = this.appService.getCurrentFeedbackList();
    this.feedbacks = [];
    for (let i = 0; i < list.length ; i++) {
      this.feedbacks.push({ household : list[i].Household, icon : "person" });
    }    

  }

  ionViewDidEnter() {
    this.setLocation();
    this.feedbackDataService.getFeedbackData();
  }


}
