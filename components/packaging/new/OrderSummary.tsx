import { useTranslations } from 'next-intl';
import { CheckCircle } from 'lucide-react';

interface Item {
  id: number;
  type: string;
  weight: string;
  value: string;
  desc: string;
}

interface OrderSummaryProps {
  items: Item[];
  totalWeight: number;
  totalCost: number;
}

export const OrderSummary = ({ items, totalWeight, totalCost }: OrderSummaryProps) => {
  const t = useTranslations('Packaging.newShipment');
  return (
  <div className="bg-gray-900 rounded-xl p-6 text-white shadow-lg">
      <h4 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">{t('orderSummary')}</h4>
      
      <div className="flex justify-between text-sm mb-2 text-gray-300">
        <span>{t('totalItems')}</span>
        <span>{items.length}</span>
      </div>
      <div className="flex justify-between text-sm mb-4 text-gray-300">
        <span>{t('totalWeight')}</span>
        <span>{totalWeight} kg</span>
      </div>
      
      <div className="border-t border-gray-700 pt-4 flex justify-between items-center mb-6">
        <span className="text-lg font-bold">{t('total')}</span>
        <span className="text-2xl font-bold text-green-400">{totalCost.toLocaleString()} XAF</span>
      </div>

      <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-500 transition-colors flex justify-center items-center gap-2">
        <CheckCircle className="w-5 h-5" /> {t('confirmOrder')}
      </button>
  </div>
);
}