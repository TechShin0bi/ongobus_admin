"use client";

import React, { useState } from "react";
import { Mail, ArrowLeft, ArrowRight, Bus, CheckCircle } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

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
      
      {/* --- Left Side: Form Area --- */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white border-r border-gray-100">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          
          {/* Header */}
          <div className="mb-8">
             <Link href="/login" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8 group">
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
              Reset Password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter the email associated with your account and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Success State */}
          {isSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-in fade-in zoom-in duration-300">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Check your email</h3>
              <p className="text-sm text-gray-600 mb-6">
                We have sent a password reset link to <span className="font-semibold text-gray-900">{email}</span>.
              </p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="block w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Click to resend email
                </button>
                <Link href="/login" className="block w-full py-2.5 px-4 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                   Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            /* Input Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
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
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your email"
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
                  <>Send Reset Link <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>
          )}

          <div className="mt-8 border-t border-gray-100 pt-6">
             <p className="text-center text-xs text-gray-500">
               Having trouble? <a href="#" className="font-medium text-indigo-600 hover:underline">Contact Support</a>
             </p>
          </div>

        </div>
      </div>
      
      {/* --- Right Side: Visual (Hidden on Mobile) --- */}
      <div className="hidden lg:block relative w-0 flex-1 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-gray-900 flex flex-col justify-center items-center text-white p-12">
            
            {/* Abstract Pattern */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

            <div className="relative z-10 max-w-lg text-center">
                <div className="mb-6 inline-flex p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                   <LockIcon />
                </div>
                <h2 className="text-3xl font-bold mb-4">Secure your account</h2>
                <p className="text-indigo-200 leading-relaxed">
                   We use industry-standard encryption to keep your data safe. Resetting your password regularly helps maintain account security.
                </p>
            </div>
        </div>
      </div>

    </div>
  );
}

// Simple Lock SVG for the right panel
const LockIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);