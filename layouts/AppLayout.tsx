"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  // Zustand store hooks
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  // Optional: Redirect logic if you want to force them to login page when not auth
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not authenticated and trying to access a protected route (not login), redirect
    if (!isAuthenticated && pathname !== '/auth/login') {
      router.push('/auth/login');
    }
  }, [isAuthenticated, pathname, router]);

  // --- Layout for Non-Authenticated Users (Login Page) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="w-full h-full">
          {children}
        </main>
      </div>
    );
  }

  // --- Layout for Authenticated Users (Dashboard) ---
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header is only shown if authenticated */}
      <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      {/* Sidebar is only shown if authenticated */}
      <Sidebar isOpen={isSidebarOpen} />
      
      <main
        className={clsx(
          "p-4 pt-20 transition-all duration-300 min-h-screen flex flex-col",
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        )}
      >
        <div className="flex-1">
          {children}
        </div>
        
        <div className="mt-auto pt-6">
           <Footer />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;