import { ClipboardList, CheckSquare } from "lucide-react";
import { useTranslations } from "next-intl";

interface QuickActionsPanelProps {
  selectedCount: number;
}

export const QuickActionsPanel = ({ selectedCount }: QuickActionsPanelProps) => {
  const t = useTranslations('bookings');
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sticky top-24 h-[calc(100vh-8rem)]">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('quickActions')}</h3>
      
      {selectedCount > 0 ? (
        // Active State
        <div className="flex flex-col items-center justify-center text-center h-64 animate-in fade-in">
            <div className="p-4 bg-indigo-50 rounded-full mb-4">
            <CheckSquare className="w-8 h-8 text-indigo-600" />
          </div>
          <h4 className="text-gray-900 font-medium mb-1">{t('bookingsSelected', { count: selectedCount })}</h4>
          <p className="text-sm text-gray-500 mb-6">{t('chooseAction')}</p>
          
          <div className="w-full space-y-3">
            <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
              {t('confirmSelection')}
            </button>
            <button className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
              {t('cancelBookings')}
            </button>
            <button className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
              {t('exportDetails')}
            </button>
          </div>
        </div>
      ) : (
        // Empty State
        <div className="flex flex-col items-center justify-center text-center h-full pb-20">
          <div className="mb-4 text-gray-300">
            <ClipboardList className="w-16 h-16" strokeWidth={1.5} />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">{t('noBookingSelected')}</h4>
          <p className="text-sm text-gray-500 max-w-[200px]">
            {t('selectBookingPrompt')}
          </p>
        </div>
      )}
    </div>
  );
};