import React from 'react';
import { Gamepad2, Twitter, Instagram, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/40 border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex items-center gap-2">
          <Gamepad2 className="text-gray-500 w-6 h-6" />
          <span className="text-xl font-bold text-gray-400 font-display">Hackronomics</span>
        </div>

        <div className="flex gap-8 text-sm text-gray-500 font-bold font-display">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Support</a>
        </div>

        <div className="flex gap-4">
          <a href="#" className="bg-white/5 p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="bg-white/5 p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="bg-white/5 p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="text-center mt-8 text-xs text-gray-600">
        © 2024 Hackronomics AI Finance. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;