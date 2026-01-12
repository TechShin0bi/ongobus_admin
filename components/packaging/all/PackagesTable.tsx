import { useTranslations } from 'next-intl';
import { Eye } from 'lucide-react';
import clsx from 'clsx';

interface Package {
    id: string;
    sender: string;
    receiver: string;
    route: string;
    bus: string;
    status: 'In Transit' | 'Pending' | 'Delivered' | 'Arrived' | 'Cancelled' | 'Lost';
    date: string;
    items: number;
}

interface PackagesTableProps {
    filteredPackages: Package[];
    selectedIds: string[];
    handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectRow: (id: string) => void;
    getStatusColor: (status: string) => string;
}

export const PackagesTable = ({ filteredPackages, selectedIds, handleSelectAll, handleSelectRow, getStatusColor }: PackagesTableProps) => {
    const t = useTranslations('Packaging.allPackages');
    return (
        <div className="flex-1 overflow-auto px-8 pb-8">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden min-w-[800px]">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3 w-4">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4 cursor-pointer"
                                    onChange={handleSelectAll}
                                    checked={filteredPackages.length > 0 && selectedIds.length === filteredPackages.length}
                                />
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{t('waybillId')}</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{t('route')}</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{t('clients')}</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{t('status')}</th>
                            <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">{t('action')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPackages.map((pkg) => {
                            const isSelected = selectedIds.includes(pkg.id);
                            return (
                                <tr key={pkg.id} className={clsx("transition-colors", isSelected ? "bg-indigo-50/50" : "hover:bg-gray-50")}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => handleSelectRow(pkg.id)}
                                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4 cursor-pointer"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-mono font-medium text-indigo-600">{pkg.id}</span>
                                        <div className="text-xs text-gray-400">{pkg.date}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{pkg.route}</div>
                                        <div className="text-xs text-gray-500">{pkg.bus}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{pkg.sender}</div>
                                        <div className="text-xs text-gray-500">{t('to', { receiver: pkg.receiver })}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={clsx("px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full", getStatusColor(pkg.status))}>
                                            {t(`statuses.${pkg.status.toLowerCase().replace(' ', '')}`)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <Eye className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
};