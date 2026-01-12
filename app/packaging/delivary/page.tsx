"use client";

import React, { useState, useRef } from "react";
import { 
  Box, UserCheck, ShieldCheck, AlertCircle, Eraser, 
  MapPin, Phone, ChevronDown, ChevronUp, User, CheckCircle 
} from "lucide-react";
import { useTranslations } from 'next-intl';
import clsx from "clsx";
import SignatureCanvas from 'react-signature-canvas';
import { PrintableReceipt } from '@/components/packaging/PrintableReceipt';
import { WaybillCard } from '@/components/packaging/WaybillCard';


export default function DeliverPackagePage() {
  const t = useTranslations('Packaging.delivery');
  
  // --- State & Refs ---
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetailsMobile, setShowDetailsMobile] = useState(false);
  const sigPadRef = useRef<SignatureCanvas>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    collectorName: "Alice Smith", 
    collectorId: "",
    idType: "National ID (CNI)",
    signatureData: "" // Will hold the Base64 Image string
  });

  // --- Mock Data ---
  const currentPackage = {
    id: "PKG-8832-CM",
    status: "Ready for Pickup",
    items: "Electronics: MacBook Pro 16 inch",
    weight: "3.5 kg",
    dimensions: "40x30x10 cm",
    value: "1,200,000 XAF",
    sender: {
        name: "Tech Solutions Ltd",
        phone: "+237 699 00 11 22",
        location: "Akwa, Douala",
        role: "Merchant"
    },
    receiver: {
        name: "Alice Smith",
        phone: "+237 677 55 44 33",
        location: "Bastos, Yaoundé",
        role: "Client"
    },
    paymentStatus: "Pay on Delivery", 
    amountDue: 4500,
    currency: "XAF"
  };

  const clearSignature = () => {
    sigPadRef.current?.clear();
    setFormData({ ...formData, signatureData: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (sigPadRef.current?.isEmpty()) {
        alert(t('signatureRequired'));
        setIsLoading(false);
        return;
    }

    // Capture signature
    const sigData = sigPadRef.current?.getTrimmedCanvas().toDataURL('image/png') || "";
    setFormData(prev => ({ ...prev, signatureData: sigData }));

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  // The function to trigger browser print
  const handlePrint = () => {
    window.print();
  };


  return (
    <>
      {/* 1. PRINTABLE COMPONENT: Hidden on screen, Block on Print */}
      <PrintableReceipt data={currentPackage} signature={formData.signatureData} />

      {/* 2. MAIN APP: Hidden on Print */}
      <div className="flex flex-col xl:flex-row min-h-dvh xl:h-screen w-full bg-gray-50 font-sans text-gray-900 print:hidden">
        
        {/* DESKTOP LEFT SIDE */}
        <div className="hidden xl:flex xl:w-[40%] bg-white border-r border-gray-200 flex-col relative shadow-xl z-20 xl:h-full xl:overflow-hidden">
          <WaybillCard currentPackage={currentPackage} />
          <div className="p-6 bg-gray-50 border-t border-gray-200 mt-auto">
              <div className={clsx(
                  "p-4 rounded-xl border-l-4 shadow-sm flex justify-between items-center",
                  currentPackage.paymentStatus === 'Pay on Delivery' ? "bg-white border-orange-500" : "bg-white border-green-500"
              )}>
                  <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Payment</p>
                      <p className={clsx("font-bold text-lg", currentPackage.paymentStatus === 'Pay on Delivery' ? "text-orange-600" : "text-green-600")}>
                          {currentPackage.paymentStatus}
                      </p>
                  </div>
                  <div className="text-right">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Due</p>
                      <p className="font-black text-2xl text-gray-900">{currentPackage.amountDue.toLocaleString()} <span className="text-sm text-gray-400">{currentPackage.currency}</span></p>
                  </div>
              </div>
          </div>
        </div>

        {/* RIGHT SIDE: Action Layer */}
        <div className="flex-1 flex flex-col relative bg-gray-50/50 xl:h-full xl:overflow-hidden">
          
          {/* Success Overlay */}
          {isSuccess && (
              <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300 p-6 text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                      <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">{t('successTitle')}</h2>
                  <p className="text-gray-500 text-lg mb-8">{t('successMessage')}</p>
                  <div className="flex flex-col md:flex-row gap-4 w-full max-w-sm">
                      {/* PRINT BUTTON */}
                      <button onClick={handlePrint} className="px-8 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 shadow-sm hover:bg-gray-50">
                        {t('printReceipt')}
                      </button>
                      <button onClick={() => window.location.reload()} className="px-8 py-3 bg-gray-900 rounded-xl font-bold text-white shadow-lg hover:bg-black">
                        {t('nextOrder')}
                      </button>
                  </div>
              </div>
          )}

          <div className="flex-1 w-full xl:overflow-y-auto">
              <div className="max-w-2xl mx-auto p-4 md:p-6 lg:p-12 w-full">
                  
                  {/* MOBILE: Collapsible Waybill Info */}
                  <div className="xl:hidden mb-6 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                      <button 
                          onClick={() => setShowDetailsMobile(!showDetailsMobile)}
                          className="w-full p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                          <div className="text-left">
                              <span className="text-xs font-bold text-gray-500 uppercase">{t('waybillInfo')}</span>
                              <div className="font-bold text-gray-900">{currentPackage.id}</div>
                          </div>
                          <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium">
                              {showDetailsMobile ? t('hide') : t('view')}
                              {showDetailsMobile ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                          </div>
                      </button>
                      
                      <div className={clsx(
                          "transition-all duration-300 ease-in-out border-t border-gray-100",
                          showDetailsMobile ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                      )}>
                          <WaybillCard currentPackage={currentPackage} />
                      </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 pb-12">
                      
                      {/* Identity Section (Same as before) */}
                      <div>
                          <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                              <UserCheck className="w-6 h-6 text-indigo-600" /> {t('handoverProtocol')}
                          </h2>
                          <p className="text-sm md:text-base text-gray-500 mt-1">{t('verifyIdentity')}</p>
                      </div>

                      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                          <div className="grid grid-cols-1 gap-6">
                              <div>
                                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">{t('collectorName')}</label>
                                  <div className="relative">
                                      <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                                      <input 
                                          type="text" required value={formData.collectorName}
                                          onChange={(e) => setFormData({...formData, collectorName: e.target.value})}
                                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium text-gray-900"
                                      />
                                  </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">{t('idType')}</label>
                                      <select 
                                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-gray-900"
                                          value={formData.idType} onChange={(e) => setFormData({...formData, idType: e.target.value})}
                                      >
                                          <option>{t('idTypes.cni')}</option>
                                          <option>{t('idTypes.passport')}</option>
                                          <option>{t('idTypes.license')}</option>
                                      </select>
                                  </div>
                                  <div>
                                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">{t('idNumber')}</label>
                                      <input 
                                          type="text" required placeholder="e.g. 102293881" value={formData.collectorId}
                                          onChange={(e) => setFormData({...formData, collectorId: e.target.value})}
                                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-gray-900"
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Signature Section */}
                      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
                          <div className="flex justify-between items-center mb-4">
                              <label className="text-xs font-bold text-gray-500 uppercase ml-1">{t('clientSignature')}</label>
                              <button 
                                  type="button" 
                                  onClick={clearSignature} 
                                  className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 bg-red-50 px-2 py-1 rounded-lg transition-colors"
                              >
                                  <Eraser className="w-3 h-3" /> {t('clearPad')}
                              </button>
                          </div>
                          <div className="relative group">
                              <div className="h-48 rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-400 bg-gray-50/50 hover:bg-white transition-all overflow-hidden relative touch-none">
                                  <SignatureCanvas
                                      ref={sigPadRef}
                                      penColor="#1f2937" 
                                      velocityFilterWeight={0.7}
                                      canvasProps={{ className: "w-full h-full block" }}
                                  />
                                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-gray-300 group-hover:opacity-0 transition-opacity">
                                      <span className="text-lg font-medium">{t('signHere')}</span>
                                  </div>
                              </div>
                          </div>
                          <p className="text-xs text-center text-gray-400 mt-3">
                              {t('signInstruction')}
                          </p>
                      </div>

                      {/* Payment Warning */}
                      {currentPackage.paymentStatus === 'Pay on Delivery' && (
                          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
                              <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                              <div>
                                  <h4 className="font-bold text-orange-800 text-sm md:text-base">{t('cashCollection')}</h4>
                                  <p className="text-xs md:text-sm text-orange-700 mt-1">
                                      {t.rich('collectAmount', { amount: currentPackage.amountDue.toLocaleString(), strong: (chunks) => <strong>{chunks}</strong> })}
                                  </p>
                              </div>
                          </div>
                      )}

                      {/* Submit */}
                      <button 
                          type="submit"
                          disabled={isLoading || !formData.collectorId}
                          className={clsx(
                              "w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.99]",
                              isLoading || !formData.collectorId 
                                  ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none" 
                                  : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/25"
                          )}
                      >
                          {isLoading ? (
                              <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                          ) : (
                              <>
                                  {t('confirmHandover')} <ShieldCheck className="w-5 h-5" />
                              </>
                          )}
                      </button>
                  </form>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}