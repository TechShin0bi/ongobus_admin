import { useTranslations } from 'next-intl';
import { Filter, ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';

interface PackagesActionBarProps {
  setIsFilterOpen: (isOpen: boolean) => void;
  activeFilters: { status: string; date: string; };
}

export const PackagesActionBar = ({ setIsFilterOpen, activeFilters }: PackagesActionBarProps) => {
  const t = useTranslations('Packaging.allPackages');
  return (
  <div className="flex justify-between items-center mb-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
      <p className="text-sm text-gray-500">{t('description')}</p>
    </div>
    <div className="flex gap-2">
      <button 
        onClick={() => setIsFilterOpen(true)}
        className={clsx(
            "flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors",
            activeFilters.status !== "All" || activeFilters.date !== "" 
                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                : "bg-white border-gray-300 hover:bg-gray-50"
        )}
      >
        <Filter className="w-4 h-4" /> {t('filter')}
      </button>
      <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">
        <ArrowUpRight className="w-4 h-4" /> {t('newShipment')}
      </button>
    </div>
  </div>
);
}