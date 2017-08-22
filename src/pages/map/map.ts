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

  constructor(public geolocation : Geolocation
    ,public appService : AppGlobalServiceProvider) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  private loadMap() : void {
    this.geolocation.getCurrentPosition().then((position) => {
      this.currentLocation = position;

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);      

    }, (err) => {
      console.log(err);
    });

  }

}
