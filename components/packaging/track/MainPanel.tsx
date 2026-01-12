import { TrackingHeader } from './TrackingHeader';
import { MapView } from './MapView';
import { DetailsPanel } from './DetailsPanel';

export const MainPanel = () => (
  <div className="flex-1 flex flex-col relative">
    <TrackingHeader />
    <MapView />
    <DetailsPanel />
  </div>
);