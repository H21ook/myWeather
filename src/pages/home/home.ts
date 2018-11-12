import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController, Slides } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Network } from '@ionic-native/network';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private weather: any;
  private forecastdays: any = [];
  private forecastPreData: any = [];
  private weekday = ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"];

  @ViewChild('mySlider') slider: Slides;
  
  constructor(
    public navCtrl: NavController,
    private weatherProvider: WeatherProvider,
    private toast: ToastController,
    private network: Network,
    private splashScreen: SplashScreen
  ) {
    
  }

  ionViewDidLoad() {  
    this.weatherProvider.getWeater('Ulaanbaatar').subscribe(data => {
      this.weather = data;
    });

    this.weatherProvider.getForecastWeater('Ulaanbaatar').subscribe(data => {
      let weatherForecast: any = data;

      let forecastday = [], dt,dtTemp,k = -1;

      dt = new Date();

      for(let i = 0; i < weatherForecast.list.length; i++) {
        dtTemp = new Date((weatherForecast.list[i].dt * 1000) - (8 * 60 * 60 * 1000));
        if(dt.getDate() == dtTemp.getDate() && k == -1) {
          k = 0;
        }
        if(k < 5 && k > -1)
          if(dt.getDate() == dtTemp.getDate())
          {
            forecastday.push(weatherForecast.list[i]);
          }
          else {
            this.forecastdays.push(forecastday.slice());
            forecastday = [];
            k++;

            dt = new Date((weatherForecast.list[i].dt * 1000) - (8 * 60 * 60 * 1000));
            forecastday.push(weatherForecast.list[i]);
          }
      }
      
      forecastday = [];
      this.getPrepareData(this.forecastdays);
      
      console.log("ForecastData", this.forecastPreData);
    });

    this.network.onDisconnect().subscribe(() => {
      this.presentToast({message:'network was disconnected :-(', duration: 2000, position: 'top'});
      console.log('network was disconnected :-(');
    });

    this.network.onConnect().subscribe(() => {
      this.presentToast({message:'Network connected!', duration: 2000, position: 'top'});
      console.log('Network connected!');
    }); 
  }

  getPrepareData(datas){
    let date;
    let param : any;
    let totalTemp = 0, totalHumidity = 0, totalWindSpeed = 0;
    let minTemp:any, maxTemp:any;

    for(let i = 0; i < datas.length; i++)
    {
      minTemp = datas[i][0].main.temp;
      maxTemp = datas[i][0].main.temp;

      for(let j = 0; j < datas[i].length; j++) {
        totalTemp += datas[i][j].main.temp; 
        totalHumidity += datas[i][j].main.humidity;
        totalWindSpeed += datas[i][j].wind.speed;

        if(minTemp > datas[i][j].main.temp)
          minTemp = datas[i][j].main.temp;
        if(maxTemp < datas[i][j].main.temp)
          maxTemp = datas[i][j].main.temp;
      }

      date = new Date((datas[i][0].dt * 1000) - (8 * 60 * 60 * 1000));
      var options = { year: 'numeric', month: 'numeric', day: 'numeric' };

      if(i == 0) {
        param = {
          date: this.weekday[date.getDay()],
          dateFull: date.toLocaleDateString('en-GB', options),
          weather: this.weather.weather,
          temp: this.weather.main.temp,
          humidity: this.weather.main.humidity,
          windSpeed:this.weather.wind.speed,
          temp_min: Math.round(minTemp),
          temp_max: Math.round(maxTemp),
        }
      }
      else {
        
        param = {
          date: this.weekday[date.getDay()],
          dateFull: date.toLocaleDateString('en-GB', options),
          weather: datas[i][3].weather,
          temp: Math.round(totalTemp / datas[i].length),
          humidity: Math.round(totalHumidity / datas[i].length),
          windSpeed: Math.round(totalWindSpeed / datas[i].length),
          temp_min: Math.round(minTemp),
          temp_max: Math.round(maxTemp)
        }
      }

      this.forecastPreData.push(param);

      totalTemp = 0;
      totalHumidity = 0; 
      totalWindSpeed = 0;
      minTemp = 0;
      maxTemp = 0;
      param = {};
    }
    
  }
  ionViewWillEnter() {
    this.splashScreen.hide();
  }
  changeDay(e: number) {
    if (e != this.slider.getActiveIndex())
      this.slider.slideTo(e, 300);
  }

  presentToast(opt?) {
    let toast;
    if(opt)
      toast = this.toast.create(opt);
    else
      toast = this.toast.create({
        message: "OK",
        duration: 2000,
        position: 'top'
      });
    toast.present();
  }
}
