import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-add-ons',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-ons.component.html',
  styleUrl: './add-ons.component.css'
})
export class AddOnsComponent {
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
          this.showError('Valid booking not found.');
          return;
        }
        this.booking = b;
      },
      error: () => this.showError('Booking not found.')
    });
  }

  purchaseAddon(name: string, price: number) {
    if (!this.booking) return;
    this.saving = true;
    this.error = false;
    this.successMsg = '';

    const newPrice = (this.booking.totalPrice || 0) + price;

    this.flightService.updateBooking(this.booking.id as string, { totalPrice: newPrice }).subscribe({
      next: () => {
        this.saving = false;
        if (this.booking) this.booking.totalPrice = newPrice;
        this.successMsg = `Successfully added ${name} to your booking!`;
      },
      error: () => {
        this.saving = false;
        this.showError('Failed to process add-on purchase.');
      }
    });
  }

  private showError(msg: string) {
    this.loading = false;
    this.saving = false;
    this.error = true;
    this.errorMessage = msg;
  }
}
