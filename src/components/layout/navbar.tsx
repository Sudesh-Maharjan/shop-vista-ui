import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, ShoppingCart, User, Menu, X, Heart, Bell, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/lib/data';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';

interface NavbarProps {
  isAuthenticated?: boolean;
  userName?: string;
  cartItemCount?: number;
  onSearchSubmit?: (query: string) => void;
}

const sampleNotifications = [
  { id: 1, title: 'Order Shipped', text: 'Your order #12345 has been shipped', time: '5 mins ago', read: false },
  { id: 2, title: 'Price Drop', text: 'A product in your wishlist is now on sale', time: '2 hours ago', read: false },
  { id: 3, title: 'New Feature', text: 'Check out our new recommendation system', time: '1 day ago', read: true },
  { id: 4, title: 'Review Request', text: 'Please review your recent purchase', time: '3 days ago', read: true },
];

export function Navbar({ 
  isAuthenticated = false, 
  userName = 'Guest', 
  cartItemCount = 0,
  onSearchSubmit
}: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [localCartCount, setLocalCartCount] = useState(cartItemCount);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit && searchQuery.trim()) {
      onSearchSubmit(searchQuery);
    }
  };

  const handleAddToCart = () => {
    setLocalCartCount(prev => prev + 1);
    toast.success('Item added to cart');
  };

  window.addToCart = handleAddToCart;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">ShopVista</span>
        </Link>

        <form 
          onSubmit={handleSearchSubmit} 
          className="hidden md:flex flex-1 max-w-md mx-4"
        >
          <div className="relative flex w-full">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-0 top-0 h-full"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </form>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/wishlist">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {sampleNotifications.filter(n => !n.read).length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-white rounded-full">
                        {sampleNotifications.filter(n => !n.read).length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b">
                    <div className="font-medium">Notifications</div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {sampleNotifications.length > 0 ? (
                      <div className="divide-y">
                        {sampleNotifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-4 hover:bg-muted cursor-pointer ${notification.read ? '' : 'bg-muted/50'}`}
                          >
                            <div className="flex justify-between">
                              <h4 className="text-sm font-medium">{notification.title}</h4>
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{notification.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        No new notifications
                      </div>
                    )}
                  </div>
                  <div className="p-2 border-t text-center">
                    <Button variant="ghost" size="sm" className="w-full text-primary text-xs">Mark all as read</Button>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  {localCartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white rounded-full">
                      {localCartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline">{userName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/account/profile" className="w-full cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account/orders" className="w-full cursor-pointer">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account/wishlist" className="w-full cursor-pointer">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/logout" className="w-full cursor-pointer">Logout</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  {localCartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white rounded-full">
                      {localCartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowSearchBar(!showSearchBar)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {localCartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white rounded-full">
                  {localCartCount}
                </Badge>
              )}
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {showSearchBar && (
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearchSubmit} className="flex">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="icon" className="ml-2">
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </div>
      )}

      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <ul className="hidden md:flex items-center space-x-6 py-3 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <li key={category.id}>
                <Link 
                  to={`/category/${category.slug}`}
                  className="text-sm font-medium text-gray-700 hover:text-primary whitespace-nowrap"
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    More Categories
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories.slice(8).map((category) => (
                    <DropdownMenuItem key={category.id} asChild>
                      <Link to={`/category/${category.slug}`} className="w-full cursor-pointer">
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-md">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 pb-2 mb-2 border-b">
                    <User className="h-5 w-5" />
                    <span className="font-medium">Hi, {userName}</span>
                  </div>
                  <Link 
                    to="/account/profile" 
                    className="py-2 text-gray-700 hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/account/orders" 
                    className="py-2 text-gray-700 hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link 
                    to="/account/wishlist" 
                    className="py-2 text-gray-700 hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Wishlist
                  </Link>
                  <Link 
                    to="/logout" 
                    className="py-2 text-gray-700 hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="py-2 text-gray-700 hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="py-2 text-gray-700 hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
              <div className="h-px w-full bg-gray-200 my-2"></div>
              
              <h3 className="font-medium pb-1">Categories</h3>
              {categories.map((category) => (
                <Link 
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="py-2 text-gray-700 hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
