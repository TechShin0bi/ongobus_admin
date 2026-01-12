"use client";

import { useState } from "react";
import { Bus, Seat } from '@/types/buses';

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

import { useTranslations } from 'next-intl';
import { BusList } from "@/components/buses/BusList";
import { BusDetails } from "@/components/buses/BusDetails";
import { SeatLayout } from "@/components/buses/SeatLayout";
import { BUS_FLEET } from "@/data/bus";

export default function BusesManagement() {
  const t = useTranslations('Buses');
  const [selectedBusId, setSelectedBusId] = useState<string>('1');
  const [seats, setSeats] = useState<Seat[]>(INITIAL_SEATS);

  const selectedBus = BUS_FLEET.find(b => b.id === selectedBusId) || BUS_FLEET[0];
  const agencies = [...new Set(BUS_FLEET.map(bus => bus.agency))];

  const toggleSeatStatus = (index: number) => {
    const newSeats = [...seats];
    const current = newSeats[index].status;
    
    if (current === 'standard') newSeats[index].status = 'premium';
    else if (current === 'premium') newSeats[index].status = 'occupied';
    else newSeats[index].status = 'standard';
    
    setSeats(newSeats);
  };

  return (
    <div >
      <div className="mb-6">
         <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <BusList 
          buses={BUS_FLEET} 
          selectedBusId={selectedBusId} 
          onSelectBus={setSelectedBusId} 
          agencies={agencies}
        />

        <div className="xl:col-span-8 flex flex-col gap-6">
          <BusDetails bus={selectedBus} agencies={agencies} />
          <SeatLayout 
            seats={seats} 
            onToggleSeat={toggleSeatStatus} 
            onReset={() => setSeats(INITIAL_SEATS)} 
          />
        </div>
      </div>
    </div>
  );
}