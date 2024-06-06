import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CityDataService } from 'src/app/shared/services/city-data.service';
import { City, RawCity, RawPlace } from 'src/app/shared/types/city-data';
import { cityConfig } from 'src/app/shared/types/zip-codes';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cityForm: FormGroup;
  cityData: City | null = null;
  errorMessage: boolean = false;
  errorCity: string | null = null;


  constructor(
    private fb: FormBuilder,
    private cityDataService: CityDataService,
    private dialog: MatDialog) {
    this.cityForm = this.fb.group({
      city: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.cityForm.valid) {
      const selectedCity = this.cityForm.get('city')?.value;
      const zipCode = cityConfig[selectedCity.toLowerCase()];
      if (zipCode) {
        this.getCityData(selectedCity, zipCode);
      } else {
        this.displayErrorMessage(this.capitalizeFirstLetter(selectedCity));
        this.cityData = null;
      }
    }
  }

  getCityData(city: string, zipCode: string) {
    const countryCode = this.getCountryCode(city);
    const url = `https://api.zippopotam.us/${countryCode}/${zipCode}`;
    this.cityDataService.getCityData(url).subscribe(
      data => {
        this.cityData = this.transformCityData(data);
        this.errorMessage = false;
        this.errorCity = null;
      },
      error => {
        console.error('Error fetching city data', error);
        this.displayErrorMessage(this.capitalizeFirstLetter(city));
        this.cityData = null;
      }
    );
  }


  getCountryCode(city: string): string {
    switch (city.toLowerCase()) {
      case 'berlin':
        return 'de';
      case 'london':
        return 'gb';
      case 'paris':
        return 'fr';
      case 'madrid':
        return 'es';
      case 'rome':
        return 'it';
      case 'cairo':
        return 'eg';
      case 'new-delhi':
        return 'in';
      default:
        return '';
    }
  }


  transformCityData(data: RawCity): City {
    return {
      countryAbb: data['country abbreviation'],
      postCode: data['post code'],
      places: data.places.map((place: RawPlace) => ({
        placeName: place['place name'],
        longitude: place.longitude,
        latitude: place.latitude,
        state: place.state,
        stateAbb: place['state abbreviation']
      })),
      country: data.country
    };
  }


  displayErrorMessage(city: string) {
    this.dialog.open(DialogErrorComponent, {
      data: { city }
    });
  }


  capitalizeFirstLetter(city: string): string {
    return city.charAt(0).toUpperCase() + city.slice(1);
  }

}
