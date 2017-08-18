import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppGlobalServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AppGlobalServiceProvider Provider');
  }

}
