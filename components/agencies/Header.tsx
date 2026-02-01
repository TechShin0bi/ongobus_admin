import { Plus, UserPlus } from "lucide-react";

interface HeaderProps {
  activeTab: 'agencies' | 'users';
  onAddAgency?: () => void;
  onInviteUser?: () => void;
}

export default function Header({ activeTab, onAddAgency, onInviteUser }: HeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <h1 className="text-2xl font-bold text-gray-900">Agencies & Users Management</h1>
      <div className="flex gap-3">
        {activeTab === 'agencies' ? (
          <button 
            onClick={onAddAgency}
            className="flex items-center cursor-pointer gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add New Agency
          </button>
        ) : (
          <button 
            onClick={onInviteUser}
            className="flex items-center cursor-pointer gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-colors"
          >
            <UserPlus className="w-4 h-4" /> Invite New User
          </button>
        )}
      </div>
    </div>
  );
}
