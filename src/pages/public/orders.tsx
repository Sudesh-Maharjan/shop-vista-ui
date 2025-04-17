
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, ChevronRight, Search, Filter, Clock, AlertCircle, CheckCircle, 
  Truck, ShoppingCart, CalendarRange, ArrowUpDown, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatPrice, formatDate } from '@/lib/utils/formatters';
import { orders } from '@/lib/data';

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [periodFilter, setPeriodFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter orders based on search term, period, and tab
  const filteredOrders = orders.filter(order => {
    // Search filter (order ID)
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Period filter
    const orderDate = new Date(order.date);
    const now = new Date();
    let matchesPeriod = true;
    
    if (periodFilter === 'last30days') {
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(now.getDate() - 30);
      matchesPeriod = orderDate >= thirtyDaysAgo;
    } else if (periodFilter === 'last6months') {
      const sixMonthsAgo = new Date(now);
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      matchesPeriod = orderDate >= sixMonthsAgo;
    }
    
    // Tab filter
    const matchesTab = activeTab === 'all' || order.status.toLowerCase() === activeTab.toLowerCase();
    
    return matchesSearch && matchesPeriod && matchesTab;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-blue-500" />;
      case 'processing':
        return <Package className="h-4 w-4 text-amber-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-purple-500" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>;
      case 'shipped':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Shipped</Badge>;
      case 'processing':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Processing</Badge>;
      case 'pending':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">My Orders</h1>
          <p className="text-gray-500 mt-1">
            Track and manage your orders
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">{orders.length}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {orders.filter(order => 
                  ['processing', 'shipped', 'pending'].includes(order.status.toLowerCase())
                ).length}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {orders.filter(order => order.status.toLowerCase() === 'delivered').length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search by order ID..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="last30days">Last 30 Days</SelectItem>
                  <SelectItem value="last6months">Last 6 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid grid-cols-5 h-auto p-1">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <div className="bg-muted py-3 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <span className="font-semibold">{order.id}</span>
                      <div className="flex items-center">
                        <CalendarRange className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {formatDate(order.date)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex items-center mr-3">
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{getStatusBadge(order.status)}</span>
                      </div>
                      
                      <Button asChild variant="ghost" size="sm" className="rounded-full p-0 h-8 w-8">
                        <Link to={`/order-tracking/${order.id}`} className="flex items-center justify-center">
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-0">
                    <div className="p-4 border-b">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                        </p>
                        <Button asChild variant="link" className="text-primary p-0 h-auto">
                          <Link to={`/account/orders/${order.id}`}>
                            View Order Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="font-medium">{formatPrice(order.total)}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Shipping Address</p>
                          <p className="font-medium truncate">
                            {order.shipping.address}, {order.shipping.city}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Payment Method</p>
                          <p className="font-medium">{order.paymentMethod}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h2>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? 'No orders match your search criteria.' 
                  : activeTab !== 'all' 
                    ? `You don't have any ${activeTab} orders.` 
                    : 'You haven\'t placed any orders yet.'}
              </p>
              <Button asChild>
                <Link to="/products">Start Shopping</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersPage;
