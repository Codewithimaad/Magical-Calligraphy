const BeforeAfter = () => {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Subtle floating elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-200/10 to-purple-200/10 rounded-full blur-xl animate-pulse delay-300"></div>
            <div className="absolute bottom-32 right-16 w-16 h-16 bg-gradient-to-r from-pink-200/10 to-indigo-200/10 rounded-full blur-lg animate-pulse delay-700"></div>

            <div className="max-w-7xl mx-auto px-8">
                {/* Main Title */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                        Before & After
                        <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Learning Cursive
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
                </div>

                {/* Main Before/After Comparison */}
                <div className="relative mb-24">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Before Card */}
                        <div className="group relative">
                            <div className="relative backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                                {/* Badge */}
                                <div className="absolute -top-4 left-8">
                                    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                        BEFORE
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6 overflow-hidden shadow-inner relative">
                                        <img
                                            src="/before.jpg"
                                            alt="Before Learning Cursive"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Overlay effect */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>

                                    <div className="text-left space-y-3">
                                        <h4 className="text-xl font-bold text-gray-800">Struggling Handwriting</h4>
                                        <ul className="text-gray-600 space-y-2">
                                            <li className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                                <span>Inconsistent letter shapes</span>
                                            </li>
                                            <li className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                                <span>Poor spacing and alignment</span>
                                            </li>
                                            <li className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                                <span>Difficult to read</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* VS Divider */}
                        <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg shadow-2xl">
                                VS
                            </div>
                        </div>

                        {/* After Card */}
                        <div className="group relative">
                            <div className="relative backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                                {/* Badge */}
                                <div className="absolute -top-4 right-8">
                                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                        AFTER
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6 overflow-hidden shadow-inner relative">
                                        <img
                                            src="/after.jpg"
                                            alt="After Learning Cursive"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Overlay effect */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>

                                    <div className="text-left space-y-3">
                                        <h4 className="text-xl font-bold text-gray-800">Beautiful Handwriting</h4>
                                        <ul className="text-gray-600 space-y-2">
                                            <li className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span>Consistent, elegant letters</span>
                                            </li>
                                            <li className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span>Perfect spacing & flow</span>
                                            </li>
                                            <li className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span>Clear and impressive</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Student Results Section */}
                <div className="text-center">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        Student Transformations
                    </h3>
                    <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
                        Real results from students who followed our proven method
                    </p>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
                        {/* Student Before */}
                        <div className="group relative">
                            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                                <div className="absolute -top-3 left-6">
                                    <div className="bg-gradient-to-r from-gray-600 to-gray-800 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                        Student Before
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-inner relative">
                                        <img
                                            src="/student-before.jpg"
                                            alt="Student Before"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Student After */}
                        <div className="group relative">
                            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                                <div className="absolute -top-3 right-6">
                                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                        Student After
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-inner relative">
                                        <img
                                            src="/student-after.jpg"
                                            alt="Student After"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA Element */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center space-x-2 backdrop-blur-lg bg-white/10 border border-white/20 rounded-full px-6 py-3 shadow-lg">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-gray-700 font-semibold">Join 1000+ students with transformed handwriting</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BeforeAfter;