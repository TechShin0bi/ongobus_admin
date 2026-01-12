import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { BusStatus } from '@/types/live';

interface StatusBadgeProps {
  status: BusStatus['status'];
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const t = useTranslations('LiveActivity.busStatus');
  const styles: { [key in BusStatus['status']]: string } = {
    'On Time': "bg-green-100 text-green-700",
    'En Route': "bg-blue-100 text-blue-700",
    'Delayed': "bg-red-100 text-red-700",
    'Arrived': "bg-gray-100 text-gray-700",
    'Maintenance': "bg-white border border-gray-300 text-gray-700",
  };
  return (
    <span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-bold", styles[status])}>
      {t(status.replace(' ', ''))}
    </span>
  );
};