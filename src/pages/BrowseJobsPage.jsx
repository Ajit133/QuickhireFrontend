import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../redux/jobsSlice';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

/* ─── Tag colour map ─── */
const TAG_STYLES = {
  'full-time':   'bg-[#E9F9F3] text-[#56CDAD] border border-[#56CDAD]',
  'part-time':   'bg-[#FFF5E5] text-[#FFB836] border border-[#FFB836]',
  'contract':    'bg-[#F0F0FF] text-[#4640DE] border border-[#4640DE]',
  'remote':      'bg-[#FFF0EE] text-[#FF6550] border border-[#FF6550]',
  'internship':  'bg-[#E8F9F9] text-[#26A4FF] border border-[#26A4FF]',
};

const tagClass = (tag = '') =>
  TAG_STYLES[tag.toLowerCase()] ?? 'bg-[#F8F8FD] text-[#515B6F] border border-[#D6DDEB]';

/* ─── Company initial avatar ─── */
const CompanyAvatar = ({ name = '' }) => {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  const colours = [
    '#4640DE', '#56CDAD', '#FFB836', '#FF6550', '#26A4FF', '#00BFA5', '#1B3C87',
  ];
  const bg = colours[(name.charCodeAt(0) ?? 0) % colours.length];

  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base shrink-0"
      style={{ backgroundColor: bg }}
    >
      {initials || '?'}
    </div>
  );
};

