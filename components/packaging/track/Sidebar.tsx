import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { DeliveryCard } from './DeliveryCard';

export const Sidebar = () => {
  const t = useTranslations('Packaging.track');
  return (
  <div className="w-96 bg-white border-r border-gray-200 flex flex-col z-10 shadow-xl">
    <div className="p-4 border-b border-gray-100">
      <h2 className="font-bold text-lg text-gray-900 mb-4">{t('activeDeliveries')}</h2>
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input 
          type="text" 
          placeholder={t('searchPlaceholder')} 
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>

    <div className="flex-1 overflow-y-auto">
      <DeliveryCard isActive={true} />
      <DeliveryCard isActive={false} />
    </div>
  </div>
);
}