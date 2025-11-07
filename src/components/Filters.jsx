const TAGS = ['Trending', 'Popular', 'Top Rated', 'Upcoming'];

function classNames(...arr) {
  return arr.filter(Boolean).join(' ');
}

export default function Filters({ activeTag, onTagChange, activeYear, onYearChange }) {
  const years = ['All', '2025', '2024', '2023', '2022', '2021'];

  return (
    <section className="mt-10 flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        {TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagChange(tag)}
            className={classNames(
              'px-4 py-2 rounded-full text-sm border transition',
              activeTag === tag
                ? 'bg-rose-600 text-white border-rose-500'
                : 'bg-neutral-900/70 text-neutral-300 border-white/10 hover:border-white/20'
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 text-sm">
        <span className="text-neutral-400">Year</span>
        <div className="flex flex-wrap gap-2">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => onYearChange(y)}
              className={classNames(
                'px-3 py-1.5 rounded-md border transition',
                activeYear === y
                  ? 'bg-white text-black border-white'
                  : 'bg-neutral-900/70 text-neutral-300 border-white/10 hover:border-white/20'
              )}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
