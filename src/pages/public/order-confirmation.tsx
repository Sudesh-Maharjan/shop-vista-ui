
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle, Printer, Truck, Calendar, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPrice, formatDate } from '@/lib/utils/formatters';
import { orders, products, shippingMethods } from '@/lib/data';

const OrderConfirmationPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the order data
  const order = orders.find(o => o.id === id) || orders[0]; // Fallback to first order if not found
  
  // Get full product details for each item
  const orderItems = order.items.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product
    };
  });
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
                <p className="text-gray-500">Order #{order.id}</p>
                <p className="text-gray-500">Placed on {formatDate(order.date)}</p>
              </div>
              
              <div className="mt-3 md:mt-0">
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print Receipt
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Shipping Address</h3>
                <p className="text-gray-600">
                  {order.shipping.address}<br />
                  {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}<br />
                  {order.shipping.country}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Payment Method</h3>
                <p className="text-gray-600">{order.paymentMethod}</p>
                
                <h3 className="font-medium text-gray-900 mt-3 mb-1">Contact Information</h3>
                <p className="text-gray-600">{currentUser.email}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="font-medium">Estimated Delivery</span>
                </div>
                <span className="text-gray-700">
                  {formatDate(new Date(new Date(order.date).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString())}
                </span>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>Your order is currently being processed and will be shipped soon.</p>
                <p className="mt-1">
                  You will receive a shipping confirmation email with tracking information once your order ships.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Order Items</h3>
              
              <div className="divide-y border-t border-b">
                {orderItems.map(item => {
                  const product = item.product;
                  return (
                    <div key={item.productId} className="py-4 flex gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={product?.images[0].replace('/placeholder.svg', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300')} 
                          alt={product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{product?.name}</h4>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                            <p className="text-sm text-gray-500">{formatPrice(item.price)} each</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(order.total * 0.9)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{formatPrice(15)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>{formatPrice(order.total * 0.1)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button asChild>
            <Link to="/account/orders">
              <ShoppingBag className="h-4 w-4 mr-2" />
              View All Orders
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link to="/products">
              Continue Shopping
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
