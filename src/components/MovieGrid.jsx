import { useEffect, useMemo, useState } from 'react';
import { Star } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || (window?.location?.origin?.replace(':3000', ':8000')) || '';

function MovieCard({ movie, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900/60 text-left focus:outline-none focus:ring-2 focus:ring-rose-500/50"
    >
      {movie.poster ? (
        <img
          src={movie.poster}
          alt={movie.title}
          className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="aspect-[2/3] w-full bg-neutral-800" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <div className="flex items-center gap-1 text-amber-400">
          <Star className="h-4 w-4 fill-amber-400" />
          <span className="text-xs font-medium">{Number(movie.rating || 0).toFixed(1)}</span>
          {movie.year ? <span className="text-xs text-neutral-400">• {movie.year}</span> : null}
        </div>
        <h3 className="mt-1 text-sm font-semibold leading-tight line-clamp-2">{movie.title}</h3>
        {movie.genres?.length ? (
          <p className="text-xs text-neutral-400">{Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres}</p>
        ) : null}
      </div>
    </button>
  );
}

export default function MovieGrid({ filters, onSelect }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError('');
        const url = filters.query
          ? `${API_BASE}/api/tmdb/search?query=${encodeURIComponent(filters.query)}`
          : `${API_BASE}/api/tmdb/trending?media_type=movie&time_window=day`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || `Request failed: ${res.status}`);
        }
        const data = await res.json();
        if (!ignore) {
          setMovies(data.results || []);
        }
      } catch (e) {
        if (!ignore && e.name !== 'AbortError') {
          setError('Unable to load movies right now.');
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [filters.query]);

  const filtered = useMemo(() => {
    return movies.filter((m) => {
      const matchYear = filters.year === 'All' ? true : String(m.year) === String(filters.year);
      return matchYear;
    });
  }, [movies, filters.year]);

  if (error) {
    return (
      <section className="mt-8">
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] w-full rounded-xl bg-neutral-900/60 border border-white/10 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((movie) => (
            <MovieCard key={`${movie.media_type || 'movie'}-${movie.id}`} movie={movie} onClick={() => onSelect?.(movie.id)} />
          ))}
        </div>
      )}
    </section>
  );
}
