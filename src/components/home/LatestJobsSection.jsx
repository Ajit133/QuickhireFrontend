import patternBg from '../../assets/Pattern.png';

const tagStyles = {
  'Full-Time': 'bg-[#E9F9F3] text-[#56CDAD] border border-[#56CDAD]',
  Marketing: 'bg-transparent text-[#FFB836] border border-[#FFB836]',
  Design: 'bg-transparent text-[#4640DE] border border-[#4640DE]',
};

/* ── Company logo SVGs ── */
const NomadLogo = () => (
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 h-11">
    <rect width="44" height="44" rx="10" fill="#56CDAD" />
    <polygon points="22,10 35,17 35,31 22,38 9,31 9,17" fill="none" stroke="white" strokeWidth="2.5" />
    <polygon points="22,16 30,20.5 30,29.5 22,34 14,29.5 14,20.5" fill="white" />
  </svg>
);

const NetlifyLogo = () => (
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 h-11">
    <rect width="44" height="44" rx="10" fill="#F0F0FF" />
    <path d="M14 22l8-8 8 8-8 8-8-8z" fill="none" stroke="#4640DE" strokeWidth="2" />
    <path d="M22 14l4 4-4 4-4-4 4-4z" fill="#4640DE" />
    <path d="M22 26l4 4-4 4-4-4 4-4z" fill="#56CDAD" />
    <path d="M14 22l4-4 4 4-4 4-4-4z" fill="#FFB836" />
    <path d="M26 22l4-4 4 4-4 4-4-4z" fill="#FF6550" />
  </svg>
);

const DropboxLogo2 = () => (
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 h-11">
    <rect width="44" height="44" rx="10" fill="#F5F5F5" />
    <path d="M22 12L14 17.5L22 23L14 28.5L22 34L30 28.5L22 23L30 17.5L22 12Z" fill="#0061FF" />
  </svg>
);

const MazeLogo = () => (
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 h-11">
    <circle cx="22" cy="22" r="22" fill="#00BFA5" />
    <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial">Mz</text>
  </svg>
);

const TerraformLogo = () => (
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 h-11">
    <rect width="44" height="44" rx="10" fill="#E8F9F9" />
    <path d="M14 16l7 4v8l-7-4v-8z" fill="#5C4EE5" />
    <path d="M22 12l7 4v8l-7-4v-8z" fill="#4040CC" />
    <path d="M22 24l7 4v-8l-7 4z" fill="#7B61FF" />
  </svg>
);

const UdacityLogo = () => (
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 h-11">
    <circle cx="22" cy="22" r="22" fill="#1B3C87" />
    <path d="M16 17v7a6 6 0 0 0 12 0v-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

const PackerLogo = () => (
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 h-11">
    <rect width="44" height="44" rx="10" fill="#FF6550" />
    <rect x="13" y="13" width="8" height="18" rx="2" fill="white" />
    <rect x="23" y="13" width="8" height="10" rx="2" fill="white" opacity="0.6" />
  </svg>
);

const WebflowLogo = () => (
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 h-11">
    <rect width="44" height="44" rx="10" fill="#4353FF" />
    <text x="50%" y="57%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="Arial">W</text>
  </svg>
);

const latestJobs = [
  {
    id: 1,
    Logo: NomadLogo,
    company: 'Nomad',
    title: 'Social Media Assistant',
    location: 'Paris, France',
    tags: ['Full-Time', 'Marketing', 'Design'],
  },
  {
    id: 2,
    Logo: NetlifyLogo,
    company: 'Netlify',
    title: 'Social Media Assistant',
    location: 'Paris, France',
    tags: ['Full-Time', 'Marketing', 'Design'],
  },
  {
    id: 3,
    Logo: DropboxLogo2,
    company: 'Dropbox',
    title: 'Brand Designer',
    location: 'San Fransisco, USA',
    tags: ['Full-Time', 'Marketing', 'Design'],
  },
  {
    id: 4,
    Logo: MazeLogo,
    company: 'Maze',
    title: 'Brand Designer',
    location: 'San Fransisco, USA',
    tags: ['Full-Time', 'Marketing', 'Design'],
  },
  {
    id: 5,
    Logo: TerraformLogo,
    company: 'Terraform',
    title: 'Interactive Developer',
    location: 'Hamburg, Germany',
    tags: ['Full-Time', 'Marketing', 'Design'],
  },
  {
    id: 6,
    Logo: UdacityLogo,
    company: 'Udacity',
    title: 'Interactive Developer',
    location: 'Hamburg, Germany',
    tags: ['Full-Time', 'Marketing', 'Design'],
  },
  {
    id: 7,
    Logo: PackerLogo,
    company: 'Packer',
    title: 'HR Manager',
    location: 'Lucern, Switzerland',
    tags: ['Full-Time', 'Marketing', 'Design'],
  },
  {
    id: 8,
    Logo: WebflowLogo,
    company: 'Webflow',
    title: 'HR Manager',
    location: 'Lucern, Switzerland',
    tags: ['Full-Time', 'Marketing', 'Design'],
  },
];

const LatestJobCard = ({ job }) => {
  const { Logo, company, title, location, tags } = job;
  return (
    <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Logo />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold text-[#25324B] truncate">{title}</h3>
        <p className="text-sm text-[#515B6F] mt-0.5">
          {company}
          <span className="mx-1.5 text-[#D6DDEB]">•</span>
          {location}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
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
    </div>
  );
};

const LatestJobsSection = () => {
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

        {/* Job Cards Grid — 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {latestJobs.map((job) => (
            <LatestJobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestJobsSection;
