export interface BusStatus {
  id: string;
  busId: string;
  route: string;
  location: string;
  status: 'On Time' | 'En Route' | 'Delayed' | 'Arrived' | 'Maintenance';
  timeAgo: string;
}

export interface SeatChange {
  id: string;
  route: string;
  busId: string;
  action: 'Booked' | 'Cancelled';
  count: number;
  timeAgo: string;
}

export interface SystemAlert {
  id: string;
  type: 'Error' | 'Warning' | 'Info' | 'Success';
  title: string;
  message?: string;
  timeAgo: string;
  hasRetry?: boolean;
}