import React, { useState, useEffect } from 'react';
import sadapayLogo from '../assets/sadapay.png'
import nayapayLogo from '../assets/nayapay.png'
import easypaisaLogo from '../assets/easypaisa.png'


const Register = () => {
    const [file, setFile] = useState(null);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX - window.innerWidth / 2) / 50,
                y: (e.clientY - window.innerHeight / 2) / 50
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const paymentCards = [
        {
            name: 'Easypaisa',
            logo: easypaisaLogo,
            account: 'Haroon Alam Khan',
            number: '0332-5275117',
            bgGradient: 'bg-white',
            shadowColor: 'shadow-emerald-500/20',
            copyContent: '0332-5275117'
        },
        {
            name: 'Nayapay',
            logo: nayapayLogo,
            account: 'Haroon Alam Khan',
            number: '0330-9082834',
            bgGradient: 'bg-orange-400',
            shadowColor: 'shadow-orange-500/20',
            copyContent: '0330-9082834'
        },
        {
            name: 'Sadapay',
            logo: sadapayLogo,
            account: 'Haroon Alam Khan',
            number: '0332-5275117',
            iban: 'PK51SADA0000003325275117',
            bgGradient: 'bg-green-400',
            shadowColor: 'shadow-pink-500/20',
            copyContent: 'PK51SADA0000003325275117'
        }
    ];

    const copyToClipboard = async (text, index) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden mt-10">
            {/* Floating Particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    ></div>
                ))}
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
                <div
                    className="w-full max-w-7xl mx-auto"
                    style={{
                        transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`
                    }}
                >
                    {/* Main Card */}
                    <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden transform-gpu transition-all duration-700 hover:scale-[1.02]">

                        {/* Header */}
                        <div className="relative p-8 md:p-12 text-center">
                            <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-gray-800 leading-tight tracking-tight">
                                Handwriting
                                <span className="block text-gray-700">Mastery Course</span>
                            </h1>

                            <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full border border-gray-300 mb-8">
                                <p className="text-gray-700 text-xl font-semibold">⚡ Transform in Just 30 Days</p>
                            </div>

                            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                                Join thousands of students who've transformed their handwriting with our expert-led program
                            </p>
                        </div>

                        {/* Form Section */}
                        <div className="p-8 md:p-12 space-y-12">
                            <div className="backdrop-blur-sm bg-white/40 rounded-2xl p-6 md:p-8 border border-white/20 transform-gpu transition-all duration-500 hover:bg-white/50">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg mr-3 flex items-center justify-center">
                                        <span className="text-white text-sm">📝</span>
                                    </div>
                                    Registration Form
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <label className="text-gray-800 font-medium">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-200/50 border border-white/30 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label className="text-gray-800 font-medium">Email Address</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-3 bg-gray-200/50 border border-white/30 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                                            placeholder="Enter your email"
                                        />
                                    </div>



                                    {/* Whatsapp number */}
                                    <div className="space-y-2">
                                        <label className="text-gray-800 font-medium">Whatsapp Number</label>
                                        <input
                                            type="number"
                                            className="w-full px-4 py-3 bg-gray-200/50 border border-white/30 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                                            placeholder="Enter your age"
                                        />
                                    </div>

                                    {/* File Upload */}
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-gray-800 font-medium">Upload Payment Screenshot</label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                className="w-full px-4 py-3 bg-gray-200/50 border border-white/30 rounded-xl text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-400 file:text-white hover:file:bg-purple-500 transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Register Button */}
                                    <div className="flex justify-center mt-8 md:col-span-2">
                                        <button
                                            type="submit"
                                            className="px-8 py-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30 text-white font-bold hover:scale-105 hover:shadow-indigo-500/50 transition-all duration-300"
                                        >
                                            Register Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Instructions */}
                            <div className="backdrop-blur-sm bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-6 md:p-8 border border-cyan-300/20 transform-gpu transition-all duration-500 hover:scale-[1.02]">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg mr-3 flex items-center justify-center">
                                        <span className="text-white text-sm">⏰</span>
                                    </div>
                                    Payment Instructions
                                </h3>
                                <ol className="list-decimal pl-8 space-y-3 text-gray-700">
                                    <li>Complete your registration form above</li>
                                    <li>Send payment to any account below</li>
                                    <li>Take a screenshot of payment confirmation</li>
                                    <li>Attach your Payment Screenshot Above or Send it on the Given Whatsapp Number</li>
                                </ol>
                            </div>

                            {/* Payment Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {paymentCards.map((card, index) => (
                                    <div
                                        key={card.name}
                                        className="group relative transform-gpu transition-all duration-700 hover:scale-105 hover:-translate-y-4"
                                        style={{ perspective: '1000px' }}
                                    >
                                        <div className={`relative bg-gradient-to-br ${card.bgGradient} p-6 rounded-2xl ${card.shadowColor} shadow-xl border border-white/20 backdrop-blur-sm transition-all duration-700 group-hover:shadow-2xl`}>
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                            <div className="relative flex items-center mb-6">
                                                <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center mr-4 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                                                    <img src={card.logo} alt={card.name} className="w-15 h-20 object-contain" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-800">{card.name}</h3>
                                            </div>

                                            <div className="relative space-y-4">
                                                <div>
                                                    <p className="text-gray-700 text-sm mb-1">Account Name</p>
                                                    <p className="text-gray-800 font-semibold">{card.account}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-700 text-sm mb-1">Account Number</p>
                                                    <div className="flex items-center justify-between bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                                        <p className="text-gray-800 font-mono font-semibold">{card.number}</p>
                                                        <button
                                                            onClick={() => copyToClipboard(card.copyContent, `${index}-number`)}
                                                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                                                            title="Copy to clipboard"
                                                        >
                                                            {copiedIndex === `${index}-number` ? <span className="text-green-500 text-xs">✓</span> : <span className="text-gray-800">📋</span>}
                                                        </button>
                                                    </div>
                                                </div>
                                                {card.iban && (
                                                    <div>
                                                        <p className="text-gray-700 text-sm mb-1">IBAN</p>
                                                        <div className="flex items-center justify-between bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                                            <p className="text-gray-800 font-mono text-xs md:text-sm font-semibold break-all">{card.iban}</p>
                                                            <button
                                                                onClick={() => copyToClipboard(card.iban, `${index}-iban`)}
                                                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 ml-2"
                                                                title="Copy IBAN"
                                                            >
                                                                {copiedIndex === `${index}-iban` ? <span className="text-green-500 text-xs">✓</span> : <span className="text-gray-800">📋</span>}
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
        </div>
    );
};

export default Register;
