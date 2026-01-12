import { useTranslations } from 'next-intl';
import { Box, Navigation, Truck, MapPin } from 'lucide-react';

export const DeliveryTimeline = () => {
  const t = useTranslations('Packaging.track');
  return (
  <div className="flex-1">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-6">{t('deliveryTimeline')}</h3>
      <div className="flex items-center w-full">
        
        {/* Step 1: Registered */}
        <div className="relative flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white z-10">
              <Box className="w-4 h-4" />
            </div>
            <div className="absolute top-4 left-1/2 w-full h-0.5 bg-indigo-600"></div>
            <div className="mt-3 text-center">
              <p className="text-xs font-bold text-gray-900">{t('registered')}</p>
              <p className="text-[10px] text-gray-500">08:00 AM</p>
            </div>
        </div>

        {/* Step 2: Departed */}
        <div className="relative flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white z-10">
              <Navigation className="w-4 h-4" />
            </div>
            <div className="absolute top-4 left-1/2 w-full h-0.5 bg-indigo-200"></div>
            <div className="absolute top-4 right-1/2 w-full h-0.5 bg-indigo-600"></div>
            <div className="mt-3 text-center">
              <p className="text-xs font-bold text-gray-900">{t('departed')}</p>
              <p className="text-[10px] text-gray-500">08:30 AM</p>
            </div>
        </div>

        {/* Step 3: In Transit (Current) */}
        <div className="relative flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center text-indigo-600 z-10 shadow-sm">
              <Truck className="w-4 h-4 animate-pulse" />
            </div>
            <div className="absolute top-4 left-1/2 w-full h-0.5 bg-gray-200"></div>
            <div className="absolute top-4 right-1/2 w-full h-0.5 bg-indigo-200"></div>
            <div className="mt-3 text-center">
              <p className="text-xs font-bold text-indigo-600">{t('onRoute')}</p>
              <p className="text-[10px] text-gray-500">{t('estTimeLeft', { time: '2h' })}</p>
            </div>
        </div>

        {/* Step 4: Arrival */}
        <div className="relative flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 z-10">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="absolute top-4 right-1/2 w-full h-0.5 bg-gray-200"></div>
            <div className="mt-3 text-center">
              <p className="text-xs font-bold text-gray-400">{t('arrival')}</p>
              <p className="text-[10px] text-gray-400">--:--</p>
            </div>
        </div>

      </div>
  </div>
);
}