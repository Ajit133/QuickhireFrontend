import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/home/HeroSection';
import CompaniesSection from '../components/home/CompaniesSection';
import CategorySection from '../components/home/CategorySection';
import PostJobBannerSection from '../components/home/PostJobBannerSection';
import FeaturedJobsSection from '../components/home/FeaturedJobsSection';
import LatestJobsSection from '../components/home/LatestJobsSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#F8F8FD] font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <CompaniesSection />
        <CategorySection />
        <PostJobBannerSection />
        <FeaturedJobsSection />
        <LatestJobsSection />
      </main>
    </div>
  );
};

export default HomePage;
