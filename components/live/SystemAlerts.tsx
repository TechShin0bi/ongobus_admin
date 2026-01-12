import { useTranslations } from 'next-intl';
import { Activity, AlertTriangle, CheckCircle, Info, RotateCw, XCircle } from 'lucide-react';
import clsx from 'clsx';
import { SystemAlert } from '@/types/live';

interface SystemAlertsProps {
    alerts: SystemAlert[];
}

export const SystemAlerts = ({ alerts }: SystemAlertsProps) => {
    const t = useTranslations('LiveActivity.systemAlerts');
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1">
            <div className="p-5 border-b border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-bold text-gray-900">{t('title')}</h3>
                </div>

                <div className="flex gap-2">
                    <select className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white text-gray-700 focus:outline-none">
                        <option>{t('allRoutes')}</option>
                    </select>
                    <select className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white text-gray-700 focus:outline-none">
                        <option>{t('allBuses')}</option>
                    </select>
                    <select className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white text-gray-700 focus:outline-none">
                        <option>{t('allSeverity')}</option>
                    </select>
                </div>
            </div>

            <div className="p-4 space-y-4">
                {alerts.map((alert) => {
                    let Icon = Info;
                    let colorClass = "text-blue-500";
                    if (alert.type === 'Error') { Icon = XCircle; colorClass = "text-red-500"; }
                    if (alert.type === 'Warning') { Icon = AlertTriangle; colorClass = "text-orange-500"; }
                    if (alert.type === 'Success') { Icon = CheckCircle; colorClass = "text-green-500"; }

                    return (
                        <div key={alert.id} className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                            <div className="flex gap-3">
                                <Icon className={clsx("w-5 h-5 flex-shrink-0 mt-0.5", colorClass)} />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900 leading-snug">{alert.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{alert.timeAgo}</p>
                                </div>
                            </div>
                            {alert.hasRetry && (
                                <div className="flex justify-end mt-2">
                                    <button className="flex items-center gap-1 px-3 py-1 border border-gray-200 rounded text-xs font-medium text-gray-700 hover:bg-gray-50">
                                        <RotateCw size={12} /> {t('retry')}
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    )
};