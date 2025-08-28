import { Link } from "react-router-dom";
import CTAButton from "./CTAButton";

const CallToAction = () => {
    return (
        <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 overflow-hidden">

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                {/* Main CTA Container */}
                <div className="backdrop-blur-xl md:bg-white/80 md:border md:border-white/30 md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 md:shadow-2xl text-center">

                    {/* Main Heading */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                            English Handwriting
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
                            Mastery Kit
                        </span>
                    </h2>

                   {/* Kit Contents */}
<div className="mb-8 sm:mb-10">
  <div className="backdrop-blur-lg md:bg-white/50 md:border md:border-white/30 md:rounded-2xl p-6 sm:p-8 w-full md:shadow-xl">
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span className="font-semibold text-gray-800">Handwriting Mastery Course</span>
        </div>
        <span className="font-bold text-gray-800">₨. 2000/</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="font-semibold text-gray-800">Printable Worksheets Pack</span>
        </div>
        <span className="font-bold text-gray-800">₨. 1000/</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="font-semibold text-gray-800">Private WhatsApp Coaching Group</span>
        </div>
        <span className="font-bold text-gray-800">₨. 1000/</span>
      </div>

      <div className="border-t border-gray-300 pt-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-800">Total Value:</span>
          <span className="font-bold text-gray-800">Rs 4000</span>
        </div>
      </div>
    </div>
  </div>
</div>


                    {/* Special Offer */}
                    <div className="mb-8 sm:mb-10">
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-300/30 rounded-full px-4 py-2 mb-4">
                            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                            <span className="text-orange-700 font-semibold text-sm">Today's Special Launch Offer!</span>
                        </div>
                        <div className="text-center">
                            <div className="flex items-baseline justify-center space-x-2 mb-2">
                                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Rs.1499/</span>
                                <span className="text-lg sm:text-xl text-gray-600 line-through">Rs 4000</span>
                            </div>
                            <div className="text-sm text-gray-600 font-medium">Only</div>
                        </div>
                    </div>

                    {/* Value Props */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
                        {[
                            { icon: 'check', color: 'green', text: 'Complete Course' },
                            { icon: 'calendar', color: 'blue', text: 'Lifetime Access' },
                            { icon: 'shield-check', color: 'purple', text: 'WhatsApp Support' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-center space-x-2 p-3 sm:p-4 backdrop-blur-lg bg-white/50 border border-white/30 rounded-lg sm:rounded-xl">
                                <svg className={`w-4 sm:w-5 h-4 sm:h-5 text-${item.color}-500`} fill="currentColor" viewBox="0 0 20 20">
                                    {item.icon === 'check' && (
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    )}
                                    {item.icon === 'calendar' && (
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    )}
                                    {item.icon === 'shield-check' && (
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    )}
                                </svg>
                                <span className="text-sm sm:text-base font-semibold text-gray-700">{item.text}</span>
                            </div>
                        ))}
                    </div>

                  <CTAButton/>

                </div>
            </div>
        </section>
    );
};

export default CallToAction;
