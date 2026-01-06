"use client";

import React, { useState } from "react";
import { 
  Bus, Clock, Ticket, MapPin, Send, AlertTriangle, 
  CheckCircle, Info, XCircle, RotateCw, Bell, Filter,
  Activity, ArrowRight
} from "lucide-react";
import clsx from "clsx";

// --- Types ---

interface BusStatus {
  id: string;
  busId: string;
  route: string;
  location: string;
  status: 'On Time' | 'En Route' | 'Delayed' | 'Arrived' | 'Maintenance';
  timeAgo: string;
}

interface SeatChange {
  id: string;
  route: string;
  busId: string;
  action: 'Booked' | 'Cancelled';
  count: number;
  timeAgo: string;
}

interface SystemAlert {
  id: string;
  type: 'Error' | 'Warning' | 'Info' | 'Success';
  title: string;
  message?: string; // Optional detailed message if needed
  timeAgo: string;
  hasRetry?: boolean;
}

// --- Mock Data ---

const BUS_FEED: BusStatus[] = [
  { id: '1', busId: 'Bus 101', route: 'Route A', location: 'City X Center', status: 'On Time', timeAgo: 'Just now' },
  { id: '2', busId: 'Bus 205', route: 'Route B', location: 'Near City Y Outskirts', status: 'En Route', timeAgo: '1 min ago' },
  { id: '3', busId: 'Bus 103', route: 'Route A', location: 'City X Station (Traffic)', status: 'Delayed', timeAgo: '5 min ago' },
  { id: '4', busId: 'Bus 302', route: 'Route C', location: 'City Z Terminal', status: 'Arrived', timeAgo: '10 min ago' },
  { id: '5', busId: 'Bus 106', route: 'Route A', location: 'City X Highway', status: 'En Route', timeAgo: '12 min ago' },
  { id: '6', busId: 'Bus 207', route: 'Route B', location: 'Near City Y Downtown', status: 'On Time', timeAgo: '15 min ago' },
  { id: '7', busId: 'Bus 410', route: 'Route D', location: 'Depot 4', status: 'Maintenance', timeAgo: '20 min ago' },
];

const SEAT_STREAM: SeatChange[] = [
  { id: '1', route: 'Route A', busId: 'Bus 101', action: 'Booked', count: 2, timeAgo: '2 min ago' },
  { id: '2', route: 'Route B', busId: 'Bus 205', action: 'Cancelled', count: 1, timeAgo: '5 min ago' },
  { id: '3', route: 'Route C', busId: 'Bus 302', action: 'Booked', count: 3, timeAgo: '8 min ago' },
  { id: '4', route: 'Route A', busId: 'Bus 103', action: 'Booked', count: 1, timeAgo: '12 min ago' },
  { id: '5', route: 'Route B', busId: 'Bus 207', action: 'Booked', count: 4, timeAgo: '15 min ago' },
  { id: '6', route: 'Route A', busId: 'Bus 101', action: 'Cancelled', count: 1, timeAgo: '20 min ago' },
];

const SYSTEM_ALERTS: SystemAlert[] = [
  { id: '1', type: 'Error', title: 'Error: Payment gateway connection failed for booking #10234.', timeAgo: '2 min ago', hasRetry: true },
  { id: '2', type: 'Warning', title: 'Warning: Bus 105 GPS signal lost near City Z.', timeAgo: '5 min ago' },
  { id: '3', type: 'Info', title: 'Info: New schedule update applied for Route C.', timeAgo: '10 min ago' },
  { id: '4', type: 'Error', title: 'Error: Failed to send SMS notification for Route A delay.', timeAgo: '15 min ago', hasRetry: true },
  { id: '5', type: 'Success', title: 'Success: Bus 201 maintenance check completed successfully.', timeAgo: '25 min ago' },
  { id: '6', type: 'Warning', title: 'Warning: Low disk space warning on backup server.', timeAgo: '35 min ago' },
];

// --- Components ---

const StatCard = ({ label, value, subValue, icon: Icon, colorClass, valueClass }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-32">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-2">{label}</p>
        <h3 className={clsx("text-2xl font-bold", valueClass)}>{value}</h3>
      </div>
      <div className={clsx("p-2 rounded-lg bg-opacity-10", colorClass.bg)}>
        <Icon className={clsx("w-5 h-5", colorClass.text)} />
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: BusStatus['status'] }) => {
  const styles = {
    'On Time': "bg-green-100 text-green-700",
    'En Route': "bg-blue-100 text-blue-700",
    'Delayed': "bg-red-100 text-red-700",
    'Arrived': "bg-gray-100 text-gray-700",
    'Maintenance': "bg-white border border-gray-300 text-gray-700",
  };
  return (
    <span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-bold", styles[status])}>
      {status}
    </span>
  );
};

