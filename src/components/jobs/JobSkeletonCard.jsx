const JobSkeletonCard = () => (
  <div className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm animate-pulse">
    <div className="w-12 h-12 rounded-xl bg-[#E8E8F0] shrink-0" />
    <div className="flex-1 space-y-2.5">
      <div className="h-4 bg-[#E8E8F0] rounded w-1/2" />
      <div className="h-3 bg-[#E8E8F0] rounded w-1/3" />
      <div className="flex gap-2 mt-3">
        <div className="h-6 bg-[#E8E8F0] rounded-full w-16" />
        <div className="h-6 bg-[#E8E8F0] rounded-full w-16" />
      </div>
    </div>
  </div>
);

export default JobSkeletonCard;
