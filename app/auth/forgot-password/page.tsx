"use client";

import { AuthHeader, AuthLayoutSide, EmailForm, SuccessMessage } from "@/components/auth/password-forgot";
import React, { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      
      {/* --- Left Side: Content --- */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white border-r border-gray-100">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          
          <AuthHeader 
            title="Reset Password"
            subtitle="Enter the email associated with your account and we'll send you a link to reset your password."
            backLink="/login"
            backText="Back to Login"
          />

          {isSuccess ? (
            <SuccessMessage 
                email={email} 
                onResend={() => setIsSuccess(false)} 
            />
          ) : (
            <EmailForm
                email={email}
                isLoading={isLoading}
                onEmailChange={setEmail}
                onSubmit={handleSubmit}
            />
          )}

          <div className="mt-8 border-t border-gray-100 pt-6">
            <p className="text-center text-xs text-gray-500">
              Having trouble?{" "}
              <a href="#" className="font-medium text-indigo-600 hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* --- Right Side: Visuals --- */}
      <AuthLayoutSide />
    </div>
  );
}