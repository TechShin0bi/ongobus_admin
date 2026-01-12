import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';

interface PackagesFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const PackagesFilterBar = ({ searchTerm, setSearchTerm }: PackagesFilterBarProps) => {
  const t = useTranslations('Packaging.allPackages');
  return (
  <div className="bg-white p-2 border border-gray-200 rounded-lg flex gap-4 shadow-sm mb-4">
    <div className="relative flex-1">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={t('searchPlaceholder')} 
        className="w-full pl-10 pr-4 py-2 bg-transparent text-sm focus:outline-none"
      />
    </div>
  </div>
);
}