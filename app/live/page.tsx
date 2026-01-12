"use client";
import { useTranslations } from 'next-intl';
import { Bus, Clock, Ticket } from 'lucide-react';
import { StatCard } from '@/components/live/StatCard';
import { LiveBusFeed } from '@/components/live/LiveBusFeed';
import { NotificationForm } from '@/components/live/NotificationForm';
import { SeatStream } from '@/components/live/SeatStream';
import { SystemAlerts } from '@/components/live/SystemAlerts';
import { BUS_FEED, SEAT_STREAM, SYSTEM_ALERTS } from '@/data/live';

export default function LiveActivity() {
  const t = useTranslations('LiveActivity');
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          label={t('activeBuses')} 
          value="12 / 15" 
          icon={Bus} 
          colorClass={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
          valueClass="text-blue-600"
        />
        <StatCard 
          label={t('upcomingDepartures')} 
          value="Route A (15 min)" 
          icon={Clock} 
          colorClass={{ bg: 'bg-red-50', text: 'text-red-500' }}
          valueClass="text-red-500"
        />
        <StatCard 
          label={t('seatsBookedToday')} 
          value="+45" 
          icon={Ticket} 
          colorClass={{ bg: 'bg-green-50', text: 'text-green-500' }}
          valueClass="text-green-500"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <LiveBusFeed feed={BUS_FEED} />
          <NotificationForm />
        </div>

        <div className="flex flex-col gap-6">
          <SeatStream stream={SEAT_STREAM} />
          <SystemAlerts alerts={SYSTEM_ALERTS} />
        </div>
      </div>
    </div>
  );
}