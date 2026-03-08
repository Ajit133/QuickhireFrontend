import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/home/HeroSection';
import CompaniesSection from '../components/home/CompaniesSection';
import CategorySection from '../components/home/CategorySection';
import PostJobBannerSection from '../components/home/PostJobBannerSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#F8F8FD] font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <CompaniesSection />
        <CategorySection />
        <PostJobBannerSection />
      </main>
    </div>
  );
};

export default HomePage;
