import { useTranslations } from 'next-intl';
import { Filter, ArrowUpRight, Menu } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';

export interface PackagesActionBarProps {
  setIsFilterOpen: (isOpen: boolean) => void;
  activeFilters: { status: string; date: string };
  selectedCount?: number;
  onMenuClick?: () => void;
}

export const PackagesActionBar = ({ 
  setIsFilterOpen, 
  activeFilters, 
  selectedCount = 0,
  onMenuClick 
}: PackagesActionBarProps) => {
  const t = useTranslations('Packaging.allPackages');
  const hasActiveFilters = activeFilters.status !== "All" || activeFilters.date !== "";
  const showSelectionCount = selectedCount > 0;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
      <div className="flex items-center w-full sm:w-auto">
        
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {showSelectionCount ? 
              t('selectedItems', { count: selectedCount }) : 
              t('title')
            }
          </h1>
          <p className="text-sm text-gray-500">
            {showSelectionCount ? 
              t('manageSelection') : 
              t('description')
            }
          </p>
        </div>
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto">
        <button 
          onClick={() => setIsFilterOpen(true)}
          className={clsx(
            "flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border rounded-lg text-sm font-medium transition-colors",
            hasActiveFilters
              ? "bg-indigo-50 border-indigo-200 text-indigo-700"
              : "bg-white border-gray-300 hover:bg-gray-50"
          )}
        >
          <Filter className="w-4 h-4 shrink-0" /> 
          <span className="truncate">{t('filter')}</span>
          {hasActiveFilters && (
            <span className="ml-1 w-2 h-2 bg-indigo-600 rounded-full"></span>
          )}
        </button>
        
        <Link 
          href="/packaging/new"
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm"
        >
          <ArrowUpRight className="w-4 h-4 shrink-0" /> 
          <span className="truncate">{t('newShipment')}</span>
        </Link>
      </div>
    </div>
);
}