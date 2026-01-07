"use client";

import {
  Calendar,
  Download,
} from "lucide-react";

import StatsGrid from "@/components/home/StatsGrid";
import ActiveAndLive from "@/components/home/ActiveAndLive";
import ChartsSection from "@/components/home/ChartsSection";
import UpcomingDepartures from "@/components/home/UpcomingDepartures";


// --- Components ---

export default function Dashboard() {

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
      <StatsGrid />

      {/* Middle Section: Seat Availability & Bus Status */}
      <ActiveAndLive />

      {/* Charts Section */}
      <ChartsSection />

      {/* Table Section */}
      <UpcomingDepartures />
    </div>
  );
}
