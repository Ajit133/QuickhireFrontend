const ABOUT_LINKS = ['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy'];
const RESOURCE_LINKS = ['Help Docs', 'Guide', 'Updates', 'Contact Us'];

const SocialIcon = ({ children }) => (
  <a
    href="#"
    className="w-9 h-9 rounded-full border border-[#ffffff30] flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors duration-200"
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-[#202430] text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand column */}
        <div className="flex flex-col gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative w-9 h-9 rounded-full bg-[#4640DE] flex items-center justify-center shrink-0">
              <div className="w-4 h-4 rounded-full bg-white" />
              <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-orange-400 rounded-full border-2 border-[#202430]" />
            </div>
            <span className="text-xl font-bold tracking-tight">QuickHire</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">
            Great platform for the job seeker that passionate about startups. Find your dream job
            easier.
          </p>
        </div>

        {/* About column */}
        <div>
          <h4 className="font-semibold text-white mb-5">About</h4>
          <ul className="flex flex-col gap-3 list-none m-0 p-0">
            {ABOUT_LINKS.map((link) => (
              <li key={link}>
                <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors duration-200 no-underline">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources column */}
        <div>
          <h4 className="font-semibold text-white mb-5">Resources</h4>
          <ul className="flex flex-col gap-3 list-none m-0 p-0">
            {RESOURCE_LINKS.map((link) => (
              <li key={link}>
                <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors duration-200 no-underline">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter column */}
        <div>
          <h4 className="font-semibold text-white mb-3">Get job notifications</h4>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            The latest job news, articles, sent to your inbox weekly.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 min-w-0 px-4 py-2.5 rounded text-sm bg-white text-[#25324B] placeholder-gray-400 outline-none border border-transparent focus:border-[#4640DE]"
            />
            <button className="bg-[#4640DE] hover:bg-[#3730c5] text-white text-sm font-semibold px-4 py-2.5 rounded transition-colors duration-200 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#ffffff15]" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-400 text-sm">2021 @ QuickHire. All rights reserved.</p>
        <div className="flex items-center gap-3">
          {/* Facebook */}
          <SocialIcon>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </SocialIcon>
          {/* Instagram */}
          <SocialIcon>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
          </SocialIcon>
          {/* Globe / Website */}
          <SocialIcon>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
            </svg>
          </SocialIcon>
          {/* LinkedIn */}
          <SocialIcon>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </SocialIcon>
          {/* Twitter / X */}
          <SocialIcon>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </SocialIcon>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
