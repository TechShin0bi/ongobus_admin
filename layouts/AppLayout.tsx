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
  
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Define public routes that don't require authentication
    // You might want to add '/auth/signup' or '/auth/forgot-password' here too
    const publicRoutes = ['/auth/login'];

    // If not authenticated and trying to access a protected route
    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      // Create the query parameter
      const params = new URLSearchParams();
      params.set("returnUrl", pathname);
      
      // Redirect with the returnUrl param
      router.push(`/auth/login?${params.toString()}`);
    }
  }, [isAuthenticated, pathname, router]);

  // --- Layout for Non-Authenticated Users ---
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
      <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

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