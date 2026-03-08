import dashboardImg from '../../assets/3.1 Dashboard Company.png';

const PostJobBannerSection = () => {
  return (
    <section className="w-full bg-[#F8F8FD] py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Card: white background, rounded corners, shadow */}
        <div className="relative rounded-2xl overflow-hidden shadow-md bg-white flex flex-col lg:flex-row items-stretch min-h-[300px]">

          {/* Left: purple parallelogram via clip-path */}
          <div
            className="relative z-10 flex items-center px-12 py-14 lg:py-16"
            style={{
              background: '#4640DE',
              clipPath: 'polygon(0 0, 100% 0, 82% 100%, 0 100%)',
              flex: '0 0 46%',
            }}
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Start posting<br />jobs today
              </h2>
              <p className="mt-5 text-white/80 text-base">
                Start posting jobs for only $10.
              </p>
              <button className="mt-8 px-8 py-3 border-2 border-white text-white font-semibold text-sm rounded-md hover:bg-white hover:text-[#4640DE] transition-colors duration-200">
                Sign Up For Free
              </button>
            </div>
          </div>

          {/* Right: dashboard screenshot on white */}
          <div className="flex-1 relative flex items-end justify-center overflow-hidden px-4 pt-6 lg:pt-0">
            <img
              src={dashboardImg}
              alt="QuickHire employer dashboard"
              className="w-full max-w-[640px] object-contain object-bottom drop-shadow-xl"
              style={{ marginBottom: '-1px' }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default PostJobBannerSection;
