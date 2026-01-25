"use client";

import React, { useState } from "react";
import { Menu, Bell, Search, ChevronDown, User, Bus, X } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useTranslations } from "next-intl";
import clsx from "clsx";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { logout, user } = useAuthStore();
  const t = useTranslations('Header');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="px-3 py-2 sm:py-3 lg:px-5">
        <div className="flex items-center justify-between">
          {/* Left: Logo & Toggle */}
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              onClick={toggleSidebar}
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">{t('openSidebar')}</span>
              <Menu className="w-5 h-5" />
            </button>

            <Link href="/" className="flex items-center ms-2 md:me-24">
              <Bus className="h-6 w-6 text-indigo-600" />
              <span className="self-center text-xl font-semibold whitespace-nowrap ml-2 hidden sm:block">
                BusLink
              </span>
            </Link>
          </div>

          {/* Middle: Search - Hidden on mobile when not active */}
          <div className={clsx(
            "absolute left-0 right-0 mx-4 sm:relative sm:mx-0 sm:flex-1 sm:max-w-md",
            showMobileSearch ? "block" : "hidden sm:block"
          )}>
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {showMobileSearch && (
                  <button
                    type="button"
                    onClick={() => setShowMobileSearch(false)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 sm:hidden"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right: Icons and Profile */}
          <div className="flex items-center">
            {/* Mobile Search Toggle */}
            <button
              type="button"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100"
            >
              <span className="sr-only">Search</span>
              <Search className="w-5 h-5" />
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              className="p-2 text-gray-500 rounded-lg hover:bg-gray-100"
            >
              <span className="sr-only">View notifications</span>
              <div className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
              </div>
            </button>

            {/* Profile Dropdown */}
            <div className="relative ml-2">
              <button
                type="button"
                className="flex items-center text-sm rounded-full focus:ring-2 focus:ring-indigo-300"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
              </button>

              {/* Dropdown menu */}
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
                      <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">
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