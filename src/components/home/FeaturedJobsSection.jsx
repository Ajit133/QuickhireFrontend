const tagStyles = {
  Marketing: 'bg-[#FFF0E8] text-[#FF9500]',
  Design: 'bg-[#E8F9F3] text-[#56CDAD]',
  Business: 'bg-[#F0ECFF] text-[#7B61FF]',
  Technology: 'bg-[#FFEEEC] text-[#FF6550]',
};

/* ── Company logo placeholders as inline SVG ── */
const RevolutLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <rect width="40" height="40" rx="8" fill="#191C1F" />
    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial">R</text>
  </svg>
);

const DropboxLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <rect width="40" height="40" rx="8" fill="#F5F5F5" />
    <path d="M20 10L12 15.5L20 21L12 26.5L20 32L28 26.5L20 21L28 15.5L20 10Z" fill="#0061FF" />
    <path d="M12 26.5L20 21L28 26.5L20 32L12 26.5Z" fill="#0061FF" />
  </svg>
);

const PitchLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <circle cx="20" cy="20" r="20" fill="#1A1A1A" />
    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial">P</text>
  </svg>
);

const BlinkListLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <circle cx="20" cy="20" r="20" fill="#1A1A1A" />
    <circle cx="20" cy="20" r="8" fill="#4CAF72" />
  </svg>
);

const ClassPassLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <circle cx="20" cy="20" r="20" fill="#2B6CB0" />
    <path d="M25 20a5 5 0 1 1-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <circle cx="25" cy="15" r="2" fill="white" />
  </svg>
);

const CanvaLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <circle cx="20" cy="20" r="20" fill="#00C4CC" />
    <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Georgia">C</text>
  </svg>
);

const GoDaddyLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <rect width="40" height="40" rx="8" fill="#F5F5F5" />
    <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="#1A1A1A" fontSize="18" fontWeight="bold" fontFamily="Arial">G</text>
  </svg>
);

const TwitterLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <circle cx="20" cy="20" r="20" fill="#1DA1F2" />
    <path d="M30 14.5c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.2-.8.5-1.6.8-2.5 1a4 4 0 0 0-6.8 3.6A11.3 11.3 0 0 1 12 13.4a4 4 0 0 0 1.2 5.3c-.6 0-1.2-.2-1.8-.5v.1a4 4 0 0 0 3.2 3.9 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 10 26.5a11.3 11.3 0 0 0 6.1 1.8c7.3 0 11.3-6 11.3-11.3v-.5c.8-.6 1.4-1.3 2-2.1l-.4.1z" fill="white" />
  </svg>
);

const featuredJobs = [
  {
    id: 1,
    Logo: RevolutLogo,
    company: 'Revolut',
    title: 'Email Marketing',
    location: 'Madrid, Spain',
    type: 'Full Time',
    description: 'Revolut is looking for Email Marketing to help team ma ...',
    tags: ['Marketing', 'Design'],
  },
  {
    id: 2,
    Logo: DropboxLogo,
    company: 'Dropbox',
    title: 'Brand Designer',
    location: 'San Fransisco, US',
    type: 'Full Time',
    description: 'Dropbox is looking for Brand Designer to help the team t ...',
    tags: ['Design', 'Business'],
  },
  {
    id: 3,
    Logo: PitchLogo,
    company: 'Pitch',
    title: 'Email Marketing',
    location: 'Berlin, Germany',
    type: 'Full Time',
    description: 'Pitch is looking for Customer Manager to join marketing t ...',
    tags: ['Marketing'],
  },
  {
    id: 4,
    Logo: BlinkListLogo,
    company: 'Blinklist',
    title: 'Visual Designer',
    location: 'Granada, Spain',
    type: 'Full Time',
    description: 'Blinklist is looking for Visual Designer to help team desi ...',
    tags: ['Design'],
  },
  {
    id: 5,
    Logo: ClassPassLogo,
    company: 'ClassPass',
    title: 'Product Designer',
    location: 'Manchester, UK',
    type: 'Full Time',
    description: 'ClassPass is looking for Product Designer to help us...',
    tags: ['Marketing', 'Design'],
  },
  {
    id: 6,
    Logo: CanvaLogo,
    company: 'Canva',
    title: 'Lead Designer',
    location: 'Ontario, Canada',
    type: 'Full Time',
    description: 'Canva is looking for Lead Engineer to help develop n ...',
    tags: ['Design', 'Business'],
  },
  {
    id: 7,
    Logo: GoDaddyLogo,
    company: 'GoDaddy',
    title: 'Brand Strategist',
    location: 'Marseille, France',
    type: 'Full Time',
    description: 'GoDaddy is looking for Brand Strategist to join the team...',
    tags: ['Marketing'],
  },
  {
    id: 8,
    Logo: TwitterLogo,
    company: 'Twitter',
    title: 'Data Analyst',
    location: 'San Diego, US',
    type: 'Full Time',
    description: 'Twitter is looking for Data Analyst to help team desi ...',
    tags: ['Technology'],
  },
];

const JobCard = ({ job }) => {
  const { Logo, company, title, location, type, description, tags } = job;
  return (
    <div className="bg-white rounded-xl border border-[#D6DDEB] p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200 cursor-pointer">
      {/* Top row: logo + type badge */}
      <div className="flex items-start justify-between">
        <Logo />
        <span className="text-xs font-semibold text-[#4640DE] border border-[#4640DE] rounded px-3 py-1">
          {type}
        </span>
      </div>

      {/* Title & company / location */}
      <div>
        <h3 className="text-base font-semibold text-[#25324B]">{title}</h3>
        <p className="text-sm text-[#515B6F] mt-0.5">
          {company}
          <span className="mx-1.5 text-[#D6DDEB]">•</span>
          {location}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-[#7C8493] leading-relaxed line-clamp-2">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto pt-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs font-semibold px-3 py-1 rounded-full ${tagStyles[tag] ?? 'bg-gray-100 text-gray-600'}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const FeaturedJobsSection = () => {
  return (
    <section className="w-full bg-[#F8F8FD] py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-extrabold text-[#25324B]">
            Featured <span className="text-[#26A4FF]">jobs</span>
          </h2>
          <a
            href="#"
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
          </a>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
