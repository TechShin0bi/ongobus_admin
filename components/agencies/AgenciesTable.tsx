import useAgenciesStore from "@/store/useAgenciesStore";
import clsx from "clsx";

interface AgenciesTableProps {
  getStatusBadge: (status: string) => string;
}

export default function AgenciesTable({
  getStatusBadge,
}: AgenciesTableProps) {
    const {agencies , selectedAgency , setSelectedAgency} = useAgenciesStore()
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
        <tr>
          <th className="px-6 py-4 font-medium">Agency Name</th>
          <th className="px-6 py-4 font-medium">Contact</th>
          <th className="px-6 py-4 font-medium">Address</th>
          <th className="px-6 py-4 font-medium">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {agencies.map((agency) => (
          <tr
            key={agency.id}
            onClick={() => setSelectedAgency(agency.id)}
            className={clsx(
              "cursor-pointer hover:bg-gray-50 transition-colors",
              selectedAgency?.id === agency.id && "bg-indigo-50 hover:bg-indigo-50"
            )}
          >
            <td className="px-6 py-4 font-medium text-gray-900">{agency.name}</td>
            <td className="px-6 py-4">{agency.contact}</td>
            <td className="px-6 py-4 truncate max-w-xs">{agency.address}</td>
            <td className="px-6 py-4">
              <span className={clsx("px-2 py-0.5 rounded-full text-xs font-medium", getStatusBadge(agency.location.is_active ? 'Active' : 'Inactive'))}>
                {agency.location.is_active ? 'Active' : 'Inactive'}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
