import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CityDataService } from 'src/app/shared/services/city-data.service';
import { City, RawCity } from 'src/app/shared/types/city-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cityForm: FormGroup;
  cityData: City | null = null;
  errorMessage: string | null = null;


  constructor(private fb: FormBuilder, private cityDataService: CityDataService) {
    this.cityForm = this.fb.group({
      city: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.cityForm.valid) {
      const selectedCity = this.cityForm.get('city')?.value;
      this.getCityData(selectedCity);
    }
  }


  getCityData(city: string) {
    let url = '';
    switch (city) {
      case 'berlin':
        url = 'https://api.zippopotam.us/de/be/berlin';
        break;
      case 'london':
        url = 'https://api.zippopotam.us/gb/eng/london';
        break;
      default:
        this.errorMessage = `No data available for ${city}`;
        this.cityData = null;
        return;
    }

    this.cityDataService.getCityData(url).subscribe(
      data => {
        this.cityData = this.transformCityData(data);
        this.errorMessage = null;
      },
      error => {
        this.errorMessage = 'Error fetching city data';
        this.cityData = null;
      }
    );
  }

  transformCityData(data: RawCity): City {
    return {
      countryAbb: data['country abbreviation'],
      places: data.places.map((place: any) => ({
        placeName: place['place name'],
        longitude: place.longitude,
        latitude: place.latitude,
        postCode: place['post code']
      })),
      country: data.country,
      placeName: data['place name'],
      state: data.state,
      stateAbb: data['state abbreviation']
    };
  }

}
