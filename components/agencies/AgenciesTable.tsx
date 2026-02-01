import clsx from "clsx";

interface Agency {
  id: string;
  name: string;
  contactEmail: string;
  commissionRate: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

interface AgenciesTableProps {
  agencies: Agency[];
  selectedAgencyId: string;
  onSelectAgency: (id: string) => void;
  getStatusBadge: (status: string) => string;
}

export default function AgenciesTable({
  agencies,
  selectedAgencyId,
  onSelectAgency,
  getStatusBadge,
}: AgenciesTableProps) {
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
        <tr>
          <th className="px-6 py-4 font-medium">Agency Name</th>
          <th className="px-6 py-4 font-medium">Contact Email</th>
          <th className="px-6 py-4 font-medium">Commission</th>
          <th className="px-6 py-4 font-medium">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {agencies.map((agency) => (
          <tr
            key={agency.id}
            onClick={() => onSelectAgency(agency.id)}
            className={clsx(
              "cursor-pointer hover:bg-gray-50 transition-colors",
              selectedAgencyId === agency.id && "bg-indigo-50 hover:bg-indigo-50"
            )}
          >
            <td className="px-6 py-4 font-medium text-gray-900">{agency.name}</td>
            <td className="px-6 py-4">{agency.contactEmail}</td>
            <td className="px-6 py-4">{agency.commissionRate}</td>
            <td className="px-6 py-4">
              <span className={clsx("px-2 py-0.5 rounded-full text-xs font-medium", getStatusBadge(agency.status))}>
                {agency.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
