// First, fix the file structure:
// 1. app/page.tsx (Home page)
import React from 'react';

import HomePage from './HomePage';

import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      
      
      <HomePage/>
      <Footer />
    </main>
  );
}