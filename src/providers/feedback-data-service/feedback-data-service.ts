import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';
import { ToastController } from 'ionic-angular';
import { IHousehold } from '../../app/entities/household';
import { IFeedback, Feedback } from '../../app/entities/feedback';
import { IQuestion, SimpleQuestion, MultipleQuestion } from '../../app/entities/question';
import { DefaultSyncServiceProvider } from  '../default-sync-service/default-sync-service';
import { AppGlobalServiceProvider } from  '../app-global-service/app-global-service';
import { Utility } from '../../app/common/utility';

@Injectable()
export class FeedbackDataServiceProvider {

  householdData : IHousehold[];

  constructor(public http: Http
    ,public syncService : DefaultSyncServiceProvider
    ,public appService : AppGlobalServiceProvider
    ,public toastCtrl: ToastController 
  ) {
    this.http.get('assets/data/household.json')
    .subscribe(res => this.householdData = res.json());  
  }//ctor


  public getAllHouseholdData() : IHousehold[] {
    return this.householdData;
  }

  public saveQuestionAnwsers(household : IHousehold, questions : IQuestion[]) : void {
    let feedback : IFeedback = new Feedback();
    feedback.Household = household;
    feedback.Questions = questions; 
    this.syncService.setValue(household.id, JSON.stringify(feedback));
    let toast = this.toastCtrl.create({
      message: 'Saved!',
      duration: 3000
    });
    toast.present();    
  }
  
  public getHouseholdData(filter : string) : IHousehold[] {
    let data : IHousehold[] = _.take(this.householdData, 50);
    let currentLocation = this.appService.getCurrentLocation();
    let lat = currentLocation.coords.latitude
    let lng = currentLocation.coords.longitude;

    _.forEach(data, function(house : IHousehold) { 
      house.Address.Distance = Utility.calculateDistance(lat, lng, house.Address.Latitude, house.Address.Longitude);
    });
    return data;
  }

  public getQuestions() : IQuestion[] {
    let result:  IQuestion[] = [];
    
    let q1 = new SimpleQuestion();
    q1.LabelText = "This is question #1, please select one?";
    q1.setOptions(["Yes", "No"]);
    result.push(q1);

    let q2 = new SimpleQuestion();
    q2.LabelText = "This is question #2, please select one?";
    q2.setOptions(["Yes", "No", "May be"]);
    result.push(q2);
    
    let q3 = new MultipleQuestion();
    q3.LabelText = "This is question #3, please select all applied?";
    q3.setOptions(["Cat", "Dog", "Bird", "Fish"]);
    result.push(q3);
    
    let q4 = new MultipleQuestion();
    q4.LabelText = "This is question #4, please select all applied?";
    q4.setOptions(["One", "Two", "Three", "Four"]);
    result.push(q4);
    
    return result;
  } 

}

