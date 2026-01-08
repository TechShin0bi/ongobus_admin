"use client";

import React from "react";
import { 
  Search, MapPin, Truck, Box, MoreVertical, 
  Phone, Navigation, Clock, AlertCircle 
} from "lucide-react";

export default function TrackingDashboard() {
  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden font-sans">
      
      {/* --- Sidebar: Active Deliveries List --- */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col z-10 shadow-xl">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-lg text-gray-900 mb-4">Active Deliveries</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search Waybill ID..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Card Item: Active */}
          <div className="p-4 border-b border-gray-100 hover:bg-indigo-50 cursor-pointer bg-indigo-50 border-l-4 border-l-indigo-600 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono text-xs font-bold text-indigo-600 bg-white px-2 py-0.5 rounded border border-indigo-100">#PKG-8832</span>
              <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> In Transit
              </span>
            </div>
            <h4 className="font-medium text-gray-900 text-sm mb-1">Douala <span className="text-gray-400 mx-1">→</span> Yaoundé</h4>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
               <Truck className="w-3 h-3" /> Bus A-102
               <span className="w-1 h-1 rounded-full bg-gray-300"></span>
               Driver: Jean P.
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
               <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>

          {/* Card Item: Pending */}
          <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">#PKG-9921</span>
              <span className="text-xs font-medium text-orange-600">Waiting Dept.</span>
            </div>
            <h4 className="font-medium text-gray-900 text-sm mb-1">Douala <span className="text-gray-400 mx-1">→</span> Bafoussam</h4>
             <div className="flex items-center gap-2 text-xs text-gray-500">
               <Truck className="w-3 h-3" /> Bus B-11
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Area: Map & Details --- */}
      <div className="flex-1 flex flex-col relative">
        
        {/* Floating Info Header */}
        <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-start pointer-events-none">
           <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 pointer-events-auto">
              <h1 className="text-xl font-bold text-gray-900">Tracking #PKG-8832</h1>
              <p className="text-sm text-gray-500">Estimated Arrival: <span className="font-medium text-gray-900">14:30 PM (Today)</span></p>
           </div>
           
           <div className="flex gap-2 pointer-events-auto">
             <button className="bg-white p-3 rounded-lg shadow-lg text-gray-600 hover:text-indigo-600">
                <Phone className="w-5 h-5" />
             </button>
             <button className="bg-white p-3 rounded-lg shadow-lg text-gray-600 hover:text-indigo-600">
                <MoreVertical className="w-5 h-5" />
             </button>
           </div>
        </div>

        {/* MOCK MAP BACKGROUND */}
        <div className="flex-1 bg-slate-200 relative overflow-hidden group">
            {/* Grid Pattern to simulate map */}
            <div className="absolute inset-0 opacity-10" 
                 style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>
            
            {/* Map Route Line (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
               <path d="M 200 500 Q 400 400 600 300 T 900 200" fill="none" stroke="#6366f1" strokeWidth="4" strokeDasharray="8 4" />
            </svg>

            {/* Bus Marker (Animated) */}
            <div className="absolute top-[300px] left-[600px] transform -translate-x-1/2 -translate-y-1/2">
               <div className="relative">
                 <div className="absolute -inset-4 bg-indigo-500/30 rounded-full animate-ping"></div>
                 <div className="bg-indigo-600 text-white p-2 rounded-full shadow-xl relative z-10 border-2 border-white">
                    <Truck className="w-6 h-6" />
                 </div>
                 <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    85 km/h
                 </div>
               </div>
            </div>

             {/* Destination Marker */}
             <div className="absolute top-[200px] left-[900px] transform -translate-x-1/2 -translate-y-1/2">
                 <MapPin className="w-8 h-8 text-red-500 drop-shadow-md" fill="currentColor" />
            </div>
        </div>

        {/* Bottom Details Panel */}
        <div className="h-64 bg-white border-t border-gray-200 p-6 flex gap-12">
           
           {/* Timeline */}
           <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-6">Delivery Timeline</h3>
              <div className="flex items-center w-full">
                 
                 {/* Step 1: Registered */}
                 <div className="relative flex flex-col items-center flex-1">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white z-10">
                       <Box className="w-4 h-4" />
                    </div>
                    <div className="absolute top-4 left-1/2 w-full h-0.5 bg-indigo-600"></div>
                    <div className="mt-3 text-center">
                       <p className="text-xs font-bold text-gray-900">Registered</p>
                       <p className="text-[10px] text-gray-500">08:00 AM</p>
                    </div>
                 </div>

                 {/* Step 2: Departed */}
                 <div className="relative flex flex-col items-center flex-1">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white z-10">
                       <Navigation className="w-4 h-4" />
                    </div>
                    <div className="absolute top-4 left-1/2 w-full h-0.5 bg-indigo-200"></div>
                    <div className="absolute top-4 right-1/2 w-full h-0.5 bg-indigo-600"></div>
                    <div className="mt-3 text-center">
                       <p className="text-xs font-bold text-gray-900">Departed</p>
                       <p className="text-[10px] text-gray-500">08:30 AM</p>
                    </div>
                 </div>

                 {/* Step 3: In Transit (Current) */}
                 <div className="relative flex flex-col items-center flex-1">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center text-indigo-600 z-10 shadow-sm">
                       <Truck className="w-4 h-4 animate-pulse" />
                    </div>
                    <div className="absolute top-4 left-1/2 w-full h-0.5 bg-gray-200"></div>
                    <div className="absolute top-4 right-1/2 w-full h-0.5 bg-indigo-200"></div>
                    <div className="mt-3 text-center">
                       <p className="text-xs font-bold text-indigo-600">On Route</p>
                       <p className="text-[10px] text-gray-500">Est 2h left</p>
                    </div>
                 </div>

                 {/* Step 4: Arrival */}
                 <div className="relative flex flex-col items-center flex-1">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 z-10">
                       <MapPin className="w-4 h-4" />
                    </div>
                    <div className="absolute top-4 right-1/2 w-full h-0.5 bg-gray-200"></div>
                    <div className="mt-3 text-center">
                       <p className="text-xs font-bold text-gray-400">Arrival</p>
                       <p className="text-[10px] text-gray-400">--:--</p>
                    </div>
                 </div>

              </div>
           </div>

           {/* Stats */}
           <div className="w-64 border-l border-gray-100 pl-8 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                    <Clock className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-xs text-gray-500">Delay Risk</p>
                    <p className="text-sm font-bold text-gray-900">Low (On Time)</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <AlertCircle className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-xs text-gray-500">Current Status</p>
                    <p className="text-sm font-bold text-gray-900">Passing Edéa</p>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}