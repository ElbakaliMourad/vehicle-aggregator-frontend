import { Component } from '@angular/core';
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

  // 1. STATE VARIABLES
  // These hold the data so the HTML can show it later
  vehicleData: VehicleSummary | null = null;
  errorMessage: string = '';

  // 2. DEPENDENCY INJECTION
  // We ask Angular to give us an instance of VehicleService
  constructor(private vehicleService: VehicleService) { }

  // 3. THE SEARCH FUNCTION
  // This runs when we click the "Decode VIN" button
  onSearch(vin: string) {
    // Clear out any old data from a previous search
    this.errorMessage = '';
    this.vehicleData = null;

    // Safety check: Don't search if the box is empty
    if (!vin) {
      this.errorMessage = 'Please enter a VIN.';
      return;
    }

    // 4. THE SUBSCRIPTION
    // We call service, which returns the Observable (the empty pipe).
    // .subscribe() attaches us to the end of the pipe to wait for the data.
    this.vehicleService.getVehicleDetails(vin).subscribe({

      // If Java sends back a 200 OK success response...
      next: (data) => {
        console.log("SUCCESS! Data received from Java:", data);
        this.vehicleData = data;
      },

      // If Java sends back a 404 Not Found or 500 Error...
      error: (err) => {
        console.error("ERROR! Something went wrong:", err);
        this.errorMessage = 'Could not find that vehicle. Check the VIN and try again.';
      }

    });
  }
}
