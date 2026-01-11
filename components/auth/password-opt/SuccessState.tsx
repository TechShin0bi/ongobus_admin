import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export const SuccessState = () => {
  const t = useTranslations("OtpVerification.SuccessState");
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-in fade-in zoom-in duration-300">
      <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="w-6 h-6 text-green-600" />
      </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('title')}</h3>
            <p className="text-sm text-gray-600 mb-6">
        {t('description')}
      </p>

      <Link
        href="/dashboard"
        className="block w-full py-2.5 px-4 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700"
      >
                {t('dashboardButton')}
      </Link>
    </div>
  );
};