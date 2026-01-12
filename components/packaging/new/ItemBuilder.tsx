import { useTranslations } from 'next-intl';
import { Package, Plus, Trash2 } from "lucide-react";

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
  return (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
        <Package className="w-5 h-5 text-indigo-600" /> {t('packageItems')}
        </h3>
        <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
            {t('itemsAdded', { count: items.length })}
        </span>
    </div>

    {/* Input Row */}
    <div className="grid grid-cols-12 gap-3 mb-4 items-end bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="col-span-3">
            <label className="text-xs font-medium text-gray-500">{t('type')}</label>
            <select 
                value={tempItem.type}
                onChange={(e) => setTempItem({...tempItem, type: e.target.value})}
                className="w-full mt-1 p-2 border rounded text-sm"
            >
                <option>{t('itemTypes.general')}</option>
                <option>{t('itemTypes.fragile')}</option>
                <option>{t('itemTypes.electronics')}</option>
            </select>
        </div>
        <div className="col-span-2">
            <label className="text-xs font-medium text-gray-500">{t('weight')}</label>
            <input 
                type="number" 
                value={tempItem.weight}
                onChange={(e) => setTempItem({...tempItem, weight: e.target.value})}
                className="w-full mt-1 p-2 border rounded text-sm" placeholder="0" 
            />
        </div>
        <div className="col-span-5">
            <label className="text-xs font-medium text-gray-500">{t('itemDescription')}</label>
            <input 
                type="text" 
                value={tempItem.desc}
                onChange={(e) => setTempItem({...tempItem, desc: e.target.value})}
                className="w-full mt-1 p-2 border rounded text-sm" placeholder={t('itemDetailsPlaceholder')} 
            />
        </div>
        <div className="col-span-2">
            <button 
                onClick={handleAddItem}
                className="w-full p-2 bg-indigo-600 text-white rounded text-sm font-medium hover:bg-indigo-700 flex justify-center items-center gap-1"
            >
                <Plus className="w-4 h-4" /> {t('add')}
            </button>
        </div>
    </div>

    {/* Items List Table */}
    {items.length > 0 ? (
        <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">{t('tableType')}</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">{t('tableDesc')}</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">{t('tableWeight')}</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">{t('tableAction')}</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td className="px-4 py-2 text-sm text-gray-900">{item.type}</td>
                            <td className="px-4 py-2 text-sm text-gray-500 truncate max-w-[150px]">{item.desc}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{item.weight} kg</td>
                            <td className="px-4 py-2 text-right">
                                <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ) : (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-sm text-gray-500">{t('noItems')}</p>
        </div>
    )}
  </div>
);
}