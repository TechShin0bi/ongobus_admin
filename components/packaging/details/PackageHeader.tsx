// import { useTranslations } from 'next-intl';
// import { Share2, Printer } from 'lucide-react';

// export const PackageHeader = () => {
//   const t = useTranslations('Packaging.details');
//   return (
//   <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//     <div className="flex justify-between items-start mb-6">
//       <div>
//         <div className="flex items-center gap-3 mb-2">
//           <h1 className="text-2xl font-bold text-gray-900">#PKG-8832</h1>
//           <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{t('inTransit')}</span>
//         </div>
//         <p className="text-sm text-gray-500">{t('createdOn', { date: 'Jan 12, 2026 at 07:45 AM' })}</p>
//       </div>
//       <div className="flex gap-2">
//         <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"><Share2 className="w-4 h-4"/></button>
//         <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"><Printer className="w-4 h-4"/></button>
//       </div>
//     </div>
//   </div>
// );
// }


import { cn } from '@/utils/libs/utils';
import { CheckCircle, Clock, Truck, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PackageHeaderProps {
  shipmentId: string;
  status: string;
  className?: string;
}

export function PackageHeader({ shipmentId, status, className }: PackageHeaderProps) {
  const routes = useRouter();
  const statusConfig = {
    'In Transit': { 
      icon: <Truck className="h-5 w-5 text-blue-500" />,
      bg: 'bg-blue-50',
      text: 'text-blue-800'
    },
    'Delivered': { 
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      bg: 'bg-green-50',
      text: 'text-green-800'
    },
    'Pending': { 
      icon: <Clock className="h-5 w-5 text-yellow-500" />,
      bg: 'bg-yellow-50',
      text: 'text-yellow-800'
    },
    default: {
      icon: <XCircle className="h-5 w-5 text-gray-500" />,
      bg: 'bg-gray-50',
      text: 'text-gray-800'
    }
  };

  const currentStatus = statusConfig[status as keyof typeof statusConfig] || statusConfig.default;

  return (
    <div className={cn("bg-white rounded-xl shadow-sm border border-gray-200 p-6", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shipment #{shipmentId}</h1>
          <div className="mt-1 flex items-center">
            <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-sm font-medium", 
              currentStatus.bg, currentStatus.text)}>
              {currentStatus.icon}
              <span className="ml-1.5">{status}</span>
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Print Label
          </button>
          <button
          onClick={()=>{
            routes.push(`/packaging/track/?${shipmentId}`);
          }}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Track Shipment
          </button>
        </div>
      </div>
    </div>
  );
}