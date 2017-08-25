import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import firebase from "firebase";
import { AppGlobalServiceProvider } from  '../app-global-service/app-global-service';
import { IFeedback } from '../../app/entities/feedback';

declare var LZMA : any; 

@Injectable()
export class DefaultSyncServiceProvider {

  SYNC_PATH : string = "feedback/";
  
  constructor(public appService : AppGlobalServiceProvider) {
    var config = {
      // apiKey: "#FIREBASE_API_KEY#",
      // authDomain: "#STORAGE#.firebaseapp.com",
      // databaseURL: "https://#STORAGE#.firebaseio.com",
      // storageBucket: "#STORAGE#.appspot.com",
      // messagingSenderId: "#MESSAGING_ID#"
    };
    firebase.initializeApp(config);

    var self = this;
    var databaseRef = firebase.database().ref(this.SYNC_PATH);
    databaseRef.on('value', function(snapshot) {
      self.updateAppBuffer(snapshot.toJSON());
    });

  }//ctor

  private updateAppBuffer(data : any) : void {

    let values = _.values(data);
    let feedbacks : IFeedback[] = [];
    values.forEach(function(element) { 
      feedbacks.push(JSON.parse(element.value));
    });
    this.appService.setCurrentFeedbackList(feedbacks);
  }

  public setValue(key : string, value : string, compress : boolean = false) : void {
    if (!compress){
      firebase.database().ref(this.SYNC_PATH + key).set({
        value: value
      });      
    }
    if (compress) {
        LZMA.compress(value, null, 
            function on_compress_complete(result) 
            {
              firebase.database().ref(this.SYNC_PATH + key).set({
                value: result
              });      
            },
        );
    }
  }



}