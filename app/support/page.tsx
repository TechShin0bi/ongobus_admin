"use client";

import React, { useState } from "react";
import { 
  Search, Filter, User, Mail, Phone, MapPin, Calendar, 
  MessageSquare, Paperclip, Clock, AlertCircle, CheckCircle, 
  FileText, ChevronLeft, ChevronRight, MoreVertical, Send
} from "lucide-react";
import clsx from "clsx";

// --- Types ---

interface Ticket {
  id: string;
  customerName: string;
  issueType: string;
  status: 'Open' | 'New' | 'Pending' | 'Resolved' | 'Closed';
  priority: 'High' | 'Medium' | 'Low';
  date: string;
}

interface TicketDetail {
  id: string;
  status: 'Open' | 'New' | 'Pending' | 'Resolved' | 'Closed';
  priority: 'High' | 'Medium' | 'Low';
  customer: {
    name: string;
    email: string;
    phone: string;
    bookingId: string;
    route: string;
    travelDate: string;
  };
  description: string;
  history: {
    sender: string;
    role: 'Customer' | 'Agent';
    message: string;
    timestamp: string;
  }[];
  slaStatus: string;
  refundRequest?: {
    amount: number;
    reason: string;
  };
}

// --- Mock Data ---

const TICKETS_LIST: Ticket[] = [
  { id: 'TKT-001', customerName: 'Aisha Khan', issueType: 'Refund Request', status: 'Open', priority: 'High', date: '2024-07-28' },
  { id: 'TKT-002', customerName: 'Ben Carter', issueType: 'Technical Issue', status: 'New', priority: 'Medium', date: '2024-07-28' },
  { id: 'TKT-003', customerName: 'Sophia Lee', issueType: 'Booking Dispute', status: 'Pending', priority: 'Low', date: '2024-07-27' },
  { id: 'TKT-004', customerName: 'David Chen', issueType: 'General Inquiry', status: 'Resolved', priority: 'Low', date: '2024-07-26' },
  { id: 'TKT-005', customerName: 'Emily White', issueType: 'Refund Request', status: 'Closed', priority: 'Medium', date: '2024-07-25' },
];

const SELECTED_TICKET: TicketDetail = {
  id: 'TKT-001',
  status: 'Open',
  priority: 'High',
  customer: {
    name: 'Aisha Khan',
    email: 'aisha.khan@example.com',
    phone: '+1234567890',
    bookingId: 'BKG-78901',
    route: 'New York to Boston',
    travelDate: '2024-08-15'
  },
  description: 'Requested refund for booking BKG-78901 due to family emergency. Ticket was purchased yesterday.',
  history: [
    { sender: 'Customer', role: 'Customer', message: 'I need to cancel my trip and get a refund due to a sudden family emergency.', timestamp: '2024-07-28 10:00 AM' },
    { sender: 'Agent (Alice Smith)', role: 'Agent', message: 'Thank you for contacting support. We have received your request and are reviewing it. Please provide supporting documents for the family emergency, if any.', timestamp: '2024-07-28 10:30 AM' },
  ],
  slaStatus: 'Overdue',
  refundRequest: {
    amount: 85.00,
    reason: 'Family Emergency'
  }
};

// --- Components ---

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Open: "bg-indigo-100 text-indigo-700",
    New: "bg-gray-100 text-gray-700",
    Pending: "bg-orange-100 text-orange-700",
    Resolved: "bg-green-100 text-green-700",
    Closed: "bg-gray-100 text-gray-500",
  };
  return (
    <span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-medium", styles[status] || styles.New)}>
      {status}
    </span>
  );
};

