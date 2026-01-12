import { useTranslations } from 'next-intl';
import { Info, AlertTriangle, Truck, CheckCircle, PackageCheck, Bell, Printer, Trash2 } from 'lucide-react';
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
}

export const BulkActionsSidebar = ({ sidebarState, setSelectedIds }: BulkActionsSidebarProps) => {
  const t = useTranslations('Packaging.allPackages');
  return (
  <div className="w-80 bg-white shadow-xl flex flex-col h-full z-20">
      
      {/* 1. Header Section */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-gray-900">{t('bulkActions')}</h2>
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
          "flex-1 overflow-y-auto p-6 space-y-8 transition-opacity duration-200",
          !sidebarState.hasSelection ? "opacity-40 pointer-events-none grayscale" : "opacity-100"
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
  </div>
);
}