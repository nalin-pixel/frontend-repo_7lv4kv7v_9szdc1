import { Star, Play } from 'lucide-react';

const bg =
  'https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=2062&auto=format&fit=crop';

export default function Hero({ onPlay }) {
  return (
    <section className="relative mt-6 overflow-hidden rounded-2xl border border-white/10">
      <img
        src={bg}
        alt="Featured background"
        className="h-[360px] w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end gap-4">
        <div className="flex items-center gap-2 text-amber-400">
          <Star className="h-4 w-4 fill-amber-400" />
          <span className="text-xs font-medium">Editor’s Pick</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
          Into the Cosmic Abyss
        </h1>
        <p className="text-sm text-neutral-300 max-w-2xl">
          A deep-space crew investigates a mysterious signal from beyond the known
          universe and uncovers a secret that could change humanity forever.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={onPlay}
            className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 text-sm font-medium hover:bg-neutral-200 transition"
          >
            <Play className="h-4 w-4" />
            Watch trailer
          </button>
          <span className="text-xs text-neutral-400">PG-13 • 2h 6m • Sci‑Fi</span>
        </div>
      </div>
    </section>
  );
}
