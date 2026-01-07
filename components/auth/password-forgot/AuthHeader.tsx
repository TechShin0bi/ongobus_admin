import Link from "next/link";
import { ArrowLeft, Bus } from "lucide-react";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  backLink: string;
  backText: string;
}

export const AuthHeader = ({ title, subtitle, backLink, backText }: AuthHeaderProps) => {
  return (
    <div className="mb-8">
      <Link
        href={backLink}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        {backText}
      </Link>

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
