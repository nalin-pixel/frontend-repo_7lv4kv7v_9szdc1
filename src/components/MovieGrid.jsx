import { useEffect, useMemo, useState } from 'react';
import { Star } from 'lucide-react';

const MOCK_MOVIES = [
  {
    id: 1,
    title: 'Starlight Odyssey',
    year: 2024,
    rating: 8.7,
    genres: ['Sci‑Fi', 'Adventure'],
    poster:
      'https://image.tmdb.org/t/p/w500/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg',
  },
  {
    id: 2,
    title: 'Neon City Nights',
    year: 2023,
    rating: 7.9,
    genres: ['Action', 'Thriller'],
    poster:
      'https://image.tmdb.org/t/p/w500/hpeXmRS1nvtlRlqEmNQJgPysKL0.jpg',
  },
  {
    id: 3,
    title: 'Echoes in the Deep',
    year: 2022,
    rating: 7.3,
    genres: ['Mystery', 'Drama'],
    poster:
      'https://image.tmdb.org/t/p/w500/2RSirqZG949GuRwN38MYCIGG4Od.jpg',
  },
  {
    id: 4,
    title: 'Crimson Horizon',
    year: 2025,
    rating: 8.2,
    genres: ['Drama'],
    poster:
      'https://image.tmdb.org/t/p/w500/9dYk2ePiRZQ1WZLxE3obVhtSGcV.jpg',
  },
  {
    id: 5,
    title: 'Quantum Heist',
    year: 2021,
    rating: 7.1,
    genres: ['Sci‑Fi', 'Crime'],
    poster:
      'https://image.tmdb.org/t/p/w500/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg',
  },
  {
    id: 6,
    title: 'Arcane Realms',
    year: 2024,
    rating: 8.0,
    genres: ['Fantasy'],
    poster:
      'https://image.tmdb.org/t/p/w500/3UVe8NL1E2ZdUZ9EDlKGJY5UzE.jpg',
  },
  {
    id: 7,
    title: 'Last Light',
    year: 2023,
    rating: 7.5,
    genres: ['Drama'],
    poster:
      'https://image.tmdb.org/t/p/w500/aE89gQ81gQzCqo56CPAJJ9qCEpK.jpg',
  },
  {
    id: 8,
    title: 'Solaris Drift',
    year: 2022,
    rating: 7.8,
    genres: ['Sci‑Fi'],
    poster:
      'https://image.tmdb.org/t/p/w500/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg',
  },
];

function MovieCard({ movie }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900/60">
      <img
        src={movie.poster}
        alt={movie.title}
        className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <div className="flex items-center gap-1 text-amber-400">
          <Star className="h-4 w-4 fill-amber-400" />
          <span className="text-xs font-medium">{movie.rating}</span>
          <span className="text-xs text-neutral-400">• {movie.year}</span>
        </div>
        <h3 className="mt-1 text-sm font-semibold leading-tight">{movie.title}</h3>
        <p className="text-xs text-neutral-400">{movie.genres.join(', ')}</p>
      </div>
    </div>
  );
}

export default function MovieGrid({ filters }) {
  const [movies, setMovies] = useState(MOCK_MOVIES);

  useEffect(() => {
    // In a real app, fetch from backend based on filters
    setMovies(MOCK_MOVIES);
  }, []);

  const filtered = useMemo(() => {
    return movies.filter((m) => {
      const matchQuery = filters.query
        ? m.title.toLowerCase().includes(filters.query.toLowerCase())
        : true;
      const matchYear = filters.year === 'All' ? true : String(m.year) === String(filters.year);
      // tag is UI only for mock data; you could map to different sorts
      return matchQuery && matchYear;
    });
  }, [movies, filters]);

  return (
    <section className="mt-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
