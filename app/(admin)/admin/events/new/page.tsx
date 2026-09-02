import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { addEvent } from "../actions"

export default function NewEventPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/events" className="p-2 rounded-lg bg-ink-900 hover:bg-ink-800 transition-colors text-ink-300 hover:text-ink-0">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-display font-bold">Add Event</h2>
          <p className="text-ink-400 text-sm mt-1">Create a new tech or creative event.</p>
        </div>
      </div>

      <form action={addEvent} className="space-y-8 bg-[#0B0A10] border border-ink-800 rounded-xl p-6 md:p-8 shadow-2xl shadow-black/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink-300">Event Name</label>
            <input name="name" required type="text" className="w-full bg-[#07070B] border border-ink-800 rounded-lg px-4 py-2.5 text-sm text-ink-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink-300">Category</label>
            <select name="category" className="w-full bg-[#07070B] border border-ink-800 rounded-lg px-4 py-2.5 text-sm text-ink-100">
               <option value="tech">Tech</option>
               <option value="creative">Creative</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink-300">Date</label>
            <input name="date" type="text" placeholder="e.g. 17 Oct" className="w-full bg-[#07070B] border border-ink-800 rounded-lg px-4 py-2.5 text-sm text-ink-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink-300">Time</label>
            <input name="time" type="text" placeholder="e.g. Coming Soon" className="w-full bg-[#07070B] border border-ink-800 rounded-lg px-4 py-2.5 text-sm text-ink-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink-300">Team Size</label>
            <input name="teamSize" type="text" placeholder="e.g. Individual / Groups" className="w-full bg-[#07070B] border border-ink-800 rounded-lg px-4 py-2.5 text-sm text-ink-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink-300">Venue</label>
            <input name="venue" type="text" placeholder="e.g. Main Stage" className="w-full bg-[#07070B] border border-ink-800 rounded-lg px-4 py-2.5 text-sm text-ink-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink-300">Fee</label>
            <input name="fee" type="text" placeholder="e.g. Coming Soon" className="w-full bg-[#07070B] border border-ink-800 rounded-lg px-4 py-2.5 text-sm text-ink-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink-300">Prize</label>
            <input name="prize" type="text" placeholder="e.g. Coming Soon" className="w-full bg-[#07070B] border border-ink-800 rounded-lg px-4 py-2.5 text-sm text-ink-100" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-ink-300">Eligibility</label>
            <input name="eligibility" type="text" placeholder="e.g. Open to students from all colleges." className="w-full bg-[#07070B] border border-ink-800 rounded-lg px-4 py-2.5 text-sm text-ink-100" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-ink-300">Rules</label>
            <textarea name="rules" placeholder="e.g. Coming Soon" rows={3} className="w-full bg-[#07070B] border border-ink-800 rounded-lg px-4 py-2.5 text-sm text-ink-100 resize-y" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-ink-300">Coordinators</label>
            <textarea name="coordinators" placeholder="e.g. Coming Soon" rows={2} className="w-full bg-[#07070B] border border-ink-800 rounded-lg px-4 py-2.5 text-sm text-ink-100 resize-y" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink-300">Status</label>
            <select name="status" className="w-full bg-[#07070B] border border-ink-800 rounded-lg px-4 py-2.5 text-sm text-ink-100">
               <option value="Published">Published</option>
               <option value="Draft">Draft</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end pt-4 border-t border-ink-800">
           <button type="submit" className="flex items-center gap-2 bg-vibeesta-600 hover:bg-vibeesta-500 text-white px-8 py-3 rounded-lg text-sm font-semibold transition-colors">
              <Save className="w-4 h-4" /> Save Event
           </button>
        </div>
      </form>
    </div>
  )
}
