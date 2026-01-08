"use client";

import React, { useState, useEffect } from "react";
import { 
  Settings, Scale, Box, DollarSign, Plus, X, 
  Zap, Save, Calculator, AlertCircle, Trash2, Tag 
} from "lucide-react";
import clsx from "clsx";

// --- Types ---
interface PricingRule {
  id: string;
  targetType: 'Category' | 'Specific Item';
  targetValue: string; // e.g., "Electronics" or "iPhone"
  adjustmentType: 'Markup (%)' | 'Flat Fee (XAF)';
  value: number;
}

interface ItemType {
  id: string;
  name: string;
}

export default function PricingConfigurationPage() {
  
  // --- State: Base Settings ---
  const [baseSettings, setBaseSettings] = useState({
    baseFee: 1000,
    pricePerKg: 500,
    pricePerCbm: 150000, // Price per cubic meter
    volumetricDivisor: 5000, // Standard divisor (e.g., L*W*H / 5000)
    currency: 'XAF'
  });

  // --- State: Dynamic User-Defined Types ---
  const [itemTypes, setItemTypes] = useState<ItemType[]>([
    { id: '1', name: 'Mobile Phone' },
    { id: '2', name: 'Laptop' },
    { id: '3', name: 'Lithium Battery' },
    { id: '4', name: 'Fragile Glass' }
  ]);
  const [newItemType, setNewItemType] = useState("");

  // --- State: Pricing Rules ---
  const [rules, setRules] = useState<PricingRule[]>([
    { id: 'r1', targetType: 'Category', targetValue: 'Electronics', adjustmentType: 'Markup (%)', value: 10 },
    { id: 'r2', targetType: 'Specific Item', targetValue: 'Lithium Battery', adjustmentType: 'Flat Fee (XAF)', value: 2000 },
  ]);

  // --- State: Simulator ---
  const [simData, setSimData] = useState({
    weight: 2,
    length: 20, width: 15, height: 10,
    category: 'Electronics',
    selectedType: 'Mobile Phone'
  });
  const [simResult, setSimResult] = useState({ total: 0, breakdown: [] as string[] });

  // --- Actions ---

  // Add new Item Type
  const handleAddType = () => {
    if (newItemType.trim()) {
      setItemTypes([...itemTypes, { id: Date.now().toString(), name: newItemType.trim() }]);
      setNewItemType("");
    }
  };

  // Remove Item Type
  const handleRemoveType = (id: string) => {
    setItemTypes(itemTypes.filter(t => t.id !== id));
    // Also remove rules associated with this type
    setRules(rules.filter(r => r.targetValue !== itemTypes.find(t => t.id === id)?.name));
  };

  // Add Pricing Rule
  const handleAddRule = () => {
    const newRule: PricingRule = {
      id: Date.now().toString(),
      targetType: 'Category',
      targetValue: 'General',
      adjustmentType: 'Flat Fee (XAF)',
      value: 0
    };
    setRules([...rules, newRule]);
  };

  // Update Rule
  const updateRule = (id: string, field: keyof PricingRule, value: any) => {
    setRules(rules.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  // --- Calculation Logic (Simulator) ---
  useEffect(() => {
    let price = baseSettings.baseFee;
    const breakdown = [`Base Fee: ${baseSettings.baseFee}`];

    // 1. Weight vs Volumetric
    const volWeight = (simData.length * simData.width * simData.height) / baseSettings.volumetricDivisor;
    const chargeableWeight = Math.max(simData.weight, volWeight);
    
    const weightCost = chargeableWeight * baseSettings.pricePerKg;
    price += weightCost;
    breakdown.push(`Weight Cost (${chargeableWeight.toFixed(2)} kg chargeable): ${weightCost.toFixed(0)}`);

    // 2. Apply Rules
    rules.forEach(rule => {
      let applies = false;
      
      if (rule.targetType === 'Category' && rule.targetValue === simData.category) applies = true;
      if (rule.targetType === 'Specific Item' && rule.targetValue === simData.selectedType) applies = true;

      if (applies) {
        if (rule.adjustmentType === 'Flat Fee (XAF)') {
          price += rule.value;
          breakdown.push(`${rule.targetValue} Surcharge: +${rule.value}`);
        } else {
          const markup = price * (rule.value / 100);
          price += markup;
          breakdown.push(`${rule.targetValue} Markup (${rule.value}%): +${markup.toFixed(0)}`);
        }
      }
    });

    setSimResult({ total: price, breakdown });
  }, [simData, baseSettings, rules]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-900">
      
      <div >
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
             <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
               <Settings className="w-6 h-6 text-indigo-600" /> Pricing Configuration
             </h1>
             <p className="text-sm text-gray-500">Configure global shipping rates, item types, and surcharge logic.</p>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 shadow-sm">
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* --- LEFT COLUMN: Base Settings & Type Management --- */}
           <div className="space-y-8">
              
              {/* 1. Base Rates Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                 <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-gray-500" /> Base Rates
                 </h2>
                 
                 <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Base Handling Fee (XAF)</label>
                        <input 
                          type="number" 
                          value={baseSettings.baseFee}
                          onChange={(e) => setBaseSettings({...baseSettings, baseFee: Number(e.target.value)})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price / KG</label>
                            <input 
                              type="number" 
                              value={baseSettings.pricePerKg}
                              onChange={(e) => setBaseSettings({...baseSettings, pricePerKg: Number(e.target.value)})}
                              className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Volumetric Divisor</label>
                            <input 
                              type="number" 
                              value={baseSettings.volumetricDivisor}
                              onChange={(e) => setBaseSettings({...baseSettings, volumetricDivisor: Number(e.target.value)})}
                              className="w-full p-2 border border-gray-300 rounded-lg"
                              title="Standard is usually 5000 or 6000"
                            />
                        </div>
                    </div>
                 </div>
              </div>

              {/* 2. Custom Type Manager */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                 <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-gray-500" /> Manage Item Types
                 </h2>
                 <p className="text-xs text-gray-500 mb-4">Define special item types (e.g. Phones, Liquids) to apply specific rules later.</p>
                 
                 <div className="flex gap-2 mb-4">
                    <input 
                       type="text" 
                       placeholder="New Type Name (e.g. Tablet)" 
                       value={newItemType}
                       onChange={(e) => setNewItemType(e.target.value)}
                       onKeyDown={(e) => e.key === 'Enter' && handleAddType()}
                       className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <button 
                       onClick={handleAddType}
                       className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-lg"
                    >
                       <Plus className="w-5 h-5" />
                    </button>
                 </div>

                 <div className="flex flex-wrap gap-2">
                    {itemTypes.map((type) => (
                       <span key={type.id} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium border border-indigo-100">
                          {type.name}
                          <button onClick={() => handleRemoveType(type.id)} className="hover:text-red-500 ml-1">
                             <X className="w-3 h-3" />
                          </button>
                       </span>
                    ))}
                 </div>
              </div>

           </div>

           {/* --- MIDDLE COLUMN: Advanced Rules Engine --- */}
           <div className="lg:col-span-2 space-y-8">
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full">
                 <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                           <Zap className="w-5 h-5 text-orange-500" /> Surcharge Logic
                        </h2>
                        <p className="text-xs text-gray-500">Apply extra fees or discounts based on categories or specific items.</p>
                    </div>
                    <button 
                       onClick={handleAddRule}
                       className="text-sm flex items-center gap-1 text-indigo-600 font-bold hover:bg-indigo-50 px-3 py-2 rounded-lg transition-colors"
                    >
                       <Plus className="w-4 h-4" /> Add Rule
                    </button>
                 </div>

                 <div className="p-6 overflow-x-auto">
                    <table className="w-full text-sm text-left">
                       <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-xs">
                          <tr>
                             <th className="px-4 py-3 rounded-l-lg">If Item Is...</th>
                             <th className="px-4 py-3">Value Match</th>
                             <th className="px-4 py-3">Adjustment Type</th>
                             <th className="px-4 py-3">Amount</th>
                             <th className="px-4 py-3 rounded-r-lg text-right">Action</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100">
                          {rules.map((rule) => (
                             <tr key={rule.id} className="group hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3">
                                   <select 
                                      value={rule.targetType}
                                      onChange={(e) => updateRule(rule.id, 'targetType', e.target.value)}
                                      className="bg-white border border-gray-300 rounded p-1.5 focus:ring-2 focus:ring-indigo-500 outline-none w-32"
                                   >
                                      <option>Category</option>
                                      <option>Specific Item</option>
                                   </select>
                                </td>
                                <td className="px-4 py-3">
                                   <select 
                                      value={rule.targetValue}
                                      onChange={(e) => updateRule(rule.id, 'targetValue', e.target.value)}
                                      className="bg-white border border-gray-300 rounded p-1.5 focus:ring-2 focus:ring-indigo-500 outline-none w-40"
                                   >
                                      {/* Logic to show Categories or Custom Types based on selection */}
                                      {rule.targetType === 'Category' ? (
                                         <>
                                            <option>General</option>
                                            <option>Electronics</option>
                                            <option>Clothing</option>
                                            <option>Documents</option>
                                         </>
                                      ) : (
                                         itemTypes.map(t => <option key={t.id}>{t.name}</option>)
                                      )}
                                   </select>
                                </td>
                                <td className="px-4 py-3">
                                   <select 
                                      value={rule.adjustmentType}
                                      onChange={(e) => updateRule(rule.id, 'adjustmentType', e.target.value)}
                                      className="bg-white border border-gray-300 rounded p-1.5 focus:ring-2 focus:ring-indigo-500 outline-none w-36"
                                   >
                                      <option>Flat Fee (XAF)</option>
                                      <option>Markup (%)</option>
                                   </select>
                                </td>
                                <td className="px-4 py-3">
                                   <input 
                                      type="number" 
                                      value={rule.value}
                                      onChange={(e) => updateRule(rule.id, 'value', Number(e.target.value))}
                                      className="w-24 p-1.5 border border-gray-300 rounded"
                                   />
                                </td>
                                <td className="px-4 py-3 text-right">
                                   <button 
                                      onClick={() => setRules(rules.filter(r => r.id !== rule.id))}
                                      className="text-gray-400 hover:text-red-500 p-1"
                                   >
                                      <Trash2 className="w-4 h-4" />
                                   </button>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                    
                    {rules.length === 0 && (
                       <div className="text-center py-8 text-gray-400 italic">
                          No special rules defined. Add one to customize pricing.
                       </div>
                    )}
                 </div>
              </div>

              {/* --- SIMULATOR AREA --- */}
              <div className="bg-gray-900 rounded-xl shadow-lg p-6 text-white">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                       <Calculator className="w-5 h-5 text-indigo-400" /> Live Price Simulator
                    </h2>
                    <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">Auto-updates</span>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div>
                       <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Weight (KG)</label>
                       <input 
                          type="number" value={simData.weight}
                          onChange={(e) => setSimData({...simData, weight: Number(e.target.value)})}
                          className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:border-indigo-500"
                       />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Dimensions (cm)</label>
                       <div className="flex gap-1">
                          <input type="number" placeholder="L" className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-xs text-center" value={simData.length} onChange={(e) => setSimData({...simData, length: Number(e.target.value)})}/>
                          <input type="number" placeholder="W" className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-xs text-center" value={simData.width} onChange={(e) => setSimData({...simData, width: Number(e.target.value)})}/>
                          <input type="number" placeholder="H" className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-xs text-center" value={simData.height} onChange={(e) => setSimData({...simData, height: Number(e.target.value)})}/>
                       </div>
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Category</label>
                       <select 
                          value={simData.category} onChange={(e) => setSimData({...simData, category: e.target.value})}
                          className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white text-sm"
                       >
                          <option>General</option>
                          <option>Electronics</option>
                          <option>Clothing</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Specific Type</label>
                       <select 
                          value={simData.selectedType} onChange={(e) => setSimData({...simData, selectedType: e.target.value})}
                          className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white text-sm"
                       >
                          <option value="">None</option>
                          {itemTypes.map(t => <option key={t.id}>{t.name}</option>)}
                       </select>
                    </div>
                 </div>

                 <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="text-sm text-gray-400 space-y-1">
                       {simResult.breakdown.map((line, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                             <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                             {line}
                          </div>
                       ))}
                    </div>
                    <div className="text-right bg-white text-gray-900 px-6 py-4 rounded-xl shadow-lg">
                       <p className="text-xs font-bold text-gray-500 uppercase">Estimated Total</p>
                       <p className="text-3xl font-black">{simResult.total.toLocaleString()} <span className="text-sm font-medium text-gray-400">XAF</span></p>
                    </div>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
}