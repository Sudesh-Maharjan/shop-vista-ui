
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, MoreHorizontal, Eye, Download, ArrowUpDown, 
  Calendar, Clock, AlertCircle, CheckCircle, Truck, Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { toast } from 'sonner';
import { orders } from '@/lib/data';
import { formatPrice, formatDate } from '@/lib/utils/formatters';
import ExportOrdersDialog from '@/components/admin/export-orders-dialog';

// A more comprehensive set of orders
const extendedOrders = [
  ...orders,
  {
    id: "ORD-2023-1099",
    date: "2023-11-25",
    status: "Pending",
    total: 299.99,
    items: [
      { productId: 4, quantity: 1, price: 169.99 },
      { productId: 6, quantity: 2, price: 39.99 }
    ],
    shipping: {
      address: "456 Park Ave, Suite 10",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA"
    },
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-2023-1105",
    date: "2023-11-27",
    status: "Cancelled",
    total: 89.99,
    items: [
      { productId: 7, quantity: 1, price: 79.99 },
      { productId: 9, quantity: 1, price: 29.99 }
    ],
    shipping: {
      address: "789 Oak St",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA"
    },
    paymentMethod: "PayPal"
  },
];

const AdminOrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  
  // Filter orders based on search term, status, and date
  const filteredOrders = extendedOrders.filter(order => {
    // Search filter (order ID or shipping address)
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shipping.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shipping.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    
    // Date filter
    const orderDate = new Date(order.date);
    const now = new Date();
    const isLast7Days = orderDate >= new Date(now.setDate(now.getDate() - 7));
    const isLast30Days = orderDate >= new Date(now.setDate(now.getDate() - 30));
    
    const matchesDate = 
      dateFilter === 'all' || 
      (dateFilter === 'last7days' && isLast7Days) || 
      (dateFilter === 'last30days' && isLast30Days);
    
    return matchesSearch && matchesStatus && matchesDate;
  });
  
  // Sort filtered orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortOrder) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'high-value':
        return b.total - a.total;
      case 'low-value':
        return a.total - b.total;
      default:
        return 0;
    }
  });
  
  const getStatusIcon = (status: string) => {
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
  
  const getStatusBadge = (status: string) => {
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
  
  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    toast.success(`Order ${orderId} updated to ${newStatus}`);
  };
  
  const handleExportOrders = (format: 'csv' | 'json' | 'excel', selection: 'all' | 'filtered' | 'selected') => {
    let exportCount = 0;
    let message = '';
    
    switch (selection) {
      case 'all':
        exportCount = extendedOrders.length;
        message = `Exporting all ${exportCount} orders as ${format.toUpperCase()}`;
        break;
      case 'filtered':
        exportCount = filteredOrders.length;
        message = `Exporting ${exportCount} filtered orders as ${format.toUpperCase()}`;
        break;
      case 'selected':
        exportCount = selectedOrders.length;
        message = `Exporting ${exportCount} selected orders as ${format.toUpperCase()}`;
        break;
    }
    
    toast.success(message);
    
    // In a real app, this would trigger the actual export process
    // For demo purposes, we just show a success message
  };
  
  const toggleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };
  
  const toggleSelectAll = () => {
    if (selectedOrders.length === sortedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(sortedOrders.map(order => order.id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        
        <div className="flex flex-wrap gap-2">
          <ExportOrdersDialog 
            trigger={
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            }
            onExport={handleExportOrders}
            hasFilters={statusFilter !== 'all' || dateFilter !== 'all' || searchTerm !== ''}
            hasSelection={selectedOrders.length > 0}
          />
        </div>
      </div>
      
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search orders or customers..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Order Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Date Filter */}
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Order Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Sort Order */}
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="high-value">Highest Value</SelectItem>
                <SelectItem value="low-value">Lowest Value</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Orders Table */}
      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-12 px-4 py-3 text-left">
                  <Checkbox 
                    checked={selectedOrders.length === sortedOrders.length && sortedOrders.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  <div className="flex items-center gap-1">
                    Order ID
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  <div className="flex items-center gap-1">
                    Date
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                  <div className="flex items-center justify-end gap-1">
                    Total
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Payment</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sortedOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Checkbox 
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={() => toggleSelectOrder(order.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{order.id}</div>
                    <div className="text-xs text-gray-500">{order.items.length} items</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-sm">{formatDate(order.date)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">John Doe</div>
                    <div className="text-xs text-gray-500">{order.shipping.city}, {order.shipping.state}</div>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {formatPrice(order.total)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center">
                      {getStatusBadge(order.status)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-sm">{order.paymentMethod}</span>
                  </td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/orders/${order.id}`} className="cursor-pointer">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, 'Processing')}>
                          <Package className="h-4 w-4 mr-2 text-amber-500" />
                          Mark as Processing
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, 'Shipped')}>
                          <Truck className="h-4 w-4 mr-2 text-blue-500" />
                          Mark as Shipped
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, 'Delivered')}>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          Mark as Delivered
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, 'Cancelled')}>
                          <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                          Mark as Cancelled
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              
              {sortedOrders.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    No orders found. Try adjusting your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AdminOrdersPage;
