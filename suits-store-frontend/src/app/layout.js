import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../context/CartContext'; // <--- NEW
import CartSidebar from '../components/CartSidebar';   // <--- NEW

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: 'THE ROYAL YARD',
  description: 'Premium Boski & Wool',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        <CartProvider>
          <CartSidebar /> 
          {children}
        </CartProvider>
      </body>
    </html>
  );
}