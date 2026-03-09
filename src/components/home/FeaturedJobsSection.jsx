import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchJobs } from '../../store/jobsSlice';
import FeaturedJobCard from '../jobs/FeaturedJobCard';

const FeaturedJobsSection = () => {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (jobs.length === 0) dispatch(fetchJobs());
  }, [dispatch, jobs.length]);

  const featuredJobs = jobs.slice(0, 8);

  return (
    <section className="w-full bg-[#F8F8FD] py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-extrabold text-[#25324B]">
            Featured <span className="text-[#26A4FF]">jobs</span>
          </h2>
          <Link
            to="/browse-jobs"
            className="flex items-center gap-2 text-sm font-semibold text-[#4640DE] hover:underline"
          >
            Show all jobs
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
            >
              <path
                d="M4 10h12M11 5l5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Loading skeleton */}
        {loading && featuredJobs.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#D6DDEB] p-6 flex flex-col gap-4 animate-pulse">
                <div className="w-10 h-10 rounded-lg bg-gray-200" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
                <div className="h-3 bg-gray-100 rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Job Cards Grid */}
        {!loading && featuredJobs.length === 0 ? (
          <p className="text-center text-[#515B6F] py-12">No featured jobs available right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredJobs.map((job) => (
              <FeaturedJobCard key={job.id ?? job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
