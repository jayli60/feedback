import { Component } from '@angular/core';
import { ActionSheetController, NavController, NavParams } from 'ionic-angular';
import { AppGlobalServiceProvider } from '../../providers/app-global-service/app-global-service';
import { IHousehold, Household } from '../../app/entities/household';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem : any;
  items: Array<{household: IHousehold, icon: string}>;

  constructor(public navCtrl: NavController
    , public actionSheetCtrl: ActionSheetController
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

  private itemTapped(event, item) : void {
    this.selectedItem = item;
    this.doAction();
  }

  private doAction() : void {
    let address : string = this.selectedItem.household.Address.Address1;

    let actionSheet = this.actionSheetCtrl.create({
      title: address,
      buttons: [
        {
          text: 'Start Question',
          handler: () => {
            this.startQuestion(this.selectedItem.household);
          }
        },{
          text: 'Mark On Map',
          handler: () => {
            console.log('Map');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  } //doAction

  private startQuestion(household : IHousehold) {
    alert(household.id);
  }


}
