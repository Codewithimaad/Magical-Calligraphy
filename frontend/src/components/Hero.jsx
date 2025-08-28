import { Link } from "react-router-dom";
import CTAButton from "./CTAButton";

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-0 sm:px-6 lg:px-8 py-16">

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Glassmorphism Card */}
                <div className="p-6 sm:p-8 md:p-10 lg:p-12 text-center transition-all duration-500">
                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 sm:mb-8 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent leading-tight tracking-tight">
                    Improve Your English Handwriting 
                    

                        <span className="block sm:inline mt-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"> in 30 Days</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 font-medium max-w-3xl mx-auto leading-relaxed">
                        Master cursive strokes with our 13-lesson video course. Build muscle memory through daily practice for smooth, fast, and elegant handwriting.
                    </p>

                    {/* Benefits List */}
                    <div className="backdrop-blur-md md:bg-white/20 md:border border-white/20 md:rounded-2xl p-6 sm:p-8 mb-8 sm:mb-10 md:shadow-lg">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left max-w-3xl mx-auto">
                            {[
                                "HD Recorded Video Lessons",
                                "Proven Techniques",
                                "Practical Exercises",
                                "Printable Worksheets for Practice",
                                "WhatsApp community",
                                "Develop a Lifelong Skill"
                            ].map((benefit, index) => (
                                <li
                                    key={index}
                                    className="flex items-start space-x-3 text-base sm:text-lg text-gray-800 font-medium group hover:translate-x-1 transition-all duration-300"
                                >
                                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mt-0.5 shadow-md group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>


{/* Example with custom props */}
<CTAButton 
/>



                </div>
            </div>

            {/* Floating Action Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="animate-bounce">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default Hero;
