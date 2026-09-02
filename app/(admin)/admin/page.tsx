import { Users, Calendar, Image as ImageIcon, Briefcase, Activity, Shield } from "lucide-react"
import Link from "next/link"
import { getUsers } from "./users/actions"
import { getEvents } from "./events/actions"
import { getGallery } from "./gallery/actions"
import { getSponsors } from "./sponsors/actions"

export default async function AdminDashboard() {
  const [users, events, gallery, sponsors] = await Promise.all([
    getUsers(),
    getEvents(),
    getGallery(),
    getSponsors()
  ]);

  const stats = [
    { title: "Total Users", value: users.length.toString(), icon: Users, href: "/admin/users", trend: "+12%" },
    { title: "Active Events", value: events.length.toString(), icon: Calendar, href: "/admin/events", trend: "0%" },
    { title: "Gallery Items", value: gallery.length.toString(), icon: ImageIcon, href: "/admin/gallery", trend: "+45" },
    { title: "Sponsors", value: sponsors.length.toString(), icon: Briefcase, href: "/admin/sponsors", trend: "+1" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-display font-bold">Welcome back, Admin</h2>
        <p className="text-ink-400">Here's what's happening with VIBRANT 2K26 today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href} className="block group">
            <div className="bg-[#0B0A10] border border-ink-800 rounded-xl p-6 transition-all hover:border-vibeesta-500/50 hover:bg-ink-900/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-ink-400 mb-1">{stat.title}</p>
                  <div className="flex items-end gap-3">
                    <p className="text-3xl font-display font-bold text-ink-0">{stat.value}</p>
                    <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full mb-1">
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-ink-900 rounded-lg group-hover:bg-vibeesta-500/10 transition-colors">
                  <stat.icon className="w-6 h-6 text-ink-400 group-hover:text-vibeesta-400 transition-colors" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-[#0B0A10] border border-ink-800 rounded-xl p-6">
           <div className="flex items-center justify-between mb-6">
             <h3 className="font-semibold text-lg text-ink-100">Recent Activity</h3>
             <Link href="/admin/audit" className="text-sm text-vibeesta-400 hover:text-vibeesta-300">View all</Link>
           </div>
           
           <div className="space-y-6">
              {[
                { action: "Created new role", target: "Event Manager", time: "2 hours ago", user: "Super Admin" },
                { action: "Updated event details", target: "36-Hour Hackathon", time: "4 hours ago", user: "Tech Lead" },
                { action: "Uploaded 45 images to", target: "Gallery", time: "Yesterday", user: "Media Team" },
              ].map((log, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">
                    <div className="w-2 h-2 rounded-full bg-vibeesta-500 ring-4 ring-ink-900" />
                  </div>
                  <div>
                    <p className="text-sm text-ink-100">
                      <span className="font-medium text-vibeesta-400">{log.user}</span> {log.action} <span className="font-medium">{log.target}</span>
                    </p>
                    <p className="text-xs text-ink-500 mt-1">{log.time}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#0B0A10] border border-ink-800 rounded-xl p-6">
           <h3 className="font-semibold text-lg text-ink-100 mb-6">Quick Actions</h3>
           <div className="space-y-3">
              <Link href="/admin/events/new" className="flex items-center justify-between p-3 rounded-lg bg-ink-900/50 hover:bg-ink-800 transition-colors border border-ink-800 hover:border-ink-700 text-sm font-medium text-ink-100">
                 Add New Event
                 <Calendar className="w-4 h-4 text-ink-400" />
              </Link>
              <Link href="/admin/users/new" className="flex items-center justify-between p-3 rounded-lg bg-ink-900/50 hover:bg-ink-800 transition-colors border border-ink-800 hover:border-ink-700 text-sm font-medium text-ink-100">
                 Invite Team Member
                 <Users className="w-4 h-4 text-ink-400" />
              </Link>
              <Link href="/admin/roles/new" className="flex items-center justify-between p-3 rounded-lg bg-ink-900/50 hover:bg-ink-800 transition-colors border border-ink-800 hover:border-ink-700 text-sm font-medium text-ink-100">
                 Create Role Matrix
                 <Shield className="w-4 h-4 text-ink-400" />
              </Link>
           </div>
        </div>
      </div>
    </div>
  )
}
