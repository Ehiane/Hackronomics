import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import Carousel from './components/Carousel';
import HowItWorks from './components/HowItWorks';
import Stats from './components/Stats';
import CTA from './components/CTA';
import Footer from './components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-background">
      <Navbar />
      <main>
        <Hero />
        <BentoGrid />
        <Carousel />
        <HowItWorks />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;