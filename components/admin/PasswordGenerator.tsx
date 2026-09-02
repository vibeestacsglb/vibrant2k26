"use client";

import { useState } from "react";
import { KeyRound, RefreshCw } from "lucide-react";

export default function PasswordGenerator({ defaultValue = "" }: { defaultValue?: string }) {
  const [password, setPassword] = useState(defaultValue);

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let newPassword = "";
    for (let i = 0; i < 12; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-ink-300">Password</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" />
          <input 
            name="password"
            required
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type or generate a password"
            className="w-full bg-[#07070B] border border-ink-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-ink-100 focus:outline-none focus:border-vibeesta-500" 
          />
        </div>
        <button 
          type="button" 
          onClick={generatePassword}
          className="px-4 py-2 bg-ink-900 border border-ink-800 hover:bg-ink-800 rounded-lg text-ink-300 transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
        >
          <RefreshCw className="w-4 h-4" />
          Generate
        </button>
      </div>
    </div>
  );
}
