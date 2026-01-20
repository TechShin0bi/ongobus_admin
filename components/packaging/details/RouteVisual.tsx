// import { useTranslations } from 'next-intl';
// import { Box } from 'lucide-react';

// export const RouteVisual = () => {
//   const t = useTranslations('Packaging.details');
//   return (
//   <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
//     <div className="text-center">
//       <p className="text-xs text-gray-500 uppercase font-bold">{t('origin')}</p>
//       <p className="text-lg font-bold text-gray-900">Douala</p>
//       <p className="text-xs text-gray-500">Akwa Agency</p>
//     </div>
//     <div className="flex-1 px-4 flex flex-col items-center">
//       <p className="text-xs text-gray-400 mb-1">{t('duration', { hours: 5 })}</p>
//       <div className="w-full h-0.5 bg-gray-300 relative">
//         <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-gray-100 p-1 rounded-full">
//           <Box className="w-4 h-4 text-gray-400" />
//         </div>
//       </div>
//     </div>
//     <div className="text-center">
//       <p className="text-xs text-gray-500 uppercase font-bold">{t('destination')}</p>
//       <p className="text-lg font-bold text-gray-900">Yaoundé</p>
//       <p className="text-xs text-gray-500">Mvan Agency</p>
//     </div>
//   </div>
// );
// }
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface RouteVisualProps {
  origin: string;
  destination: string;
  departureTime: string;
  estimatedArrival: string;
  className?: string;
}

export function RouteVisual({ 
  origin, 
  destination, 
  departureTime, 
  estimatedArrival,
  className 
}: RouteVisualProps) {
  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
  };

  return (
    <div className={className}>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Route Information</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">{origin}</p>
              <p className="text-sm text-gray-500">Origin</p>
              <p className="text-xs text-gray-400 mt-1">Departs at {formatTime(departureTime)}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="h-8 w-8 text-gray-400">
              <ArrowRight className="h-8 w-8" />
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">{destination}</p>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="text-xs text-gray-400 mt-1">Arrives by {formatTime(estimatedArrival)}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 text-gray-400 mr-2" />
            <span>Estimated transit time: 4h 30m</span>
          </div>
        </div>
      </div>
    </div>
  );
}