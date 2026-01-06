"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, Map, Bus } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      
      {/* Visual Icon Group */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-20"></div>
        <div className="relative bg-white p-6 rounded-full shadow-sm border border-gray-100">
          <div className="flex items-center gap-1">
             <Bus className="w-10 h-10 text-indigo-600" />
             <div className="text-2xl font-bold text-gray-300">?</div>
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center max-w-md mx-auto">
        <p className="text-indigo-600 font-bold text-sm uppercase tracking-wide mb-2">404 Error</p>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 sm:text-5xl">
          Page not found
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved. It looks like the bus took a wrong turn!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Footer Support Link */}
      <div className="mt-12 text-sm text-gray-500">
        <p>
          Need help? <Link href="/support" className="text-indigo-600 font-medium hover:underline">Contact Support</Link>
        </p>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 -ml-20 -mt-20 w-80 h-80 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>

    </div>
  );
}