"use client";

import React, { useState } from "react";
import { 
  Search, Plus, Download, MapPin, Clock, Calendar, 
  Edit2, Trash2, AlertTriangle, MoreVertical, CheckSquare, Square
} from "lucide-react";
import clsx from "clsx";

// --- Types ---

interface Route {
  id: string;
  routeId: string;
  departure: string;
  arrival: string;
  stops: number;
  duration: string;
}

interface LiveDeparture {
  id: string;
  busId: string;
  time: string;
  status: 'On Time' | 'Delayed' | 'Departed';
  gate: string;
  info: string;
}

// --- Mock Data ---

const ROUTES_DATA: Route[] = [
  { id: '1', routeId: 'BL001', departure: 'Nairobi', arrival: 'Mombasa', stops: 5, duration: '8h 30m' },
  { id: '2', routeId: 'BL002', departure: 'Kisumu', arrival: 'Nairobi', stops: 3, duration: '6h 00m' },
  { id: '3', routeId: 'BL003', departure: 'Mombasa', arrival: 'Malindi', stops: 2, duration: '2h 15m' },
  { id: '4', routeId: 'BL004', departure: 'Eldoret', arrival: 'Nairobi', stops: 4, duration: '7h 45m' },
  { id: '5', routeId: 'BL005', departure: 'Nairobi', arrival: 'Nakuru', stops: 1, duration: '3h 00m' },
];

const LIVE_DEPARTURES: LiveDeparture[] = [
  { id: '1', busId: 'BL001', time: '10:00 AM', status: 'On Time', gate: 'Gate A', info: 'Departure Gate A' },
  { id: '2', busId: 'BL002', time: '10:30 AM', status: 'Delayed', gate: 'Gate B', info: 'ETA 10:45 AM' },
  { id: '3', busId: 'BL003', time: '11:00 AM', status: 'On Time', gate: 'Gate B', info: 'Departure Gate B' },
  { id: '4', busId: 'BL004', time: '11:15 AM', status: 'Departed', gate: '-', info: 'Arrived 6:00 PM' },
  { id: '5', busId: 'BL005', time: '11:45 AM', status: 'On Time', gate: 'Gate C', info: 'Departure Gate C' },
];

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// --- Components ---

