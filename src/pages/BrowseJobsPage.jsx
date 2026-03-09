import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../store/jobsSlice';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BrowseJobCard from '../components/jobs/BrowseJobCard';
import JobFilterBar from '../components/jobs/JobFilterBar';
import JobSkeletonCard from '../components/jobs/JobSkeletonCard';

/* ─── Main Page ─── */
const BrowseJobsPage = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error, searchKeyword, searchLocation } = useSelector((s) => s.jobs);

  const [search,   setSearch]   = useState(searchKeyword);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState(searchLocation);

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
          <JobFilterBar
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
              {Array.from({ length: 6 }).map((_, i) => <JobSkeletonCard key={i} />)}
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
                <BrowseJobCard key={job.id ?? job._id ?? Math.random()} job={job} />
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
