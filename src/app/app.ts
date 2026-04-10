import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VehicleSearch } from './components/vehicle-search/vehicle-search';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, VehicleSearch],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('vehicle-aggregator-frontend');
}
