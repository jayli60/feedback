import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AppGlobalServiceProvider } from '../../providers/app-global-service/app-global-service';
import { IAddress } from '../../app/entities/address';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentLocation : any;
  markerList : any[] = [];

  constructor(public geolocation : Geolocation
    ,public appService : AppGlobalServiceProvider) {

  }

//  ionViewDidLoad() {
  ionViewDidEnter() {
    this.loadMap();
  }

  private pinCurrent() : void {
    this.geolocation.getCurrentPosition().then((position) => {
      this.currentLocation = position;
      let options = new MapMarkerOption();
      options.useAnimation = true;
      options.icon = "pin";
      this.setPin(position.coords.latitude, position.coords.longitude, options);
    }, (err) => {
      console.log(err);
    });

  }

  private pinAll() : void {
    let householdList = this.appService.getCurrentHouseholdList();
    let self = this;
    householdList.forEach(function(hh){
      let options = new MapMarkerOption();
      options.useAnimation = false;
      self.setPin(hh.Address.Latitude, hh.Address.Longitude, options);
    });
  }

  private clearPins() : void {
    this.markerList.forEach(function(m){
      m.setMap(null);
    });
    this.markerList = [];
  }

  private setPin(latitude : number, longitude : number, options : MapMarkerOption) : void {
    let latLng = new google.maps.LatLng(latitude, longitude);
    
    let marker = new google.maps.Marker({
      map: this.map,
      position: latLng,
      animation: options && options.useAnimation ? google.maps.Animation.DROP : null,
      icon : options && options.icon ? this.mapIconImage(options.icon) : null,
    });

    this.markerList.push(marker);
  }

  private mapIconImage(icon : string) : string {
    let result : string = icon;
    let path : string = "assets/images/";
    switch (icon.toLowerCase()) {
      case "check" : result = path + "pin-check.png"; break;
      case "green" : result = path + "pin-green.png"; break;
      case "home" : result = path + "pin-home.png"; break;
      case "pin" : result = path + "pin.png"; break;
      case "person" : result = path + "pin-person.png"; break;
      case "red" : result = path + "pin-red.png"; break;
      case "yellow" : result = path + "pin-yellow.png"; break;
    }
    return result;
  }


  private setMapByCenter(latitude : number, longitude : number) : void {
    let latLng = new google.maps.LatLng(latitude, longitude);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);      
  }
      

  private loadMap() : void {
    this.geolocation.getCurrentPosition().then((position) => {
      this.currentLocation = position;
      this.setMapByCenter(position.coords.latitude, position.coords.longitude);
      let hh = this.appService.getCurrentHousehold();
      if (hh != null && hh.Address){
        this.setPin(hh.Address.Latitude, hh.Address.Longitude, null);
      }

    }, (err) => {
      console.log(err);
    });

  }

}

export class MapMarkerOption {
  constructor(){}
  public icon : string;
  public useAnimation : boolean;
}
