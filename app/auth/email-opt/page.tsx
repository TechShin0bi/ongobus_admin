// src/app/verify/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Bus } from "lucide-react";
import clsx from "clsx";
import { BrandingPanel, OtpInputGroup, ResendTimer, SuccessState } from "@/components/auth/password-opt";

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const isFormValid = otp.join("").length === 6;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* --- Left Side: Form Logic --- */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white border-r border-gray-100">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          
          {/* Header & Navigation */}
          <div className="mb-8">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Login
            </Link>

            <div className="flex items-center gap-2 mb-6">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">BusLink</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Verify your identity
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We've sent a 6-digit code to <span className="font-semibold text-gray-900">user@example.com</span>.
            </p>
          </div>

          {/* Logic Switch: Success vs Form */}
          {isSuccess ? (
            <SuccessState />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <OtpInputGroup value={otp} onChange={setOtp} />

              <ResendTimer />

              <button
                type="submit"
                disabled={isLoading || !isFormValid}
                className={clsx(
                  "w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all",
                  (isLoading || !isFormValid) && "opacity-70 cursor-not-allowed"
                )}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Verify Email <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-8 border-t border-gray-100 pt-6 text-center">
            <p className="text-xs text-gray-500">
              Wrong email?{" "}
              <Link href="/login" className="font-medium text-indigo-600 hover:underline">
                Change email address
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* --- Right Side: Visuals --- */}
      <BrandingPanel />
    </div>
  );
}
