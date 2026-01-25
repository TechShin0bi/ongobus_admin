// import { useTranslations } from 'next-intl';
// import { FileText } from 'lucide-react';

// export const ShipmentManifest = () => {
//   const t = useTranslations('Packaging.details');
//   return (
//   <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//     <div className="p-4 bg-gray-50 border-b border-gray-200">
//       <h3 className="font-bold text-gray-900 flex items-center gap-2">
//         <FileText className="w-4 h-4 text-gray-500" /> {t('manifest')}
//       </h3>
//     </div>
//     <table className="min-w-full divide-y divide-gray-200">
//       <thead className="bg-white">
//         <tr>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('itemDescription')}</th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('type')}</th>
//           <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">{t('weight')}</th>
//           <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">{t('declaredValue')}</th>
//         </tr>
//       </thead>
//       <tbody className="bg-white divide-y divide-gray-200">
//         <tr>
//           <td className="px-6 py-4 text-sm text-gray-900">Large Box of Books</td>
//           <td className="px-6 py-4 text-sm text-gray-500">{t('itemTypes.general')}</td>
//           <td className="px-6 py-4 text-sm text-gray-900 text-right">15 kg</td>
//           <td className="px-6 py-4 text-sm text-gray-500 text-right">25,000 XAF</td>
//         </tr>
//         <tr>
//           <td className="px-6 py-4 text-sm text-gray-900">Laptop Bag (HP Envy)</td>
//           <td className="px-6 py-4 text-sm text-orange-600 bg-orange-50 w-min rounded px-2">{t('itemTypes.electronics')}</td>
//           <td className="px-6 py-4 text-sm text-gray-900 text-right">3 kg</td>
//           <td className="px-6 py-4 text-sm text-gray-500 text-right">350,000 XAF</td>
//         </tr>
//         <tr className="bg-gray-50 font-medium">
//           <td className="px-6 py-4 text-sm text-gray-900" colSpan={2}>{t('totals')}</td>
//           <td className="px-6 py-4 text-sm text-gray-900 text-right">18 kg</td>
//           <td className="px-6 py-4 text-sm text-gray-900 text-right">375,000 XAF</td>
//         </tr>
//       </tbody>
//     </table>
//   </div>
// );
// }



import { Package, Box, Weight, AlertCircle } from 'lucide-react';

interface ShipmentItem {
  id: number;
  description: string;
  weight: string;
  status: string;
}

interface ShipmentManifestProps {
  items: ShipmentItem[];
  className?: string;
}

export function ShipmentManifest({ items, className }: ShipmentManifestProps) {
  const totalWeight = items.reduce((sum, item) => {
    return sum + parseFloat(item.weight.replace('kg', ''));
  }, 0);

  return (
    <div className={className}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipment Manifest</h2>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <Box className="h-5 w-5 text-indigo-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Total Items</p>
              <p className="font-medium">{items.length} items</p>
            </div>
          </div>
          <div className="flex items-center">
            <Weight className="h-5 w-5 text-indigo-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Total Weight</p>
              <p className="font-medium">{totalWeight} kg</p>
            </div>
          </div>
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <p className="font-medium">In Transit</p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weight
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.description}</div>
                      <div className="text-sm text-gray-500">ID: {item.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.weight}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}