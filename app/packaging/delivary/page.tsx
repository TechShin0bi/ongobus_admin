"use client";

import React, { useState, useRef } from "react";
import { 
  Box, UserCheck, ShieldCheck, AlertCircle, Eraser, 
  MapPin, Phone, ChevronDown, ChevronUp, User, CheckCircle 
} from "lucide-react";
import clsx from "clsx";
import SignatureCanvas from 'react-signature-canvas';

// --- INSERT PRINTABLE RECEIPT COMPONENT HERE (Code from step 1 above) ---
const PrintableReceipt = ({ data, signature }: { data: any, signature: string }) => {
  return (
    <div className="hidden print:block print:w-full p-8 bg-white text-black font-mono text-sm absolute top-0 left-0 z-[100]">
      <div className="text-center mb-8 border-b-2 border-black pb-4">
        <h1 className="text-2xl font-bold uppercase tracking-widest">BusLink Logistics</h1>
        <p className="text-sm mt-1">Douala - Yaoundé - Bafoussam</p>
      </div>

      <div className="flex justify-between mb-6">
        <div>
          <p className="font-bold text-xs uppercase text-gray-500">Date</p>
          <p>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-xs uppercase text-gray-500">Waybill #</p>
          <p className="text-xl font-bold">{data.id}</p>
        </div>
      </div>

      <div className="border border-black p-4 mb-6">
        <div className="flex justify-between items-center">
            <div className="w-1/2">
                <p className="font-bold text-xs uppercase text-gray-500">Sender</p>
                <p className="font-bold">{data.sender.name}</p>
                <p className="text-xs">{data.sender.location}</p>
                <p className="text-xs">{data.sender.phone}</p>
            </div>
            <div className="text-center px-4">➜</div>
            <div className="w-1/2 text-right">
                <p className="font-bold text-xs uppercase text-gray-500">Receiver</p>
                <p className="font-bold">{data.receiver.name}</p>
                <p className="text-xs">{data.receiver.location}</p>
                <p className="text-xs">{data.receiver.phone}</p>
            </div>
        </div>
      </div>

      <table className="w-full mb-6 text-left">
        <thead>
            <tr className="border-b border-black">
                <th className="py-2 uppercase text-xs">Description</th>
                <th className="py-2 text-right uppercase text-xs">Weight</th>
                <th className="py-2 text-right uppercase text-xs">Value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="py-2">{data.items}</td>
                <td className="py-2 text-right">{data.weight}</td>
                <td className="py-2 text-right">{data.value}</td>
            </tr>
        </tbody>
      </table>

      <div className="flex justify-end mb-12">
          <div className="w-1/2 text-right">
              <div className="flex justify-between mb-1">
                  <span>Shipping Fee:</span>
                  <span>{data.amountDue.toLocaleString()} XAF</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-black pt-2 mt-2">
                  <span>TOTAL PAID:</span>
                  <span>{data.amountDue.toLocaleString()} XAF</span>
              </div>
              <p className="text-xs mt-1 uppercase">Payment: {data.paymentStatus}</p>
          </div>
      </div>

      <div className="flex justify-between items-end mt-8 pt-8 border-t border-dashed border-gray-400">
          <div className="text-center w-1/3">
              <div className="h-16 mb-2 flex items-end justify-center">
                  <span className="font-script text-lg font-cursive">Agent. J</span>
              </div>
              <div className="border-t border-black pt-1 text-xs uppercase">Authorized Signature</div>
          </div>
          <div className="text-center w-1/3">
              <div className="h-16 mb-2 flex items-center justify-center">
                  {signature && <img src={signature} alt="Client Signature" className="max-h-16" />}
              </div>
              <div className="border-t border-black pt-1 text-xs uppercase">Receiver Signature</div>
          </div>
      </div>
      
      <div className="mt-12 text-center text-xs">
          <p>Thank you for choosing BusLink Logistics.</p>
      </div>
    </div>
  );
};


