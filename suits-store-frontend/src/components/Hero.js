'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Parallax Effect: Text moves slower than background
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]); 
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]); 

  return (
    <div ref={ref} className="relative h-screen flex items-center justify-center bg-stone-900 overflow-hidden">

      {/* Background (Dark Luxury) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-800 to-stone-950" />

      {/* Animated Text */}
      <motion.div style={{ y: yText, opacity }} className="relative z-10 text-center px-4">
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-amber-500 uppercase tracking-[0.4em] text-xs md:text-sm mb-6 font-medium"
        >
          Est. 2025 • Export Quality
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-8xl font-serif text-stone-100 mb-8 leading-tight"
        >
          The Boski <br /> <span className="italic text-stone-400">Heritage.</span>
        </motion.h1>

        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="bg-white text-stone-900 px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-amber-50 transition shadow-xl"
        >
          Explore Collection
        </motion.button>
      </motion.div>
    </div>
  );
}