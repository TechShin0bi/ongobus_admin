import { useTranslations } from 'next-intl';
import { Bell, Send } from 'lucide-react';

export const NotificationForm = () => {
  const t = useTranslations('LiveActivity.notificationForm');
  return (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
    <div className="flex items-center gap-2 mb-6">
      <Bell className="w-5 h-5 text-indigo-600" />
      <h3 className="text-lg font-bold text-gray-900">{t('title')}</h3>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('messageLabel')}</label>
        <textarea 
          rows={3} 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          placeholder={t('messagePlaceholder')}
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('recipientLabel')}</label>
        <input 
          type="text" 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder={t('recipientPlaceholder')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('messageTypeLabel')}</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
          <option>{t('messageTypes.info')}</option>
          <option>{t('messageTypes.warning')}</option>
          <option>{t('messageTypes.emergency')}</option>
        </select>
      </div>

      <button className="w-full py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-sm flex items-center justify-center gap-2">
        <Send size={16} /> {t('sendButton')}
      </button>
    </div>
  </div>
);
}