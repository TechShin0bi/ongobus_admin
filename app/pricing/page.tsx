"use client";

import { useState } from "react";
import { 
  Plus, Edit2, Trash2, Calculator, 
  Calendar, DollarSign, Tag 
} from "lucide-react";
import clsx from "clsx";

// --- Types ---

interface PricingRule {
  id: string;
  name: string;
  type: string;
  appliesTo: string;
  value: string;
  status: boolean;
}

interface SeatPrice {
  id: string;
  label: string;
  description: string;
  price: number;
  isActive: boolean;
}

interface Promotion {
  id: string;
  code: string;
  discount: string;
  validUntil: string;
  status: 'Active' | 'Inactive';
}

interface LogEntry {
  timestamp: string;
  user: string;
  action: string;
  item: string;
  oldValue: string;
  newValue: string;
}

// --- Mock Data ---

const BASE_PRICING = [
  { route: 'New York - Boston', price: 45.00, status: 'Active' },
  { route: 'Los Angeles - San Francisco', price: 70.00, status: 'Active' },
  { route: 'Chicago - Detroit', price: 35.00, status: 'Archived' },
  { route: 'Miami - Orlando', price: 50.00, status: 'Active' },
  { route: 'Houston - Dallas', price: 40.00, status: 'Active' },
];

const DYNAMIC_RULES: PricingRule[] = [
  { id: '1', name: 'Weekend Peak', type: 'Peak Time', appliesTo: 'All Routes', value: '15% Increase', status: true },
  { id: '2', name: 'Holiday Season 2024', type: 'Holiday', appliesTo: 'Specific Routes', value: '25% Increase', status: true },
  { id: '3', name: 'Low Occupancy Discount', type: 'Occupancy', appliesTo: 'All Routes', value: '10% Decrease', status: false },
  { id: '4', name: 'Early Bird Promo', type: 'Early Booking', appliesTo: 'Select Routes', value: '20% Discount', status: true },
];

const SEAT_PRICING: SeatPrice[] = [
  { id: '1', label: 'Standard', description: 'Regular seating', price: 0.00, isActive: true },
  { id: '2', label: 'Premium', description: 'Extra legroom, priority boarding', price: 15.00, isActive: true },
  { id: '3', label: 'Window View', description: 'Guaranteed window seat', price: 5.00, isActive: true },
  { id: '4', label: 'Aisle Access', description: 'Easy access to aisle', price: 3.00, isActive: false },
];

const PROMOTIONS: Promotion[] = [
  { id: '1', code: 'SUMMER24', discount: '10%', validUntil: '2024-08-31', status: 'Active' },
  { id: '2', code: 'FALLTRIP', discount: '15%', validUntil: '2024-11-15', status: 'Inactive' },
  { id: '3', code: 'EARLYBIRD', discount: '5%', validUntil: '2024-07-30', status: 'Active' },
  { id: '4', code: 'GROUPBUY', discount: '20%', validUntil: '2024-09-30', status: 'Active' },
];

const AUDIT_LOG: LogEntry[] = [
  { timestamp: '2024-07-19 10:30 AM', user: 'Admin User', action: 'Update Price', item: 'NY-BOS Base Fare', oldValue: '$40.00', newValue: '$45.00' },
  { timestamp: '2024-07-18 03:15 PM', user: 'Agency A', action: 'New Rule', item: 'Weekend Peak', oldValue: '-', newValue: '15% Inc.' },
  { timestamp: '2024-07-17 09:00 AM', user: 'Admin User', action: 'Deactivate', item: 'Chicago-Detroit', oldValue: 'Active', newValue: 'Archived' },
  { timestamp: '2024-07-16 11:45 AM', user: 'Agency B', action: 'Create Promo', item: 'SUMMER24', oldValue: '-', newValue: '10% Off' },
  { timestamp: '2024-07-15 02:00 PM', user: 'Admin User', action: 'Update Status', item: 'Aisle Access', oldValue: 'Inactive', newValue: 'Active' },
];

// --- Components ---

const Toggle = ({ active }: { active: boolean }) => (
  <div className={clsx(
    "w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600",
    active ? "bg-indigo-600 after:translate-x-full" : "bg-gray-300"
  )}>
    <div className={clsx("absolute top-0.5 left-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform", active && "translate-x-5")} />
  </div>
);

