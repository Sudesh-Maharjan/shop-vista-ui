
import { Outlet } from 'react-router-dom';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { cart } from '@/lib/data';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MainLayoutProps {
  isAuthenticated?: boolean;
  userName?: string;
}

export function MainLayout({ isAuthenticated = false, userName = 'Guest' }: MainLayoutProps) {
  // In a real app, this would come from a context or state management
  const cartItemCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  
  const handleSearchSubmit = (query: string) => {
    // In a real app, this would navigate to search results
    console.log('Search submitted:', query);
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

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
