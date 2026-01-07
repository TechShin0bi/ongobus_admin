"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false); // To prevent hydration mismatch
  
  // Zustand store hooks
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Set up side effects
  useEffect(() => {
    setIsClient(true);
    
    // Check if we're on a small device and close sidebar if needed
    const checkScreenSize = () => {
      const isSmallScreen = window.innerWidth < 1024; // lg breakpoint in Tailwind
      setSidebarOpen(!isSmallScreen);
    };
    
    // Set initial state
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Define routes where the Sidebar/Header should NEVER appear
  const isAuthRoute = pathname?.startsWith('/auth');

  useEffect(() => {
    if (!isClient) return;

    // 1. If NOT authenticated and trying to access a protected page
    if (!isAuthenticated && !isAuthRoute) {
      // Prevent infinite loops: if we are already redirection or on auth page, stop.
      const returnUrl = encodeURIComponent(pathname); // Encode to handle special chars
      router.push(`/auth/login?returnUrl=${returnUrl}`);
    }
  }, [isAuthenticated, pathname, router, isAuthRoute, isClient]);

  // --- Loading State (Optional: Prevents flash of content) ---
  if (!isClient) {
    return null; // Or a loading spinner
  }

  // --- Layout for Non-Authenticated Users OR Auth Pages ---
  // We hide the sidebar/header if not logged in, OR if on an auth page,
  // OR if we are on a 404 page (implied by !isAuthenticated)
  if (!isAuthenticated || isAuthRoute) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="w-full h-full">
          {children}
        </main>
      </div>
    );
  }

  // --- Layout for Authenticated Dashboard ---
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