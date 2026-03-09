import { Link } from 'react-router-dom';
import CompanyAvatar from '../common/CompanyAvatar';
import { tagClass } from '../../constants/jobTags';

const FeaturedJobCard = ({ job }) => {
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
        <CompanyAvatar name={company} size="sm" />
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

export default FeaturedJobCard;
