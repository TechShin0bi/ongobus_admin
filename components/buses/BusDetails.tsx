import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { Bus } from '@/types/buses';

interface BusDetailsProps {
  bus: Bus;
  agencies: string[];
}

export const BusDetails = ({ bus, agencies }: BusDetailsProps) => {
  const t = useTranslations('Buses.busDetails');
  const tBuses = useTranslations('Buses');
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">{t('title')}</h2>
        <p className="text-sm text-gray-500">{t('description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('regNumber')}</label>
          <input 
            type="text" 
            defaultValue={bus.regNumber}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('busType')}</label>
          <div className="relative">
            <select 
              defaultValue={bus.type}
              className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="AC">{tBuses('types.ac')}</option>
              <option value="Non-AC">{tBuses('types.nonAc')}</option>
              <option value="Sleeper">{tBuses('types.sleeper')}</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('capacity')}</label>
          <input 
            type="number" 
            defaultValue={bus.seats}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('agency')}</label>
          <div className="relative">
            <select 
              defaultValue={bus.agency}
              className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-indigo-500 focus:border-indigo-500"
            >
              {agencies.map(agency => (
                <option key={agency} value={agency}>{agency}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('amenities')}</label>
          <input 
            type="text" 
            defaultValue={bus.amenities}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="md:col-span-2 flex items-center gap-3">
           <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input 
                type="checkbox" 
                name="toggle" 
                id="toggle" 
                defaultChecked={bus.status === 'Active'}
                className="peer absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                style={{ opacity: 0, width: '100%', height: '100%', zIndex: 10, margin: 0 }}
              />
              <div className={clsx(
                "block overflow-hidden h-6 rounded-full cursor-pointer transition-colors",
                bus.status === 'Active' ? "bg-indigo-600" : "bg-gray-300"
              )}></div>
              <div className={clsx(
                 "absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm",
                 bus.status === 'Active' ? "translate-x-4" : "translate-x-0"
              )}></div>
           </div>
           <label htmlFor="toggle" className="text-sm font-medium text-gray-700">{t('activeStatus')}</label>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('notes')}</label>
          <textarea 
            rows={3}
            defaultValue={bus.notes}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            placeholder={t('notesPlaceholder')}
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          {t('cancel')}
        </button>
        <button className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200">
          {t('save')}
        </button>
      </div>
    </div>
  );
};