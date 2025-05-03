// src/app/components/Navbar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';

// REMOVE this import:
// import logoImage from '@/app/assets/logo.webp'; // <- Delete this line

// Define props interface for Navbar
interface NavbarProps {
  scrollToSection: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle link clicks
  const handleLinkClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const navClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled
      ? 'bg-[#5B2A5D] text-[#FDF8F2] shadow-lg py-3'
      : 'bg-transparent text-[#FDF8F2] py-6'
  }`;

  const bookNowClasses = `px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 shadow-md transition transform hover:scale-105 duration-300 ${
    isScrolled
      ? 'bg-[#D4AF37] text-[#5B2A5D]'
      : 'bg-[#D4AF37] text-[#5B2A5D]'
  }`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="cursor-pointer"
          >
            <Image
              // UPDATE the src prop to the public path:
              src="/assets/logo.webp" // <-- Change this line
              alt="Fortis & Noble Logo"
              // Ensure width and height are provided and correct for logo.webp
              width={90} // You MUST provide width
              height={45}  // You MUST provide height
              priority
            />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <button type="button" onClick={() => handleLinkClick('about')} className="font-medium hover:text-[#D4AF37] transition-colors">About</button>
          <button type="button" onClick={() => handleLinkClick('services')} className="font-medium hover:text-[#D4AF37] transition-colors">Services</button>
          <button type="button" onClick={() => handleLinkClick('why-us')} className="font-medium hover:text-[#D4AF37] transition-colors">Why Us</button>
          <button type="button" onClick={() => handleLinkClick('contact')} className="font-medium hover:text-[#D4AF37] transition-colors">Contact</button>
          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className={bookNowClasses}
          >
            Book Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#D4AF37]"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute top-full left-0 w-full transition-transform transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        } ${isScrolled ? 'bg-[#5B2A5D]' : 'bg-[#5B2A5D]/95 backdrop-blur-sm'} shadow-lg`}
      >
        <div className="px-6 pt-2 pb-4 space-y-3">
           <button type="button" onClick={() => handleLinkClick('about')} className="block w-full text-left py-2 px-3 rounded-md font-medium hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] transition-colors">About</button>
           <button type="button" onClick={() => handleLinkClick('services')} className="block w-full text-left py-2 px-3 rounded-md font-medium hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] transition-colors">Services</button>
           <button type="button" onClick={() => handleLinkClick('why-us')} className="block w-full text-left py-2 px-3 rounded-md font-medium hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] transition-colors">Why Us</button>
           <button type="button" onClick={() => handleLinkClick('contact')} className="block w-full text-left py-2 px-3 rounded-md font-medium hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] transition-colors">Contact</button>
           <button
              type="button"
              onClick={() => handleLinkClick('contact')}
              className={`block w-full text-center mt-4 ${bookNowClasses}`}
           >
              Book Now
           </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;