// "use client";

// import { useTranslations } from 'next-intl';
// import { PackageHeader } from '@/components/packaging/details/PackageHeader';
// import { RouteVisual } from '@/components/packaging/details/RouteVisual';
// import { CustomerInfo } from '@/components/packaging/details/CustomerInfo';
// import { ShipmentManifest } from '@/components/packaging/details/ShipmentManifest';
// import { TrackingTimeline } from '@/components/packaging/details/TrackingTimeline';
// import { PaymentDetails } from '@/components/packaging/details/PaymentDetails';

// export default function PackageDetailPage() {
//   return (
//     <div>
//       <div>
//         <div className="lg:col-span-2 space-y-6">
//           <PackageHeader />
//           <RouteVisual />
//           <CustomerInfo />
//           <ShipmentManifest />
//         </div>
//         <div className="space-y-6">
//           <TrackingTimeline />
//           <PaymentDetails />
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useTranslations } from 'next-intl';
import { PackageHeader } from '@/components/packaging/details/PackageHeader';
import { RouteVisual } from '@/components/packaging/details/RouteVisual';
import { CustomerInfo } from '@/components/packaging/details/CustomerInfo';
import { ShipmentManifest } from '@/components/packaging/details/ShipmentManifest';
import { TrackingTimeline } from '@/components/packaging/details/TrackingTimeline';
import { PaymentDetails } from '@/components/packaging/details/PaymentDetails';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Mock data - replace with actual data fetching
const mockShipmentData = {
  id: 'SHIP-12345',
  status: 'In Transit',
  origin: 'Douala',
  destination: 'Yaoundé',
  departureTime: '2024-01-21T08:00:00',
  estimatedArrival: '2024-01-21T12:30:00',
  items: [
    { id: 1, description: 'Electronics Package', weight: '2.5kg', status: 'In Transit' },
    { id: 2, description: 'Documents', weight: '0.5kg', status: 'In Transit' }
  ],
  customer: {
    name: 'John Doe',
    phone: '+237 6XX XXX XXX',
    email: 'john.doe@example.com',
    address: '123 Main St, Douala, Cameroon'
  },
  payment: {
    amount: '15,000 XAF',
    method: 'Mobile Money',
    status: 'Paid',
    reference: 'PAY-78901'
  }
};

export default function PackageDetailPage() {
  const t = useTranslations('PackageDetails');
  const params = useParams();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <PackageHeader 
              shipmentId={mockShipmentData.id} 
              status={mockShipmentData.status} 
            />
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <RouteVisual 
                origin={mockShipmentData.origin}
                destination={mockShipmentData.destination}
                departureTime={mockShipmentData.departureTime}
                estimatedArrival={mockShipmentData.estimatedArrival}
              />
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <CustomerInfo 
                customer={mockShipmentData.customer}
                className="border-b border-gray-100"
              />
              <ShipmentManifest 
                items={mockShipmentData.items}
                className="p-6"
              />
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <TrackingTimeline 
                status={mockShipmentData.status}
                className="p-6"
              />
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <PaymentDetails 
                payment={mockShipmentData.payment}
                className="p-6"
              />
            </div>

            {/* Action Buttons */}
            {isMobile && (
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-lg">
                <div className="flex gap-3">
                  <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Print Label
                  </button>
                  <button className="flex-1 py-2 px-4 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700">
                    Track Shipment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}