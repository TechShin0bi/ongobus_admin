
import { ShieldCheck } from "lucide-react";

export const BrandingPanel = () => {
  return (
    <div className="hidden lg:block relative w-0 flex-1 bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-gray-900 flex flex-col justify-center items-center text-white p-12">
        {/* Abstract Pattern */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 -mb-20 -mr-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

        <div className="relative z-10 max-w-lg text-center">
          <div className="mb-6 inline-flex p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <ShieldCheck className="w-12 h-12 text-indigo-300" strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Two-Factor Security</h2>
          <p className="text-indigo-200 leading-relaxed">
            Verification helps us ensure that you are really who you say you are.
            This extra step protects your account from unauthorized access.
          </p>
        </div>
      </div>
    </div>
  );
};