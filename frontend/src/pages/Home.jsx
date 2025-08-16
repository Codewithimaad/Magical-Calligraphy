import Hero from "../components/Hero";
import BeforeAfter from "../components/BeforeAfter";
import WhyCursive from "../components/WhyCursive";
import CallToAction from "../components/CallToAction";
import ImageSection from "../components/ImageSection";


const Home = () => {
    return (
        <div className="relative mt-10">

            {/* Sections */}
            <Hero />
            <ImageSection />
            <BeforeAfter />
            <WhyCursive />
            <CallToAction />
        </div>
    );
};

export default Home;
