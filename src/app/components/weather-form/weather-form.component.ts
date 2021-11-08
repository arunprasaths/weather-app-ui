import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css']
})
export class WeatherFormComponent {
  title: string = "Weather App";
  currentWeather:any = {};
  minutely:any = {};
  hourly: any = {};
  daily: any = {};
  email: string='';
  city:string ='';
  forecastType: string = '';
  unit: string = '';

  constructor(private weatherService:WeatherService){
  }

  onInputSubmit(){
    this.getWeather(this.city);
  }

  getWeather(city: string) {
    this.weatherService.getCurrentWeather(city)
      .subscribe(res => {
        this.currentWeather = res;
     //   console.log(this.currentWeather);
      }, err => {
        console.log(err);        
      });
  }

  getForecast(forecastType:string){
    this.weatherService.getForecast(this.currentWeather.Name,forecastType)
    .subscribe(res => {
      console.log(res);
      this.setForecastData(forecastType,res);
    }, err => {
      console.log(err);        
    });
  }

  resetForecastData(){
    this.minutely = {};
    this.hourly = {};
    this.daily = {};
  }

  setForecastData(forecastType:string, res:any){
    //reset the data
    this.resetForecastData();
    
    if(forecastType == '1hour')
    {
      this.minutely = res;
    }
    if(forecastType == '2day')
    {
      this.hourly = res;
    }
    if(forecastType == '7day')
    {
      this.daily = res;
    }
  }

  onTabClick(event:any) {
    let selectedTabName = event.tab.textLabel;
    
    if(selectedTabName == '1 HOUR'){
      this.getForecast('1hour');
    }
    if(selectedTabName == '2 DAY'){
      this.getForecast('2day');
    }
    if(selectedTabName == '7 DAY'){
      this.getForecast('7day');
    }
  }



}
