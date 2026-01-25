import { useTranslations } from 'next-intl';
import { Info, AlertTriangle, Truck, CheckCircle, PackageCheck, Bell, Printer, Trash2, X } from 'lucide-react';
import clsx from 'clsx';

interface SidebarState {
  hasSelection: boolean;
  isMixedStatus: boolean;
  count: number;
  currentStatus: string;
  uniqueStatuses: string[];
}

interface BulkActionsSidebarProps {
  sidebarState: SidebarState;
  setSelectedIds: (ids: string[]) => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export const BulkActionsSidebar = ({ 
  sidebarState, 
  setSelectedIds, 
  isMobile = false,
  isOpen = true,
  onClose = () => {}
}: BulkActionsSidebarProps) => {
  const t = useTranslations('Packaging.allPackages');
  
  // Handle click on the sidebar to prevent it from closing when clicking inside
  const handleSidebarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className={clsx(
        "bg-white shadow-xl flex flex-col h-full z-20",
        isMobile 
          ? "fixed inset-y-0 right-0 w-80 transform transition-transform duration-300 ease-in-out"
          : "w-80"
      )}
      style={isMobile ? { transform: isOpen ? 'translateX(0)' : 'translateX(100%)' } : {}}
      onClick={handleSidebarClick}
    >
      
      {/* 1. Header Section */}
      <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                {isMobile && (
                  <button 
                    onClick={onClose}
                    className="mr-2 p-1 rounded-full hover:bg-gray-200 transition-colors lg:hidden"
                    aria-label="Close sidebar"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                )}
                <h2 className="text-lg font-bold text-gray-900">{t('bulkActions')}</h2>
              </div>
              {sidebarState.hasSelection && (
                <button 
                    onClick={() => setSelectedIds([])} 
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                >
                    {t('clearSelection')}
                </button>
              )}
          </div>
          
          {/* Selection Status Indicator */}
          {!sidebarState.hasSelection ? (
              <div className="text-sm text-gray-400 italic flex items-center gap-2 mt-4">
                <Info className="w-4 h-4" /> {t('selectItems')}
              </div>
          ) : (
              <div className="mt-2">
                  <p className="text-sm font-medium text-gray-900">
                      {t('itemsSelected', { count: sidebarState.count })}
                  </p>
                  
                  {/* Mixed Status Warning */}
                  {sidebarState.isMixedStatus ? (
                      <div className="mt-2 text-xs bg-orange-50 text-orange-700 p-2 rounded border border-orange-200 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{t('mixedStatusWarning')}</span>
                      </div>
                  ) : (
                      <p className="text-xs text-gray-500 mt-1">
                          {t('currentStatus', { status: sidebarState.currentStatus })}
                      </p>
                  )}
              </div>
          )}
      </div>

      {/* 2. Actions Container */}
      <div className={clsx(
          "flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 transition-all duration-200",
          !sidebarState.hasSelection ? "opacity-40 pointer-events-none grayscale" : "opacity-100",
          isMobile ? "pb-24" : "" // Add extra padding at the bottom on mobile for better usability
      )}>
          
          {/* Group A: Status Updates (Conditional on Mixed Status) */}
          <div className={clsx(
              "transition-opacity duration-200",
              sidebarState.isMixedStatus ? "opacity-40 pointer-events-none" : "opacity-100"
          )}>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t('updateStatus')}</h3>
              
              <div className="space-y-2">
                  <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center gap-3 group">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-200">
                          <Truck className="w-4 h-4" />
                      </div>
                      <div>
                          <p className="text-sm font-medium text-gray-900">{t('markInTransit')}</p>
                      </div>
                  </button>

                  <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center gap-3 group">
                      <div className="p-2 bg-purple-100 text-purple-600 rounded-lg group-hover:bg-purple-200">
                          <CheckCircle className="w-4 h-4" />
                      </div>
                      <div>
                          <p className="text-sm font-medium text-gray-900">{t('markArrived')}</p>
                      </div>
                  </button>
                  
                  <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all flex items-center gap-3 group">
                      <div className="p-2 bg-green-100 text-green-600 rounded-lg group-hover:bg-green-200">
                          <PackageCheck className="w-4 h-4" />
                      </div>
                      <div>
                          <p className="text-sm font-medium text-gray-900">{t('markDelivered')}</p>
                      </div>
                  </button>
              </div>
          </div>

          {/* Group B: Generic Actions (Always active if Selection > 0) */}
          <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t('generalActions')}</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center gap-3 group">
                    <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg group-hover:bg-yellow-200">
                        <Bell className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{t('notifyCustomers')}</p>
                    </div>
                </button>

                <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center gap-3 group">
                    <div className="p-2 bg-gray-100 text-gray-600 rounded-lg group-hover:bg-gray-200">
                        <Printer className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{t('printWaybills')}</p>
                    </div>
                </button>

                <button className="w-full text-left px-4 py-3 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition-all flex items-center gap-3 group mt-4">
                    <div className="p-2 bg-white text-red-600 rounded-lg border border-red-100">
                        <Trash2 className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-red-900">{t('deleteSelected')}</p>
                    </div>
                </button>
              </div>
          </div>
      </div>
      
      {/* Mobile Action Bar */}
      {isMobile && sidebarState.hasSelection && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {t('itemsSelected', { count: sidebarState.count })}
              </p>
              {!sidebarState.isMixedStatus && (
                <p className="text-xs text-gray-500">
                  {t('currentStatus', { status: sidebarState.currentStatus })}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('done')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
