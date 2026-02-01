import AgencyDetails from "./AgencyDetails";
import UserDetails from "./UserDetails";

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

interface DetailSectionProps {
  activeTab: 'agencies' | 'users';
  selectedAgency: Agency;
  selectedUser: User;
  getStatusBadge: (status: string) => string;
  getRoleBadge: (role: string) => string;
}

export default function DetailSection({
  activeTab,
  selectedAgency,
  selectedUser,
  getStatusBadge,
  getRoleBadge,
}: DetailSectionProps) {
  return (
    <div className="xl:col-span-5">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sticky top-24">
        {activeTab === 'agencies' ? (
          <AgencyDetails
            agency={selectedAgency}
            getStatusBadge={getStatusBadge}
          />
        ) : (
          <UserDetails
            user={selectedUser}
            getRoleBadge={getRoleBadge}
            getStatusBadge={getStatusBadge}
          />
        )}
      </div>
    </div>
  );
}
