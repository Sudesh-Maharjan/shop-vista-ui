
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { cart } from '@/lib/data';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface MainLayoutProps {
  isAuthenticated?: boolean;
  userName?: string;
}

declare global {
  interface Window {
    addToCart: (productId?: number) => void;
  }
}

export function MainLayout({ isAuthenticated = false, userName = 'Guest' }: MainLayoutProps) {
  // Use state to track cart item count for UI updates
  const [cartItemCount, setCartItemCount] = useState(
    cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );
  
  const handleSearchSubmit = (query: string) => {
    // In a real app, this would navigate to search results
    console.log('Search submitted:', query);
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  // Add to cart function that updates the state
  const handleAddToCart = (productId?: number) => {
    setCartItemCount(prev => prev + 1);
    toast.success('Item added to cart');
  };

  // Set global addToCart function
  useEffect(() => {
    window.addToCart = handleAddToCart;
    
    // Cleanup on unmount
    return () => {
      delete window.addToCart;
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        isAuthenticated={isAuthenticated}
        userName={userName}
        cartItemCount={cartItemCount}
        onSearchSubmit={handleSearchSubmit}
      />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
      
      {/* Toast notifications */}
      <Toaster />
      <SonnerToaster position="bottom-right" />
    </div>
  );
}