export default function DeliverPackagePage() {
  
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
        alert("Signature required.");
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

  // --- Sub-Component: Waybill Card (Reused) ---
  const WaybillCard = () => (
    <div className="flex flex-col h-full">
        <div className="p-6 md:p-8 border-b border-gray-100">
             <div className="flex justify-between items-start mb-4">
                 <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Waybill Reference</p>
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
                    <p className="text-xs text-gray-400 mt-1">Value: {currentPackage.value}</p>
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
                            <span className="text-xs font-bold text-gray-400 uppercase">From</span>
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
                            <span className="text-xs font-bold text-indigo-400 uppercase">To</span>
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

  return (
    <>
      {/* 1. PRINTABLE COMPONENT: Hidden on screen, Block on Print */}
      <PrintableReceipt data={currentPackage} signature={formData.signatureData} />

      {/* 2. MAIN APP: Hidden on Print */}
      <div className="flex flex-col xl:flex-row min-h-dvh xl:h-screen w-full bg-gray-50 font-sans text-gray-900 print:hidden">
        
        {/* DESKTOP LEFT SIDE */}
        <div className="hidden xl:flex xl:w-[40%] bg-white border-r border-gray-200 flex-col relative shadow-xl z-20 xl:h-full xl:overflow-hidden">
          <WaybillCard />
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
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Delivery Confirmed</h2>
                  <p className="text-gray-500 text-lg mb-8">Transaction completed successfully.</p>
                  <div className="flex flex-col md:flex-row gap-4 w-full max-w-sm">
                      {/* PRINT BUTTON */}
                      <button onClick={handlePrint} className="px-8 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 shadow-sm hover:bg-gray-50">
                        Print Receipt
                      </button>
                      <button onClick={() => window.location.reload()} className="px-8 py-3 bg-gray-900 rounded-xl font-bold text-white shadow-lg hover:bg-black">
                        Next Order
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
                              <span className="text-xs font-bold text-gray-500 uppercase">Waybill Info</span>
                              <div className="font-bold text-gray-900">{currentPackage.id}</div>
                          </div>
                          <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium">
                              {showDetailsMobile ? "Hide" : "View"}
                              {showDetailsMobile ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                          </div>
                      </button>
                      
                      <div className={clsx(
                          "transition-all duration-300 ease-in-out border-t border-gray-100",
                          showDetailsMobile ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                      )}>
                          <WaybillCard />
                      </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 pb-12">
                      
                      {/* Identity Section (Same as before) */}
                      <div>
                          <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                              <UserCheck className="w-6 h-6 text-indigo-600" /> Handover Protocol
                          </h2>
                          <p className="text-sm md:text-base text-gray-500 mt-1">Verify identity details and collect signature.</p>
                      </div>

                      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                          <div className="grid grid-cols-1 gap-6">
                              <div>
                                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Collector's Full Name</label>
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
                                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">ID Type</label>
                                      <select 
                                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-gray-900"
                                          value={formData.idType} onChange={(e) => setFormData({...formData, idType: e.target.value})}
                                      >
                                          <option>National ID (CNI)</option>
                                          <option>Passport</option>
                                          <option>Driving License</option>
                                      </select>
                                  </div>
                                  <div>
                                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">ID Number</label>
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
                              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Client Signature</label>
                              <button 
                                  type="button" 
                                  onClick={clearSignature} 
                                  className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 bg-red-50 px-2 py-1 rounded-lg transition-colors"
                              >
                                  <Eraser className="w-3 h-3" /> Clear Pad
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
                                      <span className="text-lg font-medium">Sign Here</span>
                                  </div>
                              </div>
                          </div>
                          <p className="text-xs text-center text-gray-400 mt-3">
                              Sign above using finger (mobile) or mouse.
                          </p>
                      </div>

                      {/* Payment Warning */}
                      {currentPackage.paymentStatus === 'Pay on Delivery' && (
                          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
                              <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                              <div>
                                  <h4 className="font-bold text-orange-800 text-sm md:text-base">Cash Collection Required</h4>
                                  <p className="text-xs md:text-sm text-orange-700 mt-1">
                                      Collect <strong>{currentPackage.amountDue.toLocaleString()} XAF</strong> before confirming.
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
                                  Confirm Handover <ShieldCheck className="w-5 h-5" />
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