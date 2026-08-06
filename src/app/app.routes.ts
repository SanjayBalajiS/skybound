import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FlightResultsComponent } from './components/flight-results/flight-results.component';
import { BookingComponent } from './components/booking/booking.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { FlightStatusComponent } from './components/flight-status/flight-status.component';
import { CheckInComponent } from './components/check-in/check-in.component';
import { AddOnsComponent } from './components/add-ons/add-ons.component';
import { TrackRefundComponent } from './components/track-refund/track-refund.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SplitPnrComponent } from './components/split-pnr/split-pnr.component';
import { StaticPageComponent } from './components/static-page/static-page.component';
import { ScratchCardComponent } from './components/scratch-card/scratch-card.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'flights', component: FlightResultsComponent, canActivate: [authGuard] },
  { path: 'book/:id', component: BookingComponent, canActivate: [authGuard] },
  { path: 'my-bookings', component: MyBookingsComponent, canActivate: [authGuard] },
  { path: 'ticket/:id', component: TicketComponent, canActivate: [authGuard] },
  { path: 'flight-status', component: FlightStatusComponent, canActivate: [authGuard] },
  { path: 'check-in', component: CheckInComponent, canActivate: [authGuard] },
  { path: 'add-ons', component: AddOnsComponent, canActivate: [authGuard] },
  { path: 'track-refund', component: TrackRefundComponent, canActivate: [authGuard] },
  { path: 'invoice', component: InvoiceComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'split-pnr', component: SplitPnrComponent, canActivate: [authGuard] },
  { path: 'scratch-card', component: ScratchCardComponent, canActivate: [authGuard] },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'destinations', component: DestinationsComponent },
  { path: 'info/:topic', component: StaticPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' }
];
