import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { TrendingUp, ShieldCheck, Trophy, ArrowRight, SkipForward } from 'lucide-react';

// --- TYPES ---
type AnimationPhase = 'glitch' | 'matrix' | 'coin' | 'wake' | 'reveal';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  mouseX?: any;
  mouseY?: any;
}

// --- SUB-COMPONENTS ---

const FloatingCard: React.FC<FloatingCardProps> = ({ children, className, delay = 0, mouseX, mouseY }) => {
  // Parallax effect for cards - always call hooks unconditionally
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);
  const x = useTransform(mouseX || fallbackX, [-1, 1], [-30, 30]);
  const y = useTransform(mouseY || fallbackY, [-1, 1], [-30, 30]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      style={{ x, y }}
      className={`absolute glass-card p-4 rounded-xl flex items-center gap-3 shadow-lg z-20 border border-white/10 backdrop-blur-md ${className}`}
    >
      {/* Continuous Float Animation after entry */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay + 1 }}
        className="flex items-center gap-3"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const Mascot: React.FC<{ phase: AnimationPhase; mouseX: any; mouseY: any }> = ({ phase, mouseX, mouseY }) => {
  const isAwake = phase === 'wake' || phase === 'reveal';
  const isCoin = phase === 'coin' || isAwake;

  // Eye Tracking Logic
  const eyeX = useTransform(mouseX, [-1, 1], [-12, 12]);
  const eyeY = useTransform(mouseY, [-1, 1], [-12, 12]);
  
  // Body Rotation Logic
  const rotateX = useTransform(mouseY, [-1, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [-1, 1], [-15, 15]);

  if (!isCoin) return null;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: 1, 
        rotate: 0,
        y: phase === 'reveal' ? [0, -20, 0] : 0 
      }}
      transition={{ 
        scale: { type: "spring", stiffness: 100, damping: 20 },
        rotate: { duration: 1 },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }}
      style={{ perspective: 1000 }}
      className="relative w-64 h-64 md:w-80 md:h-80 z-30"
    >
      <motion.div
        style={{ rotateX: isAwake ? rotateX : 0, rotateY: isAwake ? rotateY : 0 }}
        className="w-full h-full preserve-3d"
      >
        {/* Coin Body */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 via-accent to-amber-600 shadow-[0_0_80px_rgba(245,158,11,0.4)] border-4 border-amber-200/50">
          {/* Shine effect */}
          <div className="absolute top-4 left-4 w-1/3 h-1/3 bg-white/20 rounded-full blur-xl" />
          
          {/* Edge/Depth simulation */}
          <div className="absolute inset-0 rounded-full border-[8px] border-black/5" />
        </div>

        {/* Face (Only visible when awake) */}
        <AnimatePresence>
          {isAwake && (
            <motion.svg 
              viewBox="0 0 100 100" 
              className="absolute inset-0 w-full h-full pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Eyes Container - Moving with mouse */}
              <motion.g style={{ x: eyeX, y: eyeY }}>
                <motion.circle cx="35" cy="45" r="7" fill="#3B2505" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} />
                <motion.circle cx="38" cy="42" r="2.5" fill="#fff" /> {/* Eye Glint */}
                
                <motion.circle cx="65" cy="45" r="7" fill="#3B2505" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }} />
                <motion.circle cx="68" cy="42" r="2.5" fill="#fff" /> {/* Eye Glint */}
              </motion.g>
              
              {/* Smile */}
              <motion.path 
                d="M 30 62 Q 50 78 70 62" 
                fill="transparent" 
                stroke="#3B2505" 
                strokeWidth="5" 
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Limbs (Pop out when awake) */}
        <AnimatePresence>
          {isAwake && (
            <>
              {/* Arms */}
              <motion.div 
                className="absolute -left-6 top-1/2 w-16 h-4 bg-accent rounded-full origin-right shadow-md border border-amber-600/20"
                initial={{ scaleX: 0 }} animate={{ scaleX: 1, rotate: -25 }} transition={{ delay: 0.5, type: "spring" }}
                style={{ rotateZ: eyeY }} // Arms move slightly with eyes
              />
              <motion.div 
                className="absolute -right-6 top-1/2 w-16 h-4 bg-accent rounded-full origin-left shadow-md border border-amber-600/20"
                initial={{ scaleX: 0 }} animate={{ scaleX: 1, rotate: 25 }} transition={{ delay: 0.5, type: "spring" }}
              >
                <motion.div 
                  animate={{ rotate: [0, 15, 0] }} 
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                  className="w-full h-full bg-accent rounded-full"
                />
              </motion.div>

              {/* Legs */}
              <motion.div 
                className="absolute left-1/3 -bottom-6 w-5 h-16 bg-accent rounded-full origin-top shadow-md border border-amber-600/20"
                initial={{ scaleY: 0 }} animate={{ scaleY: 1, rotate: -15 }} transition={{ delay: 0.6, type: "spring" }}
              />
              <motion.div 
                className="absolute right-1/3 -bottom-6 w-5 h-16 bg-accent rounded-full origin-top shadow-md border border-amber-600/20"
                initial={{ scaleY: 0 }} animate={{ scaleY: 1, rotate: 15 }} transition={{ delay: 0.6, type: "spring" }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const GlitchOverlay: React.FC = () => (
  <motion.div 
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[60] bg-background flex items-center justify-center overflow-hidden"
  >
    <div className="scanline" />
    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    
    <div className="relative flex flex-col items-center">
      <h1 className="text-6xl md:text-9xl font-black text-primary glitch-text tracking-tighter font-display">
        SYSTEM
      </h1>
      <h1 className="text-6xl md:text-9xl font-black text-secondary glitch-text tracking-tighter font-display" style={{ animationDelay: '0.1s' }}>
        BREACH
      </h1>
      
      <div className="mt-8 font-mono text-accent animate-pulse">
      DECRYPTING FINANCIAL_CORE...
      </div>
    </div>
  </motion.div>
);

const MatrixRain: React.FC = () => {
  const streams = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3
  }));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0, rotate: 45 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[55] overflow-hidden pointer-events-none bg-background/90"
    >
      {streams.map((s) => (
        <motion.div
          key={s.id}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: '120vh', opacity: [0, 1, 0] }}
          transition={{ 
            duration: s.duration, 
            repeat: Infinity, 
            delay: s.delay, 
            ease: "linear" 
          }}
          className="absolute top-0 w-4 text-center font-mono text-primary/50 text-xs md:text-sm writing-vertical"
          style={{ left: s.left }}
        >
          {Array.from({ length: 20 }).map(() => Math.random() > 0.5 ? '1' : '0').join('')}
        </motion.div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5], opacity: [0, 1] }}
          transition={{ duration: 2, ease: "easeIn" }}
          className="w-10 h-10 bg-primary blur-[100px]" 
        />
      </div>
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const [phase, setPhase] = useState<AnimationPhase>('glitch');
  const containerRef = useRef<HTMLDivElement>(null);
  const [timers, setTimers] = useState<ReturnType<typeof setTimeout>[]>([]);

  // Mouse Motion Values (Normalized -1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x * 2); // -1 to 1
    mouseY.set(y * 2); // -1 to 1
  };

  // Trigger Animation Loop on Mount (Always replay)
  useEffect(() => {
    // Clean up any previous state
    setPhase('glitch');

    const newTimers: ReturnType<typeof setTimeout>[] = [];
    const timeline = [
      { t: 2500, p: 'matrix' },
      { t: 4500, p: 'coin' },
      { t: 6000, p: 'wake' },
      { t: 8500, p: 'reveal' },
    ];

    timeline.forEach(({ t, p }) => {
      newTimers.push(setTimeout(() => setPhase(p as AnimationPhase), t));
    });

    setTimers(newTimers);

    return () => {
      newTimers.forEach(clearTimeout);
    };
  }, []); // Empty dependency array = run once on mount (refresh)

  const skipIntro = () => {
    timers.forEach(clearTimeout);
    setPhase('reveal');
  };

  const isReveal = phase === 'reveal';

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden perspective-1000 bg-background flex items-center pt-16 md:pt-0"
    >
      {!isReveal && (
        <button 
          onClick={skipIntro}
          className="fixed top-6 right-6 z-[70] flex items-center gap-2 text-white/50 hover:text-white transition-colors font-mono text-sm uppercase border border-white/10 bg-black/20 backdrop-blur px-3 py-1 rounded-full"
        >
          Skip Intro <SkipForward className="w-4 h-4" />
        </button>
      )}

      <AnimatePresence>
        {phase === 'glitch' && <GlitchOverlay key="glitch" />}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'matrix' && <MatrixRain key="matrix" />}
      </AnimatePresence>

      {/* Background Glows */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isReveal ? 1 : 0 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
      >
        <motion.div style={{ x: useTransform(springMouseX, [-1,1], [20, -20]), y: useTransform(springMouseY, [-1,1], [20, -20]) }} className="absolute top-0 left-0 lg:left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <motion.div style={{ x: useTransform(springMouseX, [-1,1], [-20, 20]), y: useTransform(springMouseY, [-1,1], [-20, 20]) }} className="absolute bottom-0 right-0 lg:right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px]" />
      </motion.div>

      {/* 2-Column Grid Container */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: TEXT */}
        <div className="flex flex-col items-start justify-center text-left order-1 pt-8 lg:pt-0 relative z-40">
           <AnimatePresence mode='wait'>
            {isReveal && (
              <motion.div
                 initial={{ opacity: 0, x: -50 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="w-full"
              >
                <motion.h1 
                  className="text-5xl md:text-7xl xl:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] font-display"
                >
                  HACK YOUR <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                    FINANCES
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-lg md:text-xl text-gray-300 max-w-xl mb-10 font-light leading-relaxed"
                >
                  Level up your financial potential. The AI-powered tracker that turns smart money management into a rewarding experience.
                </motion.p>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pointer-events-auto">
                  <button className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-bold text-lg py-4 px-8 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all transform hover:scale-105 flex items-center justify-center gap-2 font-display">
                    INITIATE PROTOCOL <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="glass-card hover:bg-white/10 text-white font-bold text-lg py-4 px-8 rounded-full border border-white/20 transition-all flex items-center justify-center font-display">
                    SYSTEM DEMO
                  </button>
                </div>
              </motion.div>
            )}
           </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: MASCOT & VISUALS */}
        <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center preserve-3d perspective-1000 order-2">
            <motion.div 
              animate={{ 
                scale: phase === 'wake' || phase === 'reveal' ? [1, 1.2, 1] : 0,
                opacity: phase === 'wake' || phase === 'reveal' ? 0.5 : 0
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-accent/30 blur-[80px] rounded-full scale-75"
            />

            <div className="relative z-30 transform-gpu">
              <Mascot phase={phase} mouseX={springMouseX} mouseY={springMouseY} />
            </div>

            {isReveal && (
              <>
                <FloatingCard className="top-0 left-0 md:-left-8" delay={0.5} mouseX={springMouseX} mouseY={springMouseY}>
                  <div className="bg-green-500/20 p-2 rounded-lg">
                    <TrendingUp className="text-green-400 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Total Saved</p>
                    <p className="text-sm font-bold text-white">+$12,847</p>
                  </div>
                </FloatingCard>

                <FloatingCard className="bottom-10 right-0 md:-right-8" delay={0.8} mouseX={springMouseX} mouseY={springMouseY}>
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Trophy className="text-accent w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Level 12</p>
                    <p className="text-sm font-bold text-white">2,450 Points</p>
                  </div>
                </FloatingCard>

                <FloatingCard className="top-20 right-0 md:right-4" delay={0.6} mouseX={springMouseX} mouseY={springMouseY}>
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <ShieldCheck className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Security</p>
                    <p className="text-sm font-bold text-white">Encrypted</p>
                  </div>
                </FloatingCard>
              </>
            )}
        </div>

      </div>
    </section>
  );
};

export default Hero;