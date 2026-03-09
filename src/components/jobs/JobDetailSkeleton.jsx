const JobDetailSkeleton = () => (
  <div className="animate-pulse space-y-6 max-w-4xl mx-auto px-6 lg:px-10 py-10">
    <div className="h-8 bg-[#E8E8F0] rounded w-1/3" />
    <div className="h-5 bg-[#E8E8F0] rounded w-1/4" />
    <div className="space-y-3 mt-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-4 bg-[#E8E8F0] rounded" style={{ width: `${80 - i * 5}%` }} />
      ))}
    </div>
  </div>
);

export default JobDetailSkeleton;