export default function LiveActivity() {
  return (
    <div >
      
      {/* 1. Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Live Activity & Notifications</h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor real-time operational data, manage bus statuses, and control system notifications.
        </p>
      </div>

      {/* 2. Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          label="Active Buses" 
          value="12 / 15" 
          icon={Bus} 
          colorClass={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
          valueClass="text-blue-600"
        />
        <StatCard 
          label="Upcoming Departures" 
          value="Route A (15 min)" 
          icon={Clock} 
          colorClass={{ bg: 'bg-red-50', text: 'text-red-500' }}
          valueClass="text-red-500"
        />
        <StatCard 
          label="Seats Booked Today" 
          value="+45" 
          icon={Ticket} 
          colorClass={{ bg: 'bg-green-50', text: 'text-green-500' }}
          valueClass="text-green-500"
        />
      </div>

      {/* 3. Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* --- LEFT COLUMN: Live Bus Feed --- */}
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[500px]">
            <div className="p-5 border-b border-gray-200 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-gray-900">Live Bus Status Feed</h3>
            </div>
            
            <div className="overflow-y-auto flex-1 p-4 space-y-4">
              {BUS_FEED.map((item) => (
                <div key={item.id} className="flex items-start justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex gap-3">
                    <div className="mt-1">
                      <Bus className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{item.busId} - {item.route}</h4>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <MapPin size={12} /> {item.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={item.status} />
                    <div className="text-xs text-gray-400 mt-1">{item.timeAgo}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trigger Notification Form */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-gray-900">Trigger Push Notification</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  rows={3} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  placeholder="Enter notification message..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient (Bus ID / Route ID / User ID)</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Bus 101, Route A"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                  <option>Information</option>
                  <option>Warning</option>
                  <option>Emergency Alert</option>
                </select>
              </div>

              <button className="w-full py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-sm flex items-center justify-center gap-2">
                <Send size={16} /> Send Notification
              </button>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Seat Stream & System Alerts --- */}
        <div className="flex flex-col gap-6">
          
          {/* Seat Availability Stream */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-[340px] flex flex-col">
            <div className="p-5 border-b border-gray-200 flex items-center gap-2">
              <Ticket className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-gray-900">Seat Availability Change Stream</h3>
            </div>
            
            <div className="overflow-y-auto flex-1 p-4 space-y-4">
              {SEAT_STREAM.map((item) => (
                <div key={item.id} className="flex items-center justify-between pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <Ticket className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-semibold text-gray-900">{item.route} ({item.busId})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={clsx(
                      "px-2 py-0.5 rounded text-xs font-bold",
                      item.action === 'Booked' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    )}>
                      {item.action} {item.count} Seats
                    </span>
                    <span className="text-xs text-gray-400 min-w-[60px] text-right">{item.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Notifications Center */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1">
             <div className="p-5 border-b border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                   <Activity className="w-5 h-5 text-indigo-600" />
                   <h3 className="text-lg font-bold text-gray-900">System Notifications Center</h3>
                </div>
                
                {/* Filters */}
                <div className="flex gap-2">
                  <select className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white text-gray-700 focus:outline-none">
                    <option>All Routes</option>
                  </select>
                  <select className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white text-gray-700 focus:outline-none">
                    <option>All Buses</option>
                  </select>
                  <select className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white text-gray-700 focus:outline-none">
                    <option>All Severity</option>
                  </select>
                </div>
             </div>

             <div className="p-4 space-y-4">
               {SYSTEM_ALERTS.map((alert) => {
                 let Icon = Info;
                 let colorClass = "text-blue-500";
                 if (alert.type === 'Error') { Icon = XCircle; colorClass = "text-red-500"; }
                 if (alert.type === 'Warning') { Icon = AlertTriangle; colorClass = "text-orange-500"; }
                 if (alert.type === 'Success') { Icon = CheckCircle; colorClass = "text-green-500"; }

                 return (
                   <div key={alert.id} className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                     <div className="flex gap-3">
                       <Icon className={clsx("w-5 h-5 flex-shrink-0 mt-0.5", colorClass)} />
                       <div className="flex-1">
                         <p className="text-sm font-semibold text-gray-900 leading-snug">{alert.title}</p>
                         <p className="text-xs text-gray-500 mt-1">{alert.timeAgo}</p>
                       </div>
                     </div>
                     {alert.hasRetry && (
                       <div className="flex justify-end mt-2">
                         <button className="flex items-center gap-1 px-3 py-1 border border-gray-200 rounded text-xs font-medium text-gray-700 hover:bg-gray-50">
                           <RotateCw size={12} /> Retry
                         </button>
                       </div>
                     )}
                   </div>
                 );
               })}
             </div>
          </div>

        </div>

      </div>
    
    </div>
  );
}