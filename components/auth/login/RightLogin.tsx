import { CheckCircle } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";

const RightLogin = () => {
  const t = useTranslations('Login');
  return (
    <>
      {/* Right Side: Visual / Marketing (Hidden on Mobile) */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-indigo-600 flex flex-col justify-center items-center text-white p-12">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>

          <div className="relative z-10 max-w-lg">
            <h2 className="text-4xl font-bold mb-6">
              {t('manageFleet')}
            </h2>
            <p className="text-lg text-indigo-100 mb-10 leading-relaxed">
              {t('buslinkDescription')}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="bg-white/20 p-2 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h4 className="font-bold">{t('realTimeTracking')}</h4>
                  <p className="text-sm text-indigo-200">
                    {t('trackingDescription')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="bg-white/20 p-2 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h4 className="font-bold">{t('automatedPayments')}</h4>
                  <p className="text-sm text-indigo-200">
                    {t('paymentsDescription')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 text-xs text-indigo-300">
            {t('copyright')}
          </div>
        </div>
      </div>
    </>
  );
};

export default RightLogin;
