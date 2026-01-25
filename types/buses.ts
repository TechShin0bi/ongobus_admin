export interface Bus {
  id: string;
  regNumber: string;
  image: string;
  type: 'AC' | 'Non-AC' | 'Sleeper' | 'Luxury';
  seats: number;
  agency: string;
  status: 'Active' | 'Maintenance' | 'Retired';
  amenities: string;
  notes?: string;
}

export interface Seat {
  id: string;
  number: string;
  status: 'standard' | 'premium' | 'occupied' | 'aisle';
}

export interface AvailableBus {
  id: number;
  name: string;
  route: string;
  departure: string;
  arrival: string;
  time: string;
  status: 'On Time' | 'Delayed' | 'Full' | 'Available';
  seats: number;
  price: string;
  type: 'Standard' | 'VIP' | 'Express';
}