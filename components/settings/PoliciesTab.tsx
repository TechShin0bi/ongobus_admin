import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export const PoliciesTab = () => {
  const t = useTranslations('settings.policiesTab');
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{t('title')}</h3>
            <p className="text-sm text-gray-500 mb-6">{t('subtitle')}</p>

            <div className="space-y-6 max-w-4xl">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('cancellationPolicy')}
                    </label>
                    <textarea
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        defaultValue={t('defaultPolicy')}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('termsOfService')}
                    </label>
                    <div className="flex gap-2">
                        <input 
                          type="text" 
                          defaultValue={t('defaultTermsUrl')} 
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50" 
                          disabled 
                        />
                        <button 
                          className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                          aria-label={t('termsOfService')}
                        >
                            <Globe size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};