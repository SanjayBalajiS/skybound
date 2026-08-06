export interface Booking {
  id?: string;
  flightId: string;
  passengerName: string;
  email: string;
  status: 'Confirmed' | 'On Hold' | 'Cancelled';
  seatNumber?: string;
  cabinClass?: string;
  passengers?: number;
  totalPrice?: number;
  confirming?: boolean;
  checkedIn?: boolean;
}
