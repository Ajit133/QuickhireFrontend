import { Link } from 'react-router-dom';
import CompanyAvatar from '../common/CompanyAvatar';
import { tagClass } from '../../constants/jobTags';

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
      <CompanyAvatar name={company} size="md" />

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

export default LatestJobCard;
