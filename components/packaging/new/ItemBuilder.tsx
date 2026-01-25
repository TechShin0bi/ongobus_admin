
import { useTranslations } from 'next-intl';
import { Package, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from 'react';

interface Item {
  id: number;
  type: string;
  weight: string;
  value: string;
  desc: string;
}

interface ItemBuilderProps {
  items: Item[];
  tempItem: { type: string; weight: string; value: string; desc: string; };
  setTempItem: React.Dispatch<React.SetStateAction<{ type: string; weight: string; value: string; desc: string; }>>;
  handleAddItem: () => void;
  handleRemoveItem: (id: number) => void;
}

export const ItemBuilder = ({ items, tempItem, setTempItem, handleAddItem, handleRemoveItem }: ItemBuilderProps) => {
  const t = useTranslations('Packaging.newShipment');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
          <Package className="w-5 h-5 text-indigo-600" /> 
          <span>{t('packageItems')}</span>
        </h3>
        <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full self-start sm:self-auto">
          {t('itemsAdded', { count: items.length })}
        </span>
      </div>

      {/* Input Form */}
      <div className="space-y-3 mb-6 bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-3">
            <label className="block text-xs font-medium text-gray-500 mb-1">{t('type')}</label>
            <select 
              value={tempItem.type}
              onChange={(e) => setTempItem({...tempItem, type: e.target.value})}
              className="w-full p-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            >
              <option value="General">{t('itemTypes.general')}</option>
              <option value="Fragile">{t('itemTypes.fragile')}</option>
              <option value="Electronics">{t('itemTypes.electronics')}</option>
              <option value="Documents">{t('itemTypes.documents')}</option>
            </select>
          </div>
          
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">{t('weight')} (kg)</label>
            <input 
              type="number" 
              value={tempItem.weight}
              onChange={(e) => setTempItem({...tempItem, weight: e.target.value})}
              className="w-full p-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" 
              placeholder="0.0" 
              min="0"
              step="0.1"
            />
          </div>
          
          <div className="sm:col-span-5">
            <label className="block text-xs font-medium text-gray-500 mb-1">{t('itemDescription')}</label>
            <input 
              type="text" 
              value={tempItem.desc}
              onChange={(e) => setTempItem({...tempItem, desc: e.target.value})}
              className="w-full p-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" 
              placeholder={t('itemDetailsPlaceholder')} 
            />
          </div>
          
          <div className="sm:col-span-2 flex items-end">
            <button 
              onClick={handleAddItem}
              disabled={!tempItem.desc || !tempItem.weight}
              className="w-full p-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex justify-center items-center gap-1"
            >
              <Plus className="w-4 h-4" /> 
              <span className="hidden sm:inline">{t('add')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Items List */}
      {items.length > 0 ? (
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          {/* Desktop Table */}
          <div className="hidden sm:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('tableType')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('tableDesc')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('tableWeight')}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('tableAction')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.type}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">
                      {item.desc}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {item.weight} kg
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleRemoveItem(item.id)} 
                        className="text-red-500 hover:text-red-700"
                        aria-label={t('removeItem')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile List */}
          <div className="sm:hidden divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id} className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.type}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                    <p className="text-sm text-gray-700 mt-1">{item.weight} kg</p>
                  </div>
                  <button 
                    onClick={() => handleRemoveItem(item.id)} 
                    className="text-red-500 p-1 -mr-1"
                    aria-label={t('removeItem')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">{t('noItemsYet')}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {t('getStartedByAddingItems')}
          </p>
        </div>
      )}
    </div>
  );
};