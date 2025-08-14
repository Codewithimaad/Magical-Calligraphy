const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-16">


            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Glassmorphism Card */}
                <div className="p-6 sm:p-8 md:p-10 lg:p-12 text-center  transition-all duration-500 ">
                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 sm:mb-8 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-gray-100 dark:via-gray-300 dark:to-gray-100 bg-clip-text text-transparent leading-tight tracking-tight">
                        Improve Your Handwriting in
                        <span className="block sm:inline mt-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"> Just 30 Days</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-gray-700 dark:text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed">
                        Master cursive strokes with our 13-lesson video course. Build muscle memory through daily practice for smooth, fast, and elegant handwriting.
                    </p>

                    {/* Benefits List */}
                    <div className="backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-10 shadow-lg">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left max-w-3xl mx-auto">
                            {[
                                "Impress with Beautiful Writing",
                                "Write Elegantly in Exams",
                                "Boost Grades with Better Presentation",
                                "Teach Kids Professional Handwriting",
                                "Eliminate Hand Fatigue",
                                "Develop a Lifelong Skill"
                            ].map((benefit, index) => (
                                <li
                                    key={index}
                                    className="flex items-start space-x-3 text-base sm:text-lg text-gray-800 dark:text-gray-200 font-medium group hover:translate-x-1 transition-all duration-300"
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

                    {/* CTA Button */}
                    <div className="space-y-4">
                        <button
                            onClick={() => {/* Replace with your navigation logic */ }}
                            className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-xl hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-300 overflow-hidden w-full sm:w-auto"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10 flex items-center space-x-3">
                                <span>Start Learning Today!</span>
                                <span className="text-xl sm:text-2xl font-medium">Rs 1,500</span>
                                <span className="text-sm font-normal opacity-90">Only</span>
                            </span>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-400/30 via-purple-400/30 to-pink-400/30 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        </button>

                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-base text-gray-600 dark:text-gray-400">
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="font-semibold">Lifetime Access</span>
                            </div>
                            <span className="hidden sm:inline">•</span>
                            <span>30-Day Money-Back Guarantee</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="animate-bounce">
                    <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default Hero;