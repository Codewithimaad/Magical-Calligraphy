import React from 'react';

const About = () => {
    return (
        <section className="relative min-h-screen w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-16">
            {/* Background pattern */}
            <div className='fixed inset-0 -z-10'>
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                        About <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Magical Calligraphy</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                        Transforming handwriting one stroke at a time since 2015
                    </p>
                </div>

                {/* Mission Section */}
                <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-3xl p-8 shadow-xl mb-16">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/3">
                            <div className="w-full h-64 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center text-white text-8xl font-bold">
                                M
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h2>
                            <p className="text-lg text-gray-700 mb-6">
                                At Magical Calligraphy, we believe beautiful handwriting is not just an art form but an essential life skill.
                                Our mission is to make elegant writing accessible to everyone through structured, easy-to-follow lessons
                                that build muscle memory and confidence.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { number: "10,000+", text: "Students Taught" },
                                    { number: "97%", text: "Success Rate" },
                                    { number: "13", text: "Video Lessons" },
                                    { number: "30", text: "Days to Mastery" }
                                ].map((stat, index) => (
                                    <div key={index} className="bg-white/50 p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <p className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">{stat.number}</p>
                                        <p className="text-sm text-gray-600">{stat.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Founder Section */}
                <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-3xl p-8 shadow-xl mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Meet Our Founder</h2>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/3 flex justify-center">
                            <div className="w-64 h-64 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-8xl font-bold shadow-xl">
                                S
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            <h3 className="text-2xl font-bold mb-2 text-gray-800">Musa Alam</h3>
                            <p className="text-lg font-medium text-purple-600 mb-4">Master Calligrapher & Educator</p>
                            <p className="text-gray-700 mb-4">
                                With over 4 years of experience in calligraphy and handwriting instruction, Musa developed the Magical Calligraphy
                                method after noticing how many students struggled with basic penmanship. Her unique approach breaks down complex
                                letterforms into simple, repeatable strokes that anyone can master.
                            </p>
                            <p className="text-gray-700 mb-6">
                                "Handwriting is the visible expression of our thoughts. When we improve our writing, we improve how we communicate
                                with the world." - Musa Alam
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {['Certified Graphologist', 'Gold Medalist - National Penmanship Awards', 'Author - "The Art of Elegant Writing"', 'Featured in Times of India'].map((badge, index) => (
                                    <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Methodology Section */}
                <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-3xl p-8 shadow-xl">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Unique Methodology</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "✍️",
                                title: "Stroke Breakdown",
                                description: "We deconstruct letters into fundamental strokes for easier learning"
                            },
                            {
                                icon: "🔄",
                                title: "Muscle Memory",
                                description: "Daily drills train your hand to form letters effortlessly"
                            },
                            {
                                icon: "📈",
                                title: "Progressive Difficulty",
                                description: "Systematically build from basic to advanced letterforms"
                            },
                            {
                                icon: "🎯",
                                title: "Precision Practice",
                                description: "Targeted exercises for common problem areas"
                            },
                            {
                                icon: "👁️",
                                title: "Visual Feedback",
                                description: "Learn to analyze and improve your own writing"
                            },
                            {
                                icon: "⏱️",
                                title: "Speed Building",
                                description: "Techniques to maintain elegance at faster speeds"
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white/70 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Ready to Begin Your Handwriting Journey?</h2>
                    <button className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-xl hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-300 overflow-hidden mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10">Start Learning Today</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default About;