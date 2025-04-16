
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ChevronDown, CreditCard, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { formatPrice } from '@/lib/utils/formatters';
import { cart, currentUser, shippingMethods, paymentMethods } from '@/lib/data';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  saveAddress: boolean;
  notes: string;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState('shipping');
  const [selectedAddress, setSelectedAddress] = useState(currentUser.addresses[0].id);
  const [selectedShipping, setSelectedShipping] = useState(shippingMethods[0].id);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    saveAddress: false,
    notes: ''
  });
  const [useNewAddress, setUseNewAddress] = useState(false);
  
  // Calculate totals
  const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingMethods.find(method => method.id === selectedShipping)?.price || 0;
  const tax = subtotal * 0.085; // Assuming 8.5% tax rate
  const total = subtotal + shipping + tax;
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleContinueToPayment = () => {
    if (!useNewAddress && !selectedAddress) {
      toast.error('Please select an address');
      return;
    }
    
    if (useNewAddress) {
      // Validate form
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'country'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
      
      if (missingFields.length > 0) {
        toast.error('Please fill in all required fields');
        return;
      }
    }
    
    setActiveStep('payment');
  };
  
  const handlePlaceOrder = () => {
    // In a real app, this would submit the order
    toast.success('Order placed successfully!');
    
    // Redirect to order confirmation
    setTimeout(() => {
      navigate('/order-confirmation/ORD-2023-1087');
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Checkout</h1>
        <div className="ml-auto flex items-center space-x-1 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/cart" className="hover:text-primary">Cart</Link>
          <span>/</span>
          <span className="text-gray-700">Checkout</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Steps */}
            <div className="border-b">
              <Tabs value={activeStep} className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="shipping" disabled={activeStep === 'payment'}>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white">
                        <span>1</span>
                      </div>
                      <span>Shipping</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="payment" disabled={activeStep === 'shipping'}>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-700">
                        <span>2</span>
                      </div>
                      <span>Payment</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {activeStep === 'shipping' ? (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Shipping Information</h2>
                  
                  {/* Address Selection */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Select Delivery Address</h3>
                    
                    <div className="space-y-3">
                      {currentUser.addresses.map(address => (
                        <div 
                          key={address.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedAddress === address.id && !useNewAddress 
                              ? 'border-primary bg-primary-50' 
                              : 'hover:border-gray-300'
                          }`}
                          onClick={() => {
                            setSelectedAddress(address.id);
                            setUseNewAddress(false);
                          }}
                        >
                          <div className="flex justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                selectedAddress === address.id && !useNewAddress 
                                  ? 'border-primary bg-primary text-white' 
                                  : 'border-gray-300'
                              }`}>
                                {selectedAddress === address.id && !useNewAddress && <Check className="h-3 w-3" />}
                              </div>
                              <div className="font-medium">{address.name}</div>
                            </div>
                            {address.isDefault && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Default</span>
                            )}
                          </div>
                          
                          <div className="mt-2 text-sm text-gray-600 pl-8">
                            <p>{address.street}</p>
                            <p>{address.city}, {address.state} {address.zipCode}</p>
                            <p>{address.country}</p>
                            <p className="mt-1">Phone: {address.phone}</p>
                          </div>
                        </div>
                      ))}
                      
                      {/* New Address Option */}
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          useNewAddress 
                            ? 'border-primary bg-primary-50' 
                            : 'hover:border-gray-300'
                        }`}
                        onClick={() => {
                          setUseNewAddress(true);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            useNewAddress 
                              ? 'border-primary bg-primary text-white' 
                              : 'border-gray-300'
                          }`}>
                            {useNewAddress && <Check className="h-3 w-3" />}
                          </div>
                          <div className="font-medium">Add New Address</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* New Address Form */}
                  {useNewAddress && (
                    <div className="space-y-4 mt-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900">New Address Details</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleFormChange}
                            placeholder="First Name"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleFormChange}
                            placeholder="Last Name"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            placeholder="Email Address"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleFormChange}
                            placeholder="Phone Number"
                            required
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Street Address</Label>
                          <Input 
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleFormChange}
                            placeholder="Street Address"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input 
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleFormChange}
                            placeholder="City"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="state">State/Province</Label>
                          <Input 
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleFormChange}
                            placeholder="State/Province"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                          <Input 
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleFormChange}
                            placeholder="ZIP Code"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Input 
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleFormChange}
                            placeholder="Country"
                            required
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="saveAddress"
                              name="saveAddress"
                              checked={formData.saveAddress}
                              onChange={handleFormChange}
                              className="rounded text-primary"
                            />
                            <Label htmlFor="saveAddress">Save address for future orders</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Shipping Methods */}
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Shipping Method</h3>
                    
                    <RadioGroup value={String(selectedShipping)} onValueChange={(val) => setSelectedShipping(Number(val))}>
                      {shippingMethods.map(method => (
                        <div 
                          key={method.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors mb-3 ${
                            selectedShipping === method.id 
                              ? 'border-primary bg-primary-50' 
                              : 'hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start">
                            <RadioGroupItem value={String(method.id)} id={`shipping-${method.id}`} className="mt-1" />
                            
                            <div className="ml-3 flex-grow">
                              <Label 
                                htmlFor={`shipping-${method.id}`}
                                className="flex justify-between cursor-pointer"
                              >
                                <div>
                                  <div className="font-medium">{method.name}</div>
                                  <div className="text-sm text-gray-500">{method.estimatedDays}</div>
                                </div>
                                <div className="font-medium">
                                  {method.price > 0 ? formatPrice(method.price) : 'Free'}
                                </div>
                              </Label>
                              
                              {method.minimumOrder > 0 && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Free shipping available for orders over {formatPrice(method.minimumOrder)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  
                  {/* Order Notes */}
                  <div>
                    <Label htmlFor="notes">Order Notes (Optional)</Label>
                    <Textarea 
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleFormChange}
                      placeholder="Special instructions for delivery or order"
                      className="h-24"
                    />
                  </div>
                  
                  {/* Continue Button */}
                  <div className="pt-4">
                    <Button onClick={handleContinueToPayment} className="w-full sm:w-auto" size="lg">
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
                  
                  {/* Payment Methods */}
                  <div className="space-y-3">
                    <RadioGroup value={String(selectedPayment)} onValueChange={(val) => setSelectedPayment(Number(val))}>
                      {paymentMethods.map(method => (
                        <div 
                          key={method.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedPayment === method.id 
                              ? 'border-primary bg-primary-50' 
                              : 'hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <RadioGroupItem value={String(method.id)} id={`payment-${method.id}`} />
                            
                            <div className="ml-3 flex items-center justify-between w-full">
                              <Label 
                                htmlFor={`payment-${method.id}`}
                                className="cursor-pointer font-medium"
                              >
                                {method.name}
                              </Label>
                              
                              <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                                <span className="text-xs">{method.icon}</span>
                              </div>
                            </div>
                          </div>
                          
                          {selectedPayment === method.id && method.id === 1 && (
                            <div className="mt-4 space-y-3 pl-7">
                              <div>
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label htmlFor="expiry">Expiry Date</Label>
                                  <Input id="expiry" placeholder="MM/YY" />
                                </div>
                                <div>
                                  <Label htmlFor="cvc">CVC</Label>
                                  <Input id="cvc" placeholder="123" />
                                </div>
                              </div>
                              
                              <div>
                                <Label htmlFor="nameOnCard">Name on Card</Label>
                                <Input id="nameOnCard" placeholder="John Doe" />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  
                  {/* Billing Address */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Billing Address</h3>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="sameBilling" 
                        checked={true} 
                        className="rounded text-primary"
                      />
                      <Label htmlFor="sameBilling">Same as shipping address</Label>
                    </div>
                  </div>
                  
                  {/* Place Order Button */}
                  <div className="pt-4 flex flex-wrap gap-3">
                    <Button 
                      onClick={handlePlaceOrder} 
                      className="w-full sm:w-auto"
                      size="lg"
                    >
                      Place Order
                    </Button>
                    
                    <Button
                      onClick={() => setActiveStep('shipping')}
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      Back to Shipping
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              {/* Items */}
              <div className="max-h-80 overflow-y-auto mb-4">
                {cart.items.map(item => (
                  <div key={item.productId} className="flex gap-3 py-3 border-b">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                      <img 
                        src={item.image.replace('/placeholder.svg', 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=300')} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.color && <span>Color: {item.color}</span>}
                        {item.size && <span> • Size: {item.size}</span>}
                      </div>
                      <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping > 0 ? formatPrice(shipping) : 'Free'}</span>
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
              
              {/* Benefits */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="h-4 w-4" />
                  <span>Free shipping on orders over $150</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>Secure payment processing</span>
                </div>
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
    </div>
  );
};

export default CheckoutPage;
