
import StatCard from './StatCard'
import { Ticket, Calendar as CalendarIcon, Users, CircleDollarSign } from 'lucide-react'
import { useTranslations } from "next-intl";

const StatsGrid = () => {
  const t = useTranslations("Dashboard.stats");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard
        title={t("totalBookingsToday")}
        value="1,234"
        change="+12.5%"
        isPositive={true}
        icon={Ticket}
      />
      <StatCard
        title={t("totalBookingsWeek")}
        value="7,890"
        change="+8.2%"
        isPositive={true}
        icon={CalendarIcon}
      />
      <StatCard
        title={t("totalBookingsMonth")}
        value="25,678"
        change="+5.1%"
        isPositive={true}
        icon={Users}
      />
      <StatCard
        title={t("totalRevenue")}
        value="$23,456"
        change="-2.1%"
        isPositive={false}
        icon={CircleDollarSign}
      />
    </div>
  );
}

export default StatsGrid;