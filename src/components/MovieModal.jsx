import { useEffect, useState } from 'react';
import { X, Star, Clock, Calendar } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || (window?.location?.origin?.replace(':3000', ':8000')) || '';

export default function MovieModal({ movieId, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!movieId) return;
    let ignore = false;
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`${API_BASE}/api/tmdb/movie/${movieId}`, { signal: controller.signal });
        if (!res.ok) throw new Error(await res.text());
        const json = await res.json();
        if (!ignore) setData(json);
      } catch (e) {
        if (!ignore && e.name !== 'AbortError') setError('Failed to load movie details.');
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [movieId]);

  if (!movieId) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full sm:max-w-3xl sm:rounded-2xl bg-neutral-950 border border-white/10 sm:overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/80"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {loading ? (
          <div className="p-6 sm:p-8">
            <div className="h-56 w-full rounded-xl bg-neutral-900 animate-pulse" />
            <div className="mt-4 h-6 w-2/3 rounded bg-neutral-900 animate-pulse" />
            <div className="mt-2 h-4 w-full rounded bg-neutral-900 animate-pulse" />
            <div className="mt-2 h-4 w-5/6 rounded bg-neutral-900 animate-pulse" />
          </div>
        ) : error ? (
          <div className="p-6 text-sm text-rose-300">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-[200px,1fr] gap-6 p-6 sm:p-8">
            <img
              src={data.poster || data.poster_path || ''}
              alt={data.title}
              className="w-full sm:w-[200px] aspect-[2/3] object-cover rounded-xl border border-white/10"
            />
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold">{data.title}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-neutral-300">
                <span className="inline-flex items-center gap-1 text-amber-400"><Star className="h-4 w-4 fill-amber-400" />{Number(data.rating || data.vote_average || 0).toFixed(1)}</span>
                {data.release_date ? (
                  <span className="inline-flex items-center gap-1 text-neutral-400"><Calendar className="h-4 w-4" />{data.release_date}</span>
                ) : null}
                {data.runtime ? (
                  <span className="inline-flex items-center gap-1 text-neutral-400"><Clock className="h-4 w-4" />{data.runtime} min</span>
                ) : null}
              </div>
              {data.genres?.length ? (
                <div className="mt-3 text-sm text-neutral-300">{Array.isArray(data.genres) ? data.genres.map(g => g.name ?? g).join(', ') : data.genres}</div>
              ) : null}
              {data.overview ? (
                <p className="mt-4 text-sm text-neutral-300 leading-relaxed">{data.overview}</p>
              ) : null}
              {data.homepage ? (
                <a href={data.homepage} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm text-white underline underline-offset-4">Official site</a>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
