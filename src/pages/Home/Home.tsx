import Footer from '../Shared/Footer';
import HeroSection from './HeroSection/HeroSection';
import HowItWorks from './HowItWorks/HowItWorks';
import Testimonials from './Testimonials/Testimonials';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
