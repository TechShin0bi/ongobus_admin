import clsx from "clsx";
import { CheckCircle, Clock, Edit, Key, Lock, Mail, Shield } from "lucide-react";

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

interface UserDetailsProps {
  user: User;
  getRoleBadge: (role: string) => string;
  getStatusBadge: (status: string) => string;
}

export default function UserDetails({ user, getRoleBadge, getStatusBadge }: UserDetailsProps) {
  return (
    <>
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-600">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">{user.name}</h2>
            <span className={clsx("px-2 py-0.5 rounded border text-xs font-medium", getRoleBadge(user.role))}>
              {user.role}
            </span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Edit size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-y-6 mb-8">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Email Address</label>
          <div className="flex items-center gap-2 text-sm text-gray-900">
            <Mail size={14} className="text-gray-400" /> {user.email}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Department</label>
            <div className="text-sm font-medium text-gray-900">{user.department}</div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Last Login</label>
            <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
              <Clock size={12} className="text-gray-400" /> {user.lastLogin}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Shield size={16} className="text-gray-400" /> Permissions & Access
        </h4>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <ul className="space-y-2">
            {user.permissions.map((perm, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle size={14} className="text-green-500" />
                {perm}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex gap-3 pt-6 border-t border-gray-100">
        <button className="flex-1 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
          <Key size={14} /> Reset Password
        </button>
        {user.status === 'Locked' ? (
          <button className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-2">
            <CheckCircle size={14} /> Unlock User
          </button>
        ) : (
          <button className="flex-1 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 flex items-center justify-center gap-2">
            <Lock size={14} /> Lock Account
          </button>
        )}
      </div>
    </>
  );
}
