"use client";

import React, { useState } from "react";
import { Menu, Bell, Search, ChevronDown, User, Bus } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { logout , user } = useAuthStore();
  
  // 1. Initialize the translation hook (Namespace: 'Header')
  const t = useTranslations('Header');

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          {/* Left: Logo & Toggle */}
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              onClick={toggleSidebar}
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">{t('openSidebar')}</span>
              <Menu className="w-6 h-6" />
            </button>
            <a href="#" className="flex ms-2 md:me-24 items-center">
              <div className="bg-indigo-600 p-1.5 rounded mr-2">
                <Bus className="w-5 h-5 text-white" />
              </div>
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-800">
                BusLink
              </span>
            </a>
          </div>

          {/* Right: Search, Notification, Profile */}
          <div className="flex items-center gap-4">
            {/* Search Bar (Hidden on small screens for brevity) */}
            <div className="hidden md:flex relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-64 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={t('searchPlaceholder')}
              />
            </div>

            <button className="text-gray-500 hover:text-gray-700 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 text-sm font-medium text-gray-900 rounded-full focus:ring-4 focus:ring-gray-300"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 overflow-hidden">
                  {/* Placeholder Avatar */}
                  <img src="https://i.pravatar.cc/150?img=12" alt="User" />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg border border-gray-100 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 text-sm text-gray-900">
                    <div className="font-bold">{`${user?.first_name} ${user?.last_name}`}</div>
                    <div className="font-medium">{user?.username}</div>
                    <div className="truncate text-gray-500">
                      {user?.email}
                    </div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsProfileOpen(false)}>
                        {t('profile')}
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        {t('settings')}
                      </a>
                    </li>
                  </ul>
                  <div className="py-2">
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                      }}
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      {t('signOut')}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}