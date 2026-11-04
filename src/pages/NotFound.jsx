
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaHome,
  FaCompass,
  FaSearch,
} from "react-icons/fa";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center px-5 py-12 overflow-hidden">

      <div className="max-w-3xl w-full mx-auto text-center">

        {/* Decorative Icons */}
        <div className="relative">

          <div className="absolute -top-12 left-5 sm:left-20 text-pink-300 text-4xl animate-bounce">
            ♡
          </div>

          <div className="absolute top-10 right-5 sm:right-20 text-purple-300 text-3xl animate-pulse">
            ✦
          </div>

          <div className="absolute bottom-0 left-10 text-blue-300 text-3xl animate-pulse">
            ✧
          </div>

          {/* 404 Card */}
          <div className="bg-white/80 backdrop-blur-md border border-white rounded-[2rem] shadow-xl px-7 py-12 sm:px-14 sm:py-16">

            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center text-4xl mb-8 shadow-sm">
              🔍
            </div>

            <p className="text-sm font-bold tracking-[0.25em] uppercase text-purple-500 mb-4">
              Oops! Lost your way?
            </p>

            <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tight bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
              404
            </h1>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-6">
              Page Not Found
            </h2>

            <p className="text-gray-500 text-base sm:text-lg leading-8 max-w-lg mx-auto mt-5">
              Looks like this page has wandered off! The link may be incorrect
              or the page you are looking for may no longer exist.
            </p>

            {/* Illustration */}
            <div className="flex items-center justify-center gap-5 sm:gap-8 my-10">
              <span className="text-4xl sm:text-5xl">🌸</span>
              <div className="w-20 sm:w-28 h-20 sm:h-28 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center shadow-inner">
                <FaCompass className="text-4xl sm:text-5xl text-purple-400" />
              </div>
              <span className="text-4xl sm:text-5xl">🦋</span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

              <Link
                to="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300"
              >
                <FaHome />
                Back to Dashboard
              </Link>

              <button
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 font-bold hover:bg-purple-100 transition duration-300"
              >
                <FaArrowLeft />
                Go Back
              </button>

            </div>

            {/* Help Text */}
            <div className="mt-10 pt-7 border-t border-purple-100">
              <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
                <FaSearch className="text-pink-400" />
                Need help? Return to your She Shield dashboard.
              </p>
            </div>

          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-8">
          She Shield • Your safety, our priority ♡
        </p>

      </div>
    </div>
  );
}

export default NotFound;
