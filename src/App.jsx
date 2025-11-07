import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Filters from './components/Filters.jsx';
import MovieGrid from './components/MovieGrid.jsx';

export default function App() {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('Trending');
  const [activeYear, setActiveYear] = useState('All');

  // Centralized filter state passed to grid
  const filters = useMemo(() => ({ query, tag: activeTag, year: activeYear }), [query, activeTag, activeYear]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header query={query} onSearch={setQuery} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <Hero onPlay={() => alert('Playing trailer…')} />
        <Filters
          activeTag={activeTag}
          onTagChange={setActiveTag}
          activeYear={activeYear}
          onYearChange={setActiveYear}
        />
        <MovieGrid filters={filters} />
      </main>
    </div>
  );
}
