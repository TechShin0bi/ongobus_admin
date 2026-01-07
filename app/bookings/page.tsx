"use client";

import { BookingActionBar, BookingFilterBar, BookingTable } from "@/components/bookings";
import { QuickActionsPanel } from "@/components/bookings/QuickActionsPanel";
import { BOOKINGS_DATA } from "@/data/bookings";
import React, { useState } from "react";

export default function BookingsManagement() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Logic: Toggle single row
  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedIds(newSelection);
  };

  // Logic: Toggle Select All
  const toggleSelectAll = () => {
    if (selectedIds.size === BOOKINGS_DATA.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(BOOKINGS_DATA.map(b => b.id)));
    }
  };

  return (
    <div>
      {/* 1. Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          View, search, filter, and manage all bus ticket bookings within the system.
        </p>
      </div>

      {/* 2. Controls */}
      <BookingFilterBar />
      <BookingActionBar />

      {/* 3. Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Left: Table */}
        <div className="xl:col-span-3">
          <BookingTable
            bookings={BOOKINGS_DATA}
            selectedIds={selectedIds}
            onToggleSelection={toggleSelection}
            onToggleSelectAll={toggleSelectAll}
          />
        </div>

        {/* Right: Actions Panel */}
        <div className="xl:col-span-1">
          <QuickActionsPanel selectedCount={selectedIds.size} />
        </div>

      </div>
    </div>
  );
}