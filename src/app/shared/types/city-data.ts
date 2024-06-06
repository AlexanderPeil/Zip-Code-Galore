export interface City {
    countryAbb: string;
    places: Place[];
    country: string;
    placeName: string;
    state: string;
    stateAbb: string;
}

export interface Place {
    placeName: string;
    longitude: string;
    latitude: string;
    postCode: string;
}

export interface RawPlace {
    'place name': string;
    longitude: string;
    latitude: string;
    'post code': string;
  }
  
  export interface RawCity {
    'country abbreviation': string;
    places: RawPlace[];
    country: string;
    'place name': string;
    state: string;
    'state abbreviation': string;
  }
  