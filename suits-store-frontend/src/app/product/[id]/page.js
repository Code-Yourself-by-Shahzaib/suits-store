'use client';
import { useCart } from '../../../context/CartContext'; // <--- 1. Import
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import { ArrowLeft, Ruler } from 'lucide-react';
import Link from 'next/link';

// Using relative path to be safe
import Navbar from '../../../components/Navbar'; 

const products = {
  1: { name: "Imperial Boski 6lb", price: 12000, desc: "Original 6-pound pure silk Boski with a heavy fall. The choice of elites.", type: "Boski" },
  2: { name: "Sapphire Wool", price: 8500, desc: "Premium winter wool with a soft touch and warm feel. Wrinkle-resistant.", type: "Wool" },
  3: { name: "Egyptian Cotton", price: 5500, desc: "Giza cotton with a stiff finish (Latha style). Perfect for formal occasions.", type: "Cotton" },
  4: { name: "Karandi Soft", price: 4500, desc: "Textured Karandi fabric suitable for mid-season wear.", type: "Karandi" },
  5: { name: "Pashmina Shawl", price: 18000, desc: "Hand-woven pure Pashmina shawl. Extremely warm and lightweight.", type: "Winter" },
  6: { name: "Wash & Wear Executive", price: 3500, desc: "Daily wear fabric. Easy to iron and highly durable.", type: "Daily" },
};

export default function ProductPage() {
  const { addToCart } = useCart(); // <--- 2. GET THE FUNCTION
  
  const params = useParams();
  const id = params?.id; 
  const product = products[id];

  const [option, setOption] = useState('Unstitched'); 
  const [size, setSize] = useState('M'); 

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
      <h1 className="text-2xl font-serif text-red-600 mb-4">Product Not Found</h1>
      <Link href="/" className="underline">Go Back Home</Link>
    </div>
  );

  const finalPrice = option === 'Stitched' ? product.price + 1500 : product.price;

  return (
    <main className="bg-stone-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT: Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
          className="relative h-[500px] lg:h-[600px] bg-stone-200 overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-stone-300 flex items-center justify-center text-stone-500 font-serif text-2xl">
            {product.name} Image
          </div>
          <div className="absolute top-6 left-6">
            <Link href="/" className="flex items-center gap-2 text-stone-600 hover:text-black transition bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
              <ArrowLeft size={20} /> Back
            </Link>
          </div>
        </motion.div>

        {/* RIGHT: Details */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <span className="text-amber-700 uppercase tracking-widest font-bold text-sm mb-2">{product.type}</span>
          <h1 className="text-4xl lg:text-5xl font-serif text-stone-900 mb-4">{product.name}</h1>
          <p className="text-3xl text-stone-800 font-light mb-8">PKR {finalPrice.toLocaleString()}</p>

          <p className="text-stone-600 leading-relaxed mb-10 border-l-2 border-amber-700 pl-4">
            {product.desc}
          </p>

          {/* Toggle */}
          <div className="mb-8">
            <label className="block text-xs font-bold uppercase mb-3 text-stone-500">Select Option</label>
            <div className="flex gap-4">
              {['Unstitched', 'Stitched'].map((type) => (
                <button
                  key={type}
                  onClick={() => setOption(type)}
                  className={`flex-1 py-4 border transition duration-300 ${
                    option === type 
                      ? 'border-stone-900 bg-stone-900 text-white' 
                      : 'border-stone-300 text-stone-500'
                  }`}
                >
                  {type} {type === 'Stitched' && '(+1500)'}
                </button>
              ))}
            </div>
          </div>

          {/* Measurements */}
          <AnimatePresence>
            {option === 'Stitched' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-8 bg-white p-6 border border-stone-200"
              >
                <div className="flex items-center gap-2 mb-4 text-amber-700">
                  <Ruler size={18} />
                  <span className="font-bold text-sm uppercase">Select Size</span>
                </div>
                <div className="flex gap-3 mb-4">
                  {['S', 'M', 'L', 'XL'].map((s) => (
                    <button 
                      key={s} onClick={() => setSize(s)}
                      className={`w-12 h-12 rounded-full border flex items-center justify-center transition ${
                        size === s ? 'bg-amber-700 text-white' : 'border-stone-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. ATTACH THE FUNCTION TO THE BUTTON */}
          <button 
            onClick={() => addToCart(product, option, size)}
            className="w-full bg-stone-900 text-white py-5 text-lg uppercase tracking-[0.2em] hover:bg-amber-700 transition"
          >
            Add to Cart
          </button>
        </motion.div>
      </div>
    </main>
  );
}