import clsx from "clsx";
import { TrendingDown, TrendingUp } from "lucide-react";

const StatCard = ({ title, value, change, isPositive, icon: Icon }: any) => (
  <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
      </div>
      <div className="p-2 bg-indigo-50 rounded-lg">
        <Icon className="w-5 h-5 text-indigo-600" />
      </div>
    </div>
    <div className="mt-4 flex items-center">
      {isPositive ? (
        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
      ) : (
        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
      )}
      <span
        className={clsx(
          "text-sm font-medium",
          isPositive ? "text-green-500" : "text-red-500"
        )}
      >
        {change}
      </span>
      <span className="text-sm text-gray-400 ml-2">from last month</span>
    </div>
  </div>
);

export default StatCard;