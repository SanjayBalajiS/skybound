import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flight-results',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './flight-results.component.html',
  styleUrl: './flight-results.component.css'
})
export class FlightResultsComponent implements OnInit {
  flights: Flight[] = [];
  filteredFlights: Flight[] = [];
  loading = true;
  searchParams: any = {};

  constructor(private route: ActivatedRoute, private flightService: FlightService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchParams = params;
      this.fetchFlights();
    });
  }

  apiError = false;

  fetchFlights() {
    this.loading = true;
    this.apiError = false;
    this.flightService.getFlights().subscribe({
      next: (data) => {
        if (this.searchParams.airline || this.searchParams.origin || this.searchParams.destination || this.searchParams.date) {
          this.filteredFlights = data.filter(f => {
            const matchAirline = !this.searchParams.airline || 
              f.airline.toLowerCase().includes(this.searchParams.airline.toLowerCase()) ||
              f.flightNumber.toLowerCase().includes(this.searchParams.airline.toLowerCase());
            const matchOrigin = !this.searchParams.origin || f.origin.toLowerCase().includes(this.searchParams.origin.toLowerCase());
            const matchDest = !this.searchParams.destination || f.destination.toLowerCase().includes(this.searchParams.destination.toLowerCase());
            
            // Date filtering: match only the YYYY-MM-DD part if provided
            let matchDate = true;
            if (this.searchParams.date) {
              const flightDate = f.departureTime.split('T')[0];
              matchDate = flightDate === this.searchParams.date;
            }
            
            return matchAirline && matchOrigin && matchDest && matchDate;
          });
        } else {
          this.filteredFlights = data;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.apiError = true;
      }
    });
  }

  getAdjustedPrice(basePrice: number): number {
    const passengers = this.searchParams.passengers ? parseInt(this.searchParams.passengers, 10) : 1;
    const cabin = this.searchParams.cabinClass || 'Economy';
    
    let multiplier = 1;
    if (cabin === 'Business') multiplier = 2.5;
    if (cabin === 'First') multiplier = 4.0;

    return basePrice * multiplier * passengers;
  }
}
