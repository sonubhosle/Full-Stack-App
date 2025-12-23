

import { ShoppingCart, ArrowRight, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function EmptyCart() {
    const [isVisible, setIsVisible] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 overflow-hidden relative">

            <div className="w-full max-w-2xl relative z-10">
                {/* Main Container */}
                <div
                    className={`transform transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                        }`}
                >
                    {/* Animated Cart Icon with enhanced effects */}
                    <div className="flex justify-center ">
                        <div className="relative w-32 h-32 md:w-40 md:h-40">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full blur-3xl opacity-30 animate-pulse" />
                            <div className="absolute inset-2 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-2xl opacity-20 animate-pulse animation-delay-1000" />

                            {/* Cart Icon Container with smooth rotation */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative animate-float-smooth">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-2xl opacity-40 animate-pulse" />
                                    <ShoppingCart size={80} className="text-blue-600 relative z-10 drop-shadow-lg" strokeWidth={1.2} />

                                    <div className="absolute -top-4 -right-4 animate-spin-slow">
                                        <Sparkles size={24} className="text-cyan-400" fill="currentColor" />
                                    </div>
                                    <div className="absolute -bottom-2 -left-4 animate-pulse animation-delay-1000">
                                        <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full shadow-lg shadow-blue-400/50" />
                                    </div>
                                    <div className="absolute top-1/2 -right-6 animate-pulse animation-delay-500">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content with staggered animations */}
                    <div className="text-center ">
                        {/* Heading with gradient text */}
                        <div
                            className={`transform transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                                }`}
                        >
                            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-cyan-700 bg-clip-text text-transparent tracking-tight leading-tight">
                                Your cart is empty
                            </h1>
                        </div>

                        {/* Subheading with enhanced styling */}
                        <div
                            className={`transform transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                                }`}
                        >
                            <p className="text-lg md:text-xl text-slate-600 max-w-lg mx-auto leading-relaxed font-light">
                                Don't worry! Explore our amazing collection and discover something you'll love.
                            </p>
                        </div>

                        {/* CTA Button with premium styling */}
                        <div
                            className={`transform transition-all duration-700 delay-500 pt-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                                }`}
                        >
                            <button onClick={() => navigate('/')} className="group mb-5 relative inline-flex items-center gap-3 px-10 py-4 md:px-12 md:py-5 bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 text-white font-semibold rounded-full shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 active:scale-95 overflow-hidden">
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 animate-shimmer" />
                                <span className="relative flex items-center gap-3">
                                    Continue Shopping
                                    <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
                                </span>
                            </button>
                        </div>

                        {/* Trust badges */}
                        <div
                            className={`transform transition-all duration-700 delay-700 pt-4 flex flex-wrap justify-center gap-6 md:gap-8 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                                }`}
                        >
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                                <span>Secure Checkout</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                <span>Easy Returns</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
