import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import patternBg from '../../assets/Pattern.png';
import { fetchJobs } from '../../store/jobsSlice';
import LatestJobCard from '../jobs/LatestJobCard';

const LatestJobsSection = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchJobs());
    }
  }, [dispatch, jobs.length]);

  const latestJobs = jobs.slice(0, 8);

  return (
    <section
      className="w-full py-16 px-6 lg:px-10"
      style={{
        backgroundImage: `url(${patternBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#F0EFFE',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-extrabold text-[#25324B]">
            Latest <span className="text-[#26A4FF]">jobs open</span>
          </h2>
          <Link
             to="/browse-jobs"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#4640DE] hover:underline"
          >
            Show all jobs
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
              <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* States */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm animate-pulse">
                <div className="w-11 h-11 rounded-xl bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="flex gap-2 mt-3">
                    <div className="h-5 bg-gray-200 rounded-full w-16" />
                    <div className="h-5 bg-gray-200 rounded-full w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <p className="text-center text-red-500 py-10">{error}</p>
        )}

        {!loading && !error && latestJobs.length === 0 && (
          <p className="text-center text-[#515B6F] py-10">No jobs available right now.</p>
        )}

        {!loading && !error && latestJobs.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {latestJobs.map((job) => (
                <LatestJobCard key={job.id ?? job._id} job={job} />
              ))}
            </div>
            <div className="flex sm:hidden justify-center mt-6">
              <Link
                to="/browse-jobs"
                className="flex items-center gap-2 text-sm font-semibold text-[#4640DE] hover:underline"
              >
                Show all jobs
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                  <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LatestJobsSection;
