import { useTranslations } from 'next-intl';
import { Box, MapPin, Phone } from 'lucide-react';

export const WaybillCard = ({ currentPackage }: { currentPackage: any }) => {
  const t = useTranslations('Packaging.waybill');
  return (
  <div className="flex flex-col h-full">
      <div className="p-6 md:p-8 border-b border-gray-100">
           <div className="flex justify-between items-start mb-4">
               <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{t('reference')}</p>
                  <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight break-all">{currentPackage.id}</h1>
               </div>
               <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100 flex items-center gap-1 whitespace-nowrap">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {currentPackage.status}
               </div>
           </div>
           
           <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm text-indigo-600 shrink-0">
                  <Box className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                  <p className="font-bold text-gray-900 truncate">{currentPackage.items}</p>
                  <p className="text-sm text-gray-500 mt-1 flex flex-wrap gap-3">
                      <span>{currentPackage.weight}</span> • <span>{currentPackage.dimensions}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{t('value')} {currentPackage.value}</p>
              </div>
           </div>
       </div>

       <div className="flex-1 p-6 md:p-8 xl:overflow-y-auto">
           <div className="relative">
               <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-200"></div>

               {/* SENDER */}
               <div className="relative flex gap-4 md:gap-6 mb-8 group">
                   <div className="relative z-10 w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center shrink-0">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                   </div>
                   <div className="flex-1 bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold text-gray-400 uppercase">{t('from')}</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{currentPackage.sender.role}</span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900">{currentPackage.sender.name}</h3>
                      <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4 text-gray-400 shrink-0" /> <span className="truncate">{currentPackage.sender.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4 text-gray-400 shrink-0" /> {currentPackage.sender.phone}
                          </div>
                      </div>
                   </div>
               </div>

               {/* RECEIVER */}
               <div className="relative flex gap-4 md:gap-6 group">
                   <div className="relative z-10 w-10 h-10 rounded-full bg-indigo-600 border-4 border-indigo-100 flex items-center justify-center shrink-0 shadow-lg">
                      <MapPin className="w-4 h-4 text-white" />
                   </div>
                   <div className="flex-1 bg-indigo-50/50 p-4 md:p-5 rounded-2xl border border-indigo-100 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold text-indigo-400 uppercase">{t('to')}</span>
                          <span className="text-xs bg-white text-indigo-600 px-2 py-0.5 rounded border border-indigo-100">{currentPackage.receiver.role}</span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900">{currentPackage.receiver.name}</h3>
                      <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                              <MapPin className="w-4 h-4 text-indigo-400 shrink-0" /> <span className="truncate">{currentPackage.receiver.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                              <Phone className="w-4 h-4 text-indigo-400 shrink-0" /> {currentPackage.receiver.phone}
                          </div>
                      </div>
                   </div>
               </div>
           </div>
       </div>
  </div>
);
}