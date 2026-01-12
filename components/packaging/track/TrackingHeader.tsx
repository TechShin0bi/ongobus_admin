import { useTranslations } from 'next-intl';
import { Phone, MoreVertical } from 'lucide-react';

export const TrackingHeader = () => {
  const t = useTranslations('Packaging.track');
  return (
  <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-start pointer-events-none">
      <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 pointer-events-auto">
        <h1 className="text-xl font-bold text-gray-900">{t('tracking', { id: 'PKG-8832' })}</h1>
        <p className="text-sm text-gray-500">{t('estimatedArrival', { time: '14:30 PM' })} <span className="font-medium text-gray-900">({t('today')})</span></p>
      </div>
      
      <div className="flex gap-2 pointer-events-auto">
        <button className="bg-white p-3 rounded-lg shadow-lg text-gray-600 hover:text-indigo-600">
          <Phone className="w-5 h-5" />
        </button>
        <button className="bg-white p-3 rounded-lg shadow-lg text-gray-600 hover:text-indigo-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
  </div>
);
}