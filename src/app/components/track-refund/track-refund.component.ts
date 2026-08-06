import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-track-refund',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './track-refund.component.html',
  styleUrl: './track-refund.component.css'
})
export class TrackRefundComponent {
  bookingId = '';
  booking: Booking | null = null;
  loading = false;
  error = false;
  errorMessage = '';

  constructor(private flightService: FlightService) {}

  trackRefund() {
    if (!this.bookingId) return;
    
    this.loading = true;
    this.error = false;
    this.booking = null;

    this.flightService.getBookingById(this.bookingId).subscribe({
      next: (b) => {
        this.loading = false;
        if (!b) {
          this.showError('Booking not found.');
          return;
        }
        if (b.status !== 'Cancelled') {
          this.showError('This booking is not cancelled, so no refund is active.');
          return;
        }
        this.booking = b;
      },
      error: () => this.showError('Booking not found.')
    });
  }

  private showError(msg: string) {
    this.loading = false;
    this.error = true;
    this.errorMessage = msg;
  }
}
