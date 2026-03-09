import { Link } from 'react-router-dom';
import CompanyAvatar from '../common/CompanyAvatar';
import { tagClass } from '../../constants/jobTags';

const BrowseJobCard = ({ job }) => {
  const title    = job.title        ?? job.job_title        ?? 'Untitled Position';
  const company  = job.company      ?? job.company_name     ?? 'Unknown Company';
  const location = job.location     ?? job.city             ?? '—';
  const category = job.category     ?? job.department       ?? '';
  const jobType  = job.job_type     ?? job.type             ?? job.employment_type ?? '';
  const jobId    = job.id           ?? job._id;

  const tags = [jobType, category].filter(Boolean);

  return (
    <Link
      to={`/jobs/${jobId}`}
      className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-all duration-200 border border-transparent hover:border-[#4640DE]/20 cursor-pointer group no-underline"
    >
      <CompanyAvatar name={company} size="md" />

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
    </Link>
  );
};

export default BrowseJobCard;
