import { useTranslations } from "next-intl";

export const UsersTab = () => {
  const t = useTranslations('settings.usersTab');
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{t('title')}</h3>
                <p className="text-sm text-gray-500">{t('subtitle')}</p>
            </div>
            <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                {t('inviteButton')}
            </button>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
                    <tr>
                        <th className="px-4 py-3">{t('table.headers.user')}</th>
                        <th className="px-4 py-3">{t('table.headers.role')}</th>
                        <th className="px-4 py-3">{t('table.headers.status')}</th>
                        <th className="px-4 py-3 text-right">{t('table.headers.action')}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    <tr>
                        <td className="px-4 py-3 font-medium">Admin User {t('table.rows.you')}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-bold">
                            {t('table.rows.roles.owner')}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-green-600 text-xs font-bold">
                          {t('table.rows.statuses.active')}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-400">
                          {t('table.rows.actions.locked')}
                        </td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3">Sarah Manager</td>
                        <td className="px-4 py-3">
                          {t('table.rows.roles.manager')}
                        </td>
                        <td className="px-4 py-3 text-green-600 text-xs font-bold">
                          {t('table.rows.statuses.active')}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button className="text-indigo-600 hover:underline">
                            {t('table.rows.actions.edit')}
                          </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3">John Agent</td>
                        <td className="px-4 py-3">
                          {t('table.rows.roles.supportAgent')}
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs font-bold">
                          {t('table.rows.statuses.invited')}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button className="text-red-500 hover:underline">
                            {t('table.rows.actions.revoke')}
                          </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  );
};
