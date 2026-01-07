import { Booking } from "@/types/booking";

export const BOOKINGS_DATA: Booking[] = [
  { id: 'BLKBK001', passengerName: 'Alice Smith', routeFrom: 'Nairobi', routeTo: 'Mombasa', travelDate: '2023-11-20', busNo: 'BUS001', seats: ['A1', 'A2'], agency: 'TravelGo Agency', status: 'Confirmed' },
  { id: 'BLKBK002', passengerName: 'Bob Johnson', routeFrom: 'Kampala', routeTo: 'Kigali', travelDate: '2023-11-21', busNo: 'BUS005', seats: ['B5'], agency: 'Elite Tours', status: 'Pending' },
  { id: 'BLKBK003', passengerName: 'Carol White', routeFrom: 'Dar es Salaam', routeTo: 'Arusha', travelDate: '2023-11-22', busNo: 'BUS003', seats: ['C3', 'C4', 'C5'], agency: 'Voyage Ventures', status: 'Confirmed' },
  { id: 'BLKBK004', passengerName: 'David Brown', routeFrom: 'Nairobi', routeTo: 'Kisumu', travelDate: '2023-11-20', busNo: 'BUS002', seats: ['D1', 'D2'], agency: 'TravelGo Agency', status: 'Cancelled' },
  { id: 'BLKBK005', passengerName: 'Eve Davis', routeFrom: 'Mombasa', routeTo: 'Nairobi', travelDate: '2023-11-23', busNo: 'BUS001', seats: ['E6'], agency: 'Sunshine Travel', status: 'Confirmed' },
];