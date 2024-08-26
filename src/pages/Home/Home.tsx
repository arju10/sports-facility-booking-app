import FeaturedFacilities from './Facilities/FeaturedFacilities';
import HeroSection from './HeroSection/HeroSection';
import HowItWorks from './HowItWorks/HowItWorks';
import Testimonials from './Testimonials/Testimonials';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedFacilities />
      <HowItWorks />
      <Testimonials />
    </div>
  );
};

export default Home;
