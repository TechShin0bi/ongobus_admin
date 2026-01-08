"use client";

import React from "react";
import { 
  ArrowLeft, Printer, MapPin, Calendar, 
  Phone, Box, FileText, Share2 
} from "lucide-react";

export default function PackageDetailPage() {
  return (
    <div >

      <div >
        
        {/* --- LEFT: Main Detail Card --- */}
        <div className="lg:col-span-2 space-y-6">
           
           {/* Header Card */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <div className="flex items-center gap-3 mb-2">
                       <h1 className="text-2xl font-bold text-gray-900">#PKG-8832</h1>
                       <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">In Transit</span>
                    </div>
                    <p className="text-sm text-gray-500">Created on Jan 12, 2026 at 07:45 AM</p>
                 </div>
                 <div className="flex gap-2">
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"><Share2 className="w-4 h-4"/></button>
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"><Printer className="w-4 h-4"/></button>
                 </div>
              </div>

              {/* Route Visual */}
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                 <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase font-bold">Origin</p>
                    <p className="text-lg font-bold text-gray-900">Douala</p>
                    <p className="text-xs text-gray-500">Akwa Agency</p>
                 </div>
                 <div className="flex-1 px-4 flex flex-col items-center">
                    <p className="text-xs text-gray-400 mb-1">~5 hours</p>
                    <div className="w-full h-0.5 bg-gray-300 relative">
                       <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-gray-100 p-1 rounded-full">
                          <Box className="w-4 h-4 text-gray-400" />
                       </div>
                    </div>
                 </div>
                 <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase font-bold">Destination</p>
                    <p className="text-lg font-bold text-gray-900">Yaoundé</p>
                    <p className="text-xs text-gray-500">Mvan Agency</p>
                 </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-6">
                 <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Sender</h3>
                    <p className="font-medium text-gray-900">John Doe</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                       <Phone className="w-3 h-3" /> +237 699 00 00 00
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Douala, Cameroon</p>
                 </div>
                 <div className="text-right">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Receiver</h3>
                    <p className="font-medium text-gray-900">Alice Smith</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1 justify-end">
                       <Phone className="w-3 h-3" /> +237 677 11 11 11
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Yaoundé, Cameroon</p>
                 </div>
              </div>
           </div>

           {/* Item Manifest (The Multi-Item View) */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                 <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" /> Shipment Manifest
                 </h3>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                 <thead className="bg-white">
                    <tr>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Description</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Weight</th>
                       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Declared Value</th>
                    </tr>
                 </thead>
                 <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                       <td className="px-6 py-4 text-sm text-gray-900">Large Box of Books</td>
                       <td className="px-6 py-4 text-sm text-gray-500">General</td>
                       <td className="px-6 py-4 text-sm text-gray-900 text-right">15 kg</td>
                       <td className="px-6 py-4 text-sm text-gray-500 text-right">25,000 XAF</td>
                    </tr>
                    <tr>
                       <td className="px-6 py-4 text-sm text-gray-900">Laptop Bag (HP Envy)</td>
                       <td className="px-6 py-4 text-sm text-orange-600 bg-orange-50 w-min rounded px-2">Electronics</td>
                       <td className="px-6 py-4 text-sm text-gray-900 text-right">3 kg</td>
                       <td className="px-6 py-4 text-sm text-gray-500 text-right">350,000 XAF</td>
                    </tr>
                    <tr className="bg-gray-50 font-medium">
                       <td className="px-6 py-4 text-sm text-gray-900" colSpan={2}>Totals</td>
                       <td className="px-6 py-4 text-sm text-gray-900 text-right">18 kg</td>
                       <td className="px-6 py-4 text-sm text-gray-900 text-right">375,000 XAF</td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>

        {/* --- RIGHT: Status & Payment --- */}
        <div className="space-y-6">
           
           {/* Current Status */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="font-bold text-gray-900 mb-4">Tracking Status</h3>
              <div className="relative pl-4 border-l-2 border-indigo-200 space-y-6">
                 
                 {/* Timeline Item 1 */}
                 <div className="relative">
                    <div className="absolute -left-[21px] top-0 w-3 h-3 bg-indigo-600 rounded-full border-2 border-white shadow"></div>
                    <p className="text-xs text-gray-500 mb-0.5">Today, 08:30 AM</p>
                    <p className="text-sm font-medium text-gray-900">Departed Douala Agency</p>
                    <p className="text-xs text-gray-500">Bus A-102 is en route.</p>
                 </div>
                 
                 {/* Timeline Item 2 */}
                 <div className="relative">
                    <div className="absolute -left-[21px] top-0 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></div>
                    <p className="text-xs text-gray-500 mb-0.5">Today, 07:45 AM</p>
                    <p className="text-sm font-medium text-gray-900">Package Registered</p>
                    <p className="text-xs text-gray-500">Checked in by Admin.</p>
                 </div>

              </div>
              <button className="mt-6 w-full py-2 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-lg hover:bg-indigo-100">
                 Update Status
              </button>
           </div>

           {/* Payment Info */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Payment Info</h3>
              <div className="flex justify-between items-center mb-2">
                 <span className="text-sm text-gray-500">Shipping Cost</span>
                 <span className="text-sm font-medium text-gray-900">4,500 XAF</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                 <span className="text-sm text-gray-500">Insurance</span>
                 <span className="text-sm font-medium text-gray-900">1,000 XAF</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                 <span className="font-bold text-gray-900">Total Paid</span>
                 <span className="font-bold text-xl text-green-600">5,500 XAF</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold">
                 <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span> PAID - CASH
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}