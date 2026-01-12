import { useTranslations } from 'next-intl';
import { Bus, MapPin, Activity } from 'lucide-react';
import { BusStatus } from '@/types/live';
import { StatusBadge } from './StatusBadge';

interface LiveBusFeedProps {
  feed: BusStatus[];
}

export const LiveBusFeed = ({ feed }: LiveBusFeedProps) => {
  const t = useTranslations('LiveActivity');
  return (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[500px]">
    <div className="p-5 border-b border-gray-200 flex items-center gap-2">
      <Activity className="w-5 h-5 text-indigo-600" />
      <h3 className="text-lg font-bold text-gray-900">{t('liveBusFeed')}</h3>
    </div>
    
    <div className="overflow-y-auto flex-1 p-4 space-y-4">
      {feed.map((item) => (
        <div key={item.id} className="flex items-start justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
          <div className="flex gap-3">
            <div className="mt-1">
              <Bus className="w-4 h-4 text-gray-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">{item.busId} - {item.route}</h4>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <MapPin size={12} /> {item.location}
              </div>
            </div>
          </div>
          <div className="text-right">
            <StatusBadge status={item.status} />
            <div className="text-xs text-gray-400 mt-1">{item.timeAgo}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}