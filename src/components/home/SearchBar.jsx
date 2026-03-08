import { useState } from 'react';
import Button from '../common/Button';

const LOCATIONS = [
  'Florence, Italy',
  'New York, USA',
  'London, UK',
  'Berlin, Germany',
  'Tokyo, Japan',
  'Remote',
];

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-[#515B6F] shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <circle cx="11" cy="11" r="8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
  </svg>
);

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-[#515B6F] shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z"
    />
    <circle cx="12" cy="8" r="2" />
  </svg>
);

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState(LOCATIONS[0]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ keyword: keyword.trim(), location });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="flex items-stretch bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
      {/* Keyword input */}
      <div className="flex items-center gap-2.5 px-4 py-3.5 flex-1 border-r border-gray-200 min-w-0">
        <SearchIcon />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Job title or keyword"
          className="outline-none text-[#25324B] placeholder-[#A8ADB7] text-sm w-full bg-transparent"
        />
      </div>

      {/* Location dropdown */}
      <div className="flex items-center gap-2.5 px-4 py-3.5">
        <LocationIcon />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="outline-none text-[#25324B] text-sm bg-transparent cursor-pointer"
        >
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Search button */}
      <Button
        variant="primary"
        onClick={handleSearch}
        className="px-7 py-3.5 rounded-none text-sm whitespace-nowrap"
      >
        Search my job
      </Button>
    </div>
  );
};

export default SearchBar;
