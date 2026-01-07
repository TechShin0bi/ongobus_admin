export const AuthLayoutSide = () => {
  return (
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
            We use industry-standard encryption to keep your data safe.
            Resetting your password regularly helps maintain account security.
          </p>
        </div>
      </div>
    </div>
  );
};

// Local icon component
const LockIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);