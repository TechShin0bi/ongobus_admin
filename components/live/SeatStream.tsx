import { useTranslations } from 'next-intl';
import { Ticket } from 'lucide-react';
import clsx from 'clsx';
import { SeatChange } from '@/types/live';

interface SeatStreamProps {
  stream: SeatChange[];
}

export const SeatStream = ({ stream }: SeatStreamProps) => {
  const t = useTranslations('LiveActivity.seatStream');
  return (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-[340px] flex flex-col">
    <div className="p-5 border-b border-gray-200 flex items-center gap-2">
      <Ticket className="w-5 h-5 text-indigo-600" />
      <h3 className="text-lg font-bold text-gray-900">{t('title')}</h3>
    </div>
    
    <div className="overflow-y-auto flex-1 p-4 space-y-4">
      {stream.map((item) => (
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
              {t(item.action === 'Booked' ? 'booked' : 'cancelled')} {item.count} {t('seats')}
            </span>
            <span className="text-xs text-gray-400 min-w-[60px] text-right">{item.timeAgo}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}