import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import AgenciesTable from "./AgenciesTable";
import UsersTable from "./UsersTable";

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

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Support Agent' | 'Viewer';
  status: 'Active' | 'Locked' | 'Invited';
  lastLogin: string;
  department: string;
  permissions: string[];
}

interface ListSectionProps {
  activeTab: 'agencies' | 'users';
  agencies: Agency[];
  users: User[];
  selectedAgencyId: string;
  selectedUserId: string;
  onSelectAgency: (id: string) => void;
  onSelectUser: (id: string) => void;
  getStatusBadge: (status: string) => string;
  getRoleBadge: (role: string) => string;
}

export default function ListSection({
  activeTab,
  agencies,
  users,
  selectedAgencyId,
  selectedUserId,
  onSelectAgency,
  onSelectUser,
  getStatusBadge,
  getRoleBadge,
}: ListSectionProps) {
  return (
    <div className="xl:col-span-7 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[600px]">
      {/* List Header */}
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">
          {activeTab === 'agencies' ? 'Registered Agencies' : 'System Users'}
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={activeTab === 'agencies' ? "Search agencies..." : "Search users..."}
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        {activeTab === 'agencies' ? (
          <AgenciesTable
            agencies={agencies}
            selectedAgencyId={selectedAgencyId}
            onSelectAgency={onSelectAgency}
            getStatusBadge={getStatusBadge}
          />
        ) : (
          <UsersTable
            users={users}
            selectedUserId={selectedUserId}
            onSelectUser={onSelectUser}
            getStatusBadge={getStatusBadge}
            getRoleBadge={getRoleBadge}
          />
        )}
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-200 flex items-center justify-center gap-4">
        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 disabled:opacity-50">
          <ChevronLeft size={16} /> Previous
        </button>
        <span className="text-sm text-gray-600">Page 1 of 1</span>
        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
