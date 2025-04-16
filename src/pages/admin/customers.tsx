
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, MoreHorizontal, Mail, ArrowUpDown, User, Calendar, 
  ShoppingBag, DollarSign, UserPlus, Trash2, Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
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
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { toast } from 'sonner';
import { users } from '@/lib/data';
import { formatPrice, formatDate } from '@/lib/utils/formatters';

// Real customer avatar URLs
const customerAvatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=150&h=150&fit=crop",
];

const AdminCustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [joinDateFilter, setJoinDateFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  
  // Helper function to get a consistent avatar URL for a customer based on ID
  const getCustomerAvatar = (customerId: number) => {
    return customerAvatars[customerId % customerAvatars.length];
  };
  
  // Filter users based on search term, role, and join date
  const filteredUsers = users.filter(user => {
    // Search filter (name or email)
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Role filter
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    // Join date filter
    const joinDate = new Date(user.joinDate);
    const now = new Date();
    const isLast30Days = joinDate >= new Date(now.setDate(now.getDate() - 30));
    const isLast90Days = joinDate >= new Date(now.setDate(now.getDate() - 90));
    
    const matchesJoinDate = 
      joinDateFilter === 'all' || 
      (joinDateFilter === 'last30days' && isLast30Days) || 
      (joinDateFilter === 'last90days' && isLast90Days);
    
    return matchesSearch && matchesRole && matchesJoinDate;
  });
  
  // Sort filtered users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortOrder) {
      case 'newest':
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      case 'oldest':
        return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'most-spent':
        return b.totalSpent - a.totalSpent;
      case 'most-orders':
        return b.orders - a.orders;
      default:
        return 0;
    }
  });
  
  const handleSendEmail = (email: string) => {
    toast.success(`Email dialog opened for ${email}`);
  };
  
  const toggleSelectCustomer = (customerId: number) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };
  
  const toggleSelectAll = () => {
    if (selectedCustomers.length === sortedUsers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(sortedUsers.map(user => user.id));
    }
  };
  
  const handleBulkDelete = () => {
    if (selectedCustomers.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedCustomers.length} customers?`)) {
      toast.success(`${selectedCustomers.length} customers deleted successfully`);
      setSelectedCustomers([]);
    }
  };
  
  const handleDeleteCustomer = (customerId: number, customerName: string) => {
    if (window.confirm(`Are you sure you want to delete "${customerName}"?`)) {
      toast.success(`Customer "${customerName}" deleted successfully`);
      // In a real app, this would make an API call to delete the customer
      // Then update the local state
      setSelectedCustomers(prev => prev.filter(id => id !== customerId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
        
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/admin/customers/new">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Customer
            </Link>
          </Button>
          
          {selectedCustomers.length > 0 && (
            <Button 
              variant="outline" 
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleBulkDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          )}
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
                placeholder="Search customers..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            {/* Role Filter */}
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="user">Customers</SelectItem>
                <SelectItem value="admin">Administrators</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Join Date Filter */}
            <Select value={joinDateFilter} onValueChange={setJoinDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Join Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="last90days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Sort Order */}
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest Customers</SelectItem>
                <SelectItem value="oldest">Oldest Customers</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="most-spent">Highest Spent</SelectItem>
                <SelectItem value="most-orders">Most Orders</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Customers Table */}
      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-12 px-4 py-3 text-left">
                  <Checkbox 
                    checked={selectedCustomers.length === sortedUsers.length && sortedUsers.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  <div className="flex items-center gap-1">
                    Name
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  <div className="flex items-center gap-1">
                    Joined
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Role</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                  <div className="flex items-center justify-end gap-1">
                    Orders
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                  <div className="flex items-center justify-end gap-1">
                    Total Spent
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sortedUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Checkbox 
                      checked={selectedCustomers.includes(user.id)}
                      onCheckedChange={() => toggleSelectCustomer(user.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img 
                          src={getCustomerAvatar(user.id)} 
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">{user.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-sm">{formatDate(user.joinDate)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {user.role === 'admin' ? (
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Admin</Badge>
                    ) : (
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Customer</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <ShoppingBag className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{user.orders}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{formatPrice(user.totalSpent)}</span>
                    </div>
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
                          <Link to={`/admin/customers/edit/${user.id}`} className="cursor-pointer">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Customer
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success(`Viewing ${user.name}'s details`)}>
                          <User className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendEmail(user.email)}>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toast.success(`Viewing ${user.name}'s orders`)}>
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          View Orders
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteCustomer(user.id, user.name)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              
              {sortedUsers.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    No customers found. Try adjusting your filters.
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

export default AdminCustomersPage;
