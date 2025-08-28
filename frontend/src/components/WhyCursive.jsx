import { Link } from "react-router-dom";
import CTAButton from "./CTAButton";

const WhyCursive = () => {
    return (
        <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
            {/* Floating background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-16 right-5 sm:right-10 md:right-20 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
                <div className="absolute bottom-10 left-5 sm:left-16 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/3 left-5 sm:left-10 w-10 sm:w-16 h-10 sm:h-16 bg-gradient-to-r from-emerald-200/20 to-cyan-200/20 rounded-full blur-xl animate-pulse delay-700"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                {/* Main Title */}
                <div className="text-center mb-16 sm:mb-20">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">
                            Why Cursive Writing
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
                            Improves & Speeds Up Your Handwriting
                        </span>
                    </h2>
                    <div className="w-32 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 mx-auto rounded-full"></div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Science Card */}
                    <div className="group relative">
                        <div className="h-full backdrop-blur-lg bg-white/30 border border-white/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex flex-col h-full">
                                <div className="flex items-center mb-6">
                                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="ml-4 px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-sm font-medium rounded-full">
                                        Research Proven
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                    The Science Behind Faster Writing
                                </h3>
                                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                                    Studies show that students who learned cursive strokes early in school developed <span className="font-semibold text-blue-600">faster, neater handwriting</span> as they grew older.
                                </p>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6 flex-grow">
                                    The reason is simple and logical: Cursive trains your <span className="font-semibold text-purple-600">fine motor skills</span> and builds <span className="font-semibold text-pink-600">muscle memory</span> — the two keys that help your hand write smoothly without stopping or getting tired.
                                </p>
                                <div className="bg-white/50 rounded-xl p-4 border border-white/50">
                                    <p className="text-sm text-gray-500 italic">
                                        "Cursive writing engages the brain in ways typing cannot, enhancing both speed and legibility."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Personal Story Card */}
                    <div className="group relative">
                        <div className="h-full backdrop-blur-lg bg-white/30 border border-white/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex flex-col h-full">
                                <div className="flex items-center mb-6">
                                    <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="ml-4 px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-sm font-medium rounded-full">
                                        Personal Proof
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                    My Handwriting Transformation
                                </h3>
                                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                                    I didn't learn cursive in early childhood. I only started practicing in 8th grade, but the results were <span className="font-semibold text-emerald-600">life-changing</span>:
                                </p>
                                <ul className="space-y-3 mb-6 flex-grow">
                                    {[
                                        "My ugly handwriting transformed completely",
                                        "I started writing significantly faster",
                                        "My hands wouldn't get tired easily",
                                        "I actually began enjoying writing"
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                            </div>
                                            <span className="text-gray-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="bg-white/50 rounded-xl p-4 border border-white/50">
                                    <p className="text-sm text-gray-500 italic">
                                        "That's when I realized: Anyone can learn cursive at any age and transform their handwriting."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Universal Access & CTA */}
                <div className="mt-16">
                    <div className="backdrop-blur-lg bg-white/30 border border-white/30 rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <div className="text-center max-w-4xl mx-auto">
                            <h3 className="text-3xl font-bold text-gray-800 mb-6">
                                Ready to Transform Your Handwriting?
                            </h3>
                            <p className="text-gray-600 text-xl leading-relaxed mb-8">
                                Whether you're a <span className="font-semibold text-indigo-600">student</span> or <span className="font-semibold text-purple-600">parent</span>, you can develop beautiful handwriting in just 30 days with our proven cursive stroke method.
                            </p>

                            <CTAButton/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyCursive;
