import React, { useState, useEffect, useContext } from 'react';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import axios from "axios";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Login = () => {
    const navigate = useNavigate();
    const { checkAuth, handleLogin } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    // Prefill email if remembered
    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        if (savedEmail) {
            setFormData(prev => ({ ...prev, email: savedEmail, rememberMe: true }));
        }
    }, []);

    // Check if already logged in
    useEffect(() => {
        const verify = async () => {
            const isAuthenticated = await checkAuth();
            if (isAuthenticated) {
                await MySwal.fire({
                    icon: 'success',
                    title: 'Already Logged In',
                    text: 'You are already logged in!',
                    confirmButtonColor: '#6366F1',
                });
                navigate("/dashboard");
            }
        };
        verify();
    }, []);

    // Mouse move effect
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

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleLogin(formData); // ✅ Use context login
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Floating Particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`
                        }}
                    ></div>
                ))}
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
                <div
                    className="w-full max-w-md mx-auto"
                    style={{
                        transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`
                    }}
                >
                    <div className="backdrop-blur-xl bg-white/10 md:border md:border-white/20 md:rounded-3xl md:shadow-2xl overflow-hidden transform-gpu transition-all duration-700 hover:scale-[1.02] opacity-0 animate-pulse"
                         style={{
                             animation: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                             animationDelay: '0.2s'
                         }}>

                        {/* Header */}
                        <div className="relative p-8 text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg transform-gpu transition-all duration-500 hover:scale-110"
                                 style={{ animation: 'pulse 2s infinite' }}>
                                <User className="w-8 h-8 text-white" />
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black mb-4 text-gray-800 leading-tight tracking-tight">
                                Welcome Back
                            </h1>

                            <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full border border-white/20 mb-6">
                                <p className="text-gray-700/90 text-sm font-semibold">⚡ Sign in to continue</p>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="p-8">
                            <form onSubmit={onSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-gray-700/90 font-medium text-sm">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-700" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full pl-12 pr-4 py-4 bg-gray-100 border border-white/20 rounded-xl text-gray-700 placeholder-gray-700/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-gray-700/90 font-medium text-sm">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-700" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full pl-12 pr-12 py-4 bg-gray-100 md:border border-white/20 rounded-xl text-gray-700 placeholder-gray-700/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-700/60 hover:text-white transition-colors duration-200"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="rememberMe"
                                            checked={formData.rememberMe}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-400 focus:ring-purple-400 focus:ring-offset-0"
                                        />
                                        <span className="ml-2 text-sm text-gray-700/90">Remember me</span>
                                    </label>
                                    <button type="button" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
                                        Forgot password?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 transform transition-all duration-300"
                                >
                                    Sign In
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                
                @keyframes slideUp {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-float { 
                    animation: float 6s ease-in-out infinite; 
                }
            `}</style>
        </div>
    );
};

export default Login;
