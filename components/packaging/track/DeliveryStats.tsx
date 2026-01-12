import { useTranslations } from 'next-intl';
import { Clock, AlertCircle } from 'lucide-react';

export const DeliveryStats = () => {
  const t = useTranslations('Packaging.track');
  return (
  <div className="w-64 border-l border-gray-100 pl-8 flex flex-col justify-center space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-gray-500">{t('delayRisk')}</p>
          <p className="text-sm font-bold text-gray-900">{t('lowOnTime')}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-gray-500">{t('currentStatus')}</p>
          <p className="text-sm font-bold text-gray-900">{t('passing', { location: 'Edéa' })}</p>
        </div>
      </div>
  </div>
);
}