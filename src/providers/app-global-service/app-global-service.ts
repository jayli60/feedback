import { Injectable } from '@angular/core';
import { IHousehold, Household } from '../../app/entities/household';
import { IQuestion } from '../../app/entities/question';
import { IFeedback } from '../../app/entities/feedback';

@Injectable()
export class AppGlobalServiceProvider {

  private currentHouseholdList : Household[] = [];
  private currentFeedbackList : IFeedback[] = [];
  
  private currentHousehold : Household = new Household();
  private currentLocation : any;


  constructor() { }

  public getCurrentHouseholdList() : Household[] {
    return this.currentHouseholdList;
  }

  public setCurrentHouseholdList(households : Household[]) : void {
    this.currentHouseholdList = households;
  }
  
  public getCurrentHousehold() : Household {
    return this.currentHousehold;
  }

  public setCurrentHousehold(household : Household) : void {
    this.currentHousehold = household;
  }

  public getCurrentLocation() : any {
    return this.currentLocation;
  }

  public setCurrentLocation(location : any) : void {
    this.currentLocation = location;
  }

  public getCurrentFeedbackList() : IFeedback[] {
    return this.currentFeedbackList;
  }

  public setCurrentFeedbackList(feedbacks : IFeedback[]) : void {
    this.currentFeedbackList = feedbacks;
  }
 

}
