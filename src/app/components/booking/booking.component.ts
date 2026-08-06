import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { AuthService } from '../../services/auth.service';
import { Flight } from '../../models/flight.model';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  flight: Flight | null = null;
  bookingForm: FormGroup;
  loading = true;
  bookingStatus: 'idle' | 'submitting' | 'success' | 'error' = 'idle';
  
  passengers = 1;
  cabinClass = 'Economy';
  adjustedPrice = 0;

  seats = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C', '4A', '4B', '4C'];
  selectedSeat: string = '';

  showPaymentGateway = false;
  processingPayment = false;
  paymentSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private flightService: FlightService,
    private authService: AuthService,
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      passengerName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    const flightId = this.route.snapshot.paramMap.get('id');
    
    this.route.queryParams.subscribe(params => {
      if (params['passengers']) this.passengers = parseInt(params['passengers'], 10);
      if (params['cabinClass']) this.cabinClass = params['cabinClass'];
    });

    if (flightId) {
      this.flightService.getFlightById(flightId).subscribe({
        next: (data) => {
          this.flight = data;
          this.calculatePrice();
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }

  calculatePrice() {
    if (!this.flight) return;
    let multiplier = 1;
    if (this.cabinClass === 'Business') multiplier = 2.5;
    if (this.cabinClass === 'First') multiplier = 4.0;
    this.adjustedPrice = this.flight.price * multiplier * this.passengers;
  }

  selectSeat(seat: string) {
    this.selectedSeat = seat;
  }

  onHold() {
    this.submitBooking('On Hold');
  }

  proceedToPayment() {
    if (this.bookingForm.valid && this.flight && this.selectedSeat) {
      this.showPaymentGateway = true;
    }
  }

  processPayment() {
    this.processingPayment = true;
    
    // Simulate payment processing delay
    setTimeout(() => {
      this.processingPayment = false;
      this.paymentSuccess = true;
      
      // Submit booking automatically after payment succeeds
      setTimeout(() => {
        this.submitBooking('Confirmed');
      }, 1000);
    }, 1500);
  }

  submitBooking(status: 'Confirmed' | 'On Hold') {
    if (this.bookingForm.valid && this.flight && this.selectedSeat) {
      this.bookingStatus = 'submitting';
      const bookingData: Booking = {
        flightId: this.flight.id,
        passengerName: this.bookingForm.value.passengerName,
        email: this.bookingForm.value.email,
        status: status,
        seatNumber: this.selectedSeat,
        cabinClass: this.cabinClass,
        passengers: this.passengers,
        totalPrice: this.adjustedPrice
      };

      this.flightService.bookFlight(bookingData).subscribe({
        next: (res) => {
          this.bookingStatus = 'success';
          
          if (status === 'Confirmed') {
            const milesEarned = Math.round(this.adjustedPrice * 0.1);
            this.authService.addMiles(milesEarned);
          }

          setTimeout(() => {
            this.router.navigate(['/my-bookings']);
          }, 2000);
        },
        error: () => {
          this.bookingStatus = 'error';
        }
      });
    }
  }
}
