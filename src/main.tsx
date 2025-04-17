
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { toast } from 'sonner';

// Add to cart function for global access
declare global {
  interface Window {
    addToCart: () => void;
  }
}

// Default implementation
window.addToCart = () => {
  toast.success('Item added to cart');
};

createRoot(document.getElementById("root")!).render(<App />);
