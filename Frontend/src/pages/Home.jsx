
import AiFeatures from "../components/Home/AiFeatures";
import ChooseUs from "../components/Home/ChooseUs";
import Footer from "../components/Home/Footer";
import Hero from "../components/Home/Hero";
import Navbar from "../components/Home/Navbar";
import Showcase from "../components/Home/Showcase";

const Home = () => {
  return (
    <div className="w-full max-w-8xl bg-black text-white">
      <Navbar />
        <Hero />
        <Showcase />
        <AiFeatures />
        <ChooseUs />
        <Footer />
    </div>
  );
};

export default Home;
