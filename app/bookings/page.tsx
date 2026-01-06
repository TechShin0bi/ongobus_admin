"use client";

import React, { useState } from "react";
import { 
  Search, Calendar, MapPin, Bus, Building2, Tag, 
  Filter, Download, Layers, RotateCcw, ChevronLeft, ChevronRight,
  ClipboardList, CheckSquare
} from "lucide-react";
import clsx from "clsx";

// --- Types ---

interface Booking {
  id: string;
  passengerName: string;
  passengerEmail?: string; // Hidden in table but good for data
  routeFrom: string;
  routeTo: string;
  travelDate: string;
  busNo: string;
  seats: string[];
  agency: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

// --- Mock Data ---

const BOOKINGS_DATA: Booking[] = [
  {
    id: 'BLKBK001',
    passengerName: 'Alice Smith',
    routeFrom: 'Nairobi',
    routeTo: 'Mombasa',
    travelDate: '2023-11-20',
    busNo: 'BUS001',
    seats: ['A1', 'A2'],
    agency: 'TravelGo Agency',
    status: 'Confirmed',
  },
  {
    id: 'BLKBK002',
    passengerName: 'Bob Johnson',
    routeFrom: 'Kampala',
    routeTo: 'Kigali',
    travelDate: '2023-11-21',
    busNo: 'BUS005',
    seats: ['B5'],
    agency: 'Elite Tours',
    status: 'Pending',
  },
  {
    id: 'BLKBK003',
    passengerName: 'Carol White',
    routeFrom: 'Dar es Salaam',
    routeTo: 'Arusha',
    travelDate: '2023-11-22',
    busNo: 'BUS003',
    seats: ['C3', 'C4', 'C5'],
    agency: 'Voyage Ventures',
    status: 'Confirmed',
  },
  {
    id: 'BLKBK004',
    passengerName: 'David Brown',
    routeFrom: 'Nairobi',
    routeTo: 'Kisumu',
    travelDate: '2023-11-20',
    busNo: 'BUS002',
    seats: ['D1', 'D2'],
    agency: 'TravelGo Agency',
    status: 'Cancelled',
  },
  {
    id: 'BLKBK005',
    passengerName: 'Eve Davis',
    routeFrom: 'Mombasa',
    routeTo: 'Nairobi',
    travelDate: '2023-11-23',
    busNo: 'BUS001',
    seats: ['E6'],
    agency: 'Sunshine Travel',
    status: 'Confirmed',
  },
];

// --- Components ---

export default function BookingsManagement() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Toggle single row selection
  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedIds(newSelection);
  };

  // Toggle "Select All"
  const toggleSelectAll = () => {
    if (selectedIds.size === BOOKINGS_DATA.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(BOOKINGS_DATA.map(b => b.id)));
    }
  };

  // Helper for status badge styles
  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'Confirmed':
        return "bg-blue-50 text-blue-700 border border-blue-100";
      case 'Pending':
        return "bg-pink-50 text-pink-700 border border-pink-100";
      case 'Cancelled':
        return "bg-red-50 text-red-700 border border-red-100";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div >
      {/* 1. Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          View, search, filter, and manage all bus ticket bookings within the system.
        </p>
      </div>

      {/* 2. Filter Bar */}
      <div className="flex flex-col xl:flex-row gap-4 mb-6">
        <div className="flex flex-wrap gap-3 flex-1">
          {/* Search Input */}
          <div className="relative min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search bookings..."
            />
          </div>

          {/* Filter Dropdowns (Visual only for UI) */}
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>Travel Date</span>
          </button>
          
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>Route</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <Bus className="w-4 h-4 text-gray-500" />
            <span>Bus</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <Building2 className="w-4 h-4 text-gray-500" />
            <span>Agency</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <Tag className="w-4 h-4 text-gray-500" />
            <span>Status</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
            Apply Filters
          </button>
        </div>
      </div>

      {/* 3. Action Bar */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
          <RotateCcw className="w-4 h-4" />
          Clear Filters
        </button>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <Layers className="w-4 h-4" />
            Bulk Actions
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>
      </div>

      {/* 4. Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Left Column: Data Table (Takes up 3 cols) */}
        <div className="xl:col-span-3">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">All Bookings</h3>
              <p className="text-sm text-gray-500">Manage and view all bus ticket bookings.</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                          checked={selectedIds.size === BOOKINGS_DATA.length && BOOKINGS_DATA.length > 0}
                          onChange={toggleSelectAll}
                        />
                      </div>
                    </th>
                    <th className="px-6 py-3 font-medium">Booking ID</th>
                    <th className="px-6 py-3 font-medium">Passenger</th>
                    <th className="px-6 py-3 font-medium">Route</th>
                    <th className="px-6 py-3 font-medium">Travel Date</th>
                    <th className="px-6 py-3 font-medium">Bus No.</th>
                    <th className="px-6 py-3 font-medium">Seats</th>
                    <th className="px-6 py-3 font-medium">Agency</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {BOOKINGS_DATA.map((booking) => (
                    <tr 
                      key={booking.id} 
                      className={clsx(
                        "bg-white hover:bg-gray-50 transition-colors",
                        selectedIds.has(booking.id) && "bg-indigo-50 hover:bg-indigo-50"
                      )}
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                            checked={selectedIds.has(booking.id)}
                            onChange={() => toggleSelection(booking.id)}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{booking.id}</td>
                      <td className="px-6 py-4 text-gray-900">{booking.passengerName}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                           <span>{booking.routeFrom} -</span>
                           <span>{booking.routeTo}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.travelDate}</td>
                      <td className="px-6 py-4">{booking.busNo}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{booking.seats.join(', ')}</td>
                      <td className="px-6 py-4">{booking.agency}</td>
                      <td className="px-6 py-4">
                        <span className={clsx("px-2.5 py-1 rounded-full text-xs font-medium", getStatusBadge(booking.status))}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-white">
              <span className="text-sm text-gray-700">
                Showing <span className="font-semibold text-gray-900">5</span> of <span className="font-semibold text-gray-900">6</span> bookings.
              </span>
              <div className="inline-flex -space-x-px text-sm shadow-sm">
                <button className="flex items-center justify-center px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                </button>
                <button className="flex items-center justify-center px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                  1
                </button>
                <button className="flex items-center justify-center px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                  2
                </button>
                <button className="flex items-center justify-center px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Actions Side Panel */}
        <div className="xl:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sticky top-24 h-[calc(100vh-8rem)]">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
            
            {selectedIds.size > 0 ? (
              // Active State (Items selected)
              <div className="flex flex-col items-center justify-center text-center h-64 animate-in fade-in">
                 <div className="p-4 bg-indigo-50 rounded-full mb-4">
                  <CheckSquare className="w-8 h-8 text-indigo-600" />
                </div>
                <h4 className="text-gray-900 font-medium mb-1">{selectedIds.size} Booking(s) Selected</h4>
                <p className="text-sm text-gray-500 mb-6">Choose an action to apply.</p>
                
                <div className="w-full space-y-3">
                  <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
                    Confirm Selection
                  </button>
                  <button className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    Cancel Bookings
                  </button>
                  <button className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    Export Details
                  </button>
                </div>
              </div>
            ) : (
              // Empty State (No items selected) - As shown in image
              <div className="flex flex-col items-center justify-center text-center h-full pb-20">
                <div className="mb-4 text-gray-300">
                  <ClipboardList className="w-16 h-16" strokeWidth={1.5} />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">No Booking Selected</h4>
                <p className="text-sm text-gray-500 max-w-[200px]">
                  Select a booking from the table to view quick details and actions here.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}