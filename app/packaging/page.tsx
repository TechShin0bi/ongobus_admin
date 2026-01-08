"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, Filter, Eye, MoreHorizontal, ArrowUpRight, 
  Printer, Trash2, X, Calendar, 
  CheckCircle, AlertTriangle, Bell, Truck, PackageCheck, Info 
} from "lucide-react";
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
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* =======================
          LEFT SIDE: DATA TABLE 
         ======================= */}
      <div className="flex-1 flex flex-col h-full overflow-hidden border-r border-gray-200">
          
          {/* Header Area */}
          <div className="p-8 pb-4">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Shipment Management</h1>
                    <p className="text-sm text-gray-500">Manage and track all registered waybills.</p>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setIsFilterOpen(true)}
                        className={clsx(
                            "flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors",
                            activeFilters.status !== "All" || activeFilters.date !== "" 
                                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                                : "bg-white border-gray-300 hover:bg-gray-50"
                        )}
                    >
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">
                        <ArrowUpRight className="w-4 h-4" /> New Shipment
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-2 border border-gray-200 rounded-lg flex gap-4 shadow-sm mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by ID, Sender, or Bus..." 
                        className="w-full pl-10 pr-4 py-2 bg-transparent text-sm focus:outline-none"
                    />
                </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-auto px-8 pb-8">
             <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden min-w-[800px]">
                <table className="min-w-full divide-y divide-gray-200">
                   <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                         <th className="px-6 py-3 w-4">
                            <input 
                                type="checkbox" 
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4 cursor-pointer"
                                onChange={handleSelectAll}
                                checked={filteredPackages.length > 0 && selectedIds.length === filteredPackages.length}
                            />
                         </th>
                         <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Waybill ID</th>
                         <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Route</th>
                         <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Clients</th>
                         <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                         <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                   </thead>
                   <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPackages.map((pkg) => {
                        const isSelected = selectedIds.includes(pkg.id);
                        return (
                            <tr key={pkg.id} className={clsx("transition-colors", isSelected ? "bg-indigo-50/50" : "hover:bg-gray-50")}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input 
                                        type="checkbox" 
                                        checked={isSelected}
                                        onChange={() => handleSelectRow(pkg.id)}
                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4 cursor-pointer"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="font-mono font-medium text-indigo-600">{pkg.id}</span>
                                    <div className="text-xs text-gray-400">{pkg.date}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{pkg.route}</div>
                                    <div className="text-xs text-gray-500">{pkg.bus}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{pkg.sender}</div>
                                    <div className="text-xs text-gray-500">To: {pkg.receiver}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={clsx("px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full", getStatusColor(pkg.status))}>
                                        {pkg.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <Eye className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        );
                      })}
                   </tbody>
                </table>
             </div>
          </div>
      </div>

      {/* =======================
          RIGHT SIDE: ACTION BAR 
         ======================= */}
      <div className="w-80 bg-white shadow-xl flex flex-col h-full z-20">
          
          {/* 1. Header Section */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
             <div className="flex justify-between items-center mb-2">
                 <h2 className="text-lg font-bold text-gray-900">Bulk Actions</h2>
                 {sidebarState.hasSelection && (
                    <button 
                        onClick={() => setSelectedIds([])} 
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        Clear Selection
                    </button>
                 )}
             </div>
             
             {/* Selection Status Indicator */}
             {!sidebarState.hasSelection ? (
                 <div className="text-sm text-gray-400 italic flex items-center gap-2 mt-4">
                    <Info className="w-4 h-4" /> Select items to activate
                 </div>
             ) : (
                 <div className="mt-2">
                     <p className="text-sm font-medium text-gray-900">
                         {sidebarState.count} Item{sidebarState.count > 1 ? 's' : ''} Selected
                     </p>
                     
                     {/* Mixed Status Warning */}
                     {sidebarState.isMixedStatus ? (
                         <div className="mt-2 text-xs bg-orange-50 text-orange-700 p-2 rounded border border-orange-200 flex items-start gap-2">
                             <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                             <span>Status updates disabled: Selection contains mixed statuses.</span>
                         </div>
                     ) : (
                         <p className="text-xs text-gray-500 mt-1">
                             Current Status: <span className="font-medium text-gray-700">{sidebarState.currentStatus}</span>
                         </p>
                     )}
                 </div>
             )}
          </div>

          {/* 2. Actions Container */}
          {/* We use clsx to handle the "Grayed Out" effect for the whole sidebar content */}
          <div className={clsx(
              "flex-1 overflow-y-auto p-6 space-y-8 transition-opacity duration-200",
              !sidebarState.hasSelection ? "opacity-40 pointer-events-none grayscale" : "opacity-100"
          )}>
              
              {/* Group A: Status Updates (Conditional on Mixed Status) */}
              <div className={clsx(
                  "transition-opacity duration-200",
                  sidebarState.isMixedStatus ? "opacity-40 pointer-events-none" : "opacity-100"
              )}>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Update Status</h3>
                  
                  <div className="space-y-2">
                      <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center gap-3 group">
                          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-200">
                              <Truck className="w-4 h-4" />
                          </div>
                          <div>
                              <p className="text-sm font-medium text-gray-900">Mark In Transit</p>
                          </div>
                      </button>

                      <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center gap-3 group">
                          <div className="p-2 bg-purple-100 text-purple-600 rounded-lg group-hover:bg-purple-200">
                              <CheckCircle className="w-4 h-4" />
                          </div>
                          <div>
                              <p className="text-sm font-medium text-gray-900">Mark Arrived</p>
                          </div>
                      </button>
                      
                      <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all flex items-center gap-3 group">
                          <div className="p-2 bg-green-100 text-green-600 rounded-lg group-hover:bg-green-200">
                              <PackageCheck className="w-4 h-4" />
                          </div>
                          <div>
                              <p className="text-sm font-medium text-gray-900">Mark Delivered</p>
                          </div>
                      </button>
                  </div>
              </div>

              {/* Group B: Generic Actions (Always active if Selection > 0) */}
              <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">General Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center gap-3 group">
                        <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg group-hover:bg-yellow-200">
                            <Bell className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Notify Customers</p>
                        </div>
                    </button>

                    <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center gap-3 group">
                        <div className="p-2 bg-gray-100 text-gray-600 rounded-lg group-hover:bg-gray-200">
                            <Printer className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Print Waybills</p>
                        </div>
                    </button>

                    <button className="w-full text-left px-4 py-3 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition-all flex items-center gap-3 group mt-4">
                        <div className="p-2 bg-white text-red-600 rounded-lg border border-red-100">
                            <Trash2 className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-red-900">Delete Selected</p>
                        </div>
                    </button>
                  </div>
              </div>
          </div>
      </div>

      {/* --- Filter Modal (Hidden by default) --- */}
      {isFilterOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setIsFilterOpen(false)}
              ></div>
              <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                          <Filter className="w-5 h-5 text-indigo-600" /> Filter Packages
                      </h3>
                      <button onClick={() => setIsFilterOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                          <X className="w-5 h-5 text-gray-500" />
                      </button>
                  </div>
                  {/* ... Filter Form Inputs ... */}
                  <div className="mt-8 flex gap-3">
                      <button 
                         onClick={() => { setActiveFilters({ status: "All", date: "" }); setIsFilterOpen(false); }}
                         className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                      >
                          Reset
                      </button>
                      <button 
                         onClick={() => setIsFilterOpen(false)}
                         className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
                      >
                          Apply
                      </button>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
}