import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Icons
const MenuIcon = () => <span className="text-2xl">☰</span>;
const CloseIcon = () => <span className="text-2xl">✕</span>;
const TwitterIcon = () => <span className="text-xl">🐦</span>;
const LinkedinIcon = () => <span className="text-xl">💼</span>;
const MailIcon = () => <span className="text-xl">✉️</span>;

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const [isAnimatingIn, setIsAnimatingIn] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navItems = [
        { name: "HOME", href: "/" },
        { name: "ABOUT", href: "/about" },
        { name: "CONTACT", href: "/contact" },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const openMenu = () => {
        setIsOpen(true);
        setIsAnimatingIn(false); // Start hidden
        requestAnimationFrame(() => {
            setIsAnimatingIn(true); // Trigger animation
        });
    };

    const closeMenu = () => {
        setIsAnimatingOut(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsAnimatingOut(false);
            setIsAnimatingIn(false);
        }, 350);
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
                        ? "max-w-6xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl"
                        : "max-w-full bg-white/10 backdrop-blur-xl shadow-md"
                        }`}
                >
                    <div className="flex items-center justify-between h-22 px-4 sm:px-6 lg:px-12">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                                <span className="text-white font-bold text-lg">M</span>
                            </div>
                            <div>
                                <span className="text-gray-800 font-extrabold text-xl">
                                    MAGICAL
                                </span>
                                <div className="text-xs text-indigo-400 font-medium tracking-widest">
                                    CALLIGRAPHY
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-2">
                            {navItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.href}
                                    className="px-4 py-2 rounded-full text-sm font-semibold text-gray-800 hover:text-indigo-500 hover:bg-white/20 transition-all duration-300 relative group"
                                >
                                    {item.name}
                                    <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                </Link>
                            ))}
                            <Link
                                to="/register"
                                className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                            >
                                REGISTER
                            </Link>
                        </div>

                        {/* Mobile Button */}
                        <div className="lg:hidden flex items-center">
                            <button
                                onClick={() => (isOpen ? closeMenu() : openMenu())}
                                className="p-4 rounded-full text-indigo-500 hover:bg-indigo-500/40 transition-all duration-300 hover:scale-110"
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
                        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isAnimatingOut ? "opacity-0" : "opacity-100"
                            }`}
                        onClick={closeMenu}
                    />

                    {/* Sidebar */}
                    <div
                        className={`fixed top-0 right-0 h-full w-80 max-w-[calc(100vw-2rem)] bg-white/90  backdrop-blur-2xl border-l border-indigo-500/20 shadow-2xl z-50 overflow-hidden transition-all duration-350 transform ${isAnimatingOut
                            ? "translate-x-full opacity-0"
                            : isAnimatingIn
                                ? "translate-x-0 opacity-100"
                                : "translate-x-full opacity-0"
                            }`}
                    >
                        {/* Header */}
                        <div className="p-5 flex items-center justify-between border-b border-indigo-500/20">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">M</span>
                                </div>
                                <div>
                                    <div className="text-gray-800  font-bold text-sm">
                                        MAGICAL
                                    </div>
                                    <div className="text-xs text-indigo-400">CALLIGRAPHY</div>
                                </div>
                            </div>
                            <button
                                onClick={closeMenu}
                                className="p-2 rounded-full bg-indigo-500/20 text-indigo-500 hover:bg-indigo-500/40 transition-all duration-200"
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        {/* Links */}
                        <div className="p-5 flex flex-col gap-2 overflow-y-auto h-[calc(100%-120px)]">
                            {navItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.href}
                                    onClick={closeMenu}
                                    className="p-3 rounded-xl font-semibold text-gray-800  hover:text-indigo-500 hover:bg-indigo-100/50 transition-all duration-300"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                to="/register"
                                onClick={closeMenu}
                                className="mt-4 p-3 rounded-xl text-center font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                            >
                                REGISTER
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Navbar;
