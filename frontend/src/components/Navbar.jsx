import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

// Unicode icons since react-icons isn't available
const MenuIcon = () => <span className="text-2xl">☰</span>;
const CloseIcon = () => <span className="text-2xl">✕</span>;
const ChevronDown = ({ isRotated }) => (
    <span className={`inline-block transition-transform duration-300 ${isRotated ? "rotate-180" : ""}`}>
        ▼
    </span>
);
const TwitterIcon = () => <span className="text-xl">🐦</span>;
const LinkedinIcon = () => <span className="text-xl">💼</span>;
const MailIcon = () => <span className="text-xl">✉️</span>;

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    const navItems = [
        { name: "HOME", href: "/" },
        { name: "TESTIMONIALS", href: "/testimonials" },
        { name: "ABOUT", href: "/about" },
        { name: "CONTACT", href: "/contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleSubmenu = (index) => {
        setOpenSubmenu(openSubmenu === index ? null : index);
    };

    return (
        <>
            {/* Main Navbar */}
            <nav
                className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "top-4 left-0 right-4" : "top-0 left-0 right-0"
                    }`}
            >
                <div
                    className={`mx-auto transition-all duration-500 ${scrolled
                        ? "max-w-6xl bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-3xl shadow-2xl"
                        : "max-w-full bg-white/10 dark:bg-black/20 backdrop-blur-xl shadow-md"
                        }`}
                >
                    <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
                        {/* Logo */}
                        <div className="flex-shrink-0 group cursor-pointer">
                            <Link to="/" className="flex items-center space-x-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300 group-hover:scale-110">
                                    <span className="text-white font-bold text-lg">M</span>
                                </div>
                                <div>
                                    <span className="text-gray-800 dark:text-gray-100 font-extrabold text-xl tracking-tight">
                                        MAGICAL
                                    </span>
                                    <div className="text-xs text-indigo-400 dark:text-indigo-300 font-medium tracking-widest">
                                        CALLIGRAPHY
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-2">
                            {navItems.map((item, index) => (
                                <div key={index} className="relative group">
                                    {item.submenu ? (
                                        <div>
                                            <button
                                                onClick={() => toggleSubmenu(index)}
                                                className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300"
                                            >
                                                <span className="tracking-wide">{item.name}</span>
                                                <ChevronDown isRotated={openSubmenu === index} />
                                            </button>
                                            {openSubmenu === index && (
                                                <div className="absolute top-full left-0 mt-3 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-indigo-500/20 overflow-hidden animate-dropdown">
                                                    <div className="p-2">
                                                        {item.submenu.map((subItem, subIndex) => (
                                                            <Link
                                                                key={subIndex}
                                                                to={subItem.href}
                                                                className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/50 rounded-lg transition-all duration-200 group"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <div className="w-2 h-2 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                                                    <span>{subItem.name}</span>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            to={item.href}
                                            className="px-4 py-2 rounded-full text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 tracking-wide relative group"
                                        >
                                            {item.name}
                                            <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                        </Link>
                                    )}
                                </div>
                            ))}

                            {/* Register Button */}
                            <Link
                                to="/register"
                                className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
                            >
                                REGISTER
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-full bg-indigo-500/20 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400 hover:bg-indigo-500/40 dark:hover:bg-indigo-900/40 transition-all duration-300 hover:scale-110"
                            >
                                {isOpen ? <CloseIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Mobile Menu */}
                    <div className="fixed top-20 right-4 w-80 max-w-[calc(100vw-2rem)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-indigo-500/20 rounded-3xl shadow-2xl shadow-indigo-500/30 z-50 lg:hidden overflow-hidden animate-slide-in">
                        {/* Header */}
                        <div className="p-4 border-b border-indigo-500/20">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">M</span>
                                    </div>
                                    <div>
                                        <div className="text-gray-800 dark:text-gray-100 font-bold text-sm">MAGICAL</div>
                                        <div className="text-xs text-indigo-400">CALLIGRAPHY</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-full bg-indigo-500/20 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400 hover:bg-indigo-500/40 dark:hover:bg-indigo-900/40 transition-all duration-200"
                                >
                                    <CloseIcon />
                                </button>
                            </div>
                        </div>

                        {/* Navigation Items */}
                        <div className="p-4 max-h-96 overflow-y-auto">
                            {navItems.map((item, index) => (
                                <div key={index} className="mb-2">
                                    {item.submenu ? (
                                        <div>
                                            <button
                                                onClick={() => toggleSubmenu(index)}
                                                className="w-full flex justify-between items-center p-3 rounded-2xl text-left font-semibold text-gray-800 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/50 transition-all duration-300"
                                            >
                                                <span>{item.name}</span>
                                                <ChevronDown isRotated={openSubmenu === index} />
                                            </button>
                                            {openSubmenu === index && (
                                                <div className="mt-2 ml-4 space-y-1 animate-slide-down">
                                                    {item.submenu.map((subItem, subIndex) => (
                                                        <Link
                                                            key={subIndex}
                                                            to={subItem.href}
                                                            className="block p-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/50 transition-all duration-200 border-l-2 border-indigo-500/20 hover:border-indigo-500"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            to={item.href}
                                            className="block p-3 rounded-2xl font-semibold text-gray-800 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/50 transition-all duration-300"
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            ))}

                            {/* Mobile Register Button */}
                            <Link
                                to="/register"
                                className="block w-full mt-4 p-3 rounded-2xl font-semibold text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-indigo-500/30"
                            >
                                REGISTER
                            </Link>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-indigo-500/20">
                            <div className="flex justify-center space-x-4">
                                <a
                                    href="#"
                                    className="p-2 rounded-full bg-indigo-500/20 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400 hover:bg-indigo-500/40 dark:hover:bg-indigo-900/40 transition-all duration-200"
                                >
                                    <TwitterIcon />
                                </a>
                                <a
                                    href="#"
                                    className="p-2 rounded-full bg-indigo-500/20 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400 hover:bg-indigo-500/40 dark:hover:bg-indigo-900/40 transition-all duration-200"
                                >
                                    <LinkedinIcon />
                                </a>
                                <a
                                    href="#"
                                    className="p-2 rounded-full bg-indigo-500/20 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400 hover:bg-indigo-500/40 dark:hover:bg-indigo-900/40 transition-all duration-200"
                                >
                                    <MailIcon />
                                </a>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Navbar;