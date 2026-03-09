const JobFilterBar = ({ search, onSearch, category, onCategory, location, onLocation, categories, locations }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-[#D6DDEB] p-4 flex flex-col md:flex-row gap-3">

    {/* Search */}
    <div className="flex items-center gap-2 flex-1 border border-[#D6DDEB] rounded-xl px-4 py-2.5 focus-within:border-[#4640DE] transition-colors duration-200">
      <svg className="w-4 h-4 text-[#515B6F] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
      <input
        type="text"
        placeholder="Job title or company…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full text-sm text-[#25324B] placeholder-[#A8B0C0] outline-none bg-transparent"
      />
      {search && (
        <button onClick={() => onSearch('')} className="text-[#A8B0C0] hover:text-[#515B6F]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>

    {/* Category filter */}
    <div className="relative shrink-0 md:w-48">
      <select
        value={category}
        onChange={(e) => onCategory(e.target.value)}
        className="w-full appearance-none border border-[#D6DDEB] rounded-xl px-4 py-2.5 text-sm text-[#25324B] bg-white outline-none focus:border-[#4640DE] transition-colors duration-200 cursor-pointer pr-8"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#515B6F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    {/* Location filter */}
    <div className="relative shrink-0 md:w-48">
      <select
        value={location}
        onChange={(e) => onLocation(e.target.value)}
        className="w-full appearance-none border border-[#D6DDEB] rounded-xl px-4 py-2.5 text-sm text-[#25324B] bg-white outline-none focus:border-[#4640DE] transition-colors duration-200 cursor-pointer pr-8"
      >
        <option value="">All Locations</option>
        {locations.map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>
      <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#515B6F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

export default JobFilterBar;
