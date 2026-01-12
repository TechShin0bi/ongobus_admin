import { Truck, MapPin } from 'lucide-react';

export const MapView = () => (
  <div className="flex-1 bg-slate-200 relative overflow-hidden group">
      {/* Grid Pattern to simulate map */}
      <div className="absolute inset-0 opacity-10" 
            style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>
      
      {/* Map Route Line (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path d="M 200 500 Q 400 400 600 300 T 900 200" fill="none" stroke="#6366f1" strokeWidth="4" strokeDasharray="8 4" />
      </svg>

      {/* Bus Marker (Animated) */}
      <div className="absolute top-[300px] left-[600px] transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-500/30 rounded-full animate-ping"></div>
            <div className="bg-indigo-600 text-white p-2 rounded-full shadow-xl relative z-10 border-2 border-white">
              <Truck className="w-6 h-6" />
            </div>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              85 km/h
            </div>
          </div>
      </div>

      {/* Destination Marker */}
      <div className="absolute top-[200px] left-[900px] transform -translate-x-1/2 -translate-y-1/2">
          <MapPin className="w-8 h-8 text-red-500 drop-shadow-md" fill="currentColor" />
      </div>
  </div>
);