import { Bus } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";

function LeftLogin({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: string;
}) {
  const t = useTranslations("Login");
  return (
    <>
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white border-r border-gray-100">
        <div className="mx-auto w-full max-w-2xl lg:w-[500px]">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">BusLink</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {t("welcomeBack")}
            </h2>
            <p className="mt-2 text-sm text-gray-600">{t("enterDetails")}</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              {error}
            </div>
          )}

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </>
  );
}

export default LeftLogin;
