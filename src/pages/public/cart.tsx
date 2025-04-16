
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ChevronRight, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils/formatters';
import { cart, products } from '@/lib/data';

export default function CartPage() {
  const [cartItems, setCartItems] = useState(cart.items);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal + shipping + tax - discount;
  
  // Update item quantity
  const updateQuantity = (variantId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.variantId === variantId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  // Remove item from cart
  const removeItem = (variantId: number) => {
    setCartItems(prev => prev.filter(item => item.variantId !== variantId));
  };
  
  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setPromoApplied(true);
    } else {
      alert('Invalid promo code');
    }
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
          
          {/* Breadcrumbs */}
          <nav className="flex text-sm text-gray-500 mt-2">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-700">Cart</span>
          </nav>
        </div>
        
        {cartItems.length === 0 ? (
          // Empty cart
          <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-2xl mx-auto">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-gray-400" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild size="lg">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          // Cart with items
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'} in Your Cart
                  </h2>
                  
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.variantId} className="flex flex-col sm:flex-row gap-4">
                        {/* Product image */}
                        <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Product details */}
                        <div className="flex-1">
                          <div className="flex flex-wrap justify-between gap-2">
                            <div>
                              <h3 className="font-medium text-gray-900">
                                <Link to={`/products/${products.find(p => p.id === item.productId)?.slug}`} className="hover:text-primary">
                                  {item.name}
                                </Link>
                              </h3>
                              <div className="mt-1 text-sm text-gray-500">
                                {item.color && <span>Color: {item.color}</span>}
                                {item.color && item.size && <span className="mx-1">|</span>}
                                {item.size && <span>Size: {item.size}</span>}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-medium text-gray-900">
                                {formatPrice(item.price)}
                              </span>
                              {item.quantity > 1 && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {formatPrice(item.price)} each
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Quantity controls and remove button */}
                          <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                            <div className="flex items-center border rounded-md">
                              <button
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                                onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-10 text-center">{item.quantity}</span>
                              <button
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button
                              className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                              onClick={() => removeItem(item.variantId)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Cart actions */}
                <div className="bg-gray-50 p-6 flex flex-wrap justify-between gap-4">
                  <Button asChild variant="outline">
                    <Link to="/products" className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : formatPrice(shipping)}
                    </span>
                  </div>
                  
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                
                {/* Promo code */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Promo Code</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 border rounded-md px-3 py-1.5 text-sm"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={applyPromoCode}
                      disabled={promoApplied || !promoCode}
                    >
                      Apply
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-sm text-green-600 mt-1">
                      Promo code applied successfully!
                    </p>
                  )}
                </div>
                
                {/* Checkout button */}
                <div className="mt-6">
                  <Button asChild className="w-full">
                    <Link to="/checkout" className="gap-2">
                      Proceed to Checkout
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                {/* Accepted payment methods */}
                <div className="mt-6">
                  <p className="text-xs text-gray-500 mb-2 text-center">We Accept</p>
                  <div className="flex justify-center gap-2">
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
