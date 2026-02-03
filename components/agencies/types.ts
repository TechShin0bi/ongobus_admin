import { User } from "@/types/auth";

export interface Location {
  id: string;
  created_at: string;
  updated_at: string;
  latitude: string;
  longitude: string;
  is_active: boolean;
}

export interface Agency {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  contact: string;
  address: string;
  image: string;
  agency: string;
  location: Location;
}

export const USERS_DATA: User[] = [
  {
    id: 'u1',
    name: 'Alex Admin',
    email: 'alex@buslink.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2 mins ago',
    department: 'Executive',
    permissions: ['Full Access', 'System Settings', 'Financials']
  },
  {
    id: 'u2',
    name: 'Sarah Manager',
    email: 'sarah@buslink.com',
    role: 'Manager',
    status: 'Active',
    lastLogin: '1 hour ago',
    department: 'Operations',
    permissions: ['Manage Buses', 'Manage Routes', 'View Reports']
  },
  {
    id: 'u3',
    name: 'John Support',
    email: 'john@buslink.com',
    role: 'Support Agent',
    status: 'Active',
    lastLogin: '5 hours ago',
    department: 'Customer Service',
    permissions: ['View Bookings', 'Manage Tickets', 'Process Refunds']
  },
  {
    id: 'u4',
    name: 'Guest Auditor',
    email: 'auditor@external.com',
    role: 'Viewer',
    status: 'Locked',
    lastLogin: '2 weeks ago',
    department: 'Audit',
    permissions: ['View Reports', 'Read Only Access']
  }
];
