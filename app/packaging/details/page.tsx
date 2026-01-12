"use client";

import { useTranslations } from 'next-intl';
import { PackageHeader } from '@/components/packaging/details/PackageHeader';
import { RouteVisual } from '@/components/packaging/details/RouteVisual';
import { CustomerInfo } from '@/components/packaging/details/CustomerInfo';
import { ShipmentManifest } from '@/components/packaging/details/ShipmentManifest';
import { TrackingTimeline } from '@/components/packaging/details/TrackingTimeline';
import { PaymentDetails } from '@/components/packaging/details/PaymentDetails';

export default function PackageDetailPage() {
  return (
    <div>
      <div>
        <div className="lg:col-span-2 space-y-6">
          <PackageHeader />
          <RouteVisual />
          <CustomerInfo />
          <ShipmentManifest />
        </div>
        <div className="space-y-6">
          <TrackingTimeline />
          <PaymentDetails />
        </div>
      </div>
    </div>
  );
}