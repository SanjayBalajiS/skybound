import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flight-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flight-status.component.html',
  styleUrl: './flight-status.component.css'
})
export class FlightStatusComponent {
  searchQuery = '';
  flight: Flight | null = null;
  loading = false;
  error = false;

  constructor(private flightService: FlightService) {}

  searchFlight() {
    if (!this.searchQuery) return;
    
    this.loading = true;
    this.error = false;
    this.flight = null;

    this.flightService.getFlightByNumber(this.searchQuery).subscribe({
      next: (flights) => {
        this.loading = false;
        if (flights && flights.length > 0) {
          this.flight = flights[0];
        } else {
          this.error = true;
        }
      },
      error: () => {
        this.loading = false;
        this.error = true;
      }
    });
  }
}
