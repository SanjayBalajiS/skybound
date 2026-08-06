import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-check-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './check-in.component.html',
  styleUrl: './check-in.component.css'
})
export class CheckInComponent {
  bookingId = '';
  loading = false;
  error = false;
  success = false;
  errorMessage = '';

  constructor(private flightService: FlightService) {}

  checkIn() {
    if (!this.bookingId) return;
    
    this.loading = true;
    this.error = false;
    this.success = false;

    this.flightService.getBookingById(this.bookingId).subscribe({
      next: (booking) => {
        if (!booking) {
          this.showError('Booking not found.');
          return;
        }

        if (booking.status === 'Cancelled') {
          this.showError('This booking has been cancelled.');
          return;
        }

        if (booking.status === 'On Hold') {
          this.showError('Please confirm and pay for your booking before checking in.');
          return;
        }

        if (booking.checkedIn) {
          this.showError('You are already checked in for this flight.');
          return;
        }

        // Update booking to checked in
        this.flightService.updateBooking(booking.id as string, { checkedIn: true }).subscribe({
          next: () => {
            this.loading = false;
            this.success = true;
          },
          error: () => this.showError('Failed to process check-in. Please try again later.')
        });
      },
      error: () => this.showError('Booking not found or network error.')
    });
  }

  private showError(msg: string) {
    this.loading = false;
    this.error = true;
    this.errorMessage = msg;
  }
}
