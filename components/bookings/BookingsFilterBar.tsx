import { Search, Calendar, MapPin, Bus, Building2, Tag } from "lucide-react";
import { useTranslations } from "next-intl";

export const BookingFilterBar = () => {
  const t = useTranslations('bookings');
  return (
    <div className="flex flex-col xl:flex-row gap-4 mb-6">
      <div className="flex flex-wrap gap-3 flex-1">
        {/* Search Input */}
        <div className="relative min-w-[200px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={t('searchPlaceholder')}
          />
        </div>

        {/* Filter Buttons */}
        <FilterButton icon={Calendar} label={t('filters.travelDate')} />
        <FilterButton icon={MapPin} label={t('filters.route')} />
        <FilterButton icon={Bus} label={t('filters.bus')} />
        <FilterButton icon={Building2} label={t('filters.agency')} />
        <FilterButton icon={Tag} label={t('filters.status')} />
        
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
          {t('applyFilters')}
        </button>
      </div>
    </div>
  );
};

// Small helper for the filter buttons
const FilterButton = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
    <Icon className="w-4 h-4 text-gray-500" />
    <span>{label}</span>
  </button>
);