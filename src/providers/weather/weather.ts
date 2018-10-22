import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {
  private apiKey = 'a38fec97bda64fb6af1120457182110';
  private url: string;

  constructor(public http: HttpClient) {
    this.url = 'https://api.apixu.com/v1/forecast.json?key='+ this.apiKey +'&q=';
  }

  getWeater(city) {
    return this.http.get(this.url+city+'&days=7').map(res => res);
  }
} 
// https://api.apixu.com/v1/forecast.json?key=a38fec97bda64fb6af1120457182110&q=mecherfeh-hims-syria-2338880
