import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private weather: any;
  private forecastdays: any = [];
  constructor(public navCtrl: NavController,
    private weatherProvider: WeatherProvider) {
    this.weatherProvider.getWeater('Ulaanbaatar').subscribe(data => {
      this.weather = data;
      for(let i = 1; i < this.weather.forecast.forecastday.length; i++) {
        this.forecastdays.push(this.weather.forecast.forecastday[i]);
      }
      console.log(this.weather);
    });
  }

  ionViewDidLoad() {
    
  }
}