const Badge = ({ status }: { status: string | boolean }) => {
  const isPositive = status === 'Active' || status === true;
  const isNeutral = status === 'Archived';
  const label = typeof status === 'boolean' ? (status ? 'Active' : 'Inactive') : status;

  return (
    <span className={clsx(
      "px-2.5 py-0.5 rounded-full text-xs font-medium",
      isPositive ? "bg-indigo-100 text-indigo-700" : 
      isNeutral ? "bg-gray-100 text-gray-700" : "bg-red-100 text-red-700"
    )}>
      {label}
    </span>
  );
};

export default function PricingAndSeats() {
  const [availability, setAvailability] = useState(75);

  return (
    <div >
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
           Pricing & Seat Availability
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Centralized management for ticket pricing, dynamic rules, promotions, and real-time seat availability.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* --- SECTION 1: Base Ticket Pricing (Full Width) --- */}
        <div className="xl:col-span-3 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Base Ticket Pricing</h3>
            <button className="flex items-center gap-1.5 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700">
              <Plus size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3">Route</th>
                  <th className="px-6 py-3">Base Price</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {BASE_PRICING.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.route}</td>
                    <td className="px-6 py-4 text-gray-900">${item.price.toFixed(2)}</td>
                    <td className="px-6 py-4"><Badge status={item.status} /></td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex justify-end gap-3">
                         <Edit2 size={16} className="text-gray-400 cursor-pointer hover:text-indigo-600" />
                         <Trash2 size={16} className="text-gray-400 cursor-pointer hover:text-red-500" />
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- SECTION 2: Dynamic Pricing Rules (Left, Wider) --- */}
        <div className="xl:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Dynamic Pricing Rules</h3>
            <button className="flex items-center gap-1.5 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700">
              <Plus size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">Rule Name</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Applies To</th>
                  <th className="px-4 py-3">Value</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {DYNAMIC_RULES.map((rule) => (
                  <tr key={rule.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 font-medium text-gray-900">{rule.name}</td>
                    <td className="px-4 py-4">{rule.type}</td>
                    <td className="px-4 py-4">{rule.appliesTo}</td>
                    <td className="px-4 py-4 font-semibold text-gray-900">{rule.value}</td>
                    <td className="px-4 py-4 text-center">
                       <div className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in">
                          <input type="checkbox" checked={rule.status} readOnly className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-indigo-600"/>
                          <label className={clsx("toggle-label block overflow-hidden h-5 rounded-full cursor-pointer", rule.status ? "bg-indigo-600" : "bg-gray-300")}></label>
                       </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                       <div className="flex justify-end gap-3">
                         <Edit2 size={16} className="text-gray-400 cursor-pointer hover:text-indigo-600" />
                         <Trash2 size={16} className="text-gray-400 cursor-pointer hover:text-red-500" />
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- SECTION 3: Seat-Based Pricing (Right, Narrower) --- */}
        <div className="xl:col-span-1 bg-white border border-gray-200 rounded-xl shadow-sm">
           <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Seat-Based Pricing</h3>
            <button className="flex items-center gap-1.5 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700">
              <Plus size={16} />
            </button>
          </div>
          <div className="p-4 space-y-4">
             {SEAT_PRICING.map((seat) => (
               <div key={seat.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{seat.label}</h4>
                    <p className="text-xs text-gray-500">{seat.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-900">
                      {seat.price > 0 ? `+$${seat.price.toFixed(2)}` : '$0.00'}
                    </span>
                    <div className={clsx("w-8 h-4 rounded-full relative transition-colors", seat.isActive ? "bg-indigo-600" : "bg-gray-300")}>
                       <div className={clsx("absolute top-0.5 bg-white w-3 h-3 rounded-full transition-all", seat.isActive ? "left-4.5" : "left-0.5")} />
                    </div>
                    <Edit2 size={14} className="text-gray-400 cursor-pointer" />
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* --- SECTION 4: Promotions & Discounts (Left, Wider) --- */}
        <div className="xl:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Promotions & Discounts</h3>
            <button className="flex items-center gap-1.5 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700">
              <Plus size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3">Code</th>
                  <th className="px-6 py-3">Discount</th>
                  <th className="px-6 py-3">Valid Until</th>
                  <th className="px-6 py-3 text-center">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {PROMOTIONS.map((promo) => (
                  <tr key={promo.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-gray-900">{promo.code}</td>
                    <td className="px-6 py-4 text-green-600 font-medium">{promo.discount}</td>
                    <td className="px-6 py-4 flex items-center gap-2">
                       <Calendar size={14} className="text-gray-400" />
                       {promo.validUntil}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge status={promo.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex justify-end gap-3">
                         <Edit2 size={16} className="text-gray-400 cursor-pointer hover:text-indigo-600" />
                         <Trash2 size={16} className="text-gray-400 cursor-pointer hover:text-red-500" />
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- SECTION 5: Preview Fare Calculation (Right, Narrower) --- */}
        <div className="xl:col-span-1 bg-white border border-gray-200 rounded-xl shadow-sm p-5">
           <h3 className="text-lg font-bold text-gray-900 mb-2">Preview Fare Calculation</h3>
           <p className="text-xs text-gray-500 mb-4">Simulate fares based on route, date, and passenger count.</p>
           
           <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Route</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                  <option>Select a route</option>
                  <option>New York - Boston</option>
                  <option>Los Angeles - San Francisco</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Travel Date</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Number of Passengers</label>
                <input type="number" defaultValue={1} min={1} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>

              <button className="w-full py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 text-sm shadow-sm flex items-center justify-center gap-2">
                 <Calculator size={16} /> Calculate Fare
              </button>
           </div>
        </div>

        {/* --- SECTION 6: Live Availability Controls (Full Width) --- */}
        <div className="xl:col-span-3 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
           <h3 className="text-lg font-bold text-gray-900 mb-2">Live Availability Controls</h3>
           <p className="text-sm text-gray-500 mb-6">Adjust seat availability for specific routes or buses in real-time.</p>
           
           <div className="space-y-6">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Select Bus / Route</label>
               <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white max-w-lg">
                  <option>New York - Boston (Bus #B1)</option>
                  <option>Los Angeles - SF (Bus #A5)</option>
                </select>
             </div>

             <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Available Seats: {availability}%</label>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={availability} 
                  onChange={(e) => setAvailability(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="text-right text-xs text-gray-500 mt-1">75 seats currently available.</div>
             </div>

             <button className="w-full py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 text-sm shadow-sm">
                 Update Availability
             </button>
           </div>
        </div>

        {/* --- SECTION 7: Pricing Audit Log (Full Width) --- */}
        <div className="xl:col-span-3 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-10">
           <div className="p-5 border-b border-gray-100">
             <h3 className="text-lg font-bold text-gray-900">Pricing Audit Log</h3>
             <p className="text-sm text-gray-500 mt-1">Track all changes made to pricing configurations.</p>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-xs text-left text-gray-500">
               <thead className="text-gray-700 bg-gray-50 border-b border-gray-100">
                 <tr>
                   <th className="px-6 py-3 font-medium">Timestamp</th>
                   <th className="px-6 py-3 font-medium">User</th>
                   <th className="px-6 py-3 font-medium">Action</th>
                   <th className="px-6 py-3 font-medium">Item</th>
                   <th className="px-6 py-3 font-medium">Old Value</th>
                   <th className="px-6 py-3 font-medium">New Value</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 {AUDIT_LOG.map((log, index) => (
                   <tr key={index} className="hover:bg-gray-50">
                     <td className="px-6 py-3">{log.timestamp}</td>
                     <td className="px-6 py-3 text-gray-900 font-medium">{log.user}</td>
                     <td className="px-6 py-3">{log.action}</td>
                     <td className="px-6 py-3 text-gray-900">{log.item}</td>
                     <td className="px-6 py-3">{log.oldValue}</td>
                     <td className="px-6 py-3 text-indigo-600 font-medium">{log.newValue}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

      </div>

      <footer className="text-center text-sm text-gray-500 pb-8">
        © 2026 BusLink Admin Dashboard. All rights reserved.
      </footer>
    </div>
  );
}