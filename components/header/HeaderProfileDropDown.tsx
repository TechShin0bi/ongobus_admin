"use client"
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";

const HeaderProfileDropDown = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Header");
  const { logout, user } = useAuthStore();

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  return (
    <div className="relative ml-2" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center text-sm rounded-full focus:ring-2 focus:ring-indigo-300"
        onClick={(e) => {
          e.stopPropagation();
          setIsProfileOpen(!isProfileOpen);
        }}
      >
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
          <User className="w-5 h-5 text-indigo-600" />
        </div>
      </button>

      {/* Dropdown menu */}
      {isProfileOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg border border-gray-100 animate-in fade-in slide-in-from-top-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-4 py-3 text-sm text-gray-900">
            <div className="font-bold">{`${user?.first_name} ${user?.last_name}`}</div>
            <div className="font-medium">{user?.username}</div>
            <div className="truncate text-gray-500">{user?.email}</div>
          </div>
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsProfileOpen(false)}
              >
                {t("profile")}
              </Link>
            </li>
            <li>
              <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">
                {t("settings")}
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
              {t("signOut")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderProfileDropDown;