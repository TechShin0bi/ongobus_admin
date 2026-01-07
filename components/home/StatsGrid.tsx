import StatCard from './StatCard'
import { Ticket, Calendar, Users, CircleDollarSign } from 'lucide-react'

const StatsGrid = () => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Bookings (Today)"
          value="1,234"
          change="+12.5%"
          isPositive={true}
          icon={Ticket}
        />
        <StatCard
          title="Total Bookings (Week)"
          value="7,890"
          change="+8.2%"
          isPositive={true}
          icon={Calendar}
        />
        <StatCard
          title="Total Bookings (Month)"
          value="25,678"
          change="+5.1%"
          isPositive={true}
          icon={Users}
        />
        <StatCard
          title="Total Revenue"
          value="$23,456"
          change="-2.1%"
          isPositive={false}
          icon={CircleDollarSign}
        />
      </div>
  )
}

export default StatsGrid