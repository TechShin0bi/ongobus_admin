"use client";

import React, { useState } from "react";
import { 
  Search, Download, Filter, Eye, ArrowUpRight, ArrowDownLeft, 
  RotateCw, AlertOctagon, Smartphone, CreditCard, Landmark, 
  ChevronLeft, ChevronRight, DollarSign
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import clsx from "clsx";

// --- Types ---

interface Transaction {
  id: string;
  bookingRef: string;
  amount: number;
  method: 'Card' | 'Mobile Money' | 'Bank Transfer';
  status: 'Completed' | 'Pending' | 'Disputed' | 'Refunded';
  date: string;
  agencyPayout: number;
}

// --- Mock Data ---

const FINANCIAL_DATA = [
  { name: 'Jan', transactions: 1500, payouts: 1000 },
  { name: 'Feb', transactions: 2100, payouts: 1200 },
  { name: 'Mar', transactions: 3200, payouts: 1500 },
  { name: 'Apr', transactions: 2400, payouts: 1100 },
  { name: 'May', transactions: 4000, payouts: 2500 },
  { name: 'Jun', transactions: 4800, payouts: 2800 },
  { name: 'Jul', transactions: 3800, payouts: 2200 },
];

const TRANSACTIONS_DATA: Transaction[] = [
  { id: 'TXN001', bookingRef: 'BK001', amount: 120.00, method: 'Card', status: 'Completed', date: '2023-10-26', agencyPayout: 110.00 },
  { id: 'TXN002', bookingRef: 'BK002', amount: 75.00, method: 'Mobile Money', status: 'Pending', date: '2023-10-25', agencyPayout: 68.00 },
  { id: 'TXN003', bookingRef: 'BK003', amount: 200.00, method: 'Bank Transfer', status: 'Completed', date: '2023-10-24', agencyPayout: 185.00 },
  { id: 'TXN004', bookingRef: 'BK004', amount: 90.00, method: 'Card', status: 'Disputed', date: '2023-10-23', agencyPayout: 82.00 },
  { id: 'TXN005', bookingRef: 'BK005', amount: 50.00, method: 'Mobile Money', status: 'Refunded', date: '2023-10-22', agencyPayout: 45.00 },
];

// --- Components ---

const SummaryCard = ({ title, value, subtext, icon: Icon, trend }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-32">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>
      <div className="p-2 bg-gray-50 rounded-lg">
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
    </div>
    <div className="text-xs text-gray-500 mt-2">
      {trend && <span className="text-green-600 font-medium mr-1">{trend}</span>}
      {subtext}
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: Transaction['status'] }) => {
  const styles = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Disputed: "bg-red-100 text-red-700",
    Refunded: "bg-blue-100 text-blue-700",
  };
  return (
    <span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-medium", styles[status])}>
      {status}
    </span>
  );
};

export default function PaymentsTransactions() {
  return (
    <div >
      
      {/* 1. Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payments & Transactions</h1>
      </div>

      {/* 2. Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <SummaryCard 
          title="Total Revenue" 
          value="$1330.00" 
          trend="+8.2%" 
          subtext="from last month"
          icon={DollarSign} 
        />
        <SummaryCard 
          title="Total Payouts" 
          value="$1217.00" 
          trend="+11.5%" 
          subtext="in past quarter"
          icon={ArrowUpRight} 
        />
        <SummaryCard 
          title="Pending Refunds" 
          value="1" 
          subtext="0 requests this week"
          icon={RotateCw} 
        />
        <SummaryCard 
          title="Open Disputes" 
          value="2" 
          subtext="Review necessary actions"
          icon={AlertOctagon} 
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        
        {/* 3. Monthly Financial Overview (Chart) */}
        <div className="xl:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Monthly Financial Overview</h3>
            <p className="text-sm text-gray-500">Transaction and payout volumes over time.</p>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FINANCIAL_DATA} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#6B7280', fontSize: 12}} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#6B7280', fontSize: 12}} 
                  tickFormatter={(value) => `$${value}`} 
                  label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft', style: { fill: '#6B7280', fontSize: 12 } }}
                />
                <Tooltip 
                  cursor={{fill: '#F3F4F6'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }}/>
                <Bar name="Transactions" dataKey="transactions" fill="#5C61F4" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar name="Payouts" dataKey="payouts" fill="#E75A7C" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Reconciliation Tools */}
        <div className="xl:col-span-1 bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Reconciliation Tools</h3>
            <p className="text-sm text-gray-500">Review and reconcile transactions by payment method.</p>
          </div>

          <div className="space-y-4 flex-1">
            <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium">
              <Smartphone size={18} /> Mobile Money Reconciliation
            </button>
            <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium">
              <CreditCard size={18} /> Card Payment Reconciliation
            </button>
            <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium">
              <Landmark size={18} /> Bank Transfer Reconciliation
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center text-sm">
             <span className="text-gray-500">Last reconciled: Oct 26, 2023</span>
             <button className="text-indigo-600 font-medium hover:text-indigo-800">View History</button>
          </div>
        </div>

      </div>

      {/* 5. All Transactions Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        
        {/* Table Header & Filters */}
        <div className="p-5 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
            <h3 className="text-lg font-bold text-gray-900 self-start sm:self-center">All Transactions</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700">
              <Download size={16} /> Export Report
            </button>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
              <Filter size={16} /> Filter (None)
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium">Transaction ID</th>
                <th className="px-6 py-4 font-medium">Booking Ref</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Method</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Agency Payout</th>
                <th className="px-6 py-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {TRANSACTIONS_DATA.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{txn.id}</td>
                  <td className="px-6 py-4">{txn.bookingRef}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">${txn.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">{txn.method}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={txn.status} />
                  </td>
                  <td className="px-6 py-4">{txn.date}</td>
                  <td className="px-6 py-4">${txn.agencyPayout.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-gray-400 hover:text-indigo-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-center gap-4">
          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 disabled:opacity-50">
            <ChevronLeft size={16} /> Previous
          </button>
          <div className="flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-sm font-medium text-gray-900">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 text-sm font-medium text-gray-500">2</button>
          </div>
          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
            Next <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}