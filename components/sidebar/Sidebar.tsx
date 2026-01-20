"use client";

import { 
  LayoutDashboard, Ticket, Bus, Map, Tag, Users, 
  CreditCard, Activity, HelpCircle, Settings, Package 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useTranslations } from "next-intl";

interface SidebarProps {
  isOpen: boolean;
}


export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const t = useTranslations('Sidebar');
  const MENU_ITEMS = [
    { key: t("dashboard"), icon: LayoutDashboard, href: "/" },
    { key: t("bookings"), icon: Ticket, href: "/bookings" },
    { key: t("buses"), icon: Bus, href: "/buses" },
    { key: t("routesSchedules"), icon: Map, href: "/routes" },
    { key: t("pricingSeats"), icon: Tag, href: "/pricing" },
    { key: t("agenciesUsers"), icon: Users, href: "/agencies" },
    { key: t("payments"), icon: CreditCard, href: "/payments" },
    { key: t("packaging"), icon: Package, href: "/packaging" },
    { key: t("liveActivity"), icon: Activity, href: "/live" },
    { key: t("support"), icon: HelpCircle, href: "/support" },
    { key: t("settings"), icon: Settings, href: "/settings" },
  ];

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
              <li key={item.key}>
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
                    {item.key}
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