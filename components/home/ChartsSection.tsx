// components/home/ChartsSection.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useTranslations } from "next-intl";

// --- Mock Data ---

const LINE_DATA = [
  { name: "Jan", value: 1200 },
  { name: "Feb", value: 1500 },
  { name: "Mar", value: 1300 },
  { name: "Apr", value: 1700 },
  { name: "May", value: 1600 },
  { name: "Jun", value: 1905 },
];

const BAR_DATA = [
  { name: "Route A", value: 50010 },
  { name: "Route B", value: 33340 },
  { name: "Route C", value: 16670 },
  { name: "Route D", value: 12000 },
];

const PIE_DATA = [
  { name: "BUS-101", value: 400 },
  { name: "BUS-205", value: 300 },
  { name: "BUS-301", value: 300 },
  { name: "BUS-405", value: 200 },
];

const PIE_COLORS = ["#5C61F4", "#E75A7C", "#F59E0B", "#10B981"];

const ChartsSection = () => {
  const t = useTranslations("Dashboard");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Line Chart */}
      <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {t("bookingsOverTime")}
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={LINE_DATA}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />
              <RechartsTooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#5C61F4"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {t("revenueByRoute")}
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={BAR_DATA}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 10 }}
                dy={10}
              />
              <RechartsTooltip />
              <Bar
                dataKey="value"
                fill="#E75A7C"
                radius={[4, 4, 0, 0]}
                barSize={30}
              >
                {BAR_DATA.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index % 2 === 0 ? "#DB4468" : "#F07D98"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {t("popularBuses")}
        </h3>
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={PIE_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {PIE_DATA.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;