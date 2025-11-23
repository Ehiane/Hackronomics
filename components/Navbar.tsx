import React, { useState, useEffect } from 'react';
import { Gamepad2, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Stats', href: '#stats' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-xl border-white/10 py-4 shadow-lg' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors border border-white/5">
              <Gamepad2 className="text-primary w-5 h-5" />
            </div>
            <span className="text-xl font-bold font-display tracking-wide text-white">
              Hackro<span className="text-primary">nomics</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-wider font-display"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side: CTA */}
          <div className="hidden md:flex items-center gap-6">
            <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-2 px-6 rounded-full transition-all hover:scale-105 hover:border-primary/50 text-sm">
              Launch App
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[70px] left-0 w-full bg-black/95 backdrop-blur-xl z-40 border-b border-white/10 overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-display text-gray-300 hover:text-primary py-2 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
              <button className="mt-4 w-full bg-primary text-black font-bold py-3 rounded-lg">
                Launch App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;