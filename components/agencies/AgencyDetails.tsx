import clsx from "clsx";
import { BarChart3, Edit, Mail } from "lucide-react";

interface Agency {
  id: string;
  name: string;
  contactEmail: string;
  contactPerson: string;
  phone: string;
  commissionRate: string;
  status: 'Active' | 'Inactive' | 'Pending';
  bookings: number;
  revenueShare: string;
  cancellationRate: string;
  routes: string[];
}

interface AgencyDetailsProps {
  agency: Agency;
  getStatusBadge: (status: string) => string;
}

export default function AgencyDetails({ agency, getStatusBadge }: AgencyDetailsProps) {
  return (
    <>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">{agency.name}</h2>
          <span className={clsx("px-2 py-0.5 rounded-full text-xs font-medium", getStatusBadge(agency.status))}>
            {agency.status} Agency
          </span>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50">
          <Edit size={14} /> Edit
        </button>
      </div>

      <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Contact Person</label>
          <div className="text-sm font-medium text-gray-900">{agency.contactPerson}</div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
          <div className="text-sm font-medium text-gray-900">{agency.phone}</div>
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
          <div className="flex items-center gap-2 text-sm text-gray-900">
            <Mail size={14} className="text-gray-400" /> {agency.contactEmail}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <BarChart3 size={16} className="text-gray-400" /> Performance Metrics
        </h4>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2 border border-gray-100">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Bookings:</span>
            <span className="font-semibold text-gray-900">{agency.bookings}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Revenue Share:</span>
            <span className="font-semibold text-gray-900">{agency.revenueShare}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Cancellation Rate:</span>
            <span className="font-semibold text-gray-900">{agency.cancellationRate}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-6 border-t border-gray-100">
        <button className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-sm font-medium transition-colors">
          Deactivate
        </button>
        <button className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
          View Resources
        </button>
      </div>
    </>
  );
}
