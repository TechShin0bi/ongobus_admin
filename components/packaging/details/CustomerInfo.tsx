import { useTranslations } from 'next-intl';
import { Phone } from 'lucide-react';

export const CustomerInfo = () => {
  const t = useTranslations('Packaging.details');
  return (
  <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-6">
    <div>
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t('sender')}</h3>
      <p className="font-medium text-gray-900">John Doe</p>
      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <Phone className="w-3 h-3" /> +237 699 00 00 00
      </div>
      <p className="text-sm text-gray-500 mt-1">Douala, Cameroon</p>
    </div>
    <div className="text-right">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t('receiver')}</h3>
      <p className="font-medium text-gray-900">Alice Smith</p>
      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1 justify-end">
        <Phone className="w-3 h-3" /> +237 677 11 11 11
      </div>
      <p className="text-sm text-gray-500 mt-1">Yaoundé, Cameroon</p>
    </div>
  </div>
);
}