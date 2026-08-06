import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  searchForm: FormGroup;
  searchError = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      airline: [''],
      origin: [''],
      destination: [''],
      date: [''],
      passengers: [1],
      cabinClass: ['Economy']
    });
  }

  onSearch() {
    this.searchError = false;
    const { airline, origin, destination, date, passengers, cabinClass } = this.searchForm.value;

    if (!airline && !origin && !destination && !date) {
      this.searchError = true;
      return;
    }

    // Clean up empty parameters
    const queryParams: any = {};
    if (airline) queryParams.airline = airline;
    if (origin) queryParams.origin = origin;
    if (destination) queryParams.destination = destination;
    if (date) queryParams.date = date;
    if (passengers) queryParams.passengers = passengers;
    if (cabinClass) queryParams.cabinClass = cabinClass;

    this.router.navigate(['/flights'], { queryParams });
  }
}
