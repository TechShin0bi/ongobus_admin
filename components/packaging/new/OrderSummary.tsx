// components/packaging/new/OrderSummary.tsx
import { useTranslations } from 'next-intl';
import { CheckCircle, AlertTriangle, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
  const route = useRouter()
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Submitting order...');
  };

  return (
    <div className="bg-gray-900 rounded-xl p-5 sm:p-6 text-white shadow-lg sticky top-6">
      <h4 className="text-gray-300 text-sm font-medium mb-4 uppercase tracking-wider">
        {t('orderSummary')}
      </h4>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">{t('items')}:</span>
          <span className="font-medium">{items.length}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">{t('totalWeight')}:</span>
          <span className="font-medium">{totalWeight} kg</span>
        </div>
        {items.length > 0 && (
          <div className="pt-3 mt-3 border-t border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{t('subtotal')}:</span>
              <span className="text-lg font-bold text-green-400">
                {totalCost.toLocaleString()} XAF
              </span>
            </div>
            <div className="mt-1 text-xs text-gray-400">
              {t('taxIncluded')}
            </div>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-yellow-50 text-yellow-800 p-3 rounded-lg flex items-start gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium">{t('noItemsAdded')}</p>
            <p className="text-xs mt-1">{t('addItemsToContinue')}</p>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 text-green-800 p-3 rounded-lg flex items-start gap-2 mb-4">
          <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium">{t('readyToShip')}</p>
            <p className="text-xs mt-1">{t('reviewAndConfirm')}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="promo" className="block text-xs font-medium text-gray-300 mb-1">
            {t('promoCode')}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="promo"
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={t('enterPromoCode')}
            />
            <button
              type="button"
              className="px-3 py-2 bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transition-colors"
            >
              {t('apply')}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={items.length === 0}
          onClick={()=>{
            route.push('/packaging/details')
          }}
          className={clsx(
            "w-full py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors",
            items.length > 0
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          )}
        >
          <CheckCircle className="w-5 h-5" />
          {t('confirmOrder')}
        </button>
      </form>

      {!isMobile && (
        <div className="mt-4 text-xs text-gray-400 text-center">
          <p>{t('secureCheckout')}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-gray-600">
              <Lock className="w-4 h-4" />
            </span>
            <span>{t('sslEncryption')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

function clsx(...args: any[]): string {
  return args.filter(Boolean).join(' ');
}