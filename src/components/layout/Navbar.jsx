import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import Button from '../common/Button';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#F8F8FD]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 flex items-center justify-between">
        {/* Left: Logo + Nav links */}
        <div className="flex items-center gap-10">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <Logo />
          </Link>
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            <li>
              <a href="#" className="text-[#515B6F] font-medium hover:text-[#4640DE] transition-colors duration-200 no-underline">
                Find Jobs
              </a>
            </li>
            <li>
              <Link to="/browse-jobs" className="text-[#515B6F] font-medium hover:text-[#4640DE] transition-colors duration-200 no-underline">
                Browse Jobs
              </Link>
            </li>
          </ul>
        </div>

        {/* Right: Auth buttons (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="px-4 py-2.5 text-sm rounded">
              Login
            </Button>
            <Button variant="primary" className="px-5 py-2.5 text-sm rounded">
              Sign Up
            </Button>
          </div>

          {/* Hamburger button — mobile only */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-[#D6DDEB] bg-white text-[#25324B] hover:bg-[#F0F0FA] transition-colors"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              /* X icon */
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#F8F8FD] border-t border-[#D6DDEB] px-4 pb-5 flex flex-col gap-3">
          <a href="#" className="py-2 text-[#515B6F] font-medium hover:text-[#4640DE] transition-colors duration-200">
            Find Jobs
          </a>
          <Link to="/browse-jobs" className="py-2 text-[#515B6F] font-medium hover:text-[#4640DE] transition-colors duration-200 no-underline" onClick={() => setMenuOpen(false)}>
            Browse Jobs
          </Link>
          <div className="flex flex-col gap-2 pt-2 border-t border-[#D6DDEB]">
            <Button variant="ghost" className="w-full px-4 py-2.5 text-sm rounded">
              Login
            </Button>
            <Button variant="primary" className="w-full px-5 py-2.5 text-sm rounded">
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
