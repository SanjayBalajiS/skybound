import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { AuthService } from '../../services/auth.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;

  constructor(private flightService: FlightService, private authService: AuthService) {}

  ngOnInit(): void {
    this.flightService.getBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  confirmBooking(booking: any) {
    booking.confirming = true;
    this.flightService.updateBooking(booking.id, { status: 'Confirmed' }).subscribe({
      next: (updatedBooking) => {
        booking.status = 'Confirmed';
        booking.confirming = false;
        
        // Add miles (10% of total price)
        const milesEarned = Math.round((booking.totalPrice || 500) * 0.1);
        this.authService.addMiles(milesEarned);
      },
      error: () => {
        booking.confirming = false;
        alert('Failed to confirm booking.');
      }
    });
  }

  cancelBooking(booking: any) {
    if (confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      booking.confirming = true;
      this.flightService.updateBooking(booking.id, { status: 'Cancelled' }).subscribe({
        next: () => {
          booking.status = 'Cancelled';
          booking.confirming = false;
        },
        error: () => {
          booking.confirming = false;
          alert('Failed to cancel booking.');
        }
      });
    }
  }
}
