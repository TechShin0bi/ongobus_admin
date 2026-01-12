import { useTranslations } from 'next-intl';
import { FileText } from 'lucide-react';

export const ShipmentManifest = () => {
  const t = useTranslations('Packaging.details');
  return (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <div className="p-4 bg-gray-50 border-b border-gray-200">
      <h3 className="font-bold text-gray-900 flex items-center gap-2">
        <FileText className="w-4 h-4 text-gray-500" /> {t('manifest')}
      </h3>
    </div>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-white">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('itemDescription')}</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('type')}</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">{t('weight')}</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">{t('declaredValue')}</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          <td className="px-6 py-4 text-sm text-gray-900">Large Box of Books</td>
          <td className="px-6 py-4 text-sm text-gray-500">{t('itemTypes.general')}</td>
          <td className="px-6 py-4 text-sm text-gray-900 text-right">15 kg</td>
          <td className="px-6 py-4 text-sm text-gray-500 text-right">25,000 XAF</td>
        </tr>
        <tr>
          <td className="px-6 py-4 text-sm text-gray-900">Laptop Bag (HP Envy)</td>
          <td className="px-6 py-4 text-sm text-orange-600 bg-orange-50 w-min rounded px-2">{t('itemTypes.electronics')}</td>
          <td className="px-6 py-4 text-sm text-gray-900 text-right">3 kg</td>
          <td className="px-6 py-4 text-sm text-gray-500 text-right">350,000 XAF</td>
        </tr>
        <tr className="bg-gray-50 font-medium">
          <td className="px-6 py-4 text-sm text-gray-900" colSpan={2}>{t('totals')}</td>
          <td className="px-6 py-4 text-sm text-gray-900 text-right">18 kg</td>
          <td className="px-6 py-4 text-sm text-gray-900 text-right">375,000 XAF</td>
        </tr>
      </tbody>
    </table>
  </div>
);
}