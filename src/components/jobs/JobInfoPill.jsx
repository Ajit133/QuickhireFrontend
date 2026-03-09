const JobInfoPill = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-white border border-[#D6DDEB] rounded-xl px-4 py-3">
    <span className="text-[#4640DE]">{icon}</span>
    <div>
      <p className="text-xs text-[#515B6F]">{label}</p>
      <p className="text-sm font-semibold text-[#25324B]">{value || '—'}</p>
    </div>
  </div>
);

export default JobInfoPill;
