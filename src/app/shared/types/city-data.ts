export interface Place {
  placeName: string;
  longitude: string;
  latitude: string;
  state: string;
  stateAbb: string;
}

export interface City {
  countryAbb: string;
  postCode: string;
  places: Place[];
  country: string;
}

export interface RawPlace {
  'place name': string;
  longitude: string;
  latitude: string;
  state: string;
  'state abbreviation': string;
}

export interface RawCity {
  'country abbreviation': string;
  'post code': string;
  places: RawPlace[];
  country: string;
}
