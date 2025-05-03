// src/app/HomePage.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Used for section images
import {
  FiShoppingBag, FiScissors, FiHome, FiUsers, FiAward,
  FiGlobe, FiHeart, FiMessageSquare, FiPhone, FiMapPin,
  FiMail, FiChevronRight, FiStar, FiArrowDown
} from 'react-icons/fi';

// Import Components
import Navbar from './components/Navbar';         // Adjust path if needed
import LoadingAnimation from './components/LoadingAnimation'; // Adjust path if needed

// Color palette constants (optional, for reference)
// const PRIMARY_PLUM = '#5B2A5D';
// const PRIMARY_GOLD = '#D4AF37';
// const SECONDARY_TERRACOTTA = '#D77B55';
// const SECONDARY_IVORY = '#FDF8F2';

const HomePage: React.FC = () => {
  // --- State ---
  const [isLoading, setIsLoading] = useState(true); // Manages loading screen visibility
  const [isFirstLoad, setIsFirstLoad] = useState(false); // Tracks first load *of the session*
  const [isVisible, setIsVisible] = useState({ // Tracks section visibility for animations
    about: false,
    services: false,
    whyUs: false,
    contact: false
  });

  // --- Effects ---

  // Effect 1: Handle First Load Detection & Loading Screen Timer
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');

      if (!hasLoadedBefore) {
        // First load this session: show loader, set timer, set flag
        setIsFirstLoad(true);
        const timer = setTimeout(() => {
          setIsLoading(false); // Hide loader after delay
          sessionStorage.setItem('hasLoadedBefore', 'true'); // Mark as loaded for this session
        }, 2500); // <-- ADJUST DURATION (milliseconds)

        // Cleanup timer if component unmounts before timer finishes
        return () => clearTimeout(timer);
      } else {
        // Not the first load this session: hide loader immediately
        setIsFirstLoad(false);
        setIsLoading(false);
      }
    } else {
      // Fallback for non-browser environments (shouldn't be needed with "use client")
       setIsLoading(false);
    }
  }, []); // Runs only once on component mount

  // Effect 2: Handle Scroll Animations for Sections (only run when not loading)
  useEffect(() => {
    // Don't attach listener if the page is still showing the loader
    if (isLoading) return;

    const handleScroll = () => {
      const sections = {
        about: document.getElementById('about'),
        services: document.getElementById('services'),
        whyUs: document.getElementById('why-us'),
        contact: document.getElementById('contact')
      };
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      for (const [key, section] of Object.entries(sections)) {
        if (section && scrollY + windowHeight > section.offsetTop + 100) {
          setIsVisible(prev => ({ ...prev, [key]: true }));
        }
        // Consider adding logic to set visibility back to false when scrolling up
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check in case sections are already visible

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]); // Dependency array: re-run only when isLoading changes to false

  // --- Helper Functions ---

  // Scroll to Section Function (with Navbar Offset)
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // --- ADJUST THIS VALUE ---
      // Height of the Navbar when it IS SCROLLED (e.g., py-3 state). Inspect element!
      const navbarHeight = 75; // Example height in pixels

      window.scrollTo({
        top: section.offsetTop - navbarHeight,
        behavior: 'smooth'
      });
    }
  };

  // --- Render Logic ---
  return (
    <div className="bg-[#FDF8F2] text-[#5B2A5D] font-sans overflow-x-hidden">

      {/* Conditional Rendering: Show Loader or Main Content */}
      {isLoading && isFirstLoad ? (
        <LoadingAnimation />
      ) : (
        <>
          {/* Navbar Component */}
          <Navbar scrollToSection={scrollToSection} />

          {/* Main Content Wrapper with Padding for Initial Navbar Height */}
          {/* --- ADJUST THIS VALUE --- */}
          {/* Padding-top equal to the height of the Navbar when UNSCROLLED (py-6 state). Inspect element! */}
          <main className="pt-[0.1px]"> {/* Example padding */}

            {/* --- Hero Section --- */}
            <section className="relative min-h-screen flex items-center justify-center text-center bg-gradient-to-br from-[#5B2A5D] via-[#D77B55] to-[#D4AF37] text-[#FDF8F2] overflow-hidden">
              {/* Animated pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                 <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '20px 20px' }}></div>
              </div>
              {/* Hero content */}
              <div className="relative z-10 p-8 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight animate-fade-in-up" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)', background: 'linear-gradient(to right, #D4AF37, #FDF8F2, #D4AF37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', animation: 'shimmer 5s infinite linear' }}>
                  Welcome to Fortis & Noble
                </h1>
                <p className="text-2xl md:text-3xl font-semibold mb-8 italic animate-fade-in-up-delay-1" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Where Culture Meets Class
                </p>
                <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-fade-in-up-delay-2">
                  We bring together beauty, culture, and connection. Explore our curated collection of African-inspired fashion, premium beauty products, and unique lifestyle items that celebrate heritage and contemporary style.
                </p>
                <div className="space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up-delay-3">
                  <button type="button" onClick={() => scrollToSection('services')} className="inline-block w-full sm:w-auto bg-[#D4AF37] text-[#5B2A5D] px-8 py-4 rounded-full text-lg font-bold shadow-xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
                    Explore Our Offerings
                  </button>
                  <button type="button" onClick={() => scrollToSection('contact')} className="inline-block w-full sm:w-auto bg-transparent border-2 border-[#FDF8F2] text-[#FDF8F2] hover:bg-[#FDF8F2] hover:text-[#5B2A5D] px-8 py-4 rounded-full text-lg font-bold shadow-xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
                    Contact Us
                  </button>
                </div>
              </div>
              {/* Scroll indicator */}
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <FiArrowDown className="text-3xl text-[#D4AF37]" />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40"></div>
            </section>

            {/* --- Introduction Section --- */}
            <section className="py-20 px-6 lg:px-8 bg-[#FDF8F2] relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-[#D4AF37] opacity-10 rounded-br-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#5B2A5D] opacity-10 rounded-tl-full translate-x-1/2 translate-y-1/2"></div>
              {/* Content */}
              <div className="max-w-5xl mx-auto text-center relative z-10">
                <div className="inline-block mb-6">
                  <span className="inline-block h-1 w-10 bg-[#D77B55] mr-2"></span>
                  <span className="inline-block h-1 w-24 bg-[#D4AF37]"></span>
                  <span className="inline-block h-1 w-10 bg-[#D77B55] ml-2"></span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-[#5B2A5D] mb-8">
                  Curating Culture, Connecting Communities
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed mb-10 max-w-3xl mx-auto">
                  At Fortis & Noble, we proudly celebrate African heritage through carefully selected fashion, handmade jewellery, and cultural décor. We also specialize in premium, EU-compliant beauty and hair care for wholesale and retail. From personal shopping to event styling, our services are rooted in cultural richness.
                </p>
                <div className="flex justify-center">
                  <span className="inline-block px-6 py-2 rounded-full bg-[#5B2A5D] bg-opacity-10 text-[#5B2A5D] font-medium">
                    Cultural Excellence Since 2020
                  </span>
                </div>
              </div>
            </section>

            {/* --- About Us Section --- */}
            <section id="about" className={`py-24 px-6 lg:px-8 bg-gradient-to-b from-[#FDF8F2] to-[#F5EFE6] transition-opacity duration-1000 ease-in-out ${isVisible.about ? 'opacity-100' : 'opacity-0'} overflow-hidden`}>
               <div className="max-w-6xl mx-auto">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                   {/* Image column */}
                   <div className="relative">
                     <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
                       {/* Using image.png from public/assets */}
                       <Image
                         src="/assets/image.png" // Path from public folder
                         alt="Fortis & Noble cultural display" // More descriptive alt text
                         layout="fill"
                         objectFit="cover"
                         className="transform group-hover:scale-105 transition-transform duration-700"
                         priority
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#5B2A5D]/40 via-transparent to-transparent"></div>
                     </div>
                     {/* Decorative elements */}
                     <div className="absolute -top-4 -left-4 md:-top-8 md:-left-8 w-24 h-24 border-8 border-[#D4AF37]/50 rounded-2xl z-10"></div>
                     <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-32 h-32 bg-[#D77B55]/20 rounded-full z-0"></div>
                   </div>
                   {/* Text column */}
                   <div className="relative">
                     <div className="inline-block mb-6"><span className="inline-block h-1 w-8 bg-[#D77B55] mr-2"></span><span className="inline-block h-1 w-16 bg-[#D4AF37]"></span></div>
                     <h2 className="text-4xl font-bold text-[#5B2A5D] mb-6">Our Story</h2>
                     <p className="text-lg text-gray-700 leading-relaxed mb-6">Fortis & Noble was born from a passion for cultural beauty and global connection...</p>
                     <p className="text-lg text-gray-700 leading-relaxed mb-6">We understand the importance of quality and authenticity...</p>
                     <p className="text-lg text-gray-700 leading-relaxed mb-8">We serve individuals seeking personal style enhancements...</p>
                     <button type="button" onClick={() => scrollToSection('services')} className="inline-flex items-center text-[#D77B55] font-semibold group">
                       Discover Our Services
                       <FiChevronRight className="ml-2 group-hover:ml-3 transition-all duration-300" />
                     </button>
                   </div>
                 </div>
               </div>
            </section>

            {/* --- What We Offer Section --- */}
            <section id="services" className={`py-24 px-6 lg:px-8 bg-[#FDF8F2] transition-opacity duration-1000 ease-in-out ${isVisible.services ? 'opacity-100' : 'opacity-0'}`}>
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                   <div className="inline-block mb-4"><span className="inline-block h-1 w-12 bg-[#D77B55] mr-2"></span><span className="inline-block h-1 w-20 bg-[#D4AF37]"></span><span className="inline-block h-1 w-12 bg-[#D77B55] ml-2"></span></div>
                   <h2 className="text-4xl md:text-5xl font-bold text-[#5B2A5D] mb-4">What We Offer</h2>
                   <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our comprehensive range of products and services...</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {/* Card 1: Services */}
                  <div className="group bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:-translate-y-3 hover:shadow-2xl flex flex-col">
                     <div className="h-3 bg-[#D4AF37]"></div>
                     <div className="p-8 flex flex-col flex-grow"> {/* Card content */}
                        <div className="flex items-center mb-6"><div className="p-3 rounded-lg bg-[#5B2A5D]/10 mr-4 group-hover:bg-[#D77B55] group-hover:text-white transition duration-300"><FiUsers className="text-3xl text-[#5B2A5D] group-hover:text-white" /></div><h3 className="text-2xl font-bold text-[#5B2A5D]">Services</h3></div>
                        <ul className="space-y-3 text-gray-700 mb-8"><li className="flex items-start"><FiStar className="text-[#D77B55] mt-1 mr-3 flex-shrink-0" /><span>Personal Shopping & Style Consulting</span></li><li className="flex items-start"><FiStar className="text-[#D77B55] mt-1 mr-3 flex-shrink-0" /><span>Event Styling & Cultural Ambiance Design</span></li><li className="flex items-start"><FiStar className="text-[#D77B55] mt-1 mr-3 flex-shrink-0" /><span>Cultural Event Planning & Coordination</span></li><li className="flex items-start"><FiStar className="text-[#D77B55] mt-1 mr-3 flex-shrink-0" /><span>Cultural Diversity & Inclusion Consulting</span></li></ul>
                        <div className="mt-auto pt-4 border-t border-gray-100"><button type="button" onClick={() => scrollToSection('contact')} className="inline-flex items-center text-[#5B2A5D] font-semibold hover:text-[#D77B55] transition-colors">Learn More <FiChevronRight className="ml-2" /></button></div>
                     </div>
                  </div>
                  {/* Card 2: Beauty & Hair Care */}
                  <div className="group bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:-translate-y-3 hover:shadow-2xl flex flex-col">
                     <div className="h-3 bg-[#D4AF37]"></div>
                     <div className="p-8 flex flex-col flex-grow"> {/* Card content */}
                         <div className="flex items-center mb-6"><div className="p-3 rounded-lg bg-[#5B2A5D]/10 mr-4 group-hover:bg-[#D77B55] group-hover:text-white transition duration-300"><FiScissors className="text-3xl text-[#5B2A5D] group-hover:text-white" /></div><h3 className="text-2xl font-bold text-[#5B2A5D]">Beauty & Hair Care</h3></div>
                         <ul className="space-y-3 text-gray-700 mb-8"><li className="flex items-start"><FiStar className="text-[#D77B55] mt-1 mr-3 flex-shrink-0" /><span>EU-compliant hair extensions & premium wigs</span></li><li className="flex items-start"><FiStar className="text-[#D77B55] mt-1 mr-3 flex-shrink-0" /><span>Premium styling accessories & tools</span></li><li className="flex items-start"><FiStar className="text-[#D77B55] mt-1 mr-3 flex-shrink-0" /><span>Wholesale distribution for salons & retailers</span></li><li className="flex items-start"><FiStar className="text-[#D77B55] mt-1 mr-3 flex-shrink-0" /><span>Curated retail collections for individual needs</span></li></ul>
                         <div className="mt-auto pt-4 border-t border-gray-100"><button type="button" onClick={() => scrollToSection('contact')} className="inline-flex items-center text-[#5B2A5D] font-semibold hover:text-[#D77B55] transition-colors">Learn More <FiChevronRight className="ml-2" /></button></div>
                     </div>
                  </div>
                  {/* Card 3: Fashion & Lifestyle */}
                  <div className="group bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:-translate-y-3 hover:shadow-2xl flex flex-col">
                     <div className="h-3 bg-[#D4AF37]"></div>
                     <div className="p-8 flex flex-col flex-grow"> {/* Card content */}
                         <div className="flex items-center mb-6"><div className="p-3 rounded-lg bg-[#5B2A5D]/10 mr-4 group-hover:bg-[#D77B55] group-hover:text-white transition duration-300"><FiShoppingBag className="text-3xl text-[#5B2A5D] group-hover:text-white" /></div><h3 className="text-2xl font-bold text-[#5B2A5D]">African-Inspired Fashion & Lifestyle</h3></div>
                         <ul className="space-y-3 text-gray-700 mb-8"><li className="flex items-start"><FiStar className="text-[#D77B55] mt-1 mr-3 flex-shrink-0" /><span>Custom & ready-to-wear African attires</span></li><li className="flex items-start"><FiStar className="text-[#D77B55] mt-1 mr-3 flex-shrink-0" /><span>Handmade jewellery & unique accessories</span></li><li className="flex items-start"><FiStar className="text-[#D77B55] mt-1 mr-3 flex-shrink-0" /><span>Cultural home décor & statement pieces</span></li><li className="flex items-start"><FiStar className="text-[#D77B55] mt-1 mr-3 flex-shrink-0" /><span>Contemporary lifestyle items with heritage roots</span></li></ul>
                         <div className="mt-auto pt-4 border-t border-gray-100"><button type="button" onClick={() => scrollToSection('contact')} className="inline-flex items-center text-[#5B2A5D] font-semibold hover:text-[#D77B55] transition-colors">Learn More <FiChevronRight className="ml-2" /></button></div>
                     </div>
                  </div>
                </div>
              </div>
            </section>

            {/* --- Why Choose Us Section --- */}
            <section id="why-us" className={`py-24 px-6 lg:px-8 bg-gradient-to-b from-[#F5EFE6] to-[#FDF8F2] relative transition-opacity duration-1000 ease-in-out ${isVisible.whyUs ? 'opacity-100' : 'opacity-0'} overflow-hidden`}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/5 opacity-50 rounded-bl-full translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#5B2A5D]/5 opacity-50 rounded-tr-full -translate-x-1/2 translate-y-1/2"></div>
              <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                   <div className="inline-block mb-4"><span className="inline-block h-1 w-12 bg-[#D77B55] mr-2"></span><span className="inline-block h-1 w-20 bg-[#D4AF37]"></span><span className="inline-block h-1 w-12 bg-[#D77B55] ml-2"></span></div>
                   <h2 className="text-4xl md:text-5xl font-bold text-[#5B2A5D] mb-4">Why Choose Fortis & Noble?</h2>
                   <p className="text-lg text-gray-600 max-w-2xl mx-auto">We blend cultural authenticity with modern excellence...</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                   {/* Feature Cards */}
                   <div className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"><div className="relative mb-6 w-16 h-16 mx-auto"><div className="absolute inset-0 bg-[#5B2A5D]/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div><div className="absolute inset-0 flex items-center justify-center text-[#D4AF37] text-4xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"><FiAward /></div></div><h4 className="text-xl font-bold text-[#5B2A5D] mb-3">Quality You Can Trust</h4><p className="text-gray-600">EU-compliant beauty products...</p></div>
                   <div className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"><div className="relative mb-6 w-16 h-16 mx-auto"><div className="absolute inset-0 bg-[#5B2A5D]/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div><div className="absolute inset-0 flex items-center justify-center text-[#D4AF37] text-4xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"><FiGlobe /></div></div><h4 className="text-xl font-bold text-[#5B2A5D] mb-3">Culturally Rooted, Globally Minded</h4><p className="text-gray-600">Celebrating African heritage...</p></div>
                   <div className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"><div className="relative mb-6 w-16 h-16 mx-auto"><div className="absolute inset-0 bg-[#5B2A5D]/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div><div className="absolute inset-0 flex items-center justify-center text-[#D4AF37] text-4xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"><FiHome /></div></div><h4 className="text-xl font-bold text-[#5B2A5D] mb-3">One-Stop Lifestyle Hub</h4><p className="text-gray-600">From products to planning...</p></div>
                   <div className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"><div className="relative mb-6 w-16 h-16 mx-auto"><div className="absolute inset-0 bg-[#5B2A5D]/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div><div className="absolute inset-0 flex items-center justify-center text-[#D4AF37] text-4xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"><FiHeart /></div></div><h4 className="text-xl font-bold text-[#5B2A5D] mb-3">Community-Focused</h4><p className="text-gray-600">Using culture as a bridge...</p></div>
                </div>
              </div>
            </section>

            {/* --- Call to Action / Contact Section --- */}
            <section id="contact" className={`py-24 px-6 lg:px-8 bg-[#5B2A5D] text-[#FDF8F2] relative transition-opacity duration-1000 ease-in-out ${isVisible.contact ? 'opacity-100' : 'opacity-0'} overflow-hidden`}>
               <div className="absolute inset-0 opacity-5"><div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23FDF8F2' d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z'/%3E%3C/svg%3E")`, backgroundSize: '100px 100px' }}></div></div>
               <div className="absolute top-0 left-0 right-0 h-2 bg-[#D4AF37]"></div>
               <div className="max-w-5xl mx-auto relative z-10">
                 <div className="text-center mb-12">
                    <div className="inline-block mb-4"><span className="inline-block h-1 w-12 bg-[#D77B55] mr-2"></span><span className="inline-block h-1 w-20 bg-[#D4AF37]"></span><span className="inline-block h-1 w-12 bg-[#D77B55] ml-2"></span></div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#FDF8F2]">Let's Work Together</h2>
                    <p className="text-xl mb-10 leading-relaxed max-w-3xl mx-auto">Whether you are a beauty retailer, a bride-to-be...</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
                      <a href="/shop" className="w-full sm:w-auto bg-[#D4AF37] text-[#5B2A5D] hover:bg-opacity-90 px-10 py-4 rounded-full text-lg font-bold shadow-xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">Explore Collections</a>
                      <a href="/consultation" className="w-full sm:w-auto bg-[#D77B55] text-[#FDF8F2] hover:bg-opacity-90 px-10 py-4 rounded-full text-lg font-bold shadow-xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">Book a Consultation</a>
                    </div>
                 </div>
                 {/* Contact info */}
                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center"><div className="bg-[#D4AF37]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><FiMail className="text-2xl text-[#D4AF37]" /></div><h4 className="font-semibold text-lg mb-2">Email Us</h4><a href="mailto:info@fortisandnoble.com" className="text-[#FDF8F2] hover:text-[#D4AF37] transition duration-300 break-words">info@fortisandnoble.com</a></div>
                        <div className="text-center"><div className="bg-[#D4AF37]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><FiPhone className="text-2xl text-[#D4AF37]" /></div><h4 className="font-semibold text-lg mb-2">Call Us</h4><a href="tel:+1234567890" className="text-[#FDF8F2] hover:text-[#D4AF37] transition duration-300">+1 234 567 890</a></div>
                        <div className="text-center"><div className="bg-[#D4AF37]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><FiMapPin className="text-2xl text-[#D4AF37]" /></div><h4 className="font-semibold text-lg mb-2">Find Us</h4><p className="text-[#FDF8F2]">London, United Kingdom</p></div>
                    </div>
                 </div>
               </div>
            </section>

          </main> {/* End main content */}
        </>
      )}

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; opacity: 0; }
        .animate-fade-in-up-delay-1 { animation: fade-in-up 0.6s ease-out 0.2s forwards; opacity: 0; }
        .animate-fade-in-up-delay-2 { animation: fade-in-up 0.6s ease-out 0.4s forwards; opacity: 0; }
        .animate-fade-in-up-delay-3 { animation: fade-in-up 0.6s ease-out 0.6s forwards; opacity: 0; }
      `}</style>

    </div> // End root div
  );
};

export default HomePage;