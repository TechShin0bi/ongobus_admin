import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface SuccessMessageProps {
  email: string;
  onResend: () => void;
}

export const SuccessMessage = ({ email, onResend }: SuccessMessageProps) => {
  const t = useTranslations("ForgotPassword");
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-in fade-in zoom-in duration-300">
      <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="w-6 h-6 text-green-600" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{t('checkYourEmail')}</h3>
      <p className="text-sm text-gray-600 mb-6">
        {t.rich('resetLinkSent', { email, bold: (chunks) => <span className="font-semibold text-gray-900">{chunks}</span> })}
      </p>

      <div className="space-y-3">
        <button
          onClick={onResend}
          className="block w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          {t('resendEmail')}
        </button>
        <Link
          href="/login"
          className="block w-full py-2.5 px-4 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {t('backToSignIn')}
        </Link>
      </div>
    </div>
  );
};