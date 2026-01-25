

import { AvailableBus, Bus } from "@/types/buses";

export const BUS_FLEET: Bus[] = [
  {
    id: '1',
    regNumber: 'BL-ABC-123',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=200&h=150',
    type: 'AC',
    seats: 45,
    agency: 'Citylink Travels',
    status: 'Active',
    amenities: 'Wi-Fi, Charging Ports, Reclining Seats',
    notes: 'Regularly serviced, excellent condition for long-haul routes.'
  },
  {
    id: '2',
    regNumber: 'BL-XYZ-456',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=200&h=150',
    type: 'Non-AC',
    seats: 50,
    agency: 'Global Transport',
    status: 'Maintenance',
    amenities: 'Standard Seats, Luggage Storage',
  },
  {
    id: '3',
    regNumber: 'BL-PQR-789',
    image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=200&h=150',
    type: 'Sleeper',
    seats: 30,
    agency: 'Luxury Rides',
    status: 'Active',
    amenities: 'Beds, Blankets, Water Bottle',
  },
];

export const availableBuses: AvailableBus[] = [
  { 
    id: 1, 
    name: 'Bus A-101', 
    route: 'DLA-YAO', 
    departure: 'Douala', 
    arrival: 'Yaoundé', 
    time: '08:00 AM', 
    status: 'On Time', 
    seats: 24,
    price: '5,000 XAF',
    type: 'Standard'
  },
  { 
    id: 2, 
    name: 'Bus B-202', 
    route: 'YAO-DLA', 
    departure: 'Yaoundé', 
    arrival: 'Douala', 
    time: '10:30 AM', 
    status: 'On Time', 
    seats: 16,
    price: '6,500 XAF',
    type: 'VIP'
  },
  { 
    id: 3, 
    name: 'Bus C-303', 
    route: 'DLA-BAF', 
    departure: 'Douala', 
    arrival: 'Bafoussam', 
    time: '01:00 PM', 
    status: 'Delayed', 
    seats: 0,
    price: '7,000 XAF',
    type: 'Express'
  }
];