import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppGlobalServiceProvider } from '../../providers/app-global-service/app-global-service';
import { FeedbackDataServiceProvider } from '../../providers/feedback-data-service/feedback-data-service';
import { IHousehold } from '../../app/entities/household';
import { IQuestion } from '../../app/entities/question';

@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {

  //bindable properties
  public questionList : IQuestion[];
  public household : IHousehold;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public appService : AppGlobalServiceProvider
    ,public feedbackDataService : FeedbackDataServiceProvider
  ) {
  }

  ionViewDidEnter(){
    let household = this.appService.getCurrentHousehold();
    let questionList = this.feedbackDataService.getQuestions();
    this.setViewModel(household, questionList);
  }

  public setViewModel(household : IHousehold, questionList : IQuestion[]){
    this.questionList = questionList;
    this.household = household;
  }

}
