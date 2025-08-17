import React, { useState, useEffect, useContext } from 'react';
import sadapayLogo from '../assets/sadapay.png'
import nayapayLogo from '../assets/nayapay.png'
import easypaisaLogo from '../assets/easypaisa.png'
import axios from 'axios'
import { AuthContext } from "../context/authContext";


const Register = () => {
    const { backendUrl } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' }); // 'success' or 'error'
    const [fileError, setFileError] = useState('');

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        whatsapp: '',
        paymentScreenshot: ''
    });


    // Add this useEffect inside Register component
useEffect(() => {
    if (message.text) {
        const timer = setTimeout(() => {
            setMessage({ text: '', type: '' });
        }, 5000);

        // Cleanup in case message changes before 5 seconds
        return () => clearTimeout(timer);
    }
}, [message]);


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

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          setFile(e.target.files[0]); // update your state
          setErrors({ ...errors, paymentScreenshot: '' }); // clear error
        }
      };

      

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages and errors
    setMessage({ text: '', type: '' });
    setErrors({
        fullName: '',
        email: '',
        whatsapp: '',
        paymentScreenshot: ''
    });
    
    // Validate all fields
    let isValid = true;
    const newErrors = {
        fullName: '',
        email: '',
        whatsapp: '',
        paymentScreenshot: ''
    };
    
    if (!e.target.fullName.value.trim()) {
        newErrors.fullName = 'Full name is required';
        isValid = false;
    }
    
    if (!e.target.email.value.trim()) {
        newErrors.email = 'Email is required';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.email.value)) {
        newErrors.email = 'Please enter a valid email';
        isValid = false;
    }
    
    if (!e.target.whatsapp.value.trim()) {
        newErrors.whatsapp = 'Whatsapp number is required';
        isValid = false;
    }
    
    if (!file) {
        newErrors.paymentScreenshot = 'Please upload your payment screenshot';
        isValid = false;
    }
    
    if (!isValid) {
        setErrors(newErrors);
        return;
    }
    
    // Rest of your submit logic...
    const formData = new FormData();
    formData.append("fullName", e.target.fullName.value);
    formData.append("email", e.target.email.value);
    formData.append("whatsapp", e.target.whatsapp.value);
    formData.append("paymentScreenshot", file);
    
    try {
        setLoading(true);
        const response = await axios.post(`${backendUrl}/api/users/register`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        
        setMessage({ 
            text: response.data.message || "Registration successful!", 
            type: 'success' 
        });
        e.target.reset();
        setFile(null);
    } catch (err) {
        setMessage({ 
            text: err.response?.data?.message || "Something went wrong", 
            type: 'error' 
        });
        console.error(err);
    } finally {
        setLoading(false);
    }
};
    

    const paymentCards = [
        {
            name: 'Easypaisa',
            logo: easypaisaLogo,
            account: 'Haroon Alam Khan',
            number: '0332-5275117',
            bgGradient: 'bg-gray-100',         // Light neutral background
            shadowColor: 'shadow-gray-300',    // Soft shadow
            copyContent: '0332-5275117'
        },
        {
            name: 'Nayapay',
            logo: nayapayLogo,
            account: 'Haroon Alam Khan',
            number: '0330-9082834',
            bgGradient: 'bg-blue-100',         // Soft professional blue
            shadowColor: 'shadow-gray-400',    // Subtle shadow
            copyContent: '0330-9082834'
        },
        {
            name: 'Sadapay',
            logo: sadapayLogo,
            account: 'Haroon Alam Khan',
            number: '0332-5275117',
            iban: 'PK51SADA0000003325275117',
            bgGradient: 'bg-green-100',        // Light green for credibility
            shadowColor: 'shadow-gray-300',   // Soft green shadow
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
                    <div className="backdrop-blur-xloverflow-hidden transform-gpu transition-all duration-700 hover:scale-[1.02]">

                        {/* Header */}
                        <div className="relative p-8 md:p-12 text-center">
                            <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-gray-800 leading-tight tracking-tight">
                                Handwriting
                                <span className="block text-gray-700">Mastery Course</span>
                            </h1>

                            <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full border border-gray-300 mb-8">
                                <p className="text-gray-700 text-base md:text-lg font-semibold">⚡ Transform in Just 30 Days</p>
                            </div>

                            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                                Join thousands of students who've transformed their handwriting with our expert-led program
                            </p>
                        </div>

                        {/* Form Section */}
                        <div className="p-2 md:p-12 space-y-12">
                        <form
    onSubmit={handleSubmit}
    className="backdrop-blur-sm bg-white/40 rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20 transform-gpu transition-all duration-500 hover:bg-white/50"
>
    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg mr-3 flex items-center justify-center">
            <span className="text-white text-sm">📝</span>
        </div>
        Registration Form
    </h2>

    {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'}`}>
            {message.text}
        </div>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
            <label className="text-gray-800 font-medium">Full Name</label>
            <input
                type="text"
                name="fullName"
                className={`w-full px-4 py-3 bg-gray-200/50 border ${errors.fullName ? 'border-red-400' : 'border-white/30'} rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300`}
                placeholder="Enter your full name"
            />
            {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
        </div>

        {/* Email */}
        <div className="space-y-2">
            <label className="text-gray-800 font-medium">Email Address</label>
            <input
                type="email"
                name="email"
                className={`w-full px-4 py-3 bg-gray-200/50 border ${errors.email ? 'border-red-400' : 'border-white/30'} rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300`}
                placeholder="Enter your email"
            />
            {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
        </div>

        {/* Whatsapp number */}
        <div className="space-y-2">
            <label className="text-gray-800 font-medium">Whatsapp Number</label>
            <input
                type="number"
                name="whatsapp"
                className={`w-full px-4 py-3 bg-gray-200/50 border ${errors.whatsapp ? 'border-red-400' : 'border-white/30'} rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300`}
                placeholder="Enter your Whatsapp number"
            />
            {errors.whatsapp && (
                <p className="mt-1 text-sm text-red-600">{errors.whatsapp}</p>
            )}
        </div>

        {/* File Upload */}
        <div className="md:col-span-2 space-y-2">
  <label className="text-gray-800 font-medium">Upload Payment Screenshot</label>
  <div className="relative">
    <input
      type="file"
      name="paymentScreenshot"
      accept="image/png, image/jpeg, image/jpg"
      onChange={handleFileChange}
      className={`w-full px-4 py-3 bg-gray-200/50 border ${
        errors.paymentScreenshot ? 'border-red-400' : 'border-white/30'
      } rounded-xl text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-400 file:text-white hover:file:bg-purple-500 transition-all duration-300`}
    />
    {errors.paymentScreenshot && (
      <p className="mt-1 text-sm text-red-600">{errors.paymentScreenshot}</p>
    )}
  </div>
</div>

        {/* Register Button */}
        <div className="flex justify-center mt-8 md:col-span-2">
            <button
                type="submit"
                disabled={loading}
                className={`px-8 py-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30 text-white font-bold hover:scale-105 hover:shadow-indigo-500/50 transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {loading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </span>
                ) : (
                    'Register Now'
                )}
            </button>
        </div>
    </div>
</form>


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