/* ─── Single Job Card ─── */
const JobCard = ({ job }) => {
  const title    = job.title        ?? job.job_title  ?? 'Untitled Position';
  const company  = job.company      ?? job.company_name ?? 'Unknown Company';
  const location = job.location     ?? job.city ?? '—';
  const category = job.category     ?? job.department ?? '';
  const jobType  = job.job_type     ?? job.type ?? job.employment_type ?? '';

  const tags = [jobType, category].filter(Boolean);

  return (
    <div className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-all duration-200 border border-transparent hover:border-[#4640DE]/20 cursor-pointer group">
      <CompanyAvatar name={company} />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#25324B] group-hover:text-[#4640DE] transition-colors duration-200 leading-snug">
              {title}
            </h3>
            <p className="text-sm text-[#515B6F] mt-0.5">
              {company}
              {location && (
                <>
                  <span className="mx-1.5 text-[#D6DDEB]">•</span>
                  {location}
                </>
              )}
            </p>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-semibold px-3 py-1 rounded-full ${tagClass(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Search + Filter bar ─── */
const FilterBar = ({ search, onSearch, category, onCategory, location, onLocation, categories, locations }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-[#D6DDEB] p-4 flex flex-col md:flex-row gap-3">

    {/* Search */}
    <div className="flex items-center gap-2 flex-1 border border-[#D6DDEB] rounded-xl px-4 py-2.5 focus-within:border-[#4640DE] transition-colors duration-200">
      <svg className="w-4 h-4 text-[#515B6F] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
      <input
        type="text"
        placeholder="Job title or company…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full text-sm text-[#25324B] placeholder-[#A8B0C0] outline-none bg-transparent"
      />
      {search && (
        <button onClick={() => onSearch('')} className="text-[#A8B0C0] hover:text-[#515B6F]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>

    {/* Category filter */}
    <div className="relative shrink-0 md:w-48">
      <select
        value={category}
        onChange={(e) => onCategory(e.target.value)}
        className="w-full appearance-none border border-[#D6DDEB] rounded-xl px-4 py-2.5 text-sm text-[#25324B] bg-white outline-none focus:border-[#4640DE] transition-colors duration-200 cursor-pointer pr-8"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#515B6F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    {/* Location filter */}
    <div className="relative shrink-0 md:w-48">
      <select
        value={location}
        onChange={(e) => onLocation(e.target.value)}
        className="w-full appearance-none border border-[#D6DDEB] rounded-xl px-4 py-2.5 text-sm text-[#25324B] bg-white outline-none focus:border-[#4640DE] transition-colors duration-200 cursor-pointer pr-8"
      >
        <option value="">All Locations</option>
        {locations.map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>
      <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#515B6F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

/* ─── Skeleton loader ─── */
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm animate-pulse">
    <div className="w-12 h-12 rounded-xl bg-[#E8E8F0] shrink-0" />
    <div className="flex-1 space-y-2.5">
      <div className="h-4 bg-[#E8E8F0] rounded w-1/2" />
      <div className="h-3 bg-[#E8E8F0] rounded w-1/3" />
      <div className="flex gap-2 mt-3">
        <div className="h-6 bg-[#E8E8F0] rounded-full w-16" />
        <div className="h-6 bg-[#E8E8F0] rounded-full w-16" />
      </div>
    </div>
  </div>
);

/* ─── Main Page ─── */
const BrowseJobsPage = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((s) => s.jobs);

  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  /* Derive unique filter options from the data */
  const { categories, locations } = useMemo(() => {
    const cats = new Set();
    const locs = new Set();
    jobs.forEach((j) => {
      const c = j.category ?? j.department;
      const l = j.location ?? j.city;
      if (c) cats.add(c);
      if (l) locs.add(l);
    });
    return {
      categories: [...cats].sort(),
      locations:  [...locs].sort(),
    };
  }, [jobs]);

  /* Filter logic */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return jobs.filter((j) => {
      const title   = (j.title ?? j.job_title ?? '').toLowerCase();
      const company = (j.company ?? j.company_name ?? '').toLowerCase();
      const cat     = j.category ?? j.department ?? '';
      const loc     = j.location ?? j.city ?? '';

      const matchSearch   = !q || title.includes(q) || company.includes(q);
      const matchCategory = !category || cat === category;
      const matchLocation = !location || loc === location;

      return matchSearch && matchCategory && matchLocation;
    });
  }, [jobs, search, category, location]);

  const hasFilters = search || category || location;
  const clearFilters = () => { setSearch(''); setCategory(''); setLocation(''); };

  return (
    <div className="min-h-screen bg-[#F8F8FD] font-sans flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ── Page hero ── */}
        <section className="bg-white border-b border-[#D6DDEB]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
            <h1 className="text-3xl font-bold text-[#25324B]">
              Browse <span className="text-[#4640DE]">Job Listings</span>
            </h1>
            <p className="text-[#515B6F] mt-1.5 text-sm">
              {loading
                ? 'Loading jobs…'
                : `Showing ${filtered.length} of ${jobs.length} job${jobs.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </section>

        {/* ── Filter bar ── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-6">
          <FilterBar
            search={search}         onSearch={setSearch}
            category={category}     onCategory={setCategory}
            location={location}     onLocation={setLocation}
            categories={categories}
            locations={locations}
          />

          {/* Active filter chips */}
          {hasFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-xs text-[#515B6F]">Active filters:</span>
              {search && (
                <span className="inline-flex items-center gap-1 text-xs bg-[#4640DE]/10 text-[#4640DE] px-3 py-1 rounded-full font-medium">
                  "{search}"
                  <button onClick={() => setSearch('')} className="ml-0.5 hover:opacity-70">×</button>
                </span>
              )}
              {category && (
                <span className="inline-flex items-center gap-1 text-xs bg-[#4640DE]/10 text-[#4640DE] px-3 py-1 rounded-full font-medium">
                  {category}
                  <button onClick={() => setCategory('')} className="ml-0.5 hover:opacity-70">×</button>
                </span>
              )}
              {location && (
                <span className="inline-flex items-center gap-1 text-xs bg-[#4640DE]/10 text-[#4640DE] px-3 py-1 rounded-full font-medium">
                  {location}
                  <button onClick={() => setLocation('')} className="ml-0.5 hover:opacity-70">×</button>
                </span>
              )}
              <button onClick={clearFilters} className="text-xs text-[#515B6F] underline hover:text-[#4640DE] transition-colors duration-200">
                Clear all
              </button>
            </div>
          )}
        </section>

        {/* ── Job grid ── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-6 pb-16">
          {/* Loading skeletons */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="text-center py-24">
              <p className="text-[#FF6550] font-semibold text-lg">Failed to load jobs</p>
              <p className="text-[#515B6F] text-sm mt-1">{error}</p>
              <button
                onClick={() => dispatch(fetchJobs())}
                className="mt-6 px-6 py-2.5 rounded-xl bg-[#4640DE] text-white text-sm font-semibold hover:bg-[#3730c4] transition-colors duration-200"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-24">
              <svg className="mx-auto w-16 h-16 text-[#D6DDEB]" fill="none" viewBox="0 0 64 64" stroke="currentColor" strokeWidth={1.5}>
                <circle cx="32" cy="32" r="28" />
                <path strokeLinecap="round" d="M22 32h20M32 22v20" />
              </svg>
              <p className="mt-4 text-[#25324B] font-semibold text-lg">No jobs found</p>
              <p className="text-[#515B6F] text-sm mt-1">Try adjusting your search or filters</p>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-6 px-6 py-2.5 rounded-xl border border-[#4640DE] text-[#4640DE] text-sm font-semibold hover:bg-[#4640DE] hover:text-white transition-colors duration-200"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {/* Job cards */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((job) => (
                <JobCard key={job.id ?? job._id ?? Math.random()} job={job} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BrowseJobsPage;
