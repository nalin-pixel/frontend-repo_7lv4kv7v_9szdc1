import { Search, Film } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || (window?.location?.origin?.replace(':3000', ':8000')) || '';

export default function Header({ query, onSearch }) {
  const tmdbStatus = `${API_BASE}/test`;
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500">
            <Film className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold tracking-tight text-white">CineScope</span>
        </div>

        <div className="ml-auto w-full sm:w-96">
          <label className="relative block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              value={query}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-neutral-900/80 border border-white/10 rounded-xl pl-10 pr-4 h-10 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              placeholder="Search movies, shows, people…"
            />
          </label>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
          <a href="#" className="hover:text-white">Home</a>
          <a href="#" className="hover:text-white">Movies</a>
          <a href="#" className="hover:text-white">TV Shows</a>
          <a href="#" className="hover:text-white">My List</a>
        </nav>
      </div>
    </header>
  );
}
