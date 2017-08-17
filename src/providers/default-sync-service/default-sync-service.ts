import { Injectable } from '@angular/core';
import firebase from "firebase";
declare var LZMA : any; 

@Injectable()
export class DefaultSyncServiceProvider {
  constructor() {
    var config = {
      apiKey: "#FIREBASE_API_KEY#",
      authDomain: "#STORAGE#.firebaseapp.com",
      databaseURL: "https://#STORAGE#.firebaseio.com",
      storageBucket: "#STORAGE#.appspot.com",
      messagingSenderId: "#MESSAGING_ID#"
    };
    firebase.initializeApp(config);
  }//ctor

  public setValue(key : string, value : string, compress : boolean = false) : void {
    const SYNC_PATH : string = "feedback/";

    if (!compress){
      firebase.database().ref(SYNC_PATH + key).set({
        value: value
      });      
    }
    if (compress) {
        LZMA.compress(value, null, 
            function on_compress_complete(result) 
            {
              firebase.database().ref(SYNC_PATH + key).set({
                value: result
              });      
            },
        );
    }
  }



}