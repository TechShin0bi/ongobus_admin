import { useTranslations } from 'next-intl';
import { User } from "lucide-react";

export const CustomerDetailsForm = () => {
  const t = useTranslations('Packaging.newShipment');
  return (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
      <User className="w-5 h-5 text-indigo-600" /> {t('customerDetails')}
    </h3>
    <div className="grid grid-cols-2 gap-4">
        <input type="text" placeholder={t('senderName')} className="p-2 border rounded text-sm bg-gray-50" />
        <input type="text" placeholder={t('senderPhone')} className="p-2 border rounded text-sm bg-gray-50" />
        <input type="text" placeholder={t('receiverName')} className="p-2 border rounded text-sm bg-gray-50" />
        <input type="text" placeholder={t('receiverPhone')} className="p-2 border rounded text-sm bg-gray-50" />
    </div>
  </div>
);
}