
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowRight, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { formatPrice } from '@/lib/utils/formatters';
import { cart, products, shippingMethods } from '@/lib/data';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(cart.items);
  const [promoCode, setPromoCode] = useState('');
  const [selectedShipping, setSelectedShipping] = useState(shippingMethods[0].id);
  const [isApplyingCode, setIsApplyingCode] = useState(false);
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingMethods.find(method => method.id === selectedShipping)?.price || 0;
  const tax = subtotal * 0.085; // Assuming 8.5% tax rate
  const total = subtotal + shipping + tax;
  
  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.productId === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const handleRemoveItem = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.productId !== itemId));
    toast.success('Item removed from cart');
  };
  
  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) return;
    
    setIsApplyingCode(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsApplyingCode(false);
      if (promoCode.toUpperCase() === 'WELCOME10') {
        toast.success('Promo code applied successfully!');
      } else {
        toast.error('Invalid promo code');
      }
    }, 800);
  };
  
  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <div className="ml-auto flex items-center space-x-1 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-gray-700">Cart</span>
        </div>
      </div>
      
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Items in Cart ({cartItems.length})</h2>
              </div>
              
              <div className="divide-y">
                {cartItems.map(item => {
                  // Find the full product data
                  const productDetails = products.find(p => p.id === item.productId);
                  
                  return (
                    <div key={item.productId} className="p-4 flex flex-col sm:flex-row gap-4">
                      <div className="relative aspect-square w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={item.image.replace('/placeholder.svg', 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=300')} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <Link to={`/products/${productDetails?.slug || ''}`} className="text-lg font-medium text-gray-900 hover:text-primary">
                            {item.name}
                          </Link>
                          
                          <button 
                            onClick={() => handleRemoveItem(item.productId)} 
                            className="text-gray-400 hover:text-red-500"
                            aria-label="Remove item"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                        
                        <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-500">
                          {item.color && <span>Color: {item.color}</span>}
                          {item.size && <span>Size: {item.size}</span>}
                        </div>
                        
                        <div className="mt-4 flex flex-wrap justify-between gap-4">
                          <div className="flex items-center border rounded-md">
                            <button 
                              onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="px-2 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            
                            <span className="w-10 text-center">{item.quantity}</span>
                            
                            <button 
                              onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                              className="px-2 py-1 text-gray-600 hover:text-gray-900"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.quantity > 1 && `${formatPrice(item.price)} each`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Promo Code */}
            <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Apply Promo Code</h3>
              <div className="flex gap-2">
                <Input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-grow"
                />
                <Button 
                  onClick={handleApplyPromoCode}
                  disabled={isApplyingCode || !promoCode.trim()}
                >
                  {isApplyingCode ? 'Applying...' : 'Apply'}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Try "WELCOME10" for 10% off your first order.
              </p>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-600">Shipping</span>
                    <div className="space-y-2 pl-2 border-l-2 border-gray-100">
                      {shippingMethods.map(method => (
                        <label key={method.id} className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="shipping"
                              value={method.id}
                              checked={selectedShipping === method.id}
                              onChange={() => setSelectedShipping(method.id)}
                              className="text-primary"
                            />
                            <div>
                              <div>{method.name}</div>
                              <div className="text-xs text-gray-500">{method.estimatedDays}</div>
                            </div>
                          </div>
                          <span>{method.price > 0 ? formatPrice(method.price) : 'Free'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (estimated)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Button 
                    onClick={handleProceedToCheckout}
                    className="w-full"
                    size="lg"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Proceed to Checkout
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/products">
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
                
                <div className="mt-4 text-xs text-gray-500 text-center">
                  <p>We accept:</p>
                  <div className="flex justify-center gap-2 mt-2">
                    <div className="p-1 border rounded">Visa</div>
                    <div className="p-1 border rounded">Mastercard</div>
                    <div className="p-1 border rounded">PayPal</div>
                    <div className="p-1 border rounded">Apple Pay</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
            <ShoppingBag className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet</p>
          <Button asChild>
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
