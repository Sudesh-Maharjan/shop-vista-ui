
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Would handle newsletter subscription here
    console.log('Newsletter form submitted');
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Company info and newsletter */}
          <div className="md:col-span-5">
            <h2 className="text-2xl font-bold text-white mb-4">ShopVista</h2>
            <p className="mb-4 text-gray-400">
              Your one-stop destination for all your shopping needs. Quality products, 
              incredible prices, and a seamless shopping experience.
            </p>
            
            {/* Newsletter signup */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-2">Subscribe to our newsletter</h3>
              <p className="text-sm text-gray-400 mb-3">
                Get the latest updates on new products and upcoming sales
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/new-arrivals" className="text-gray-400 hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/best-sellers" className="text-gray-400 hover:text-white transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-gray-400 hover:text-white transition-colors">
                  Deals & Discounts
                </Link>
              </li>
              <li>
                <Link to="/clearance" className="text-gray-400 hover:text-white transition-colors">
                  Clearance
                </Link>
              </li>
            </ul>
          </div>

          {/* Account links */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/account/orders" className="text-gray-400 hover:text-white transition-colors">
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/account/profile" className="text-gray-400 hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Support links */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold text-white mb-4">Contact & Support</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5" />
                <span>1234 Market St, Suite 600, San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <span>support@shopvista.com</span>
              </li>
            </ul>
            
            {/* Social media */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Follow us</h3>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ShopVista. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link to="/privacy-policy" className="hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-gray-300">
              Terms of Service
            </Link>
            <Link to="/shipping-policy" className="hover:text-gray-300">
              Shipping Policy
            </Link>
            <Link to="/refund-policy" className="hover:text-gray-300">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
