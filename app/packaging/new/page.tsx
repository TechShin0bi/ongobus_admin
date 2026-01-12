"use client";

import React, { useState } from "react";
import { ShipmentHeader } from '@/components/packaging/new/ShipmentHeader';
import { CustomerDetailsForm } from '@/components/packaging/new/CustomerDetailsForm';
import { ItemBuilder } from '@/components/packaging/new/ItemBuilder';
import { BusSelector } from '@/components/packaging/new/BusSelector';
import { OrderSummary } from '@/components/packaging/new/OrderSummary';

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
      <ShipmentHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <CustomerDetailsForm />
          <ItemBuilder 
            items={items} 
            tempItem={tempItem} 
            setTempItem={setTempItem} 
            handleAddItem={handleAddItem} 
            handleRemoveItem={handleRemoveItem} 
          />
        </div>
        <div className="space-y-6">
          <BusSelector 
            availableBuses={availableBuses} 
            selectedBus={selectedBus} 
            setSelectedBus={setSelectedBus} 
          />
          <OrderSummary 
            items={items} 
            totalWeight={totalWeight} 
            totalCost={totalCost} 
          />
        </div>
      </div>
    </div>
  );
}