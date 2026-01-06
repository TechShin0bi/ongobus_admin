"use client";

import React, { useState } from "react";
import { 
  Search, Plus, UserPlus, RefreshCw, Mail, Phone, 
  BarChart3, ChevronLeft, ChevronRight, Edit, Map, 
  Shield, Lock, Key, Clock, CheckCircle, XCircle
} from "lucide-react";
import clsx from "clsx";

// --- Types ---

interface Agency {
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

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Support Agent' | 'Viewer';
  status: 'Active' | 'Locked' | 'Invited';
  lastLogin: string;
  department: string;
  permissions: string[];
}

// --- Mock Data ---

const AGENCIES_DATA: Agency[] = [
  {
    id: '1',
    name: 'Global Travel Inc.',
    contactEmail: 'contact@globaltravel.com',
    contactPerson: 'Sarah Jenkins',
    phone: '+1-555-010-9988',
    commissionRate: '15%',
    status: 'Active',
    bookings: 1250,
    revenueShare: '$85,000',
    cancellationRate: '5.2%',
    routes: ['Route A: NY-Boston', 'Route C: Miami-Orlando']
  },
  {
    id: '2',
    name: 'Horizon Tours',
    contactEmail: 'info@horizontours.net',
    contactPerson: 'Mike Ross',
    phone: '+1-555-011-2233',
    commissionRate: '12%',
    status: 'Active',
    bookings: 850,
    revenueShare: '$42,000',
    cancellationRate: '3.1%',
    routes: ['Route B: LA-SF']
  },
  {
    id: '3',
    name: 'City Bus Partners',
    contactEmail: 'partners@citybus.co',
    contactPerson: 'Emily Blunt',
    phone: '+1-555-012-4455',
    commissionRate: '10%',
    status: 'Inactive',
    bookings: 320,
    revenueShare: '$12,500',
    cancellationRate: '8.5%',
    routes: []
  },
];

