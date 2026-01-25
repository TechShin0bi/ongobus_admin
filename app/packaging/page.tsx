"use client";

import React, { useState, useMemo, useEffect } from "react";
import { PackagesActionBar } from "@/components/packaging/all/PackagesActionBar";
import { PackagesFilterBar } from "@/components/packaging/all/PackagesFilterBar";
import { PackagesTable } from "@/components/packaging/all/PackagesTable";
import { BulkActionsSidebar } from "@/components/packaging/all/BulkActionsSidebar";
import { FilterModal } from "@/components/packaging/all/FilterModal";
import { Menu, X } from 'lucide-react';
import clsx from "clsx";

// --- Types ---
interface Package {
  id: string;
  sender: string;
  receiver: string;
  route: string;
  bus: string;
  status: 'In Transit' | 'Pending' | 'Delivered' | 'Arrived' | 'Cancelled' | 'Lost';
  date: string;
  items: number;
}

// --- Mock Data ---
const MOCK_PACKAGES: Package[] = [
  { id: "PKG-8832", sender: "John Doe", receiver: "Alice Smith", route: "DLA -> YAO", bus: "Bus A-102", status: "In Transit", date: "2026-01-12", items: 3 },
  { id: "PKG-9921", sender: "Tech Corp", receiver: "Mega Store", route: "DLA -> BAF", bus: "Bus B-11", status: "Pending", date: "2026-01-12", items: 15 },
  { id: "PKG-7743", sender: "Sarah J.", receiver: "Mike T.", route: "YAO -> DLA", bus: "Bus C-99", status: "Delivered", date: "2026-01-11", items: 1 },
  { id: "PKG-6651", sender: "AutoParts", receiver: "Garage X", route: "DLA -> KRI", bus: "Bus A-102", status: "Arrived", date: "2026-01-11", items: 4 },
  { id: "PKG-5512", sender: "Alpha Ind", receiver: "Beta Ltd", route: "BAF -> DLA", bus: "Bus Z-01", status: "Cancelled", date: "2026-01-10", items: 2 },
];

export default function AllPackagesPage() {
  // --- State ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({ status: "All", date: "" });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view on mount and on window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Close mobile sidebar when selection is cleared
  useEffect(() => {
    if (selectedIds.length === 0 && isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  }, [selectedIds, isMobileSidebarOpen]);

  // --- Logic ---

  // 1. Filtering
  const filteredPackages = useMemo(() => {
    return MOCK_PACKAGES.filter((pkg) => {
      const matchesSearch = 
        pkg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.bus.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = activeFilters.status === "All" || pkg.status === activeFilters.status;
      const matchesDate = activeFilters.date === "" || pkg.date === activeFilters.date;
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [searchTerm, activeFilters]);

  // 2. Selection Logic
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(filteredPackages.map(p => p.id));
    else setSelectedIds([]);
  };

  const handleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(itemId => itemId !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  // 3. Sidebar State Logic (Crucial for the "Grayed Out" requirement)
  const sidebarState = useMemo(() => {
    const hasSelection = selectedIds.length > 0;
    
    // Get all items currently selected
    const selectedItems = MOCK_PACKAGES.filter(p => selectedIds.includes(p.id));
    
    // Find unique statuses (e.g., ["Pending", "In Transit"])
    const uniqueStatuses = [...new Set(selectedItems.map(p => p.status))];
    
    // Conflict Logic: Do we have mixed statuses?
    const isMixedStatus = uniqueStatuses.length > 1;

    return {
        hasSelection,
        isMixedStatus,
        count: selectedIds.length,
        currentStatus: uniqueStatuses.length === 1 ? uniqueStatuses[0] : 'Mixed',
        uniqueStatuses
    };
  }, [selectedIds]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit': return 'bg-blue-100 text-blue-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Arrived': return 'bg-purple-100 text-purple-700';
      case 'Lost': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans relative">
      {/* Main Content */}
      <div className={clsx(
        "flex-1 flex flex-col h-full overflow-hidden transition-all duration-300",
        isMobile && isMobileSidebarOpen ? "-translate-x-80" : ""
      )}>
        <div className="p-4 md:p-8 md:pb-4">
          <PackagesActionBar 
            setIsFilterOpen={setIsFilterOpen} 
            activeFilters={activeFilters} 
            selectedCount={selectedIds.length}
            onMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          />
          <PackagesFilterBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <PackagesTable 
          filteredPackages={filteredPackages} 
          selectedIds={selectedIds} 
          handleSelectAll={handleSelectAll} 
          handleSelectRow={handleSelectRow} 
          getStatusColor={getStatusColor} 
        />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <BulkActionsSidebar 
          sidebarState={sidebarState} 
          setSelectedIds={setSelectedIds} 
          isMobile={false}
          isOpen={true}
          onClose={() => {}}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-y-0 right-0 z-50 w-80 transform ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <BulkActionsSidebar 
          sidebarState={sidebarState} 
          setSelectedIds={setSelectedIds} 
          isMobile={true}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
      </div>

      {/* Mobile FAB */}
      {isMobile && selectedIds.length > 0 && !isMobileSidebarOpen && (
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="fixed bottom-8 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg z-30 lg:hidden flex items-center justify-center"
          aria-label="Open actions"
        >
          <Menu className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {selectedIds.length}
          </span>
        </button>
      )}

      <FilterModal 
        isFilterOpen={isFilterOpen} 
        setIsFilterOpen={setIsFilterOpen} 
        setActiveFilters={setActiveFilters} 
      />
    </div>
  );
}