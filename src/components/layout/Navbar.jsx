import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import Button from '../common/Button';

const Navbar = () => {
  return (
    <header className="w-full bg-[#F8F8FD]">
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        {/* Left: Logo + Nav links */}
        <div className="flex items-center gap-10">
          <Logo />
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

        {/* Right: Auth buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="px-4 py-2.5 text-sm rounded">
            Login
          </Button>
          <Button variant="primary" className="px-5 py-2.5 text-sm rounded">
            Sign Up
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
