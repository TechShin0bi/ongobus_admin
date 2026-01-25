import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const ShipmentHeader = () => {
  const t = useTranslations('Packaging.newShipment');
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex items-center gap-2 mb-2">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-sm text-gray-500">{t('description')}</p>
        </div>
      </div>
      <div className="flex justify-end items-center mt-4 md:mt-0">
        
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            {t('draft')}
          </button>
          <button className="flex-1 md:flex-none px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
            {t('save')}
          </button>
        </div>
      </div>
    </div>
  );
};
