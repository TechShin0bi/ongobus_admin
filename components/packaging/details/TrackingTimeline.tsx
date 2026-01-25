// import { useTranslations } from 'next-intl';

// export const TrackingTimeline = () => {
//   const t = useTranslations('Packaging.details');
//   return (
//   <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
//     <h3 className="font-bold text-gray-900 mb-4">{t('trackingStatus')}</h3>
//     <div className="relative pl-4 border-l-2 border-indigo-200 space-y-6">
      
//       {/* Timeline Item 1 */}
//       <div className="relative">
//         <div className="absolute -left-[21px] top-0 w-3 h-3 bg-indigo-600 rounded-full border-2 border-white shadow"></div>
//         <p className="text-xs text-gray-500 mb-0.5">Today, 08:30 AM</p>
//         <p className="text-sm font-medium text-gray-900">{t('timeline.departed', { agency: 'Douala' })}</p>
//         <p className="text-xs text-gray-500">{t('timeline.enRoute', { busId: 'A-102' })}</p>
//       </div>
      
//       {/* Timeline Item 2 */}
//       <div className="relative">
//         <div className="absolute -left-[21px] top-0 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></div>
//         <p className="text-xs text-gray-500 mb-0.5">Today, 07:45 AM</p>
//         <p className="text-sm font-medium text-gray-900">{t('timeline.registered')}</p>
//         <p className="text-xs text-gray-500">{t('timeline.checkedIn')}</p>
//       </div>

//     </div>
//     <button className="mt-6 w-full py-2 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-lg hover:bg-indigo-100">
//       {t('updateStatus')}
//     </button>
//   </div>
// );
// }

import { CheckCircle, Clock, Package, Truck, Home, XCircle } from 'lucide-react';

interface TrackingTimelineProps {
  status: string;
  className?: string;
}

export function TrackingTimeline({ status, className }: TrackingTimelineProps) {
  const steps = [
    {
      id: 'ordered',
      name: 'Order Placed',
      description: 'Your shipment has been created',
      status: 'complete',
      icon: <Package className="h-5 w-5" />,
      date: 'Jan 20, 2024',
      time: '10:30 AM'
    },
    {
      id: 'processing',
      name: 'Processing',
      description: 'Preparing your shipment',
      status: 'complete',
      icon: <Package className="h-5 w-5" />,
      date: 'Jan 20, 2024',
      time: '11:45 AM'
    },
    {
      id: 'in-transit',
      name: 'In Transit',
      description: 'Your package is on the way',
      status: 'current',
      icon: <Truck className="h-5 w-5" />,
      date: 'Jan 21, 2024',
      time: '08:00 AM'
    },
    {
      id: 'out-for-delivery',
      name: 'Out for Delivery',
      description: 'Your package will be delivered today',
      status: 'upcoming',
      icon: <Truck className="h-5 w-5" />,
      date: 'Estimated',
      time: '12:00 PM'
    },
    {
      id: 'delivered',
      name: 'Delivered',
      description: 'Your package has been delivered',
      status: 'upcoming',
      icon: <Home className="h-5 w-5" />,
      date: 'Estimated',
      time: '12:30 PM'
    }
  ];

  return (
    <div className={className}>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Tracking History</h2>
      <div className="flow-root">
        <ul className="-mb-8">
          {steps.map((step, stepIdx) => {
            const isComplete = step.status === 'complete';
            const isCurrent = step.status === 'current';
            
            return (
              <li key={step.id} className="relative pb-8">
                {stepIdx !== steps.length - 1 ? (
                  <span 
                    className={`
                      absolute left-4 top-4 -ml-px h-full w-0.5 
                      ${isComplete || isCurrent ? 'bg-indigo-600' : 'bg-gray-200'}
                    `} 
                    aria-hidden="true" 
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={`
                        h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white
                        ${isComplete 
                          ? 'bg-green-500 text-white' 
                          : isCurrent 
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }
                      `}
                    >
                      {isComplete ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : isCurrent ? (
                        step.icon
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-700">
                        {step.name}
                        {step.description && (
                          <span className="block text-sm text-gray-500">{step.description}</span>
                        )}
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      <div>{step.date}</div>
                      <div className="text-xs text-gray-400">{step.time}</div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}