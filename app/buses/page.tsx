"use client";

import React, { useState } from "react";
import { 
  Search, Plus, Bus as BusIcon, User, Settings, Check, 
  ChevronDown, Save, X, RotateCcw, Monitor
} from "lucide-react";
import clsx from "clsx";

// --- Types ---

interface Bus {
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

interface Seat {
  id: string;
  number: string;
  status: 'standard' | 'premium' | 'occupied' | 'aisle';
}

// --- Mock Data ---

const BUS_FLEET: Bus[] = [
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

// Mock 5 rows, 4 cols + aisle
const INITIAL_SEATS: Seat[] = Array.from({ length: 20 }).map((_, i) => {
  const row = Math.floor(i / 4);
  const col = i % 4;
  // Create an aisle after column 1 (index 1)
  const seatNum = i + 1;
  
  let status: Seat['status'] = 'standard';
  if (seatNum === 3 || seatNum === 14) status = 'occupied';
  if (seatNum >= 9 && seatNum <= 12) status = 'premium';

  return {
    id: `seat-${i}`,
    number: `${seatNum}`,
    status: status
  };
});

// --- Components ---

export default function BusesManagement() {
  const [selectedBusId, setSelectedBusId] = useState<string>('1');
  const [seats, setSeats] = useState<Seat[]>(INITIAL_SEATS);

  const selectedBus = BUS_FLEET.find(b => b.id === selectedBusId) || BUS_FLEET[0];

  const toggleSeatStatus = (index: number) => {
    const newSeats = [...seats];
    const current = newSeats[index].status;
    
    // Cycle: standard -> premium -> occupied -> standard
    if (current === 'standard') newSeats[index].status = 'premium';
    else if (current === 'premium') newSeats[index].status = 'occupied';
    else newSeats[index].status = 'standard';
    
    setSeats(newSeats);
  };

  // Helper to render the seat grid with aisle
  const renderSeatGrid = () => {
    // We'll organize logic to visually split standard 4-col array into 2-2 layout
    // This is purely for visual rendering
    const rows = [];
    for (let i = 0; i < seats.length; i += 4) {
      const rowSeats = seats.slice(i, i + 4);
      rows.push(
        <div key={i} className="flex gap-4 justify-center mb-3">
          {/* Left Side (2 seats) */}
          <div className="flex gap-2">
            {rowSeats.slice(0, 2).map((seat, idx) => renderSeatBtn(seat, i + idx))}
          </div>
          
          {/* Aisle Spacer */}
          <div className="w-8"></div>

          {/* Right Side (2 seats) */}
          <div className="flex gap-2">
            {rowSeats.slice(2, 4).map((seat, idx) => renderSeatBtn(seat, i + 2 + idx))}
          </div>
        </div>
      );
    }
    return rows;
  };

  const renderSeatBtn = (seat: Seat, realIndex: number) => {
    let bgClass = "bg-gray-100 text-gray-600 hover:bg-gray-200";
    if (seat.status === 'premium') bgClass = "bg-pink-300 text-white hover:bg-pink-400";
    if (seat.status === 'occupied') bgClass = "bg-red-400 text-white hover:bg-red-500";

    return (
      <button
        key={seat.id}
        onClick={() => toggleSeatStatus(realIndex)}
        className={clsx(
          "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors",
          bgClass
        )}
      >
        {seat.status === 'occupied' ? <X size={16} /> : seat.number}
      </button>
    );
  };

  return (
    <div >
      {/* Page Header (Implicit in Breadcrumbs/Sidebar usually, but good to have) */}
      <div className="mb-6">
         <h1 className="text-2xl font-bold text-gray-900">Buses Management</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* --- LEFT COLUMN: Bus Fleet List --- */}
        <div className="xl:col-span-4 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-[calc(100vh-140px)] flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Bus Fleet</h2>
              <button className="flex items-center gap-1.5 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                <Plus size={16} /> Add New Bus
              </button>
            </div>
            
            <div className="relative mb-3">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search buses..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <select className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-1.5 px-3 rounded-lg text-sm focus:outline-none">
                   <option>All Bus Types</option>
                   <option>AC</option>
                   <option>Non-AC</option>
                </select>
                <ChevronDown className="absolute right-2 top-2.5 h-3 w-3 text-gray-500 pointer-events-none" />
              </div>
              <div className="relative flex-1">
                <select className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-1.5 px-3 rounded-lg text-sm focus:outline-none">
                   <option>All Agencies</option>
                </select>
                <ChevronDown className="absolute right-2 top-2.5 h-3 w-3 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 p-2 space-y-2">
            {BUS_FLEET.map((bus) => (
              <div
                key={bus.id}
                onClick={() => setSelectedBusId(bus.id)}
                className={clsx(
                  "flex gap-3 p-3 rounded-lg cursor-pointer border transition-all",
                  selectedBusId === bus.id
                    ? "bg-indigo-50 border-indigo-200"
                    : "bg-white border-gray-100 hover:border-gray-300"
                )}
              >
                <img 
                  src={bus.image} 
                  alt={bus.regNumber} 
                  className="w-16 h-16 rounded-lg object-cover bg-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-gray-900 truncate">{bus.regNumber}</h3>
                    <span className={clsx(
                      "text-[10px] px-2 py-0.5 rounded-full font-medium",
                      bus.status === 'Active' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    )}>
                      {bus.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{bus.type} • {bus.seats} seats</p>
                  <p className="text-xs text-indigo-600 mt-0.5 font-medium">{bus.agency}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          
          {/* 1. Bus Details Form */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900">Bus Details</h2>
              <p className="text-sm text-gray-500">Manage comprehensive information for the selected bus.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                <input 
                  type="text" 
                  defaultValue={selectedBus.regNumber}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bus Type</label>
                <div className="relative">
                  <select 
                    defaultValue={selectedBus.type}
                    className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="AC">AC</option>
                    <option value="Non-AC">Non-AC</option>
                    <option value="Sleeper">Sleeper</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seating Capacity</label>
                <input 
                  type="number" 
                  defaultValue={selectedBus.seats}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Agency</label>
                <div className="relative">
                  <select 
                    defaultValue={selectedBus.agency}
                    className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option>Citylink Travels</option>
                    <option>Global Transport</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Amenities (comma-separated)</label>
                <input 
                  type="text" 
                  defaultValue={selectedBus.amenities}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="md:col-span-2 flex items-center gap-3">
                 {/* Custom Toggle Switch */}
                 <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input 
                      type="checkbox" 
                      name="toggle" 
                      id="toggle" 
                      defaultChecked={selectedBus.status === 'Active'}
                      className="peer absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      style={{ opacity: 0, width: '100%', height: '100%', zIndex: 10, margin: 0 }}
                    />
                    <div className={clsx(
                      "block overflow-hidden h-6 rounded-full cursor-pointer transition-colors",
                      selectedBus.status === 'Active' ? "bg-indigo-600" : "bg-gray-300"
                    )}></div>
                    <div className={clsx(
                       "absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm",
                       selectedBus.status === 'Active' ? "translate-x-4" : "translate-x-0"
                    )}></div>
                 </div>
                 <label htmlFor="toggle" className="text-sm font-medium text-gray-700">Active Status</label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea 
                  rows={3}
                  defaultValue={selectedBus.notes}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  placeholder="Add internal notes about this bus..."
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200">
                Save Changes
              </button>
            </div>
          </div>

          {/* 2. Seat Layout Editor */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900">Seat Layout Editor</h2>
              <p className="text-sm text-gray-500">Visually customize the seating arrangement. Click a seat to toggle status.</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 flex flex-col items-center">
              
              {/* Bus Front Indicator */}
              <div className="w-64 h-8 bg-gray-200 rounded-t-3xl mb-6 flex items-center justify-center text-xs text-gray-500 uppercase tracking-widest">
                Front of Bus
              </div>

              {/* Seat Grid */}
              <div className="w-full max-w-sm">
                {renderSeatGrid()}
              </div>
              
              {/* Legend */}
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 rounded border border-gray-200"></div>
                  <span className="text-sm text-gray-600">Standard</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-300 rounded"></div>
                  <span className="text-sm text-gray-600">Premium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-400 rounded flex items-center justify-center">
                    <X size={10} className="text-white" />
                  </div>
                  <span className="text-sm text-gray-600">Occupied/Blocked</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setSeats(INITIAL_SEATS)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <RotateCcw size={16} /> Reset Layout
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200">
                <Save size={16} /> Update Layout
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}