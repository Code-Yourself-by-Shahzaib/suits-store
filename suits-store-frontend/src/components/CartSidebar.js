'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const { cart, removeFromCart, isOpen, setIsOpen } = useCart();

  // 1. Calculate Total
  const total = cart.reduce((sum, item) => {
    const price = item.type === 'Stitched' ? item.price + 1500 : item.price;
    return sum + price;
  }, 0);

  // 2. WhatsApp Checkout Logic
  const handleCheckout = () => {
    // Replace this with YOUR phone number (e.g., 923001234567)
    const phoneNumber = "923001234567"; 

    // Create a nice message
    let message = "Hello, I would like to place an order from The Royal Yard:\n\n";

    cart.forEach((item, index) => {
      const itemPrice = item.type === 'Stitched' ? item.price + 1500 : item.price;
      message += `${index + 1}. ${item.name} (${item.type}`;
      if (item.type === 'Stitched') message += ` - Size ${item.size}`;
      message += `) - PKR ${itemPrice}\n`;
    });

    message += `\nTotal Bill: PKR ${total.toLocaleString()}`;
    message += `\n\nPlease confirm my order.`;

    // Open WhatsApp
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />

          {/* Sliding Drawer */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-100 flex justify-between items-center">
              <h2 className="font-serif text-2xl text-stone-900">Your Bag ({cart.length})</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition">
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-stone-400">
                  <ShoppingBag size={48} className="mb-4 opacity-20" />
                  <p>Your bag is empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.cartId} className="flex gap-4">
                    {/* Tiny Image Placeholder */}
                    <div className="w-20 h-24 bg-stone-200 rounded-sm flex-shrink-0" />

                    <div className="flex-1">
                      <h3 className="font-serif text-stone-900">{item.name}</h3>
                      <p className="text-xs text-stone-500 uppercase mt-1">
                        {item.type} {item.type === 'Stitched' && `• Size: ${item.size}`}
                      </p>
                      <p className="text-amber-700 font-bold mt-2">
                        PKR {(item.type === 'Stitched' ? item.price + 1500 : item.price).toLocaleString()}
                      </p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-stone-400 hover:text-red-500 transition self-start"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-stone-50 border-t border-stone-200">
                <div className="flex justify-between mb-4 text-stone-900 font-serif text-xl">
                  <span>Total</span>
                  <span>PKR {total.toLocaleString()}</span>
                </div>
                {/* 3. Button now triggers WhatsApp */}
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 uppercase tracking-widest font-bold transition flex justify-center items-center gap-2"
                >
                   Order via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}