import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";

export const BrandingTab = () => {
  const t = useTranslations('settings.brandingTab');
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{t('title')}</h3>
        <p className="text-sm text-gray-500 mb-6">{t('subtitle')}</p>

        <div className="grid gap-8 max-w-3xl">
          <div className="flex items-start gap-6">
             <div className="w-24 h-24 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                <Upload size={24} />
             </div>
             <div>
               <h4 className="text-sm font-medium text-gray-900">{t('companyLogo.title')}</h4>
               <p className="text-xs text-gray-500 mb-3">{t('companyLogo.description')}</p>
               <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50">
                 {t('companyLogo.uploadButton')}
               </button>
             </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('primaryColor')}</label>
            <div className="flex gap-3">
               <input type="color" defaultValue="#5C61F4" className="h-10 w-20 p-1 rounded border border-gray-300 cursor-pointer" />
               <input type="text" defaultValue="#5C61F4" className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm uppercase" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('portalTheme')}</label>
            <div className="flex gap-4">
               <div className="border-2 border-indigo-600 rounded-lg p-3 bg-white w-32 cursor-pointer">
                  <div className="h-2 w-16 bg-gray-200 rounded mb-2"></div>
                  <div className="h-2 w-10 bg-gray-100 rounded"></div>
                  <p className="text-xs text-center mt-2 font-medium text-indigo-700">
                    {t('themes.light')}
                  </p>
               </div>
               <div className="border border-gray-200 rounded-lg p-3 bg-gray-900 w-32 cursor-pointer opacity-60 hover:opacity-100">
                  <div className="h-2 w-16 bg-gray-700 rounded mb-2"></div>
                  <div className="h-2 w-10 bg-gray-800 rounded"></div>
                  <p className="text-xs text-center mt-2 font-medium text-white">
                    {t('themes.dark')}
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};