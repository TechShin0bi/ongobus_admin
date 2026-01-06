"use client";

import React from "react";
import { 
  LayoutDashboard, Ticket, Bus, Map, Tag, Users, 
  CreditCard, Activity, HelpCircle, Settings 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

interface SidebarProps {
  isOpen: boolean;
}

const MENU_ITEMS = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Bookings", icon: Ticket, href: "/bookings" },
  { name: "Buses", icon: Bus, href: "/buses" },
  { name: "Routes & Schedules", icon: Map, href: "/routes" },
  { name: "Pricing & Seats", icon: Tag, href: "/pricing" },
  { name: "Agencies & Users", icon: Users, href: "/agencies" },
  { name: "Payments", icon: CreditCard, href: "/payments" },
  { name: "Live Activity", icon: Activity, href: "/live" },
  { name: "Support", icon: HelpCircle, href: "/support" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={clsx(
        "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out pt-16",
        isOpen ? "w-64" : "w-0 -translate-x-full lg:w-20 lg:translate-x-0"
      )}
    >
      <div className="h-full overflow-y-auto px-3 py-4">
        <ul className="space-y-2 font-medium">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={clsx(
                    "flex items-center p-2 rounded-lg group transition-colors",
                    isActive 
                      ? "bg-indigo-50 text-indigo-600" 
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <item.icon
                    className={clsx(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-indigo-600" : "text-gray-500 group-hover:text-gray-900"
                    )}
                  />
                  <span className={clsx("ml-3 whitespace-nowrap", !isOpen && "lg:hidden")}>
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}