import { User } from "@/types/auth";


export interface NewAgency {
  name: string;
  contact: string;
  address: string;
  agency: string;
  location: {
    latitude: string;
    longitude: string;
    is_active: boolean;
  };
}
export interface Agency {
  id: string;
  name: string;
  contactEmail: string;
  contactPerson: string;
  phone: string;
  commissionRate: string;
  status: 'Active' | 'Inactive' | 'Pending';
  bookings: number;
  revenueShare: string;
  cancellationRate: string;
  routes: string[];
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
