import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { Booking } from '../../models/booking.model';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {
  bookingId = '';
  booking: Booking | null = null;
  flight: Flight | null = null;
  loading = false;
  error = false;
  errorMessage = '';
  date = new Date();

  constructor(private flightService: FlightService) {}

  generateInvoice() {
    if (!this.bookingId) return;
    
    this.loading = true;
    this.error = false;
    this.booking = null;
    this.flight = null;

    this.flightService.getBookingById(this.bookingId).subscribe({
      next: (b) => {
        if (!b || b.status !== 'Confirmed') {
          this.showError('Only confirmed bookings have an invoice.');
          return;
        }
        this.booking = b;
        
        // fetch flight details
        this.flightService.getFlightById(b.flightId).subscribe({
          next: (f) => {
            this.loading = false;
            this.flight = f;
          },
          error: () => this.showError('Could not fetch flight details for this invoice.')
        });
      },
      error: () => this.showError('Booking not found.')
    });
  }

  getBaseFare(): number {
    if (!this.booking) return 0;
    const total = this.booking.totalPrice || 0;
    return Math.round(total / 1.18);
  }

  getTaxAmount(): number {
    if (!this.booking) return 0;
    const total = this.booking.totalPrice || 0;
    return total - Math.round(total / 1.18);
  }

  private showError(msg: string) {
    this.loading = false;
    this.error = true;
    this.errorMessage = msg;
  }
}
