import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/home/HeroSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#F8F8FD] font-sans">
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </div>
  );
};

export default HomePage;
