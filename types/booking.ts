export interface Booking {
  id: string;
  passengerName: string;
  passengerEmail?: string;
  routeFrom: string;
  routeTo: string;
  travelDate: string;
  busNo: string;
  seats: string[];
  agency: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}
