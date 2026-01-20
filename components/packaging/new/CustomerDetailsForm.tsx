import { useTranslations } from 'next-intl';
import { User } from "lucide-react";

export const CustomerDetailsForm = () => {
  const t = useTranslations('Packaging.newShipment');
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-indigo-600" /> 
        <span>{t('customerDetails')}</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">{t('senderName')}</label>
          <input 
            type="text" 
            placeholder={t('senderNamePlaceholder')} 
            className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" 
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">{t('senderPhone')}</label>
          <input 
            type="tel" 
            placeholder={t('senderPhonePlaceholder')} 
            className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" 
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">{t('receiverName')}</label>
          <input 
            type="text" 
            placeholder={t('receiverNamePlaceholder')} 
            className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" 
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">{t('receiverPhone')}</label>
          <input 
            type="tel" 
            placeholder={t('receiverPhonePlaceholder')} 
            className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" 
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700">{t('additionalNotes')}</label>
        <textarea 
          rows={2}
          placeholder={t('additionalNotesPlaceholder')}
          className="w-full mt-1 p-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
        />
      </div>
    </div>
  );
};