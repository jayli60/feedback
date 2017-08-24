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

  public submitQuestions() : void
  {
    //set Anwser, should be in question entity
    this.questionList.forEach(function(question : IQuestion) {
      let answer : string = "";
      if (question.Type == 'Multiple') {
        for (var i = 0; i < question.AnswerChecked.length ; i++) {
          if (question.AnswerChecked[i]) {
            if (answer.length > 0) {
              answer += "," + question.AnswerOptions[i];
            } 
            else
            {
              answer = question.AnswerOptions[i];
            }
          }
        }
        question.Answer = answer;
      }//multiple
    });//for    

    let household : IHousehold = this.appService.getCurrentHousehold();
    this.feedbackDataService.saveQuestionAnwsers(household, this.questionList);
  }

}