const SupportIssues= ()=> {
  const [selectedTicketId, setSelectedTicketId] = useState<string>('TKT-001');

  return (
    <div>
      
      {/* 1. Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Support & Issues</h1>
        <p className="text-sm text-gray-500 mt-1">
          Centralized management for all customer support tickets and disputes.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* --- LEFT COLUMN: Ticket List (4 Columns) --- */}
        <div className="xl:col-span-4 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col h-[calc(100vh-140px)]">
          
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Support Tickets</h3>
            <p className="text-xs text-gray-500 mb-4">Manage all customer support inquiries efficiently.</p>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-xs whitespace-nowrap hover:bg-gray-200">All Status</button>
              <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-xs whitespace-nowrap hover:bg-gray-200">All Priorities</button>
              <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-xs whitespace-nowrap hover:bg-gray-200">All Agents</button>
            </div>
          </div>

          {/* Ticket List Table */}
          <div className="overflow-y-auto flex-1">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 font-medium">Ticket ID</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Issue</th>
                  <th className="px-4 py-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {TICKETS_LIST.map((ticket) => (
                  <tr 
                    key={ticket.id}
                    onClick={() => setSelectedTicketId(ticket.id)}
                    className={clsx(
                      "cursor-pointer hover:bg-gray-50 transition-colors",
                      selectedTicketId === ticket.id ? "bg-indigo-50" : ""
                    )}
                  >
                    <td className="px-4 py-4 font-medium text-indigo-600">{ticket.id}</td>
                    <td className="px-4 py-4 text-gray-900">{ticket.customerName}</td>
                    <td className="px-4 py-4">{ticket.issueType}</td>
                    <td className="px-4 py-4 text-right">
                       <StatusBadge status={ticket.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
            <button className="text-gray-600 hover:text-gray-900 font-medium">Previous</button>
            <span>Page 1 of 1</span>
            <button className="text-gray-600 hover:text-gray-900 font-medium">Next</button>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Ticket Detail View (8 Columns) --- */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* A. Top Action Bar */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-gray-900">{SELECTED_TICKET.id}</h2>
              <StatusBadge status={SELECTED_TICKET.status} />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {SELECTED_TICKET.priority} Priority
              </span>
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 focus:outline-none">
                <option>Assign Agent</option>
                <option>Alice Smith</option>
                <option>Bob Jones</option>
              </select>
              <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 flex items-center gap-2">
                <CheckCircle size={16} /> Resolve Ticket
              </button>
            </div>
          </div>

          {/* B. Customer & Booking Context */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Customer & Booking Context</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-3">
                 <div>
                   <label className="text-xs text-gray-500 block mb-1">Customer Name</label>
                   <div className="text-sm font-medium text-gray-900">{SELECTED_TICKET.customer.name}</div>
                 </div>
                 <div>
                   <label className="text-xs text-gray-500 block mb-1">Phone</label>
                   <div className="text-sm font-medium text-gray-900">{SELECTED_TICKET.customer.phone}</div>
                 </div>
                 <div>
                   <label className="text-xs text-gray-500 block mb-1">Route</label>
                   <div className="text-sm font-medium text-gray-900">{SELECTED_TICKET.customer.route}</div>
                 </div>
               </div>

               <div className="space-y-3">
                 <div>
                   <label className="text-xs text-gray-500 block mb-1">Email</label>
                   <div className="text-sm font-medium text-gray-900">{SELECTED_TICKET.customer.email}</div>
                 </div>
                 <div>
                   <label className="text-xs text-gray-500 block mb-1">Booking ID</label>
                   <div className="text-sm font-bold text-gray-900">{SELECTED_TICKET.customer.bookingId}</div>
                 </div>
                 <div>
                   <label className="text-xs text-gray-500 block mb-1">Travel Date</label>
                   <div className="text-sm font-medium text-gray-900">{SELECTED_TICKET.customer.travelDate}</div>
                 </div>
               </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <FileText size={16} /> View Full Booking Details
              </button>
            </div>
          </div>

          {/* C. Issue Description & History */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Issue Description & History</h3>
            
            <div className="mb-6">
              <label className="text-xs font-semibold text-gray-500 block mb-2">Issue Description</label>
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                {SELECTED_TICKET.description}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-3">Communication History</label>
              <div className="space-y-4">
                {SELECTED_TICKET.history.map((msg, index) => (
                  <div key={index} className="flex flex-col gap-1">
                     <div className="flex justify-between items-baseline">
                        <span className="text-sm font-bold text-gray-900">{msg.sender}</span>
                        <span className="text-xs text-gray-400">{msg.timestamp}</span>
                     </div>
                     <div className={clsx(
                       "p-3 rounded-lg text-sm",
                       msg.role === 'Agent' ? "bg-indigo-50 text-indigo-900" : "bg-gray-100 text-gray-800"
                     )}>
                        {msg.message}
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* D. Internal Notes & Attachments */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Internal Notes & Attachments</h3>
            
            <div className="mb-4">
              <label className="text-xs text-gray-500 block mb-1">Internal Notes</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 min-h-[80px]"
                defaultValue="Customer sounds distressed. Follow up on documents. Check refund policy for urgency."
              ></textarea>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 mb-6">
              <FileText size={14} /> Save Notes
            </button>

            <div>
              <label className="text-xs text-gray-500 block mb-1">Attachments</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer">
                 <span className="text-sm">No attachments. Drag & drop files here or click to upload.</span>
              </div>
            </div>
          </div>

          {/* E. SLA & Refund Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* SLA Section */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
               <h3 className="text-sm font-bold text-gray-900 mb-4">SLA & Canned Responses</h3>
               
               <div className="mb-4">
                 <div className="flex justify-between items-center mb-1">
                   <label className="text-xs text-gray-500">SLA Status</label>
                   <div className="flex items-center gap-1 text-xs font-bold text-indigo-600">
                     <Clock size={12} /> {SELECTED_TICKET.slaStatus}
                   </div>
                 </div>
                 <div className="w-full bg-gray-200 rounded-full h-2">
                   <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                 </div>
               </div>

               <div>
                 <label className="text-xs text-gray-500 block mb-1">Canned Responses</label>
                 <div className="flex gap-2">
                   <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700">
                     <option>Select a response</option>
                     <option>Request for Info</option>
                     <option>Refund Approved</option>
                   </select>
                   <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700">
                     <MoreVertical size={16} className="rotate-90" />
                   </button>
                 </div>
               </div>
            </div>

            {/* Refund Details (Conditional Block) */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
               <h3 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
                 <span className="text-lg font-normal">$</span> Refund Request Details
               </h3>
               <p className="text-xs text-gray-500 mb-4">Manage the refund process for this ticket.</p>

               <div className="space-y-3">
                 <div>
                    <label className="text-xs text-gray-500 block mb-1">Requested Amount</label>
                    <input 
                      type="number" 
                      defaultValue={SELECTED_TICKET.refundRequest?.amount} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                 </div>
                 <div>
                    <label className="text-xs text-gray-500 block mb-1">Reason</label>
                    <textarea 
                      defaultValue={SELECTED_TICKET.refundRequest?.reason} 
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
                    ></textarea>
                 </div>
                 <div className="flex gap-2 mt-2">
                    <button className="flex-1 py-1.5 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50">
                       Process Refund
                    </button>
                    <button className="flex-1 py-1.5 bg-white border border-gray-300 rounded text-xs font-medium text-red-600 hover:bg-red-50">
                       Reject Request
                    </button>
                 </div>
               </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default SupportIssues