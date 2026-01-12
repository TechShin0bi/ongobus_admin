import { useTranslations } from 'next-intl';
import { Bus } from '@/types/buses';

interface AddBusFormProps {
  agencies: string[];
  onClose: () => void;
}

export const AddBusForm = ({ agencies, onClose }: AddBusFormProps) => {
  const t = useTranslations('Buses.busDetails');

  return (
    <form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('regNumber')}</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('busType')}</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
            <option value="AC">{useTranslations('Buses')('types.ac')}</option>
            <option value="Non-AC">{useTranslations('Buses')('types.nonAc')}</option>
            <option value="Sleeper">{useTranslations('Buses')('types.sleeper')}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('capacity')}</label>
          <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('agency')}</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
            {agencies.map(agency => (
              <option key={agency} value={agency}>{agency}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('amenities')}</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg text-sm font-medium">
          {t('cancel')}
        </button>
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium">
          {t('save')}
        </button>
      </div>
    </form>
  );
};