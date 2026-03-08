import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/home/HeroSection';
import CompaniesSection from '../components/home/CompaniesSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#F8F8FD] font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <CompaniesSection />
      </main>
    </div>
  );
};

export default HomePage;
