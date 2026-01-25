import { CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";

export const FinancialTab = () => {
  const t = useTranslations('settings.financialTab');
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
       <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{t('title')}</h3>
        <p className="text-sm text-gray-500 mb-6">{t('subtitle')}</p>

        <div className="grid gap-6 max-w-3xl">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('defaultCurrency')}
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>KES (KSh)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('taxRate')}
              </label>
              <input 
                type="number" 
                defaultValue="16" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" 
              />
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CreditCard size={16} /> {t('paymentGateways.title')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                <span className="text-sm font-medium">
                  {t('paymentGateways.providers.stripe')}
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-xs text-gray-500">
                    {t('paymentGateways.status.connected')}
                  </span>
                  <button className="text-xs text-indigo-600 font-medium ml-2">
                    {t('paymentGateways.actions.configure')}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                <span className="text-sm font-medium">
                  {t('paymentGateways.providers.mpesa')}
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-xs text-gray-500">
                    {t('paymentGateways.status.connected')}
                  </span>
                  <button className="text-xs text-indigo-600 font-medium ml-2">
                    {t('paymentGateways.actions.configure')}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                <span className="text-sm font-medium">
                  {t('paymentGateways.providers.paypal')}
                </span>
                <button className="text-xs text-gray-500 font-medium border border-gray-300 px-2 py-1 rounded hover:bg-gray-50">
                  {t('paymentGateways.actions.connect')}
                </button>
              </div>
            </div>
          </div>
        </div>
       </div>
    </div>
  );
};