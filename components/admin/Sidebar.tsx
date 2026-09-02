"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Shield, Calendar, Clock, Image as ImageIcon, Briefcase, HelpCircle, Settings, FileText } from "lucide-react";

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  // In the future, this will be driven by the actual RBAC backend
  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/roles", label: "Roles & Permissions", icon: Shield },
    { href: "/admin/events", label: "Events", icon: Calendar },
    { href: "/admin/schedule", label: "Schedule", icon: Clock },
    { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
    { href: "/admin/sponsors", label: "Sponsors", icon: Briefcase },
    { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
    { href: "/admin/settings", label: "Settings", icon: Settings },
    { href: "/admin/audit", label: "Audit Logs", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-[#0B0A10] border-r border-ink-800 flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-ink-800 shrink-0">
        <Link href="/" className="font-display font-black text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-vibeesta-400 to-shrinik-400">
          VIBRANT
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-ink-800 text-ink-0" 
                  : "text-ink-300 hover:bg-ink-800/50 hover:text-ink-100"
              )}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
