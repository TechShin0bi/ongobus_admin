import { useTranslations } from 'next-intl';

export const ShipmentHeader = () => {
  const t = useTranslations('Packaging.newShipment');
  return (
  <div className="mb-8 flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
      <p className="text-sm text-gray-500">{t('description')}</p>
    </div>
    <div className="flex gap-3">
      <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">{t('draft')}</button>
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">{t('save')}</button>
    </div>
  </div>
);
}