'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link'; // <--- 1. I ADDED THIS IMPORT
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const products = [
  { id: 1, name: "Imperial Boski 6lb", price: "12,000", cat: "Boski" },
  { id: 2, name: "Sapphire Wool", price: "8,500", cat: "Wool" },
  { id: 3, name: "Egyptian Cotton", price: "5,500", cat: "Cotton" },
  { id: 4, name: "Karandi Soft", price: "4,500", cat: "Karandi" },
  { id: 5, name: "Pashmina Shawl", price: "18,000", cat: "Winter" },
  { id: 6, name: "Wash & Wear Executive", price: "3,500", cat: "Daily" },
];

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => { setTimeout(() => setLoading(false), 2200); }, []);

  return (
    <main className="bg-stone-50 min-h-screen">

      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-stone-950 flex items-center justify-center"
          >
            <motion.h1 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
              className="text-white font-serif text-3xl md:text-5xl tracking-[0.3em]"
            >
              ROYAL YARD
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-700 text-xs uppercase tracking-widest font-bold">The Collection</span>
          <h2 className="text-4xl font-serif mt-3 text-stone-900">Finest Fabrics</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((p, i) => (
            /* --- 2. I ADDED THIS LINK WRAPPER --- */
            <Link href={`/product/${p.id}`} key={p.id} className="block group cursor-pointer">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                {/* Image Area */}
                <div className="h-[450px] w-full bg-stone-200 overflow-hidden relative mb-4">
                  <div className="absolute inset-0 bg-stone-300 group-hover:scale-105 transition duration-700" />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-wider font-bold">
                    {p.cat}
                  </span>
                </div>

                {/* Text Area */}
                <div className="text-center">
                  <h3 className="font-serif text-xl text-stone-900 group-hover:text-amber-800 transition">{p.name}</h3>
                  <p className="text-stone-500 text-sm mt-1 font-medium">PKR {p.price}</p>
                </div>
              </motion.div>
            </Link>
            /* ------------------------------------ */
          ))}
        </div>
      </section>

      <footer className="bg-stone-900 text-stone-400 py-16 text-center">
        <h2 className="text-2xl font-serif text-white mb-2">ROYAL YARD</h2>
        <p className="text-xs uppercase tracking-widest opacity-50">Export Quality • Worldwide Shipping</p>
      </footer>
    </main>
  );
}