import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchJobs } from '../../redux/jobsSlice';

const TAG_STYLES = {
  'full-time':   'bg-[#E9F9F3] text-[#56CDAD] border border-[#56CDAD]',
  'part-time':   'bg-[#FFF5E5] text-[#FFB836] border border-[#FFB836]',
  'contract':    'bg-[#F0F0FF] text-[#4640DE] border border-[#4640DE]',
  'remote':      'bg-[#FFF0EE] text-[#FF6550] border border-[#FF6550]',
  'internship':  'bg-[#E8F9F9] text-[#26A4FF] border border-[#26A4FF]',
  'marketing':   'bg-[#FFF0E8] text-[#FF9500] border border-[#FF9500]',
  'design':      'bg-[#E8F9F3] text-[#56CDAD] border border-[#56CDAD]',
  'business':    'bg-[#F0ECFF] text-[#7B61FF] border border-[#7B61FF]',
  'technology':  'bg-[#FFEEEC] text-[#FF6550] border border-[#FF6550]',
};

const tagClass = (tag = '') =>
  TAG_STYLES[tag.toLowerCase()] ?? 'bg-[#F8F8FD] text-[#515B6F] border border-[#D6DDEB]';

const CompanyAvatar = ({ name = '' }) => {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
  const colours = ['#4640DE', '#56CDAD', '#FFB836', '#FF6550', '#26A4FF', '#00BFA5', '#1B3C87'];
  const bg = colours[(name.charCodeAt(0) ?? 0) % colours.length];
  return (
    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
      style={{ backgroundColor: bg }}
    >
      {initials || '?'}
    </div>
  );
};

const JobCard = ({ job }) => {
  const title       = job.title        ?? job.job_title        ?? 'Untitled Position';
  const company     = job.company      ?? job.company_name     ?? 'Unknown Company';
  const location    = job.location     ?? job.city             ?? '—';
  const jobType     = job.job_type     ?? job.type             ?? job.employment_type ?? '';
  const category    = job.category     ?? job.department       ?? '';
  const description = job.description  ?? job.summary          ?? '';
  const jobId       = job.id           ?? job._id;

  const tags = [jobType, category].filter(Boolean);

  return (
    <Link
      to={`/jobs/${jobId}`}
      className="bg-white rounded-xl border border-[#D6DDEB] p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200 no-underline"
    >
      {/* Top row: avatar + type badge */}
      <div className="flex items-start justify-between">
        <CompanyAvatar name={company} />
        {jobType && (
          <span className="text-xs font-semibold text-[#4640DE] border border-[#4640DE] rounded px-3 py-1">
            {jobType}
          </span>
        )}
      </div>

      {/* Title & company / location */}
      <div>
        <h3 className="text-base font-semibold text-[#25324B]">{title}</h3>
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

      {/* Description */}
      {description && (
        <p className="text-sm text-[#7C8493] leading-relaxed line-clamp-2">{description}</p>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto pt-1">
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
    </Link>
  );
};

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
              <JobCard key={job.id ?? job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
