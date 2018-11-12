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
  // private apiKey = 'a38fec97bda64fb6af1120457182110'; //apixu
  private apiKey = 'b41f1fd8127b041b263e668f04e9a3d4'; // openweather
  private url: string;

  constructor(public http: HttpClient) {
    this.url = 'http://api.openweathermap.org/data/2.5/'; // openweather
    // this.url = 'https://api.apixu.com/v1/forecast.json?key='+ this.apiKey +'&q='; //apixu
  }

  getWeater(city) {
    // return this.http.get(this.url+city+'&days=5').map(res => res); //apixu
    return this.http.get(this.url+'weather?q='+city+',mn&units=metric&appid='+this.apiKey).map(res => res); // openweather
  }

  getForecastWeater(city) {
    return this.http.get(this.url+'forecast?q='+city+',mn&units=metric&appid='+this.apiKey).map(res => res); // openweather
  }
} 
// https://api.apixu.com/v1/forecast.json?key=a38fec97bda64fb6af1120457182110&q=mecherfeh-hims-syria-2338880 //apixu
// http://api.openweathermap.org/data/2.5/weather?q=Ulaanbaatar,mn&appid=b41f1fd8127b041b263e668f04e9a3d4 // openweather