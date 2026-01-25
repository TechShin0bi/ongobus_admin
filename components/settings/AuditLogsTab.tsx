import { History } from "lucide-react";
import { useTranslations } from "next-intl";
import { DataTable } from "@/components/common/DataTable";
import { Column } from "@/types/data_table";
import { AuditLog } from "@/types/audit";
import { auditLogs } from "@/data/auditLogs";



export const AuditLogsTab = () => {
    const t = useTranslations('settings.auditLogsTab');
   

    const columns:Column<AuditLog> = [
        {
            header: t('table.headers.timestamp'),
            accessor: 'timestamp',
            sortable: true,
            cell: (value: string) => (
                <span className="whitespace-nowrap">{value}</span>
            )
        },
        {
            header: t('table.headers.user'),
            accessor: 'user',
            sortable: true,
            cell: (value: string) => (
                <span className="font-medium text-gray-900">{value}</span>
            )
        },
        {
            header: t('table.headers.action'),
            accessor: 'action',
            sortable: true
        },
        {
            header: t('table.headers.details'),
            accessor: 'details',
            sortable: false
        },
        {
            header: t('table.headers.status'),
            accessor: 'status',
            sortable: true,
            cell: (value: string, row: AuditLog) => {
                const statusColors = {
                    success: 'bg-green-100 text-green-800',
                    error: 'bg-red-100 text-red-800',
                    warning: 'bg-yellow-100 text-yellow-800'
                };

                return (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[value as keyof typeof statusColors]}`}>
                        {value}
                    </span>
                );
            }
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{t('title')}</h3>
                        <p className="text-sm text-gray-500">{t('subtitle')}</p>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50">
                        <History className="w-4 h-4" /> {t('exportButton')}
                    </button>
                </div>

                <DataTable
                    columns={columns}
                    data={auditLogs}
                    searchPlaceholder={t('searchPlaceholder')}
                    searchKeys={['user', 'action', 'details']}
                    pageSize={10}
                />
            </div>
        </div>
    );
};