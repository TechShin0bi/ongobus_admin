import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  colorClass: {
    bg: string;
    text: string;
  };
  valueClass: string;
}

export const StatCard = ({ label, value, icon: Icon, colorClass, valueClass }: StatCardProps) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-32">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-2">{label}</p>
        <h3 className={clsx("text-2xl font-bold", valueClass)}>{value}</h3>
      </div>
      <div className={clsx("p-2 rounded-lg bg-opacity-10", colorClass.bg)}>
        <Icon className={clsx("w-5 h-5", colorClass.text)} />
      </div>
    </div>
  </div>
);