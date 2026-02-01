import clsx from "clsx";

interface User {
  id: string;
  name: string;
  role: 'Admin' | 'Manager' | 'Support Agent' | 'Viewer';
  lastLogin: string;
  status: 'Active' | 'Locked' | 'Invited';
}

interface UsersTableProps {
  users: User[];
  selectedUserId: string;
  onSelectUser: (id: string) => void;
  getStatusBadge: (status: string) => string;
  getRoleBadge: (role: string) => string;
}

export default function UsersTable({
  users,
  selectedUserId,
  onSelectUser,
  getStatusBadge,
  getRoleBadge,
}: UsersTableProps) {
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
        <tr>
          <th className="px-6 py-4 font-medium">User Name</th>
          <th className="px-6 py-4 font-medium">Role</th>
          <th className="px-6 py-4 font-medium">Last Login</th>
          <th className="px-6 py-4 font-medium">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {users.map((user) => (
          <tr
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className={clsx(
              "cursor-pointer hover:bg-gray-50 transition-colors",
              selectedUserId === user.id && "bg-indigo-50 hover:bg-indigo-50"
            )}
          >
            <td className="px-6 py-4 font-medium text-gray-900">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                  {user.name.charAt(0)}
                </div>
                {user.name}
              </div>
            </td>
            <td className="px-6 py-4">
              <span className={clsx("px-2 py-0.5 rounded border text-xs font-medium", getRoleBadge(user.role))}>
                {user.role}
              </span>
            </td>
            <td className="px-6 py-4">{user.lastLogin}</td>
            <td className="px-6 py-4">
              <span className={clsx("px-2 py-0.5 rounded-full text-xs font-medium", getStatusBadge(user.status))}>
                {user.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
