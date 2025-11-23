import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ShieldCheck, Target, Trophy, Lock, Crosshair, TrendingUp } from 'lucide-react';

// --- 3D SAFE COMPONENT ---
const Safe: React.FC<{ 
  progress: MotionValue<number>, 
  activeStep: number 
}> = ({ progress, activeStep }) => {
  
  // Overall Container Rotation (Drift)
  const rotateX = useTransform(progress, [0, 1], [10, -5]);
  const rotateY = useTransform(progress, [0, 1], [-20, 20]);
  
  // Step 3: Unlocking (Dial Spins)
  const isUnlocking = activeStep === 3;
  // Step 4: Opened (Door Swings)
  const isOpened = activeStep === 4;
  
  return (
    <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] perspective-2000">
      <motion.div
        style={{ rotateX, rotateY }}
        className="w-full h-full relative preserve-3d transition-transform duration-700 ease-out"
      >
        {/* --- SAFE BODY (The Box) --- */}
        {/* Back Face */}
        <div className="absolute inset-0 bg-slate-900 border border-slate-700" style={{ transform: "rotateY(180deg) translateZ(150px)" }} />
        {/* Right Face */}
        <div className="absolute inset-0 bg-slate-800 border border-slate-700" style={{ transform: "rotateY(90deg) translateZ(150px)" }}>
            <div className="absolute inset-4 border border-dashed border-white/10 opacity-50" />
        </div>
        {/* Left Face */}
        <div className="absolute inset-0 bg-slate-800 border border-slate-700" style={{ transform: "rotateY(-90deg) translateZ(150px)" }}>
            <div className="absolute inset-4 border border-dashed border-white/10 opacity-50" />
        </div>
        {/* Top Face */}
        <div className="absolute inset-0 bg-slate-900 border border-slate-700" style={{ transform: "rotateX(90deg) translateZ(150px)" }} />
        {/* Bottom Face */}
        <div className="absolute inset-0 bg-slate-900 border border-slate-700 shadow-[0_100px_100px_rgba(0,0,0,0.5)]" style={{ transform: "rotateX(-90deg) translateZ(150px)" }} />

        {/* --- CONTENTS (Inside) --- */}
        <div className="absolute inset-0 flex items-center justify-center preserve-3d">
             <div className="w-40 h-40 bg-accent/20 rounded-full blur-[60px] animate-pulse" />
             <motion.div 
                className="relative z-10 text-accent flex flex-col items-center"
                animate={{ scale: isOpened ? 1.1 : 0.9 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
             >
                <Trophy className="w-32 h-32 drop-shadow-[0_0_35px_rgba(255,215,0,0.8)]" />
                <div className="bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-accent/50 text-sm font-bold font-mono mt-4 text-accent shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                    MISSION COMPLETE
                </div>
             </motion.div>
        </div>

        {/* --- SAFE DOOR (Front Face - Hinged on Left) --- */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 border-4 border-slate-600 origin-left preserve-3d flex items-center justify-center shadow-2xl"
          style={{ transform: "translateZ(150px)" }}
          animate={{ rotateY: isOpened ? -120 : 0 }}
          transition={{ type: "spring", stiffness: 30, damping: 15 }}
        >
            {/* Metallic Sheen */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            
            {/* Lock Mechanism Detail */}
            <div className="w-[80%] h-[80%] border border-slate-500/30 rounded-sm flex flex-col items-center justify-center gap-6">
                
                {/* Status Light */}
                <div className="flex gap-2 mb-4">
                    <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${isUnlocking || isOpened ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-900'}`} />
                    <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${!isUnlocking && !isOpened ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-red-900'}`} />
                </div>

                {/* The Wheel/Dial */}
                <motion.div 
                    className="w-32 h-32 rounded-full bg-slate-800 border-8 border-slate-600 shadow-inner flex items-center justify-center relative"
                    animate={{ rotate: isUnlocking ? 720 : isOpened ? 720 : 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                >
                    <div className="w-24 h-24 rounded-full border border-white/10 bg-slate-700 flex items-center justify-center">
                        <div className="w-2 h-8 bg-slate-900 rounded-full absolute top-2" />
                        <div className="w-2 h-8 bg-slate-900 rounded-full absolute bottom-2" />
                        <div className="w-8 h-2 bg-slate-900 rounded-full absolute left-2" />
                        <div className="w-8 h-2 bg-slate-900 rounded-full absolute right-2" />
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-500 to-slate-800 shadow-lg" />
                    </div>
                    {/* Handle Bars */}
                    <div className="absolute w-40 h-4 bg-slate-500 rounded-full -z-10" />
                    <div className="absolute w-4 h-40 bg-slate-500 rounded-full -z-10" />
                </motion.div>

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-1 opacity-50">
                    {[1,2,3,4,5,6,7,8,9].map(n => (
                        <motion.div 
                           key={n} 
                           animate={{ backgroundColor: isUnlocking ? ["#0f172a", "#22c55e", "#0f172a"] : "#0f172a" }}
                           transition={{ delay: Math.random(), duration: 0.5, repeat: isUnlocking ? Infinity : 0 }}
                           className="w-4 h-4 bg-slate-950 rounded-sm" 
                        />
                    ))}
                </div>
            </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

const steps = [
  {
    id: 1,
    title: "Initialize Connection",
    desc: "Securely link your financial data streams. Our AI decrypts transaction patterns instantly.",
    icon: <ShieldCheck className="w-8 h-8 text-primary" />
  },
  {
    id: 2,
    title: "Set Target Coordinates",
    desc: "Define your victory conditions. Want a PS5? A new Tesla? Mark it as your active Quest.",
    icon: <Crosshair className="w-8 h-8 text-secondary" />
  },
  {
    id: 3,
    title: "Crack the Vault",
    desc: "Stay under budget to execute the unlock sequence. Watch the system bypass security as you save.",
    icon: <Lock className="w-8 h-8 text-orange-400" />
  },
  {
    id: 4,
    title: "Ascend & Upgrade",
    desc: "Loot acquired. Use your rewards to upgrade your financial rig and unlock higher yield tiers.",
    icon: <TrendingUp className="w-8 h-8 text-accent" />
  }
];

const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(1);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Update active step based on scroll (Divided for 4 steps)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.25) setActiveStep(1);
      else if (latest < 0.5) setActiveStep(2);
      else if (latest < 0.75) setActiveStep(3);
      else setActiveStep(4);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} id="how-it-works" className="relative h-[400vh] bg-background">
      
      {/* Section Header - Absolute positioned at top */}
      <div className="absolute top-10 left-0 w-full z-20 px-6 text-center md:text-left md:pl-32">
         <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
            <Target className="text-secondary w-6 h-6 animate-spin-slow" />
            <span className="text-secondary font-mono text-sm tracking-[0.2em] uppercase">Mission Briefing</span>
         </div>
         <h2 className="text-4xl md:text-5xl font-bold font-display">
            How to <span className="text-white">Win the Game</span>
         </h2>
      </div>

      {/* STICKY CONTAINER (Right Side - The Safe) */}
      <div className="sticky top-0 h-screen flex items-center justify-center md:justify-end md:pr-20 lg:pr-32 overflow-hidden pointer-events-none">
        <div className="relative z-10 scale-75 md:scale-100">
           <Safe progress={scrollYProgress} activeStep={activeStep} />
        </div>
        
        {/* Tech Grid Background - Seamless fade at bottom */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
      </div>

      {/* SCROLLING CONTENT (Left Side - Steps) */}
      <div className="absolute top-0 left-0 w-full md:w-1/2 px-6 md:pl-32 pt-[20vh] pb-[20vh]">
        {steps.map((step, index) => (
          <motion.div 
            key={step.id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-30% 0px -30% 0px" }}
            transition={{ duration: 0.5 }}
            className="h-[80vh] flex flex-col justify-center"
          >
            <div className={`relative p-8 rounded-3xl border backdrop-blur-xl transition-all duration-500 ${
              activeStep === step.id 
                ? 'bg-white/5 border-primary/50 shadow-[0_0_30px_rgba(0,240,255,0.1)] scale-100 opacity-100' 
                : 'bg-transparent border-white/5 scale-95 opacity-30 blur-sm'
            }`}>
              {/* Connector Line */}
              {index !== steps.length - 1 && (
                  <div className="absolute left-12 top-full h-[20vh] w-[2px] bg-gradient-to-b from-primary/50 to-transparent -z-10" />
              )}

              <div className="mb-6 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                {step.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 font-display text-white">
                <span className="text-primary/40 mr-2 text-2xl align-top">0{step.id}</span>
                {step.title}
              </h3>
              <p className="text-lg text-gray-400 leading-relaxed max-w-md">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default HowItWorks;