import { Component, Input } from '@angular/core';
import { City } from 'src/app/shared/types/city-data';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss']
})
export class CityDetailComponent {
  @Input() cityData!: City;
  panelOpenState: boolean = false;


}
