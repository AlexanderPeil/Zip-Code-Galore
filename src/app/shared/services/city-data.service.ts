import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RawCity } from '../types/city-data';

@Injectable({
  providedIn: 'root'
})
export class CityDataService {
  baseApi = 'https://www.zippopotam.us/';

  constructor(private http: HttpClient) { }

  getCityData(url: string): Observable<RawCity> {
    return this.http.get<RawCity>(url);
  }

}
