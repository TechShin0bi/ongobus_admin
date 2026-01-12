import { BusStatus, SeatChange, SystemAlert } from '@/types/live';

export const BUS_FEED: BusStatus[] = [
  { id: '1', busId: 'Bus 101', route: 'Route A', location: 'City X Center', status: 'On Time', timeAgo: 'Just now' },
  { id: '2', busId: 'Bus 205', route: 'Route B', location: 'Near City Y Outskirts', status: 'En Route', timeAgo: '1 min ago' },
  { id: '3', busId: 'Bus 103', route: 'Route A', location: 'City X Station (Traffic)', status: 'Delayed', timeAgo: '5 min ago' },
  { id: '4', busId: 'Bus 302', route: 'Route C', location: 'City Z Terminal', status: 'Arrived', timeAgo: '10 min ago' },
  { id: '5', busId: 'Bus 106', route: 'Route A', location: 'City X Highway', status: 'En Route', timeAgo: '12 min ago' },
  { id: '6', busId: 'Bus 207', route: 'Route B', location: 'Near City Y Downtown', status: 'On Time', timeAgo: '15 min ago' },
  { id: '7', busId: 'Bus 410', route: 'Route D', location: 'Depot 4', status: 'Maintenance', timeAgo: '20 min ago' },
];

export const SEAT_STREAM: SeatChange[] = [
  { id: '1', route: 'Route A', busId: 'Bus 101', action: 'Booked', count: 2, timeAgo: '2 min ago' },
  { id: '2', route: 'Route B', busId: 'Bus 205', action: 'Cancelled', count: 1, timeAgo: '5 min ago' },
  { id: '3', route: 'Route C', busId: 'Bus 302', action: 'Booked', count: 3, timeAgo: '8 min ago' },
  { id: '4', route: 'Route A', busId: 'Bus 103', action: 'Booked', count: 1, timeAgo: '12 min ago' },
  { id: '5', route: 'Route B', busId: 'Bus 207', action: 'Booked', count: 4, timeAgo: '15 min ago' },
  { id: '6', route: 'Route A', busId: 'Bus 101', action: 'Cancelled', count: 1, timeAgo: '20 min ago' },
];

export const SYSTEM_ALERTS: SystemAlert[] = [
  { id: '1', type: 'Error', title: 'Error: Payment gateway connection failed for booking #10234.', timeAgo: '2 min ago', hasRetry: true },
  { id: '2', type: 'Warning', title: 'Warning: Bus 105 GPS signal lost near City Z.', timeAgo: '5 min ago' },
  { id: '3', type: 'Info', title: 'Info: New schedule update applied for Route C.', timeAgo: '10 min ago' },
  { id: '4', type: 'Error', title: 'Error: Failed to send SMS notification for Route A delay.', timeAgo: '15 min ago', hasRetry: true },
  { id: '5', type: 'Success', title: 'Success: Bus 201 maintenance check completed successfully.', timeAgo: '25 min ago' },
  { id: '6', type: 'Warning', title: 'Warning: Low disk space warning on backup server.', timeAgo: '35 min ago' },
];