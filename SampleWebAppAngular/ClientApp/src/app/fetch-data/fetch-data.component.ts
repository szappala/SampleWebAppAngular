import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  headersData: HttpHeaders = null;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this.headersData = new HttpHeaders().set("X-Requested-With", "XMLHttpRequest");
    this.headersData = this.headersData.set("Access-Control-Allow-Origin", "*");

    this.http.get<WeatherForecast[]>(baseUrl + 'api/weatherforecast',
      {
        headers: this.headersData,
        withCredentials: true
      }).subscribe(result => {
        this.forecasts = result;
      }, error => console.error(error));
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
