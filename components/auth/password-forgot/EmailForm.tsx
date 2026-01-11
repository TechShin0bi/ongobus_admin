import React from "react";
import { Mail, ArrowRight } from "lucide-react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface EmailFormProps {
  email: string;
  isLoading: boolean;
  onEmailChange: (e: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const EmailForm = ({ email, isLoading, onEmailChange, onSubmit }: EmailFormProps) => {
  const t = useTranslations("ForgotPassword");
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {t('emailLabel')}
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={t('emailPlaceholder')}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={clsx(
          "w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all",
          isLoading && "opacity-70 cursor-not-allowed"
        )}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            {t('sendResetLink')} <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};