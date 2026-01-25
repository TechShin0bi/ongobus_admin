import { Bell, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export const IntegrationsTab = () => {
  const t = useTranslations('settings.integrationsTab');
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{t('title')}</h3>
            <p className="text-sm text-gray-500 mb-6">{t('subtitle')}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Google Maps */}
                <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center text-blue-600">
                            <Globe size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">
                              {t('googleMaps.title')}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {t('googleMaps.description')}
                            </p>
                        </div>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-green-500" 
                        />
                        <label className="block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer checked:bg-green-500"></label>
                    </div>
                </div>

                {/* Twilio */}
                <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center text-red-600">
                            <Bell size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">
                              {t('twilioSMS.title')}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {t('twilioSMS.description')}
                            </p>
                        </div>
                    </div>
                    <button className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded font-medium">
                      {t('setupButton')}
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};