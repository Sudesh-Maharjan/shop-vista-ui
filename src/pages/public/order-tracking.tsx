
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Package, Truck, MapPin, Check, ChevronRight, Calendar, Clock, Search 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from '@/components/ui/separator';

// Sample shipment tracking data
const shipmentData = {
  orderNumber: "ORD-12345",
  orderDate: "April 12, 2025",
  estimatedDelivery: "April 18, 2025",
  currentStatus: "In Transit",
  currentLocation: "Chicago, IL",
  trackingNumber: "TRK-9876543210",
  carrier: "FastShip Express",
  items: [
    { name: "Wireless Headphones", quantity: 1, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&q=80" },
    { name: "Smartwatch Pro", quantity: 1, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=300&q=80" },
  ],
  trackingHistory: [
    {
      status: "Delivered",
      location: "Your Address, NY",
      date: "April 18, 2025",
      time: "14:35",
      completed: false,
    },
    {
      status: "Out for Delivery",
      location: "Local Delivery Facility, NY",
      date: "April 18, 2025",
      time: "08:15",
      completed: false,
    },
    {
      status: "Arrived at Local Facility",
      location: "New York Distribution Center, NY",
      date: "April 17, 2025",
      time: "22:40",
      completed: true,
    },
    {
      status: "In Transit",
      location: "Chicago Sorting Center, IL",
      date: "April 16, 2025",
      time: "15:22",
      completed: true,
    },
    {
      status: "Shipped",
      location: "Warehouse, CA",
      date: "April 14, 2025",
      time: "09:10",
      completed: true,
    },
    {
      status: "Order Processed",
      location: "Online",
      date: "April 13, 2025",
      time: "11:30",
      completed: true,
    },
    {
      status: "Order Placed",
      location: "Online",
      date: "April 12, 2025",
      time: "16:45",
      completed: true,
    },
  ]
};

// Calculate progress percentage based on completed steps
const calculateProgress = (steps: typeof shipmentData.trackingHistory) => {
  const completedSteps = steps.filter(step => step.completed).length;
  return (completedSteps / steps.length) * 100;
};

const OrderTrackingPage = () => {
  const { id } = useParams<{ id: string }>();
  const [trackingNumber, setTrackingNumber] = useState(id || "");
  const [isTrackingFound, setIsTrackingFound] = useState(!!id);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsTrackingFound(true);
    }, 1000);
  };
  
  const progressPercentage = calculateProgress(shipmentData.trackingHistory);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/account/orders">Orders</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Track Order</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Track Your Order</h1>
          <p className="text-muted-foreground">Enter your order number or tracking number to see the current status</p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleTrackOrder} className="flex gap-4">
              <Input 
                placeholder="Enter tracking number or order ID" 
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !trackingNumber.trim()}>
                {isLoading ? "Searching..." : "Track Order"}
                <Search className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {isTrackingFound && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Shipment Details</CardTitle>
                <CardDescription>Order #{shipmentData.orderNumber}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Order Date</span>
                    <span className="font-medium">{shipmentData.orderDate}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Estimated Delivery</span>
                    <span className="font-medium">{shipmentData.estimatedDelivery}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Carrier</span>
                    <span className="font-medium">{shipmentData.carrier}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Items in this shipment</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {shipmentData.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded overflow-hidden bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-4">Shipment Progress</h3>
                  
                  <div className="relative mb-8">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div 
                        style={{ width: `${progressPercentage}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>Order Placed</span>
                      <span>Order Shipped</span>
                      <span>Delivered</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {shipmentData.trackingHistory.map((step, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4 flex flex-col items-center">
                          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step.completed ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
                            {step.completed ? <Check className="h-4 w-4" /> : index === 0 ? <Clock className="h-4 w-4" /> : null}
                          </div>
                          {index < shipmentData.trackingHistory.length - 1 && (
                            <div className={`h-full w-0.5 ${step.completed ? 'bg-primary' : 'bg-gray-200'}`}></div>
                          )}
                        </div>
                        <div className="pb-8">
                          <div className="flex items-baseline">
                            <p className="font-medium">{step.status}</p>
                            <div className="ml-auto flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              {step.date} • {step.time}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {step.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Contact Support</Button>
                <Button>
                  View Order Details
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage;
