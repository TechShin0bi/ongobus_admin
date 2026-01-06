"use client";

import React, { useState } from "react";
import {
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  Bus,
  Zap,
  CircleDollarSign,
  Users,
  Ticket,
  Map,
} from "lucide-react";
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
import clsx from "clsx";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";

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
  { name: "BUS-310", value: 300 },
  { name: "BUS-407", value: 200 },
];

const PIE_COLORS = ["#5C61F4", "#FF8042", "#00C49F", "#FFBB28"];

const UPCOMING_DEPARTURES = [
  {
    time: "08:00 AM",
    route: "New York - Boston Express",
    busId: "BUS-101",
    agency: "Global Travels",
    seats: 45,
    status: "On Time",
  },
  {
    time: "09:30 AM",
    route: "Los Angeles - San Francisco",
    busId: "BUS-205",
    agency: "CityLink Buses",
    seats: 32,
    status: "Delayed",
  },
  {
    time: "10:00 AM",
    route: "Chicago - Miami Coastal",
    busId: "BUS-310",
    agency: "Elite Transit",
    seats: 50,
    status: "On Time",
  },
  {
    time: "11:15 AM",
    route: "Houston - Dallas Shuttle",
    busId: "BUS-407",
    agency: "Starline Connect",
    seats: 28,
    status: "On Time",
  },
];

// --- Components ---

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

const ProgressBar = ({ label, current, total, color }: any) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="text-sm font-medium text-gray-500">
        {current} / {total} Available
      </span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full ${color}`}
        style={{ width: `${(current / total) * 100}%` }}
      ></div>
    </div>
  </div>
);

export default function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div>
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Overview Dashboard</h1>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Calendar className="w-4 h-4" />
            Jan 20, 2023 - Jan 26, 2023
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
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

      {/* Middle Section: Seat Availability & Bus Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Live Seat Availability */}
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Live Seat Availability
          </h3>
          <ProgressBar
            label="Standard Buses"
            current={150}
            total={200}
            color="bg-indigo-500"
          />
          <ProgressBar
            label="Luxury Coaches"
            current={75}
            total={100}
            color="bg-blue-500"
          />
          <ProgressBar
            label="Mini Vans"
            current={30}
            total={40}
            color="bg-purple-500"
          />
          <ProgressBar
            label="Executive Class"
            current={20}
            total={20}
            color="bg-indigo-400"
          />
        </div>

        {/* Active Buses Status */}
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-500">Active Buses</h3>
            <Bus className="w-5 h-5 text-indigo-500" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">45</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">On Road</span>
              <span className="font-semibold text-green-500">38</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">In Maintenance</span>
              <span className="font-semibold text-yellow-500">7</span>
            </div>
          </div>
        </div>

        {/* Active Routes Status */}
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-500">Active Routes</h3>
            <Map className="w-5 h-5 text-blue-500" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">15</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">High Demand</span>
              <span className="font-semibold text-red-500">5</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Normal</span>
              <span className="font-semibold text-green-500">10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Line Chart */}
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Bookings Over Time
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
            Revenue by Route
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
                  {BAR_DATA.map((entry, index) => (
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
            Popular Buses
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
                  {PIE_DATA.map((entry, index) => (
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

      {/* Table Section */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">
            Upcoming Departures
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Real-time updates on scheduled bus departures.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Route</th>
                <th className="px-6 py-3">Bus ID</th>
                <th className="px-6 py-3">Agency</th>
                <th className="px-6 py-3">Seats</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {UPCOMING_DEPARTURES.map((row, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {row.time}
                  </td>
                  <td className="px-6 py-4">{row.route}</td>
                  <td className="px-6 py-4">{row.busId}</td>
                  <td className="px-6 py-4">{row.agency}</td>
                  <td className="px-6 py-4">{row.seats}</td>
                  <td className="px-6 py-4">
                    <span
                      className={clsx(
                        "px-2.5 py-0.5 rounded-full text-xs font-medium",
                        row.status === "On Time"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      )}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
