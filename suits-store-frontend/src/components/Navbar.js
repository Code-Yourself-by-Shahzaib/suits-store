'use client';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ShoppingBag, Menu, Search } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  // Magic logic: Hide on scroll down, Show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
  });

  return (
    <motion.nav
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 w-full z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-serif font-bold tracking-[0.15em] text-stone-900">
          ROYAL YARD
        </Link>

        {/* Icons */}
        <div className="flex items-center gap-6 text-stone-600">
          <Search className="w-5 h-5 cursor-pointer hover:text-amber-700 transition" />
          <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-amber-700 transition" />
          <Menu className="w-5 h-5 cursor-pointer md:hidden" />
        </div>
      </div>
    </motion.nav>
  );
}