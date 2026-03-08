import SearchBar from './SearchBar';
import patternImg from '../../assets/Pattern.png';
import picImg from '../../assets/Pic.png';

const POPULAR_SEARCHES = ['UI Designer', 'UX Researcher', 'Android', 'Admin'];

/* Decorative wavy underline SVG rendered beneath the blue heading */
const WavyUnderline = () => (
  <svg
    viewBox="0 0 320 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full max-w-[320px] mt-1"
    preserveAspectRatio="none"
  >
    <path
      d="M0 9 C40 2, 80 12, 120 6 C160 0, 200 10, 240 5 C270 2, 300 8, 320 4"
      stroke="#26A4FF"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </svg>
);

const HeroSection = () => {
  const handleSearch = ({ keyword, location }) => {
    // TODO: dispatch Redux action or navigate with search params
    console.log('Search submitted:', { keyword, location });
  };

  return (
    <section className="relative bg-[#F8F8FD] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
        {/* ── Left: copy + search ── */}
        <div className="flex-1 max-w-xl z-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#25324B] leading-snug">
            Discover more than
            <span className="block text-[#26A4FF]">
              5000+ Jobs
              <WavyUnderline />
            </span>
          </h1>

          <p className="mt-5 text-[#515B6F] text-base leading-relaxed max-w-md">
            Great platform for the job seeker that searching for new career heights and passionate about startups.
          </p>

          <div className="mt-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          <p className="mt-4 text-sm text-[#515B6F]">
            <span className="font-semibold text-[#25324B]">Popular&nbsp;:&nbsp;</span>
            {POPULAR_SEARCHES.map((term, index) => (
              <span key={term}>
                <a
                  href="#"
                  className="hover:text-[#4640DE] transition-colors duration-150"
                >
                  {term}
                </a>
                {index < POPULAR_SEARCHES.length - 1 && ',\u00A0'}
              </span>
            ))}
          </p>
        </div>

        {/* ── Right: hero image + decorative pattern ── */}
        <div className="flex-1 relative flex justify-end items-end overflow-hidden min-h-90 lg:min-h-130">
          {/* Background geometric pattern */}
          <img
            src={patternImg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
          />
          {/* Person image — pinned to bottom-right, slightly clipped at bottom like the design */}
          <img
            src={picImg}
            alt="Smiling job seeker"
            className="relative z-10 h-full max-h-130 w-auto object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
