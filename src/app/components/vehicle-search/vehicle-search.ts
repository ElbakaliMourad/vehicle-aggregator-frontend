import { Component, signal } from '@angular/core';
import { VehicleService } from '../../services/vehicle';
import { VehicleSummary } from '../../models/vehicle-summary';
import { RecallResponse } from '../../models/recall-response';
import { forkJoin } from 'rxjs';

/**
 * Component responsible for capturing user VIN input and orchestrating
 * data retrieval for both vehicle specifications and safety recalls.
 */
@Component({
  selector: 'app-vehicle-search',
  standalone: true,
  imports: [],
  templateUrl: './vehicle-search.html',
})
export class VehicleSearch {

  // Reactive signals holding the state of our backend data
  vehicleData = signal<VehicleSummary | null>(null);
  recallData = signal<RecallResponse | null>(null);

  // Reactive signals managing the UI state
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  /**
   * Injects the VehicleService to handle HTTP communication.
   */
  constructor(private vehicleService: VehicleService) { }

  /**
   * Executes a parallel backend request to fetch vehicle details and recalls.
   * Validates the VIN length before triggering the API calls.
   * @param vin The raw input string provided by the user.
   */
  onSearch(vin: string) {
    // Reset application state before initiating a new search
    this.errorMessage.set('');
    this.vehicleData.set(null);
    this.recallData.set(null);

    const cleanVin = vin.trim();

    // Strict 17-character validation per NHTSA standards
    if (cleanVin.length !== 17) {
      this.errorMessage.set('A valid VIN must be exactly 17 characters long.');
      return;
    }

    this.isLoading.set(true);

    // forkJoin executes both HTTP requests in parallel.
    // It waits for BOTH to return a 200 OK before emitting the final combined object.
    forkJoin({
      details: this.vehicleService.getVehicleDetails(cleanVin),
      recalls: this.vehicleService.getVehicleRecalls(cleanVin)
    }).subscribe({

      next: (results) => {
        console.log("SUCCESS! Specs:", results.details);
        console.log("SUCCESS! Recalls:", results.recalls);

        // Populate the signals, triggering automatic UI updates
        this.vehicleData.set(results.details);
        this.recallData.set(results.recalls);
        this.isLoading.set(false);
      },

      error: (err) => {
        console.error("API request failed:", err);
        this.errorMessage.set('Could not fetch vehicle data. Check the VIN and try again.');
        this.isLoading.set(false);
      }
    });
  }
}