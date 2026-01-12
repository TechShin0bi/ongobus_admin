import { useTranslations } from 'next-intl';
import { Share2, Printer } from 'lucide-react';

export const PackageHeader = () => {
  const t = useTranslations('Packaging.details');
  return (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex justify-between items-start mb-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">#PKG-8832</h1>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{t('inTransit')}</span>
        </div>
        <p className="text-sm text-gray-500">{t('createdOn', { date: 'Jan 12, 2026 at 07:45 AM' })}</p>
      </div>
      <div className="flex gap-2">
        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"><Share2 className="w-4 h-4"/></button>
        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"><Printer className="w-4 h-4"/></button>
      </div>
    </div>
  </div>
);
}