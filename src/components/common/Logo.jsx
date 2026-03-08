const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      {/* Circular icon with inner ring and accent dot */}
      <div className="relative w-9 h-9 rounded-full bg-[#4640DE] flex items-center justify-center shrink-0">
        <div className="w-4 h-4 rounded-full bg-white" />
        <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-orange-400 rounded-full border-2 border-white" />
      </div>
      <span className="text-xl font-bold text-[#25324B] tracking-tight">QuickHire</span>
    </div>
  );
};

export default Logo;
