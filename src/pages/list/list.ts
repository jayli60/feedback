import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppGlobalServiceProvider } from '../../providers/app-global-service/app-global-service';
import { IHousehold, Household } from '../../app/entities/household';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  items: Array<{household: IHousehold, icon: string}>;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public appService : AppGlobalServiceProvider
    ) {
  }

  private setItems(list : IHousehold[]) : void {
    this.items = [];
    for (let i = 0; i < list.length ; i++) {
      this.items.push({ household : list[i] , icon : "person" });
    }
  }

  private doRefresh(refresher){
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  ionViewDidEnter(){
    let list = this.appService.getCurrentHouseholdList();
    this.setItems(list);
  }

  itemTapped(event, item) {
  }
}