const USERS_DATA: User[] = [
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

// --- Components ---

export default function AgenciesUsersManagement() {
  const [activeTab, setActiveTab] = useState<'agencies' | 'users'>('agencies');
  const [selectedAgencyId, setSelectedAgencyId] = useState<string>('1');
  const [selectedUserId, setSelectedUserId] = useState<string>('u1');

  // Helpers to get currently selected object
  const selectedAgency = AGENCIES_DATA.find(a => a.id === selectedAgencyId) || AGENCIES_DATA[0];
  const selectedUser = USERS_DATA.find(u => u.id === selectedUserId) || USERS_DATA[0];

  // Badge Helpers
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return "bg-green-100 text-green-700";
      case 'Inactive': return "bg-gray-100 text-gray-700";
      case 'Pending': return "bg-orange-100 text-orange-700";
      case 'Locked': return "bg-red-100 text-red-700";
      case 'Invited': return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin': return "bg-purple-100 text-purple-700 border-purple-200";
      case 'Manager': return "bg-blue-100 text-blue-700 border-blue-200";
      case 'Support Agent': return "bg-cyan-100 text-cyan-700 border-cyan-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <div >
      
      {/* 1. Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Agencies & Users Management</h1>
        <div className="flex gap-3">
          {activeTab === 'agencies' ? (
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200">
              <Plus className="w-4 h-4" /> Add New Agency
            </button>
          ) : (
             <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200">
              <UserPlus className="w-4 h-4" /> Invite New User
            </button>
          )}
        </div>
      </div>

      {/* 2. Tabs */}
      <div className="bg-white rounded-lg p-1 inline-flex mb-6 border border-gray-200 w-full md:w-auto shadow-sm">
        <button
          onClick={() => setActiveTab('agencies')}
          className={clsx(
            "flex-1 md:flex-none px-8 py-2 text-sm font-medium rounded-md transition-all",
            activeTab === 'agencies' 
              ? "bg-gray-100 text-indigo-700 shadow-inner" 
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          )}
        >
          Agencies
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={clsx(
            "flex-1 md:flex-none px-8 py-2 text-sm font-medium rounded-md transition-all",
            activeTab === 'users' 
              ? "bg-gray-100 text-indigo-700 shadow-inner" 
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          )}
        >
          Users
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* --- LEFT COLUMN: List View (7 cols) --- */}
        <div className="xl:col-span-7 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[600px]">
          
          {/* List Header */}
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">
              {activeTab === 'agencies' ? 'Registered Agencies' : 'System Users'}
            </h3>
            <div className="relative">
               <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
               <input 
                  type="text" 
                  placeholder={activeTab === 'agencies' ? "Search agencies..." : "Search users..."}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
               />
            </div>
          </div>

          {/* Conditional Table Rendering */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                {activeTab === 'agencies' ? (
                  <tr>
                    <th className="px-6 py-4 font-medium">Agency Name</th>
                    <th className="px-6 py-4 font-medium">Contact Email</th>
                    <th className="px-6 py-4 font-medium">Commission</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                ) : (
                  <tr>
                    <th className="px-6 py-4 font-medium">User Name</th>
                    <th className="px-6 py-4 font-medium">Role</th>
                    <th className="px-6 py-4 font-medium">Last Login</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                )}
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeTab === 'agencies' ? (
                  // --- AGENCY ROWS ---
                  AGENCIES_DATA.map((agency) => (
                    <tr 
                      key={agency.id} 
                      onClick={() => setSelectedAgencyId(agency.id)}
                      className={clsx(
                        "cursor-pointer hover:bg-gray-50 transition-colors",
                        selectedAgencyId === agency.id && "bg-indigo-50 hover:bg-indigo-50"
                      )}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">{agency.name}</td>
                      <td className="px-6 py-4">{agency.contactEmail}</td>
                      <td className="px-6 py-4">{agency.commissionRate}</td>
                      <td className="px-6 py-4">
                        <span className={clsx("px-2 py-0.5 rounded-full text-xs font-medium", getStatusBadge(agency.status))}>
                           {agency.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  // --- USER ROWS ---
                  USERS_DATA.map((user) => (
                    <tr 
                      key={user.id} 
                      onClick={() => setSelectedUserId(user.id)}
                      className={clsx(
                        "cursor-pointer hover:bg-gray-50 transition-colors",
                        selectedUserId === user.id && "bg-indigo-50 hover:bg-indigo-50"
                      )}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                         <div className="flex items-center gap-2">
                           <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                             {user.name.charAt(0)}
                           </div>
                           {user.name}
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className={clsx("px-2 py-0.5 rounded border text-xs font-medium", getRoleBadge(user.role))}>
                            {user.role}
                         </span>
                      </td>
                      <td className="px-6 py-4">{user.lastLogin}</td>
                      <td className="px-6 py-4">
                        <span className={clsx("px-2 py-0.5 rounded-full text-xs font-medium", getStatusBadge(user.status))}>
                           {user.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-gray-200 flex items-center justify-center gap-4">
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 disabled:opacity-50">
              <ChevronLeft size={16} /> Previous
            </button>
            <span className="text-sm text-gray-600">Page 1 of 1</span>
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Detail View (5 cols) --- */}
        <div className="xl:col-span-5">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sticky top-24">
            
            {/* Conditional Content: Agency Detail vs User Detail */}
            {activeTab === 'agencies' ? (
               // --- AGENCY DETAILS ---
               <>
                 <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-1">{selectedAgency.name}</h2>
                      <span className={clsx("px-2 py-0.5 rounded-full text-xs font-medium", getStatusBadge(selectedAgency.status))}>
                        {selectedAgency.status} Agency
                      </span>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50">
                      <Edit size={14} /> Edit
                    </button>
                 </div>

                 <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                   <div>
                     <label className="block text-xs font-medium text-gray-500 mb-1">Contact Person</label>
                     <div className="text-sm font-medium text-gray-900">{selectedAgency.contactPerson}</div>
                   </div>
                   <div>
                     <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                     <div className="text-sm font-medium text-gray-900">{selectedAgency.phone}</div>
                   </div>
                   <div className="col-span-2">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <Mail size={14} className="text-gray-400" /> {selectedAgency.contactEmail}
                      </div>
                   </div>
                 </div>

                 <div className="mb-8">
                   <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <BarChart3 size={16} className="text-gray-400" /> Performance Metrics
                   </h4>
                   <div className="bg-gray-50 rounded-lg p-4 space-y-2 border border-gray-100">
                      <div className="flex justify-between text-sm">
                         <span className="text-gray-600">Total Bookings:</span>
                         <span className="font-semibold text-gray-900">{selectedAgency.bookings}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                         <span className="text-gray-600">Revenue Share:</span>
                         <span className="font-semibold text-gray-900">{selectedAgency.revenueShare}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                         <span className="text-gray-600">Cancellation Rate:</span>
                         <span className="font-semibold text-gray-900">{selectedAgency.cancellationRate}</span>
                      </div>
                   </div>
                 </div>
               </>
            ) : (
               // --- USER DETAILS ---
               <>
                 <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-600">
                          {selectedUser.name.charAt(0)}
                       </div>
                       <div>
                          <h2 className="text-lg font-bold text-gray-900 mb-1">{selectedUser.name}</h2>
                          <span className={clsx("px-2 py-0.5 rounded border text-xs font-medium", getRoleBadge(selectedUser.role))}>
                             {selectedUser.role}
                          </span>
                       </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                       <Edit size={16} />
                    </button>
                 </div>

                 <div className="grid grid-cols-1 gap-y-6 mb-8">
                    <div>
                       <label className="block text-xs font-medium text-gray-500 mb-1">Email Address</label>
                       <div className="flex items-center gap-2 text-sm text-gray-900">
                          <Mail size={14} className="text-gray-400" /> {selectedUser.email}
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Department</label>
                          <div className="text-sm font-medium text-gray-900">{selectedUser.department}</div>
                       </div>
                       <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Last Login</label>
                          <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
                             <Clock size={12} className="text-gray-400"/> {selectedUser.lastLogin}
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="mb-8">
                   <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Shield size={16} className="text-gray-400" /> Permissions & Access
                   </h4>
                   <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <ul className="space-y-2">
                         {selectedUser.permissions.map((perm, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                               <CheckCircle size={14} className="text-green-500" />
                               {perm}
                            </li>
                         ))}
                      </ul>
                   </div>
                 </div>

                 <div className="flex gap-3 pt-6 border-t border-gray-100">
                    <button className="flex-1 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                       <Key size={14} /> Reset Password
                    </button>
                    {selectedUser.status === 'Locked' ? (
                       <button className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-2">
                          <CheckCircle size={14} /> Unlock User
                       </button>
                    ) : (
                       <button className="flex-1 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 flex items-center justify-center gap-2">
                          <Lock size={14} /> Lock Account
                       </button>
                    )}
                 </div>
               </>
            )}

            {/* Common Footer Actions for Agencies */}
            {activeTab === 'agencies' && (
              <div className="flex gap-3 pt-6 border-t border-gray-100">
                 <button className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-sm font-medium transition-colors">
                    Deactivate
                 </button>
                 <button className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                    View Resources
                 </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}