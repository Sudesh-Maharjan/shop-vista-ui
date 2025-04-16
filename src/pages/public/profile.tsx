
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, ShoppingBag, Heart, MapPin, Lock, LogOut, Check, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { currentUser, orders } from '@/lib/data';
import { formatPrice, formatDate } from '@/lib/utils/formatters';

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: "555-123-4567",
  });
  
  // Get tab from URL parameters or default to 'profile'
  const searchParams = new URLSearchParams(location.search);
  const defaultTab = searchParams.get('tab') || 'profile';
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/account/profile?tab=${value}`);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveProfile = () => {
    // In a real app, this would update the user profile
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };
  
  const handleLogout = () => {
    // In a real app, this would handle logout
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Account</h1>
        <div className="ml-auto flex items-center space-x-1 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-gray-700">Account</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">{currentUser.name}</h2>
                <p className="text-gray-500 text-sm">{currentUser.email}</p>
              </div>
              
              <Separator className="mb-4" />
              
              <nav className="space-y-1">
                <TabsList className="flex flex-col h-auto bg-transparent p-0 w-full">
                  <TabsTrigger
                    value="profile"
                    onClick={() => handleTabChange('profile')}
                    className={`justify-start w-full px-3 py-2 text-left ${
                      activeTab === 'profile' 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span>Profile Information</span>
                  </TabsTrigger>
                  
                  <TabsTrigger
                    value="orders"
                    onClick={() => handleTabChange('orders')}
                    className={`justify-start w-full px-3 py-2 text-left ${
                      activeTab === 'orders' 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    <span>Orders</span>
                  </TabsTrigger>
                  
                  <TabsTrigger
                    value="addresses"
                    onClick={() => handleTabChange('addresses')}
                    className={`justify-start w-full px-3 py-2 text-left ${
                      activeTab === 'addresses' 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Addresses</span>
                  </TabsTrigger>
                  
                  <TabsTrigger
                    value="wishlist"
                    onClick={() => handleTabChange('wishlist')}
                    className={`justify-start w-full px-3 py-2 text-left ${
                      activeTab === 'wishlist' 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    <span>Wishlist</span>
                  </TabsTrigger>
                  
                  <TabsTrigger
                    value="password"
                    onClick={() => handleTabChange('password')}
                    className={`justify-start w-full px-3 py-2 text-left ${
                      activeTab === 'password' 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    <span>Change Password</span>
                  </TabsTrigger>
                </TabsList>
              </nav>
              
              <Separator className="my-4" />
              
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} className="w-full">
            {/* Profile Information */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Profile Information</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Save
                        </>
                      ) : (
                        <>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveProfile();
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{formData.name}</div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email Address"
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{formData.email}</div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{formData.phone}</div>
                        )}
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="pt-4">
                        <Button 
                          type="submit"
                        >
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>My Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  {orders.length > 0 ? (
                    <div className="divide-y">
                      {orders.map(order => (
                        <div key={order.id} className="py-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  order.status === 'Delivered' 
                                    ? 'bg-green-100 text-green-800' 
                                    : order.status === 'Shipped' 
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500">Placed on {formatDate(order.date)}</p>
                            </div>
                            
                            <div className="mt-2 md:mt-0">
                              <Button 
                                asChild
                                variant="outline" 
                                size="sm"
                              >
                                <Link to={`/account/orders/${order.id}`}>
                                  View Details
                                </Link>
                              </Button>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-md mt-2">
                            <div className="text-sm">
                              <span className="font-medium">Total:</span> {formatPrice(order.total)}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Items:</span> {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        <ShoppingBag className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
                      <p className="text-gray-500 mb-3">When you place orders, they will appear here.</p>
                      <Button asChild>
                        <Link to="/products">Start Shopping</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Addresses Tab */}
            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>My Addresses</CardTitle>
                    <Button size="sm">
                      Add New Address
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentUser.addresses.map(address => (
                      <div 
                        key={address.id} 
                        className="border rounded-lg p-4 relative"
                      >
                        {address.isDefault && (
                          <span className="absolute top-2 right-2 bg-primary-50 text-primary text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                        
                        <h3 className="font-medium">{address.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.street}<br />
                          {address.city}, {address.state} {address.zipCode}<br />
                          {address.country}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Phone: {address.phone}
                        </p>
                        
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          {!address.isDefault && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-gray-500"
                            >
                              Set as Default
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <Button 
                asChild
                variant="outline" 
                className="mb-4"
              >
                <Link to="/wishlist">
                  <Heart className="h-4 w-4 mr-2" />
                  Go to Wishlist
                </Link>
              </Button>
            </TabsContent>
            
            {/* Change Password Tab */}
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input 
                        id="currentPassword"
                        type="password"
                        placeholder="Current Password"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input 
                        id="newPassword"
                        type="password"
                        placeholder="New Password"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input 
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm New Password"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button onClick={() => toast.success('Password changed successfully')}>
                        Update Password
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
