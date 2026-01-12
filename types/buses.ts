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