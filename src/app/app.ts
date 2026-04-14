import { Component, signal } from '@angular/core';
import { VehicleSearch } from './components/vehicle-search/vehicle-search';

@Component({
  selector: 'app-root',
  imports: [VehicleSearch],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('vehicle-aggregator-frontend');
}
