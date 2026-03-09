const AVATAR_COLOURS = [
  '#4640DE', '#56CDAD', '#FFB836', '#FF6550', '#26A4FF', '#00BFA5', '#1B3C87',
];

const CompanyAvatar = ({ name = '', size = 'md' }) => {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  const bg = AVATAR_COLOURS[(name.charCodeAt(0) ?? 0) % AVATAR_COLOURS.length];

  const sizeClass = {
    sm:  'w-10 h-10 text-sm rounded-lg',
    md:  'w-12 h-12 text-base rounded-xl',
    lg:  'w-20 h-20 text-2xl rounded-2xl',
  }[size] ?? 'w-12 h-12 text-base rounded-xl';

  return (
    <div
      className={`${sizeClass} flex items-center justify-center text-white font-bold shrink-0`}
      style={{ backgroundColor: bg }}
    >
      {initials || '?'}
    </div>
  );
};

export default CompanyAvatar;
