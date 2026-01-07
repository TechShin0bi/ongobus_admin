// app/page.tsx
"use client";

import { Calendar, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import StatsGrid from "@/components/home/StatsGrid";
import ActiveAndLive from "@/components/home/ActiveAndLive";
import ChartsSection from "@/components/home/ChartsSection";
import UpcomingDepartures from "@/components/home/UpcomingDepartures";

export default function Dashboard() {
  const t = useTranslations("Dashboard");

  return (
    <div>
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Calendar className="w-4 h-4" />
            {t("dateRange", { 
              startDate: "20 janv. 2023", 
              endDate: "26 janv. 2023" 
            })}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100">
            <Download className="w-4 h-4" />
            {t("exportData")}
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