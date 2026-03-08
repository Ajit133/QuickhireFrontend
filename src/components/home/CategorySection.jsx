const categories = [
  {
    name: 'Design',
    jobs: 235,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <path d="M28 12L16 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M12 28l4-8 8-4-4 8-8 4z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M24 8l8 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="12" cy="28" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Sales',
    jobs: 756,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <rect x="8" y="24" width="5" height="8" rx="1" stroke="currentColor" strokeWidth="2.2" />
        <rect x="17" y="18" width="5" height="14" rx="1" stroke="currentColor" strokeWidth="2.2" />
        <rect x="26" y="10" width="5" height="22" rx="1" stroke="currentColor" strokeWidth="2.2" />
        <path d="M10 18l6-5 6 4 7-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Marketing',
    jobs: 140,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <path d="M28 10c0 0-10 4-16 8v6c6 4 16 8 16 8V10z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M12 18h-3a2 2 0 000 4h3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M12 26l2 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Finance',
    jobs: 325,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <rect x="8" y="14" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="2.2" />
        <path d="M8 20h24" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="15" cy="26" r="1.5" fill="currentColor" />
        <circle cx="21" cy="26" r="1.5" fill="currentColor" />
        <path d="M14 14v-3a6 6 0 0112 0v3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Technology',
    jobs: 436,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <rect x="6" y="8" width="28" height="18" rx="2" stroke="currentColor" strokeWidth="2.2" />
        <path d="M14 34h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M20 26v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Engineering',
    jobs: 542,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <path d="M13 14l-5 6 5 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27 14l5 6-5 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 11l-4 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Business',
    jobs: 211,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <rect x="8" y="18" width="24" height="14" rx="2" stroke="currentColor" strokeWidth="2.2" />
        <path d="M14 18v-4a6 6 0 0112 0v4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M8 24h24" stroke="currentColor" strokeWidth="2.2" />
        <path d="M17 24v3M23 24v3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Human Resource',
    jobs: 346,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <circle cx="20" cy="14" r="4" stroke="currentColor" strokeWidth="2.2" />
        <path d="M10 32c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="9" cy="17" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 31c0-3.866 2.239-7 5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="31" cy="17" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M36 31c0-3.866-2.239-7-5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

const CategorySection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#25324B]">
          Explore by{' '}
          <span className="text-[#26A4FF]">category</span>
        </h2>
        <a
          href="#"
          className="flex items-center gap-2 text-[#4640DE] font-semibold text-sm hover:underline"
        >
          Show all jobs
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
            <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={`group flex flex-col gap-4 p-6 border rounded-sm text-left transition-colors duration-200
              ${cat.name === 'Marketing'
                ? 'bg-[#4640DE] border-[#4640DE] text-white'
                : 'bg-white border-[#D6DDEB] text-[#25324B] hover:bg-[#4640DE] hover:border-[#4640DE] hover:text-white'
              }`}
          >
            <span
              className={`transition-colors duration-200
                ${cat.name === 'Marketing'
                  ? 'text-white'
                  : 'text-[#4640DE] group-hover:text-white'
                }`}
            >
              {cat.icon}
            </span>

            <div>
              <p className="font-bold text-lg leading-tight">{cat.name}</p>
              <p
                className={`text-sm mt-1 flex items-center gap-1 transition-colors duration-200
                  ${cat.name === 'Marketing'
                    ? 'text-white/80'
                    : 'text-[#515B6F] group-hover:text-white/80'
                  }`}
              >
                {cat.jobs} jobs available
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
