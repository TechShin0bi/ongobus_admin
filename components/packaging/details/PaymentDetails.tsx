import { useTranslations } from 'next-intl';

export const PaymentDetails = () => {
  const t = useTranslations('Packaging.details');
  return (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h3 className="font-bold text-gray-900 mb-4">{t('paymentInfo')}</h3>
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm text-gray-500">{t('shippingCost')}</span>
      <span className="text-sm font-medium text-gray-900">4,500 XAF</span>
    </div>
    <div className="flex justify-between items-center mb-4">
      <span className="text-sm text-gray-500">{t('insurance')}</span>
      <span className="text-sm font-medium text-gray-900">1,000 XAF</span>
    </div>
    <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
      <span className="font-bold text-gray-900">{t('totalPaid')}</span>
      <span className="font-bold text-xl text-green-600">5,500 XAF</span>
    </div>
    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold">
      <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span> {t('paid')} - {t('cash')}
    </div>
  </div>
);
}