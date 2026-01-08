"use client";

import React, { useState } from "react";
import { 
  Package, User, Plus, Trash2, Truck, 
  MapPin, CheckCircle, AlertCircle 
} from "lucide-react";
import clsx from "clsx";

interface Item {
  id: number;
  type: string;
  weight: string;
  value: string;
  desc: string;
}

export default function NewMultiItemShipmentPage() {
  const [selectedBus, setSelectedBus] = useState<number | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  
  // Temporary state for the item being added
  const [tempItem, setTempItem] = useState({ type: 'General', weight: '', value: '', desc: '' });

  const handleAddItem = () => {
    if (!tempItem.weight || !tempItem.desc) return; // Simple validation
    const newItem: Item = { ...tempItem, id: Date.now() };
    setItems([...items, newItem]);
    setTempItem({ type: 'General', weight: '', value: '', desc: '' }); // Reset form
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(i => i.id !== id));
  };

  // Calculate Totals
  const totalWeight = items.reduce((acc, curr) => acc + Number(curr.weight), 0);
  const totalCost = 2000 + (totalWeight * 500) + (items.length * 500); // Mock pricing logic

  // Mock Data
  const availableBuses = [
    { id: 1, name: "Bus A-102", route: "Douala -> Yaoundé", time: "08:00 AM", status: "Boarding" },
    { id: 2, name: "Bus B-405", route: "Douala -> Bamenda", time: "09:30 AM", status: "Scheduled" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Register New Shipment</h1>
          <p className="text-sm text-gray-500">Create a multi-item waybill and assign to a bus.</p>
        </div>
        <div className="flex gap-3">
             <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">Draft</button>
             <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Save Shipment</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Column: Customer & Items --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Customer Details (Collapsed for brevity, same as before) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-indigo-600" /> Customer Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Sender Name" className="p-2 border rounded text-sm bg-gray-50" />
                <input type="text" placeholder="Sender Phone" className="p-2 border rounded text-sm bg-gray-50" />
                <input type="text" placeholder="Receiver Name" className="p-2 border rounded text-sm bg-gray-50" />
                <input type="text" placeholder="Receiver Phone" className="p-2 border rounded text-sm bg-gray-50" />
            </div>
          </div>

          {/* 2. Item Builder (Multi-Item Logic) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-600" /> Package Items
                </h3>
                <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
                    {items.length} items added
                </span>
            </div>

            {/* Input Row */}
            <div className="grid grid-cols-12 gap-3 mb-4 items-end bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="col-span-3">
                    <label className="text-xs font-medium text-gray-500">Type</label>
                    <select 
                        value={tempItem.type}
                        onChange={(e) => setTempItem({...tempItem, type: e.target.value})}
                        className="w-full mt-1 p-2 border rounded text-sm"
                    >
                        <option>General</option>
                        <option>Fragile</option>
                        <option>Electronics</option>
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="text-xs font-medium text-gray-500">Kg</label>
                    <input 
                        type="number" 
                        value={tempItem.weight}
                        onChange={(e) => setTempItem({...tempItem, weight: e.target.value})}
                        className="w-full mt-1 p-2 border rounded text-sm" placeholder="0" 
                    />
                </div>
                <div className="col-span-5">
                    <label className="text-xs font-medium text-gray-500">Description</label>
                    <input 
                        type="text" 
                        value={tempItem.desc}
                        onChange={(e) => setTempItem({...tempItem, desc: e.target.value})}
                        className="w-full mt-1 p-2 border rounded text-sm" placeholder="Item details..." 
                    />
                </div>
                <div className="col-span-2">
                    <button 
                        onClick={handleAddItem}
                        className="w-full p-2 bg-indigo-600 text-white rounded text-sm font-medium hover:bg-indigo-700 flex justify-center items-center gap-1"
                    >
                        <Plus className="w-4 h-4" /> Add
                    </button>
                </div>
            </div>

            {/* Items List Table */}
            {items.length > 0 ? (
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Desc</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Weight</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-2 text-sm text-gray-900">{item.type}</td>
                                    <td className="px-4 py-2 text-sm text-gray-500 truncate max-w-[150px]">{item.desc}</td>
                                    <td className="px-4 py-2 text-sm text-gray-900">{item.weight} kg</td>
                                    <td className="px-4 py-2 text-right">
                                        <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-500">No items added yet. Use the form above.</p>
                </div>
            )}
          </div>
        </div>

        {/* --- Right Column: Bus & Summary --- */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-indigo-600" /> Select Bus
            </h3>
            <div className="space-y-3">
              {availableBuses.map((bus) => (
                <div 
                  key={bus.id}
                  onClick={() => setSelectedBus(bus.id)}
                  className={clsx(
                    "cursor-pointer rounded-lg p-3 border transition-all",
                    selectedBus === bus.id 
                      ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600" 
                      : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                  )}
                >
                  <div className="flex justify-between font-semibold text-sm">
                    <span>{bus.name}</span>
                    <span className="text-gray-500">{bus.time}</span>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                     <MapPin className="w-3 h-3" /> {bus.route}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="bg-gray-900 rounded-xl p-6 text-white shadow-lg">
             <h4 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Order Summary</h4>
             
             <div className="flex justify-between text-sm mb-2 text-gray-300">
                <span>Total Items</span>
                <span>{items.length}</span>
             </div>
             <div className="flex justify-between text-sm mb-4 text-gray-300">
                <span>Total Weight</span>
                <span>{totalWeight} kg</span>
             </div>
             
             <div className="border-t border-gray-700 pt-4 flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-green-400">{totalCost.toLocaleString()} XAF</span>
             </div>

             <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-500 transition-colors flex justify-center items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Confirm Order
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}