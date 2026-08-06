import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { Booking } from '../../models/booking.model';
import { Flight } from '../../models/flight.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit {
  booking: Booking | null = null;
  flight: Flight | null = null;
  loading = true;
  error = false;
  downloading = false;

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    const bookingId = this.route.snapshot.paramMap.get('id');
    if (bookingId) {
      this.flightService.getBookingById(bookingId).subscribe({
        next: (bookingData) => {
          this.booking = bookingData;
          this.flightService.getFlightById(this.booking.flightId).subscribe({
            next: (flightData) => {
              this.flight = flightData;
              this.loading = false;
            },
            error: () => {
              this.error = true;
              this.loading = false;
            }
          });
        },
        error: () => {
          this.error = true;
          this.loading = false;
        }
      });
    } else {
      this.error = true;
      this.loading = false;
    }
  }

  downloadPDF() {
    const ticketElement = document.getElementById('ticket-content');
    if (ticketElement) {
      this.downloading = true;
      html2canvas(ticketElement, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
        pdf.save(`Ticket_${this.booking?.id}.pdf`);
        this.downloading = false;
      });
    }
  }
}
