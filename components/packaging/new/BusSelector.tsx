import { useTranslations } from 'next-intl';
import { Truck, MapPin } from 'lucide-react';
import clsx from 'clsx';

interface Bus {
  id: number;
  name: string;
  route: string;
  time: string;
  status: string;
}

interface BusSelectorProps {
  availableBuses: Bus[];
  selectedBus: number | null;
  setSelectedBus: (id: number) => void;
}

export const BusSelector = ({ availableBuses, selectedBus, setSelectedBus }: BusSelectorProps) => {
  const t = useTranslations('Packaging.newShipment');
  return (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
      <Truck className="w-5 h-5 text-indigo-600" /> {t('selectBus')}
    </h3>
    <div className="space-y-3">
      {availableBuses.map((bus) => (
        <div 
          key={bus.id}
          onClick={() => setSelectedBus(bus.id)}
          className={clsx(
            "cursor-pointer rounded-lg p-3 border transition-all",
            selectedBus === bus.id 
              ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600" 
              : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
          )}
        >
          <div className="flex justify-between font-semibold text-sm">
            <span>{bus.name}</span>
            <span className="text-gray-500">{bus.time}</span>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" /> {bus.route}
          </div>
        </div>
      ))}
    </div>
  </div>
);
}