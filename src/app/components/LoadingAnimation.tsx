// src/app/components/LoadingAnimation.tsx
"use client";

import React from 'react';

const LoadingAnimation: React.FC = () => {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#5B2A5D] text-[#FDF8F2] overflow-hidden"
      aria-label="Loading..."
      role="status"
    >
      {/* Animated SVG Elements */}
      <div className="relative w-40 h-40 mb-8">
        {/* Pulsing Circle 1 (Gold) */}
        <svg className="absolute inset-0 w-full h-full animate-pulse-slow opacity-50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="#D4AF37" strokeWidth="2"/>
        </svg>
        {/* Pulsing Circle 2 (Terracotta - delayed) */}
        <svg className="absolute inset-0 w-full h-full animate-pulse-slower opacity-30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="35" stroke="#D77B55" strokeWidth="2"/>
        </svg>
         {/* Simple rotating lines (Optional visual flair) */}
         <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="50" y1="5" x2="50" y2="25" stroke="#FDF8F2" strokeWidth="1.5"/>
            <line x1="50" y1="75" x2="50" y2="95" stroke="#FDF8F2" strokeWidth="1.5"/>
            <line x1="5" y1="50" x2="25" y2="50" stroke="#FDF8F2" strokeWidth="1.5"/>
            <line x1="75" y1="50" x2="95" y2="50" stroke="#FDF8F2" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Animated Text */}
      <div className="text-center animate-fade-in-slow">
        <p className="text-xl md:text-2xl mb-2 text-[#FDF8F2] opacity-80">
          Welcome to
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-wider">
          <span className="text-[#D4AF37]">Fortis</span> & <span className="text-[#D4AF37]">Noble</span>
        </h1>
      </div>

      {/* Add custom keyframes via style jsx */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.95); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
         @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-fade-in-slow {
          animation: fadeIn 1.5s ease-in-out forwards;
        }
        .animate-pulse-slow {
           /* Apply pulse animation with a specific duration */
           animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-pulse-slower {
           /* Apply pulse animation with different duration/delay */
           animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
           animation-delay: 0.5s; /* Stagger the start */
        }
        .animate-spin-slow {
            animation: spin 15s linear infinite; /* Slower spin */
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;