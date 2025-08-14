import React from "react";

// Social Icons (using Unicode for simplicity)
const TwitterIcon = () => <span className="text-lg">🐦</span>;
const FacebookIcon = () => <span className="text-lg">📘</span>;
const InstagramIcon = () => <span className="text-lg">📸</span>;
const LinkedinIcon = () => <span className="text-lg">💼</span>;

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: "Twitter", icon: <TwitterIcon />, href: "#" },
        { name: "Facebook", icon: <FacebookIcon />, href: "#" },
        { name: "Instagram", icon: <InstagramIcon />, href: "#" },
        { name: "LinkedIn", icon: <LinkedinIcon />, href: "#" },
    ];

    const quickLinks = ["Home", "Services", "About", "Testimonials", "Contact"];

    return (
        <footer className="relative bg-gradient-to-b from-gray-100 to-white pt-16 pb-8 overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/3 w-48 h-48 bg-indigo-200/10  rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-purple-200/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Logo & Description */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-20 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-110">
                                <span className="text-white font-bold text-xl">M</span>
                            </div>
                            <span className="text-2xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600   bg-clip-text text-transparent tracking-tight">
                                MAGICAL CALLIGRAPHY
                            </span>
                        </div>
                        <p className="text-gray-600  text-sm leading-relaxed max-w-xs">
                            Transform your handwriting with our science-backed cursive course. Achieve elegant writing in just 30 days.
                        </p>
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="p-2 rounded-full bg-indigo-500/10  text-indigo-500  hover:bg-indigo-500/20  hover:scale-110 transition-all duration-300"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-800  uppercase tracking-wider">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="text-gray-600  text-sm font-medium hover:text-indigo-500 relative group"
                                    >
                                        {link}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500  transition-all duration-300 group-hover:w-full"></span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4 md:col-span-2">
                        <h3 className="text-sm font-semibold text-gray-800  uppercase tracking-wider">
                            Newsletter
                        </h3>
                        <p className="text-gray-600  text-sm leading-relaxed">
                            Get handwriting tips and exclusive offers delivered to your inbox.
                        </p>
                        <form className="mt-2 sm:flex">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your email"
                                className="w-full px-4 py-2 rounded-full border border-gray-300  bg-white/50  text-gray-800  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300"
                            />
                            <button
                                type="submit"
                                className="mt-2 sm:mt-0 sm:ml-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:from-indigo-600 hover:to-purple-600 shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-200  pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 0 text-sm">
                        © {currentYear} IMAD Handwriting. All rights reserved.
                    </p>

                </div>
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.2); opacity: 1; }
                }
                .animate-pulse { animation: pulse 6s infinite ease-in-out; }
                .delay-1000 { animation-delay: 1s; }
            `}</style>
        </footer>
    );
};

export default Footer;
