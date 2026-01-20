"use client";

import React, { useState } from "react";
import { ShipmentHeader } from '@/components/packaging/new/ShipmentHeader';
import { CustomerDetailsForm } from '@/components/packaging/new/CustomerDetailsForm';
import { ItemBuilder } from '@/components/packaging/new/ItemBuilder';
import { BusSelector } from '@/components/packaging/new/BusSelector';
import { OrderSummary } from '@/components/packaging/new/OrderSummary';
import { AvailableBus } from "@/types/buses";
import { availableBuses } from "@/data/bus";

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
  const [tempItem, setTempItem] = useState({ type: 'General', weight: '', value: '', desc: '' });

  

  const handleAddItem = () => {
    if (!tempItem.weight || !tempItem.desc) return;
    const newItem: Item = { ...tempItem, id: Date.now() };
    setItems([...items, newItem]);
    setTempItem({ type: 'General', weight: '', value: '', desc: '' });
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(i => i.id !== id));
  };

  // Calculate totals
  const totalWeight = items.reduce((sum, item) => sum + (Number(item.weight) || 0), 0);
  const totalCost = items.length * 5000; // Mock calculation

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ShipmentHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <CustomerDetailsForm />
            <ItemBuilder 
              items={items}
              tempItem={tempItem}
              setTempItem={setTempItem}
              handleAddItem={handleAddItem}
              handleRemoveItem={handleRemoveItem}
            />
            <BusSelector 
              availableBuses={availableBuses}
              selectedBus={selectedBus}
              setSelectedBus={setSelectedBus}
            />
          </div>
          
          {/* Right Column - Sticky on desktop */}
          <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:overflow-y-auto">
            <OrderSummary 
              items={items}
              totalWeight={totalWeight}
              totalCost={totalCost}
            />
          </div>
        </div>
      </div>
    </div>
  );
}