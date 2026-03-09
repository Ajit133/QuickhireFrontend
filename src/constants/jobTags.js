export const JOB_TAG_STYLES = {
  'full-time':   'bg-[#E9F9F3] text-[#56CDAD] border border-[#56CDAD]',
  'part-time':   'bg-[#FFF5E5] text-[#FFB836] border border-[#FFB836]',
  'contract':    'bg-[#F0F0FF] text-[#4640DE] border border-[#4640DE]',
  'remote':      'bg-[#FFF0EE] text-[#FF6550] border border-[#FF6550]',
  'internship':  'bg-[#E8F9F9] text-[#26A4FF] border border-[#26A4FF]',
  'marketing':   'bg-[#FFF0E8] text-[#FF9500] border border-[#FF9500]',
  'design':      'bg-[#E8F9F3] text-[#56CDAD] border border-[#56CDAD]',
  'business':    'bg-[#F0ECFF] text-[#7B61FF] border border-[#7B61FF]',
  'technology':  'bg-[#FFEEEC] text-[#FF6550] border border-[#FF6550]',
};

export const tagClass = (tag = '') =>
  JOB_TAG_STYLES[tag.toLowerCase()] ?? 'bg-[#F8F8FD] text-[#515B6F] border border-[#D6DDEB]';
