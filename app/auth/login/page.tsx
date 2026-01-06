"use client";

import React, { useState } from "react";
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, Bus, Github, CheckCircle, Loader2 
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login(email, password);
      
      if (success) {
        // Redirect handled by Layout effect, but explicit push is good practice
        router.push("/");
      } else {
        setError("Invalid email or password. Try 'admin@buslink.com' / 'password123'");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      
      {/* --- Left Side: Login Form --- */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white border-r border-gray-100">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">BusLink</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please enter your details to sign in.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              {error}
            </div>
          )}

          <div className="mt-8">
            <form onSubmit={handleLogin} className="space-y-6">
              
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
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                    placeholder="admin@buslink.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                    placeholder="password123"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer select-none">
                    Remember for 30 days
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={clsx(
                    "w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all",
                    isLoading && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isLoading ? (
                     <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>Sign in <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                  <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M12.0003 20.45c-4.6667 0-8.45-3.7833-8.45-8.45 0-4.6667 3.7833-8.45 8.45-8.45 4.6667 0 8.45 3.7833 8.45 8.45 0 4.6667-3.7833 8.45-8.45 8.45z" fill="#fff" />
                    <path d="M21.75 12.2c0-.7-.05-1.35-.15-2h-9.6v3.8h5.5c-.25 1.25-.95 2.3-2 3l3.2 2.5c1.9-1.75 3.05-4.35 3.05-7.3z" fill="#4285F4" />
                    <path d="M12 22c2.7 0 4.95-.9 6.6-2.45l-3.2-2.5c-.9.6-2.05.95-3.4.95-2.6 0-4.8-1.75-5.6-4.1H3.1v2.6C4.85 20 8.15 22 12 22z" fill="#34A853" />
                    <path d="M6.4 13.9c-.2-.6-.35-1.25-.35-1.9s.15-1.3.35-1.9V7.5H3.1C1.65 10.4 1.65 13.6 3.1 16.5l3.3-2.6z" fill="#FBBC05" />
                    <path d="M12 5.75c1.5 0 2.85.5 3.9 1.5l2.95-2.95C17.15 2.65 14.7 1.75 12 1.75c-3.85 0-7.15 2-8.9 5.75l3.3 2.6c.8-2.35 3-4.1 5.6-4.1z" fill="#EA4335" />
                  </svg>
                  <span className="sr-only">Sign in with Google</span>
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">Sign in with GitHub</span>
                </button>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
               Don't have an account?{' '}
               <Link href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Sign up
               </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* --- Right Side: Visual / Marketing (Hidden on Mobile) --- */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-indigo-600 flex flex-col justify-center items-center text-white p-12">
            
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

            <div className="relative z-10 max-w-lg">
                <h2 className="text-4xl font-bold mb-6">Manage your fleet efficiently.</h2>
                <p className="text-lg text-indigo-100 mb-10 leading-relaxed">
                   BusLink provides a comprehensive dashboard to manage routes, track payments, monitor buses, and handle support tickets—all in one place.
                </p>

                <div className="space-y-4">
                   <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                      <div className="bg-white/20 p-2 rounded-lg">
                         <CheckCircle className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                         <h4 className="font-bold">Real-time Tracking</h4>
                         <p className="text-sm text-indigo-200">Monitor bus locations instantly.</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                      <div className="bg-white/20 p-2 rounded-lg">
                         <CheckCircle className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                         <h4 className="font-bold">Automated Payments</h4>
                         <p className="text-sm text-indigo-200">Seamless reconciliations & payouts.</p>
                      </div>
                   </div>
                </div>
            </div>

             <div className="absolute bottom-8 text-xs text-indigo-300">
                © 2026 BusLink Inc.
             </div>
        </div>
      </div>

    </div>
  );
}

