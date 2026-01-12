import { useTranslations } from 'next-intl';

export const TrackingTimeline = () => {
  const t = useTranslations('Packaging.details');
  return (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
    <h3 className="font-bold text-gray-900 mb-4">{t('trackingStatus')}</h3>
    <div className="relative pl-4 border-l-2 border-indigo-200 space-y-6">
      
      {/* Timeline Item 1 */}
      <div className="relative">
        <div className="absolute -left-[21px] top-0 w-3 h-3 bg-indigo-600 rounded-full border-2 border-white shadow"></div>
        <p className="text-xs text-gray-500 mb-0.5">Today, 08:30 AM</p>
        <p className="text-sm font-medium text-gray-900">{t('timeline.departed', { agency: 'Douala' })}</p>
        <p className="text-xs text-gray-500">{t('timeline.enRoute', { busId: 'A-102' })}</p>
      </div>
      
      {/* Timeline Item 2 */}
      <div className="relative">
        <div className="absolute -left-[21px] top-0 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></div>
        <p className="text-xs text-gray-500 mb-0.5">Today, 07:45 AM</p>
        <p className="text-sm font-medium text-gray-900">{t('timeline.registered')}</p>
        <p className="text-xs text-gray-500">{t('timeline.checkedIn')}</p>
      </div>

    </div>
    <button className="mt-6 w-full py-2 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-lg hover:bg-indigo-100">
      {t('updateStatus')}
    </button>
  </div>
);
}