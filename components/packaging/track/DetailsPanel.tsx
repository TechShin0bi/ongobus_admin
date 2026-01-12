import { DeliveryTimeline } from './DeliveryTimeline';
import { DeliveryStats } from './DeliveryStats';

export const DetailsPanel = () => (
  <div className="h-64 bg-white border-t border-gray-200 p-6 flex gap-12">
    <DeliveryTimeline />
    <DeliveryStats />
  </div>
);