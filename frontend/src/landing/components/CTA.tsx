import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, ShieldAlert } from 'lucide-react';

const CTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'typing' | 'submitted'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitted');
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-background flex items-center justify-center">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.05)_0%,transparent_50%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl group"
      >
        {/* Animated Glowing Border Container */}
        <div className="relative rounded-2xl overflow-hidden p-[2px]">
            {/* The spinning gradient layer - Single Line */}
            <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#00F0FF_50%,#0000_60%)]" />

            {/* Inner Content Card */}
            <div className="relative bg-[#0A0A0A] rounded-2xl p-8 md:p-12 overflow-hidden">
                {/* Top Glow Bar (Static accent) */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                
                <div className="flex flex-col items-center text-center relative z-10">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-primary/20">
                        <ShieldAlert className="w-8 h-8 text-primary" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
                        Ready to <span className="text-gradient">Ascend?</span>
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-md text-base">
                        Join the elite circle of beta testers. Secure your spot now and receive the legendary "Founder's Badge" upon launch.
                    </p>

                    {status === 'submitted' ? (
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full bg-green-500/10 border border-green-500/20 p-4 rounded-xl flex items-center justify-center gap-3"
                        >
                            <CheckCircle2 className="w-6 h-6 text-green-400" />
                            <span className="text-green-400 font-bold">Access Requested</span>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-3">
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                        <button 
                            type="submit" 
                            className="bg-white text-black hover:bg-gray-100 font-bold rounded-xl px-8 py-4 transition-all hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                            Get Access <Send className="w-4 h-4" />
                        </button>
                        </form>
                    )}

                    <p className="mt-6 text-xs text-gray-600 font-mono uppercase tracking-widest">
                        Limited Spots Available • Secure Encryption
                    </p>
                </div>
            </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;