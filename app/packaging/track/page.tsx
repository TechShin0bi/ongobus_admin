"use client";

import { Sidebar } from '@/components/packaging/track/Sidebar';
import { MainPanel } from '@/components/packaging/track/MainPanel';

export default function TrackingDashboard() {
  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden font-sans">
      <Sidebar />
      <MainPanel />
    </div>
  );
}