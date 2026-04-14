import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleSummary } from '../models/vehicle-summary';
import { RecallResponse } from '../models/recall-response';

/**
 * Service responsible for communicating with the Spring Boot backend API.
 * Handles non-blocking HTTP requests for vehicle specifications and safety recalls.
 */
@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly API_URL = 'http://localhost:8080/api/vehicles';

  constructor(private http: HttpClient) { }

  /**
   * Fetches a summarized vehicle profile based on the provided VIN.
   * @param vin The 17-character Vehicle Identification Number.
   * @returns An Observable emitting the strongly-typed VehicleSummary data.
   */
  getVehicleDetails(vin: string): Observable<VehicleSummary> {
    return this.http.get<VehicleSummary>(`${this.API_URL}/${vin}`);
  }

  /**
   * Fetches safety recalls for a specific vehicle from the backend.
   * @param vin The 17-character Vehicle Identification Number.
   * @returns An Observable emitting the top-level RecallResponse payload.
   */
  getVehicleRecalls(vin: string): Observable<RecallResponse> {
    return this.http.get<RecallResponse>(`${this.API_URL}/${vin}/recalls`);
  }
}