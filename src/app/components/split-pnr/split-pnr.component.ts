import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-split-pnr',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './split-pnr.component.html',
  styleUrl: './split-pnr.component.css'
})
export class SplitPnrComponent {
  bookingId = '';
  booking: Booking | null = null;
  loading = false;
  saving = false;
  error = false;
  errorMessage = '';
  successMsg = '';

  constructor(private flightService: FlightService) {}

  searchBooking() {
    if (!this.bookingId) return;
    
    this.loading = true;
    this.error = false;
    this.successMsg = '';
    this.booking = null;

    this.flightService.getBookingById(this.bookingId).subscribe({
      next: (b) => {
        this.loading = false;
        if (!b || b.status === 'Cancelled') {
          this.showError('Valid active booking not found.');
          return;
        }
        this.booking = b;
      },
      error: () => this.showError('Booking not found.')
    });
  }

  splitPnr() {
    this.saving = true;
    
    // Simulate backend processing for splitting a PNR
    setTimeout(() => {
      this.saving = false;
      const newPnr = 'b' + Math.floor(Math.random() * 1000);
      this.successMsg = `Success! The selected passengers have been moved to a new booking with ID: ${newPnr}.`;
    }, 1500);
  }

  private showError(msg: string) {
    this.loading = false;
    this.error = true;
    this.errorMessage = msg;
  }
}
