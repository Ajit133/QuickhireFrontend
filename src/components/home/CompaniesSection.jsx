import desktopImg from '../../assets/Desktop.png';

const CompaniesSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Label */}
        
        {/* Divider */}
        <div className="hidden sm:block w-px h-10 bg-[#D6DDEB] shrink-0" />

        {/* Logos image */}
        <img
          src={desktopImg}
          alt="Companies we helped grow"
          className="w-full object-contain"
        />
      
    </section>
  );
};

export default CompaniesSection;
