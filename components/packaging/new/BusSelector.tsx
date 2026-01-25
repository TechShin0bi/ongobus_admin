import { useTranslations } from 'next-intl';
import { Truck, MapPin, Clock, Check, Search, ArrowRight, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { AvailableBus } from '@/types/buses';



interface Route {
  id: string;
  from: string;
  to: string;
  code: string;
}

export const BusSelector = ({ 
  availableBuses, 
  selectedBus, 
  setSelectedBus 
}: {
  availableBuses: AvailableBus[];
  selectedBus: number | null;
  setSelectedBus: (id: number) => void;
}) => {
  const t = useTranslations('Packaging.newShipment');
  const [isMobile, setIsMobile] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [showRouteSelector, setShowRouteSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Define available routes
  const routes: Route[] = [
    { id: 'dla-yao', from: 'Douala', to: 'Yaoundé', code: 'DLA-YAO' },
    { id: 'yao-dla', from: 'Yaoundé', to: 'Douala', code: 'YAO-DLA' },
    { id: 'dla-baf', from: 'Douala', to: 'Bafoussam', code: 'DLA-BAF' },
    { id: 'baf-dla', from: 'Bafoussam', to: 'Douala', code: 'BAF-DLA' },
    { id: 'yao-baf', from: 'Yaoundé', to: 'Bafoussam', code: 'YAO-BAF' },
    { id: 'baf-yao', from: 'Bafoussam', to: 'Yaoundé', code: 'BAF-YAO' },
  ];

  // Filter buses based on selected route
  const filteredBuses = selectedRoute
    ? availableBuses.filter(bus => bus.route === selectedRoute)
    : availableBuses;

  // Filter routes based on search term
  const filteredRoutes = routes.filter(route => 
    route.from.toLowerCase().includes(searchTerm.toLowerCase()) || 
    route.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRouteSelect = (routeCode: string) => {
    setSelectedRoute(routeCode);
    setShowRouteSelector(false);
    setSearchTerm('');
  };

  if (availableBuses.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <Truck className="w-5 h-5 text-indigo-600" /> {t('selectBus')}
        </h3>
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Truck className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">{t('noBusesFound')}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {t('tryAnotherRoute')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
          <Truck className="w-5 h-5 text-indigo-600" /> 
          <span>{t('selectBus')}</span>
        </h3>
        
        <div className="relative w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setShowRouteSelector(!showRouteSelector)}
            className="w-full sm:w-64 flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-left text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {selectedRoute 
              ? routes.find(r => r.code === selectedRoute)?.code || t('selectRoute')
              : t('selectRoute')}
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {showRouteSelector && (
            <div className="absolute z-10 mt-1 w-full sm:w-80 bg-white shadow-lg rounded-lg border border-gray-200 py-1">
              <div className="px-3 py-2 border-b border-gray-100">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={t('searchRoutes')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {filteredRoutes.length > 0 ? (
                  <ul className="py-1">
                    {filteredRoutes.map((route) => (
                      <li key={route.id}>
                        <button
                          type="button"
                          onClick={() => handleRouteSelect(route.code)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-900 flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium">{route.from} <ArrowRight className="inline w-3 h-3 mx-1" /> {route.to}</div>
                            <div className="text-xs text-gray-500">{route.code}</div>
                          </div>
                          {selectedRoute === route.code && (
                            <Check className="w-4 h-4 text-indigo-600" />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    {t('noRoutesFound')}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {selectedRoute && (
        <div className="mb-4 flex items-center text-sm text-indigo-600">
          <span className="font-medium mr-2">{t('showingBusesFor')}:</span>
          <span className="bg-indigo-50 px-2 py-1 rounded-full text-xs font-medium">
            {routes.find(r => r.code === selectedRoute)?.from} → {routes.find(r => r.code === selectedRoute)?.to}
          </span>
          <button 
            onClick={() => setSelectedRoute('')}
            className="ml-2 text-indigo-400 hover:text-indigo-600"
            aria-label={t('clearFilter')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="space-y-3">
        {filteredBuses.length > 0 ? (
          filteredBuses.map((bus) => (
            <div 
              key={bus.id}
              onClick={() => setSelectedBus(bus.id)}
              className={clsx(
                "cursor-pointer rounded-xl p-4 border transition-all",
                "hover:border-indigo-300 hover:bg-indigo-50",
                selectedBus === bus.id 
                  ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600" 
                  : "border-gray-200"
              )}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{bus.name}</span>
                    <span className={clsx(
                      "text-xs px-2 py-0.5 rounded-full",
                      bus.status === 'On Time' 
                        ? "bg-green-100 text-green-800" 
                        : bus.status === 'Delayed'
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    )}>
                      {bus.status}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                      {bus.type}
                    </span>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{bus.route}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{bus.time}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="font-medium">{t('departure')}:</span> {bus.departure} •{' '}
                    <span className="font-medium">{t('arrival')}:</span> {bus.arrival}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-indigo-600">{bus.price}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {bus.seats} {t('seatsAvailable')}
                  </div>
                </div>
              </div>
              
              {selectedBus === bus.id && (
                <div className="mt-3 pt-3 border-t border-indigo-100 flex items-center justify-end">
                  <Check className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">{t('selected')}</span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <Truck className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">{t('noBusesFound')}</h3>
            <p className="mt-1 text-sm text-gray-500">
              {t('tryAnotherRoute')}
            </p>
            <button
              onClick={() => setSelectedRoute('')}
              className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-indigo-600 hover:bg-gray-50"
            >
              {t('clearFilters')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};