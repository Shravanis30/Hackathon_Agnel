import React from "react";

function SplashScreen() {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-[#4c1631] text-white">
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-4">
        <img
          src="/path-to-your-logo.png"
          alt="SafeGuardHer Logo"
          className="w-20 h-20 md:w-28 md:h-28 animate-bounce"
        />
      </div>

      {/* Title Section */}
      <h1 className="text-2xl md:text-4xl font-bold tracking-wide mb-2">
        SafeGuardHer
      </h1>
      <p className="text-sm md:text-lg tracking-wide">Women Safety App</p>

      {/* Loading Bar Section */}
      <div className="w-3/4 md:w-1/2 h-2 mt-8 bg-gray-300 rounded-full overflow-hidden relative">
        {/* Shimmering effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent h-full animate-shimmer"></div>
      </div>

      {/* Footer Section */}
      <p className="absolute bottom-4 text-xs md:text-sm">
        © 2024 SafeGuardHer
      </p>
    </div>
  );
}

export default SplashScreen;
