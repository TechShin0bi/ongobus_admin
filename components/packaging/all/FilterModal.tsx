import { useTranslations } from 'next-intl';
import { Filter, X } from 'lucide-react';

interface FilterModalProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  setActiveFilters: (filters: { status: string; date: string; }) => void;
}

export const FilterModal = ({ isFilterOpen, setIsFilterOpen, setActiveFilters }: FilterModalProps) => {
  const t = useTranslations('Packaging.allPackages');
  if (!isFilterOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsFilterOpen(false)}
        ></div>
        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-indigo-600" /> {t('filterPackages')}
                </h3>
                <button onClick={() => setIsFilterOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                    <X className="w-5 h-5 text-gray-500" />
                </button>
            </div>
            {/* ... Filter Form Inputs ... */}
            <div className="mt-8 flex gap-3">
                <button 
                    onClick={() => { setActiveFilters({ status: "All", date: "" }); setIsFilterOpen(false); }}
                    className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                >
                    {t('reset')}
                </button>
                <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
                >
                    {t('apply')}
                </button>
            </div>
        </div>
    </div>
  );
};