export default function RoutesSchedules() {
  const [selectedDays, setSelectedDays] = useState<Set<string>>(new Set(['Mon', 'Wed', 'Fri']));

  const toggleDay = (day: string) => {
    const newDays = new Set(selectedDays);
    if (newDays.has(day)) newDays.delete(day);
    else newDays.add(day);
    setSelectedDays(newDays);
  };

  const getStatusBadge = (status: LiveDeparture['status']) => {
    switch (status) {
      case 'On Time': return "bg-green-500 text-white";
      case 'Delayed': return "bg-orange-500 text-white";
      case 'Departed': return "bg-gray-500 text-white";
      default: return "bg-gray-500";
    }
  };

  return (
    <div >
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Routes & Schedules</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4" /> Export Schedules
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
            <Plus className="w-4 h-4" /> Add New Route
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* --- LEFT COLUMN (Takes up 2/3 width on large screens) --- */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* A. Defined Routes Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-gray-900">Defined Routes</h3>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search routes..."
                  className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3">Route ID</th>
                    <th className="px-6 py-3">Departure</th>
                    <th className="px-6 py-3">Arrival</th>
                    <th className="px-6 py-3">Stops</th>
                    <th className="px-6 py-3">Duration</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ROUTES_DATA.map((route) => (
                    <tr key={route.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{route.routeId}</td>
                      <td className="px-6 py-4">{route.departure}</td>
                      <td className="px-6 py-4">{route.arrival}</td>
                      <td className="px-6 py-4">{route.stops}</td>
                      <td className="px-6 py-4">{route.duration}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button className="text-gray-400 hover:text-indigo-600">
                            <Edit2 size={16} />
                          </button>
                          <button className="text-gray-400 hover:text-indigo-600">
                            <Calendar size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* B. Live Departures Timeline */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Live Departures & Timeline</h3>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
              {LIVE_DEPARTURES.map((item) => (
                <div key={item.id} className="flex items-start gap-3 relative pl-2">
                  {/* Timeline Line (Visual only) */}
                  <div className="absolute left-0 top-1 bottom-0 w-0.5 bg-gray-100"></div>
                  
                  <MapPin className="w-5 h-5 text-gray-400 relative z-10 bg-white" />
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                         <span className="font-bold text-gray-900 text-sm block">{item.busId} ({item.time})</span>
                         <span className="text-xs text-gray-500">{item.info}</span>
                      </div>
                      <span className={clsx("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider", getStatusBadge(item.status))}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-gray-50 border border-gray-100 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Timeline Visualization</h4>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <MoreVertical size={14} /> Visual representation of schedule timeline here (e.g., Gantt chart)
              </div>
              
              {/* Conflict Warning Block */}
              <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-2 rounded text-xs font-bold w-max">
                 Conflict Warning: Route BL002 & BL005 overlap.
              </div>
            </div>
          </div>

        </div>

        {/* --- RIGHT COLUMN (Sidebar) --- */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* C. Route Map Preview */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Route Map Preview</h3>
            <div className="h-40 bg-gray-200 rounded-lg overflow-hidden relative group cursor-pointer">
              {/* Placeholder Image */}
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400&h=300" 
                alt="Map" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="text-gray-800 drop-shadow-md" size={32} />
              </div>
            </div>
          </div>

          {/* D. Route Details Form */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Route Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Departure Location</label>
                <input type="text" placeholder="e.g., Nairobi Central Bus Station" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Arrival Location</label>
                <input type="text" placeholder="e.g., Mombasa CBD Terminus" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Intermediate Stops (one per line)</label>
                <textarea rows={3} placeholder="e.g., Naivasha&#10;Nakuru&#10;Kisumu" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 resize-none"></textarea>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Travel Duration (hours)</label>
                <input type="text" placeholder="e.g., 8.5" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>

              <button className="w-full py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-sm">
                Save Route
              </button>
            </div>
          </div>

          {/* E. Schedule Calendar & Recurring */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
             <h3 className="text-lg font-bold text-gray-900 mb-4">Schedule Calendar</h3>
             
             {/* Calendar Placeholder */}
             <div className="h-48 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 mb-6">
                <Calendar size={24} className="mb-2" />
                <span className="text-xs">Interactive calendar component here</span>
             </div>

             <div className="border-t border-gray-100 pt-4">
               <h4 className="text-sm font-bold text-gray-900 mb-3">Recurring Schedules</h4>
               
               <div className="space-y-4">
                 <div>
                   <label className="block text-xs font-medium text-gray-700 mb-1">Frequency</label>
                   <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                     <option>Select frequency</option>
                     <option>Daily</option>
                     <option>Weekly</option>
                   </select>
                 </div>

                 <div>
                   <label className="block text-xs font-medium text-gray-700 mb-1">Departure Time</label>
                   <input type="time" defaultValue="08:00" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                 </div>

                 <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Days of Week</label>
                    <div className="flex flex-wrap gap-2">
                      {DAYS_OF_WEEK.map(day => {
                        const isSelected = selectedDays.has(day);
                        return (
                          <button
                            key={day}
                            onClick={() => toggleDay(day)}
                            className={clsx(
                              "flex items-center gap-1 px-2 py-1 rounded text-xs border transition-colors",
                              isSelected 
                                ? "bg-indigo-50 border-indigo-200 text-indigo-700" 
                                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                            )}
                          >
                             {isSelected ? <CheckSquare size={12} /> : <Square size={12} />}
                             {day}
                          </button>
                        )
                      })}
                    </div>
                 </div>

                 <button className="w-full py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 text-sm shadow-sm">
                   Set Recurring Schedule
                 </button>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}