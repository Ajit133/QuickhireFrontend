import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import patternBg from '../../assets/Pattern.png';
import { fetchJobs } from '../../redux/jobsSlice';

const TAG_STYLES = {
  'full-time':   'bg-[#E9F9F3] text-[#56CDAD] border border-[#56CDAD]',
  'part-time':   'bg-[#FFF5E5] text-[#FFB836] border border-[#FFB836]',
  'contract':    'bg-[#F0F0FF] text-[#4640DE] border border-[#4640DE]',
  'remote':      'bg-[#FFF0EE] text-[#FF6550] border border-[#FF6550]',
  'internship':  'bg-[#E8F9F9] text-[#26A4FF] border border-[#26A4FF]',
};

const tagClass = (tag = '') =>
  TAG_STYLES[tag.toLowerCase()] ?? 'bg-[#F8F8FD] text-[#515B6F] border border-[#D6DDEB]';

const AVATAR_COLOURS = [
  '#4640DE', '#56CDAD', '#FFB836', '#FF6550', '#26A4FF', '#00BFA5', '#1B3C87',
];

const CompanyAvatar = ({ name = '' }) => {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
  const bg = AVATAR_COLOURS[(name.charCodeAt(0) ?? 0) % AVATAR_COLOURS.length];
  return (
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
      style={{ backgroundColor: bg }}
    >
      {initials || '?'}
    </div>
  );
};

const LatestJobCard = ({ job }) => {
  const title    = job.title    ?? job.job_title         ?? 'Untitled Position';
  const company  = job.company  ?? job.company_name      ?? 'Unknown Company';
  const location = job.location ?? job.city              ?? '—';
  const jobType  = job.job_type ?? job.type ?? job.employment_type ?? '';
  const category = job.category ?? job.department        ?? '';
  const jobId    = job.id       ?? job._id;
  const tags     = [jobType, category].filter(Boolean);

  return (
    <Link
      to={`/jobs/${jobId}`}
      className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer no-underline group"
    >
      <CompanyAvatar name={company} />

      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold text-[#25324B] truncate group-hover:text-[#4640DE] transition-colors duration-200">
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
    </Link>
  );
};

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
            to="/browse"
            className="flex items-center gap-2 text-sm font-semibold text-[#4640DE] hover:underline"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {latestJobs.map((job) => (
              <LatestJobCard key={job.id ?? job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestJobsSection;
