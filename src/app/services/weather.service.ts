import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { WeatherResponse } from '../models/WeatherResponse';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  constructor(private http: HttpClient) { }
  
  getCurrentWeather(city: string):Observable<WeatherResponse>{
    return this.http.get<WeatherResponse>(`${environment.weatherApiBaseUrl}/${city}`)
    .pipe(catchError(this.handleError));
  }

  getForecast(city: string, forecastType: string):Observable<any>{
    return this.http.get<any>(`${environment.weatherApiBaseUrl}/${city}/forecast/${forecastType}`)
    .pipe(catchError(this.handleError));
  }

  
  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
