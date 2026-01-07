"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

export const ResendTimer = () => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    // Add API logic here for resending email
    setTimer(30);
  };

  return (
    <div className="flex items-center justify-between text-sm">
      <p className="text-gray-500">Didn't receive code?</p>
      {timer > 0 ? (
        <span className="text-gray-400 font-medium">
          Resend in 00:{timer.toString().padStart(2, "0")}
        </span>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          className="flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-500"
        >
          <RefreshCw className="w-3 h-3" /> Resend
        </button>
      )}
    </div>
  );
};