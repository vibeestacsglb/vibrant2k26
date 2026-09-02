import { Plus, Trash2, Image as ImageIcon, Search, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getGallery, addRandomImage, deleteImage } from "./actions"

export default async function AdminGalleryPage({ searchParams }: { searchParams: { filter?: string, success?: string } }) {
  const gallery = await getGallery();

  const currentFilter = searchParams.filter || "All";
  
  const filteredGallery = currentFilter === "All" 
    ? gallery 
    : gallery.filter((img: any) => img.category.toLowerCase() === currentFilter.toLowerCase());

  const categories = ['All', 'Hackathon', 'Performances', 'Crowd'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="p-2 bg-ink-900 border border-ink-800 rounded-lg text-ink-300 hover:text-ink-0 hover:bg-ink-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-2xl font-display font-bold">Gallery</h2>
            <p className="text-ink-400 text-sm mt-1">Manage images displayed in the public gallery.</p>
          </div>
        </div>
        
        <form action={addRandomImage.bind(null, currentFilter === "All" ? "Crowd" : currentFilter)}>
          <button type="submit" className="flex items-center gap-2 bg-vibeesta-500 hover:bg-vibeesta-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-fit">
            <Plus className="w-4 h-4" />
            Upload Random Image
          </button>
        </form>
      </div>

      {searchParams.success && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-lg flex items-center justify-between">
           <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              <p className="text-sm font-medium">Action completed successfully.</p>
           </div>
           <Link href={`/admin/gallery${currentFilter !== "All" ? `?filter=${currentFilter}` : ""}`} className="text-green-400 hover:text-green-300 px-2 py-1">
             Dismiss
           </Link>
        </div>
      )}

      <div className="bg-[#0B0A10] border border-ink-800 rounded-xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-ink-800 flex flex-col sm:flex-row gap-4 justify-between bg-ink-900/20">
           <div className="flex gap-2">
              {categories.map((cat, i) => {
                 const isActive = currentFilter === cat;
                 return (
                   <Link 
                     key={i} 
                     href={`/admin/gallery${cat === 'All' ? '' : `?filter=${cat}`}`}
                     className={`px-4 py-1.5 rounded-full text-xs font-medium border ${isActive ? 'bg-vibeesta-500/10 text-vibeesta-400 border-vibeesta-500/20' : 'bg-ink-900 text-ink-300 border-ink-800 hover:bg-ink-800'}`}
                   >
                      {cat}
                   </Link>
                 )
              })}
           </div>
        </div>

        <div className="p-6">
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredGallery.map((img: any) => (
                 <div key={img.id} className="group relative aspect-square rounded-lg overflow-hidden bg-ink-900 border border-ink-800">
                    <img src={img.src} alt={img.alt} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                       <form action={deleteImage.bind(null, img.id)}>
                         <button type="submit" className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors">
                            <Trash2 className="w-4 h-4" />
                         </button>
                       </form>
                    </div>
                 </div>
              ))}
              
              {filteredGallery.length === 0 && (
                <div className="col-span-full py-12 text-center text-ink-500">
                  No images found for this category.
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  )
}
