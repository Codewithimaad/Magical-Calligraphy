import { Link } from "react-router-dom";

const ImageSection = () => {
    return (
        <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
            {/* Floating background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-16 right-5 sm:right-10 md:right-20 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
                <div className="absolute bottom-10 left-5 sm:left-16 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/3 left-5 sm:left-10 w-10 sm:w-16 h-10 sm:h-16 bg-gradient-to-r from-emerald-200/20 to-cyan-200/20 rounded-full blur-xl animate-pulse delay-700"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                {/* Main Title - Centered at Top */}
                <div className="text-center mb-16 sm:mb-20">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">
                            Transform Your
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
                            Handwriting Today
                        </span>
                    </h2>
                    <div className="w-32 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 mx-auto rounded-full"></div>
                </div>

                {/* Content Grid - Left Text, Right Image */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Side - Text Content */}
                    <div className="space-y-8">
                        {/* Benefits List */}
                        <div className="backdrop-blur-md bg-white/20 border border-white/20 rounded-2xl p-6 sm:p-8 shadow-lg">
                            <ul className="space-y-4 sm:space-y-6">
                                {[
                                    "Write Faster",
                                    "Looks Clean & Beautiful",
                                    "Strong Pen Grip",
                                    "High Grades in Exams",
                                    "Reduce Hand Fatigue",
                                    "Enjoy Writing"
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
                    </div>

                    {/* Right Side - Image */}
                    <div className="group relative">
                        <div className="relative backdrop-blur-lg bg-white/30 border border-white/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-inner relative">
                                {/* Placeholder for image - you can replace this with your actual image */}
                                <div className="w-full h-full bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 flex items-center justify-center">
                                    <div className="text-center space-y-4">
                                        <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold text-gray-800">Beautiful Handwriting</h3>
                                            <p className="text-gray-600">Transform your writing style</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Overlay effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            
                            {/* Floating elements on the image */}
                            <div className="absolute top-4 right-4">
                                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                    ✓ Proven Method
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-4">
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                    30 Days
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImageSection;
