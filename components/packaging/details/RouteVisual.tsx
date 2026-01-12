import { useTranslations } from 'next-intl';
import { Box } from 'lucide-react';

export const RouteVisual = () => {
  const t = useTranslations('Packaging.details');
  return (
  <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
    <div className="text-center">
      <p className="text-xs text-gray-500 uppercase font-bold">{t('origin')}</p>
      <p className="text-lg font-bold text-gray-900">Douala</p>
      <p className="text-xs text-gray-500">Akwa Agency</p>
    </div>
    <div className="flex-1 px-4 flex flex-col items-center">
      <p className="text-xs text-gray-400 mb-1">{t('duration', { hours: 5 })}</p>
      <div className="w-full h-0.5 bg-gray-300 relative">
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-gray-100 p-1 rounded-full">
          <Box className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
    <div className="text-center">
      <p className="text-xs text-gray-500 uppercase font-bold">{t('destination')}</p>
      <p className="text-lg font-bold text-gray-900">Yaoundé</p>
      <p className="text-xs text-gray-500">Mvan Agency</p>
    </div>
  </div>
);
}