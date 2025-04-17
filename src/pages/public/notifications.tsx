
import React, { useState } from 'react';
import { Bell, Check, Trash2, Clock, Tag, Package, CreditCard, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Sample notifications data
const initialNotifications = [
  {
    id: 1,
    type: 'order',
    title: 'Order Shipped',
    text: 'Your order #ORD-2023-1089 has been shipped and will arrive in 2-3 business days.',
    time: '5 minutes ago',
    read: false,
    actionText: 'Track Order',
    actionLink: '/order-tracking/ORD-2023-1089',
    icon: <Package className="w-6 h-6 text-blue-500" />
  },
  {
    id: 2,
    type: 'promo',
    title: 'Weekend Sale!',
    text: 'Enjoy 25% off on all electronics this weekend. Use code WEEKEND25 at checkout.',
    time: '2 hours ago',
    read: false,
    actionText: 'Shop Now',
    actionLink: '/products',
    icon: <Tag className="w-6 h-6 text-green-500" />
  },
  {
    id: 3,
    type: 'order',
    title: 'Payment Confirmed',
    text: 'Your payment for order #ORD-2023-1075 has been confirmed. Thank you for your purchase!',
    time: '1 day ago',
    read: true,
    actionText: 'View Order',
    actionLink: '/account/orders/ORD-2023-1075',
    icon: <CreditCard className="w-6 h-6 text-purple-500" />
  },
  {
    id: 4,
    type: 'account',
    title: 'Profile Updated',
    text: 'Your account information has been successfully updated.',
    time: '3 days ago',
    read: true,
    actionText: 'View Profile',
    actionLink: '/account/profile',
    icon: <Info className="w-6 h-6 text-indigo-500" />
  },
  {
    id: 5,
    type: 'promo',
    title: 'New Collection Arrived',
    text: 'Check out our latest summer collection with exciting new designs and colors.',
    time: '5 days ago',
    read: true,
    actionText: 'Explore',
    actionLink: '/category/summer-collection',
    icon: <Tag className="w-6 h-6 text-pink-500" />
  },
  {
    id: 6,
    type: 'order',
    title: 'Order Delivered',
    text: 'Your order #ORD-2023-1065 has been delivered. We hope you enjoy your purchase!',
    time: '1 week ago',
    read: true,
    actionText: 'Write Review',
    actionLink: '/account/orders/ORD-2023-1065',
    icon: <Package className="w-6 h-6 text-green-500" />
  },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState('all');
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);
  
  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
    toast.success('Notification marked as read');
  };
  
  const handleDeleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast.success('Notification deleted');
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast.success('All notifications marked as read');
  };
  
  const handleClearAll = () => {
    setNotifications([]);
    toast.success('All notifications cleared');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Notifications</h1>
          <p className="text-gray-500 mt-1">
            Stay updated with your orders, account activity, and promotions
          </p>
        </div>
        
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <Check className="h-4 w-4 mr-2" />
              Mark All as Read
            </Button>
          )}
          
          <Button variant="outline" onClick={handleClearAll} className="text-destructive hover:bg-destructive/10">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid grid-cols-4 md:w-[400px]">
          <TabsTrigger value="all" className="relative">
            All
            {unreadCount > 0 && (
              <Badge className="ml-1 h-5 flex items-center justify-center absolute -top-2 -right-2 bg-primary text-white rounded-full">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="order">Orders</TabsTrigger>
          <TabsTrigger value="promo">Promos</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="p-0">
              {filteredNotifications.length > 0 ? (
                <div className="divide-y">
                  {filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 ${notification.read ? '' : 'bg-gray-50'}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {notification.icon}
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-gray-900">
                              {notification.title}
                              {!notification.read && (
                                <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-600 border-blue-200">
                                  New
                                </Badge>
                              )}
                            </h3>
                            <span className="text-sm text-gray-500 whitespace-nowrap">
                              <Clock className="h-3 w-3 inline mr-1" />
                              {notification.time}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 my-1">{notification.text}</p>
                          
                          <div className="flex items-center gap-4 mt-2">
                            <Button 
                              variant="link" 
                              className="p-0 h-auto text-primary" 
                              asChild
                            >
                              <a href={notification.actionLink}>{notification.actionText}</a>
                            </Button>
                            
                            <Separator orientation="vertical" className="h-4" />
                            
                            {!notification.read ? (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-auto p-0 text-gray-500 hover:text-blue-600"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                Mark as read
                              </Button>
                            ) : (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-auto p-0 text-gray-500 hover:text-red-600"
                                onClick={() => handleDeleteNotification(notification.id)}
                              >
                                Delete
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                    <Bell className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No notifications
                  </h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    {activeTab === 'all' 
                      ? 'You don\'t have any notifications at the moment.' 
                      : `You don't have any ${activeTab} notifications at the moment.`}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsPage;
