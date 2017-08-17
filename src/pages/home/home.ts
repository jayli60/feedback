import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  public getList() : void {
    alert("list");    
  }

  public scanQRCode() : void {
    alert("we");
  }

}
