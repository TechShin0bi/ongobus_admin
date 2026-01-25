import { AuditLog } from "@/types/audit";
import { useTranslations,  } from "next-intl";

const t = useTranslations("settings.auditLogsTab")

export const auditLogs: AuditLog[] = [
        {
            id: '1',
            timestamp: '2024-07-28 14:30:22',
            user: 'Admin User',
            action: t('table.actions.updateSettings'),
            details: t('table.details.taxRateChange'),
            status: 'success'
        },
        {
            id: '2',
            timestamp: '2024-07-28 11:15:00',
            user: 'Sarah Manager',
            action: t('table.actions.login'),
            details: t('table.details.loginSuccess'),
            status: 'success'
        },
        {
            id: '3',
            timestamp: '2024-07-27 09:45:10',
            user: t('table.systemUser'),
            action: t('table.actions.backup'),
            details: t('table.details.backupComplete'),
            status: 'success'
        },
        ...Array.from({ length: 15 }, (_, i) => ({
            id: (i + 4).toString(),
            timestamp: `2024-07-${26 - Math.floor(i / 4)} ${9 + (i % 12)}:${(i * 5) % 60}:00`,
            user: i % 2 === 0 ? 'Admin User' : 'Sarah Manager',
            action: [
                t('table.actions.updateSettings'),
                t('table.actions.login'),
                t('table.actions.backup'),
                t('table.actions.userUpdate')
            ][i % 4],
            details: [
                t('table.details.taxRateChange'),
                t('table.details.loginSuccess'),
                t('table.details.backupComplete'),
                t('table.details.userUpdated')
            ][i % 4],
            status: ['success', 'error', 'warning'][i % 3] as 'success' | 'error' | 'warning'
        }))
    ];