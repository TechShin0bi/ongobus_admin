import { Lock, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

export const SecurityTab = () => {
  const t = useTranslations('settings.securityTab');
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
         <h3 className="text-lg font-bold text-gray-900 mb-1">{t('title')}</h3>
         <p className="text-sm text-gray-500 mb-6">{t('subtitle')}</p>

         <div className="space-y-4 max-w-2xl">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
               <div className="flex items-center gap-3">
                  <Shield size={20} className="text-indigo-600" />
                  <div>
                     <h4 className="text-sm font-bold text-gray-900">
                       {t('twoFactorAuth.title')}
                     </h4>
                     <p className="text-xs text-gray-500">
                       {t('twoFactorAuth.description')}
                     </p>
                  </div>
               </div>
               <div className="relative inline-block w-10 h-6 align-middle select-none">
                  <input 
                    type="checkbox" 
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300"
                  />
                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
               </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
               <div className="flex items-center gap-3">
                  <Lock size={20} className="text-indigo-600" />
                  <div>
                     <h4 className="text-sm font-bold text-gray-900">
                       {t('passwordPolicy.title')}
                     </h4>
                     <p className="text-xs text-gray-500">
                       {t('passwordPolicy.description')}
                     </p>
                  </div>
               </div>
               <div className="relative inline-block w-10 h-6 align-middle select-none">
                  <input 
                    type="checkbox" 
                    defaultChecked 
                    className="absolute block w-4 h-4 mt-1 ml-1 rounded-full bg-indigo-600 shadow-sm appearance-none cursor-pointer"
                  />
                  <label className="block overflow-hidden h-6 rounded-full bg-indigo-200 cursor-pointer"></label>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};