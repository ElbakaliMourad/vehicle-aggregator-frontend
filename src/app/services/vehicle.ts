import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleSummary } from '../models/vehicle-summary';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly API_URL = 'http://localhost:8080/api/vehicles';

  constructor(private http: HttpClient) { }

  getVehicleDetails(vin: string): Observable<VehicleSummary> {
    return this.http.get<VehicleSummary>(`${this.API_URL}/${vin}`);
  }
}