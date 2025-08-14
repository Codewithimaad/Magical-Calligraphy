import React from 'react';
import { Link } from 'react-router-dom';

const Testimonials = () => {
    return (
        <section className="relative min-h-screen w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-16 ">
            {/* Background pattern */}
            <div className='fixed inset-0 -z-10'>
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                        What Our <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Students Say</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                        Don't just take our word for it - hear from those who've transformed their handwriting with our course.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            name: "Priya Sharma",
                            role: "College Student",
                            avatar: "PS",
                            content: "My handwriting was so bad my professors couldn't read my exams. After just 2 weeks, my grades improved dramatically!",
                            rating: 5,
                            color: "from-indigo-400 to-purple-500"
                        },
                        {
                            name: "Rahul Patel",
                            role: "Bank Manager",
                            avatar: "RP",
                            content: "I needed to sign documents daily and was embarrassed by my writing. This course gave me professional-level penmanship.",
                            rating: 5,
                            color: "from-amber-400 to-orange-500"
                        },
                        {
                            name: "Ananya Gupta",
                            role: "School Teacher",
                            avatar: "AG",
                            content: "Teaching cursive to my students became effortless after taking this course myself. The video lessons are incredibly clear.",
                            rating: 5,
                            color: "from-emerald-400 to-teal-500"
                        },
                        {
                            name: "Vikram Singh",
                            role: "Doctor",
                            avatar: "VS",
                            content: "Finally broke my doctor's handwriting stereotype! My prescriptions are now legible and my patients appreciate it.",
                            rating: 4,
                            color: "from-rose-400 to-pink-500"
                        },
                        {
                            name: "Neha Joshi",
                            role: "Graphic Designer",
                            avatar: "NJ",
                            content: "As a designer, I needed better handwriting for client presentations. This course exceeded all my expectations.",
                            rating: 5,
                            color: "from-violet-400 to-blue-500"
                        },
                        {
                            name: "Arjun Mehta",
                            role: "UPSC Aspirant",
                            avatar: "AM",
                            content: "The structured practice sheets helped me develop consistency in my writing for the essay papers. Game changer!",
                            rating: 5,
                            color: "from-cyan-400 to-sky-500"
                        }
                    ].map((testimonial, index) => (
                        <div
                            key={index}
                            className="backdrop-blur-md bg-white/30 border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex items-start space-x-4 mb-4">
                                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${testimonial.color} text-white font-bold text-lg`}>
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">{testimonial.name}</h3>
                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4">{testimonial.content}</p>
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-16 text-center backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl p-8 shadow-lg">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Ready to Transform Your Handwriting?</h2>
                    <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                        Join thousands of satisfied students who've unlocked the secret to beautiful, confident handwriting.
                    </p>
                    <Link to='/register' className="group relative inline-flex items-center justify-center px-4 md:px-8 py-3 text-base md:text-lg font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-xl hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-300 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10">Enroll Now for Rs 1,500</span>
                    </Link>
                    <p className="mt-4 text-sm text-gray-500">30-Day Money-Back Guarantee</p>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
