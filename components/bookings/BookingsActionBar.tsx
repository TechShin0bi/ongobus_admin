import { RotateCcw, Layers, Download } from "lucide-react";
import { useTranslations } from "next-intl";

export const BookingActionBar = () => {
  const t = useTranslations('bookings');
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
      <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
        <RotateCcw className="w-4 h-4" />
        {t('clearFilters')}
      </button>

      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
          <Layers className="w-4 h-4" />
          {t('bulkActions')}
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
          <Download className="w-4 h-4" />
          {t('downloadReport')}
        </button>
      </div>
    </div>
  );
};