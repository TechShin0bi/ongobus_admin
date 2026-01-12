import { useTranslations } from 'next-intl';
import { Truck } from 'lucide-react';

interface DeliveryCardProps {
  isActive: boolean;
}

export const DeliveryCard = ({ isActive }: DeliveryCardProps) => {
  const t = useTranslations('Packaging.track');
  return (
  <div className={`p-4 border-b border-gray-100 hover:bg-indigo-50 cursor-pointer transition-colors ${isActive ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''}`}>
    <div className="flex justify-between items-start mb-2">
      <span className={`font-mono text-xs font-bold ${isActive ? 'text-indigo-600 bg-white px-2 py-0.5 rounded border border-indigo-100' : 'text-gray-500 bg-gray-100 px-2 py-0.5 rounded'}`}>#PKG-8832</span>
      <span className={`text-xs font-medium ${isActive ? 'text-green-600 flex items-center gap-1' : 'text-orange-600'}`}>
        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>}
        {isActive ? t('inTransit') : t('waitingDept')}
      </span>
    </div>
    <h4 className="font-medium text-gray-900 text-sm mb-1">Douala <span className="text-gray-400 mx-1">→</span> Yaoundé</h4>
    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
        <Truck className="w-3 h-3" /> Bus A-102
        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
        {t('driver', { name: 'Jean P.' })}
    </div>
    {isActive && (
      <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '65%' }}></div>
      </div>
    )}
  </div>
);
}