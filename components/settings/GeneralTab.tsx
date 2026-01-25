import { useTranslations } from "next-intl";

export const GeneralTab = () => {
  const t = useTranslations('settings.generalTab');
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{t('companyProfile.title')}</h3>
            <p className="text-sm text-gray-500 mb-6">{t('companyProfile.subtitle')}</p>

            <div className="grid gap-6 max-w-3xl">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('companyProfile.fields.companyName')}
                    </label>
                    <input
                        type="text"
                        placeholder={t('companyProfile.placeholders.companyName')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('companyProfile.fields.address')}
                    </label>
                    <textarea
                        rows={3}
                        placeholder={t('companyProfile.placeholders.address')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('companyProfile.fields.contactEmail')}
                    </label>
                    <input
                        type="email"
                        placeholder={t('companyProfile.placeholders.contactEmail')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            </div>
        </div>
    </div>
  );
};