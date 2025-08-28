import { Link } from "react-router-dom";

const CTAButton = ({
  link = "/register",
  title = "Start Learning Today!",
  price = "Rs 1,499",
  note = "Only",
  lifetimeText = "Lifetime Access",
  guaranteeText = "30-Day Money-Back Guarantee",
}) => {
  return (
    <div className="space-y-4">
      <Link
        to={link}
        className="group relative inline-flex items-center justify-center px-2 sm:px-10 py-4 sm:py-5 text-base sm:text-xl font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md shadow-xl hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-300 overflow-hidden w-full sm:w-auto"
      >
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Content */}
        <span className="relative z-10 flex flex-col items-center text-center space-y-2">
          {/* Heading + Price */}
          <span className="flex flex-wrap items-center justify-center space-x-2">
            <span>{title}</span>
            <span className="text-base sm:text-2xl font-medium">{price}</span>
            <span className="text-sm font-normal opacity-90">{note}</span>
          </span>

          {/* Lifetime Access */}
          <span className="flex items-center space-x-2 text-sm font-semibold">
            <svg
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{lifetimeText}</span>
          </span>

          {/* Guarantee */}
          <span className="text-sm font-medium opacity-90">{guaranteeText}</span>
        </span>

        {/* Glow Effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-400/30 via-purple-400/30 to-pink-400/30 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      </Link>
    </div>
  );
};

export default CTAButton;
