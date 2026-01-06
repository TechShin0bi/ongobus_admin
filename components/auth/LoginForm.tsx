"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Bus, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/";
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login(email, password, rememberMe);
      
      if (success) {
        router.push(returnUrl);
      } else {
        setError("Invalid email or password. Try 'admin@buslink.com' / 'password123'");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push(returnUrl);
    }
  }, [isAuthenticated, returnUrl, router]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side: Login Form */}
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
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
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
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setEmail('admin@buslink.com');
                    setPassword('password123');
                  }}
                  className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-indigo-200 rounded-lg shadow-sm text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                >
                  Login as Admin
                </button>
                <button
                  onClick={() => {
                    setEmail('john@example.com');
                    setPassword('password123');
                  }}
                  className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
                >
                  Login as User
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
      
      {/* Right Side: Visual / Marketing (Hidden on Mobile) */}
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