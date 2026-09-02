"use client";

import { LogOut, User as UserIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function UserNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-ink-800 transition-colors focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-ink-800 border border-ink-700 flex items-center justify-center overflow-hidden">
          <UserIcon className="w-4 h-4 text-ink-300" />
        </div>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 rounded-md bg-[#0B0A10] border border-ink-800 shadow-lg z-50 py-1">
            <div className="px-4 py-3 border-b border-ink-800">
              <p className="text-sm font-medium text-ink-0 truncate">Super Admin</p>
              <p className="text-xs text-ink-400 truncate">admin@vibrant.in</p>
            </div>
            <Link
              href="/"
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-ink-800 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
