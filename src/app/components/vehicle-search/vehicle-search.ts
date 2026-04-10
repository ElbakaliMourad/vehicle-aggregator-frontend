import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../services/vehicle';
import { VehicleSummary } from '../../models/vehicle-summary';

@Component({
  selector: 'app-vehicle-search',
  standalone: true,
  imports: [],
  templateUrl: './vehicle-search.html',
  //styleUrl: './vehicle-search.css',
})
export class VehicleSearch {

  // 1. STATE VARIABLES changed to SIGNALS
  // A signal acts as a wrapper around data that instantly alerts the HTML when it changes.
  vehicleData = signal<VehicleSummary | null>(null);
  errorMessage = signal<string>('');

  // 2. DEPENDENCY INJECTION
  // We ask Angular to give us an instance of VehicleService
  constructor(private vehicleService: VehicleService) { }

  // 3. THE SEARCH FUNCTION
  // This runs when we click the "Decode VIN" button
  onSearch(vin: string) {
    // 2. USE .set() TO UPDATE SIGNALS
    this.errorMessage.set('');
    this.vehicleData.set(null);

    // Safety check: Don't search if the box is empty
    if (!vin) {
      this.errorMessage.set('Please enter a VIN.');
      return;
    }

    // 4. THE SUBSCRIPTION
    // We call service, which returns the Observable (the empty pipe).
    // .subscribe() attaches us to the end of the pipe to wait for the data.
    this.vehicleService.getVehicleDetails(vin).subscribe({

      // If Java sends back a 200 OK success response...
      next: (data) => {
        console.log("SUCCESS! Data received from Java:", data);
        // This .set() guarantees the HTML will instantly redraw
        this.vehicleData.set(data);
      },

      // If Java sends back a 404 Not Found or 500 Error...
      error: (err) => {
        console.error("ERROR:", err);
        this.errorMessage.set('Could not find that vehicle. Check the VIN and try again.');
      }

    });
  }
}
