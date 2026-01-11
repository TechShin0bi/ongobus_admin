import { Bus } from "lucide-react";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <Bus className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-gray-900">BusLink</span>
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
    </div>
  );
};
