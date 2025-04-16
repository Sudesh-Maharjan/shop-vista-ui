
import React, { useState } from 'react';
import { Save, Upload, CreditCard, Mail, Globe, BellRing, Shield, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

const AdminSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    storeName: 'ShopVista',
    storeEmail: 'info@shopvista.com',
    storePhone: '+1 (123) 456-7890',
    storeAddress: '123 Main Street, New York, NY 10001',
    logoUrl: '',
    favicon: '',
    currency: 'USD',
    weightUnit: 'kg'
  });
  
  // Payment settings
  const [paymentSettings, setPaymentSettings] = useState({
    allowCashOnDelivery: true,
    allowPayPal: true,
    allowCreditCard: true,
    payPalEmail: 'payments@shopvista.com',
    stripePublishableKey: '',
    stripeSecretKey: '',
    taxRate: '8.5'
  });
  
  // Email settings
  const [emailSettings, setEmailSettings] = useState({
    fromName: 'ShopVista Store',
    fromEmail: 'noreply@shopvista.com',
    smtpHost: 'smtp.example.com',
    smtpPort: '587',
    smtpUser: 'smtp_user',
    smtpPassword: '********',
    enableSsl: true
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    newOrderAdmin: true,
    newOrderCustomer: true,
    orderStatusChangeAdmin: false,
    orderStatusChangeCustomer: true,
    newCustomerRegistration: true,
    lowStockAlert: true,
    newsletterSignup: false
  });
  
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setPaymentSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setEmailSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleToggleNotification = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <Button onClick={handleSaveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="general">
            <Globe className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Payment</span>
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Email</span>
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <BellRing className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your store information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input 
                    id="storeName"
                    name="storeName"
                    value={generalSettings.storeName}
                    onChange={handleGeneralChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Store Email</Label>
                  <Input 
                    id="storeEmail"
                    name="storeEmail"
                    type="email"
                    value={generalSettings.storeEmail}
                    onChange={handleGeneralChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Store Phone</Label>
                  <Input 
                    id="storePhone"
                    name="storePhone"
                    value={generalSettings.storePhone}
                    onChange={handleGeneralChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input 
                    id="currency"
                    name="currency"
                    value={generalSettings.currency}
                    onChange={handleGeneralChange}
                  />
                  <p className="text-xs text-gray-500">Currency code (e.g., USD, EUR, GBP)</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="storeAddress">Store Address</Label>
                <Textarea 
                  id="storeAddress"
                  name="storeAddress"
                  value={generalSettings.storeAddress}
                  onChange={handleGeneralChange}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Store Logo</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="logoUrl"
                      name="logoUrl"
                      value={generalSettings.logoUrl}
                      onChange={handleGeneralChange}
                      placeholder="Upload or enter logo URL"
                    />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="favicon">Favicon</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="favicon"
                      name="favicon"
                      value={generalSettings.favicon}
                      onChange={handleGeneralChange}
                      placeholder="Upload or enter favicon URL"
                    />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize your store's appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <RadioGroup defaultValue="default" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="default" id="theme-default" className="sr-only" />
                    <Label
                      htmlFor="theme-default"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Palette className="mb-2 h-6 w-6" />
                      <span className="text-sm font-medium">Default</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem value="modern" id="theme-modern" className="sr-only" />
                    <Label
                      htmlFor="theme-modern"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Palette className="mb-2 h-6 w-6" />
                      <span className="text-sm font-medium">Modern</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem value="minimal" id="theme-minimal" className="sr-only" />
                    <Label
                      htmlFor="theme-minimal"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Palette className="mb-2 h-6 w-6" />
                      <span className="text-sm font-medium">Minimal</span>
                    </Label>
                  </div>
                </RadioGroup>
                
                <p className="text-xs text-gray-500 mt-2">Custom theme options will be available in the next update.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure payment options for your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowCreditCard" className="text-base">Credit Card</Label>
                    <p className="text-sm text-gray-500">Accept credit card payments through Stripe</p>
                  </div>
                  <Switch 
                    id="allowCreditCard"
                    name="allowCreditCard"
                    checked={paymentSettings.allowCreditCard}
                    onCheckedChange={(checked) => {
                      setPaymentSettings(prev => ({
                        ...prev,
                        allowCreditCard: checked
                      }));
                    }}
                  />
                </div>
                
                {paymentSettings.allowCreditCard && (
                  <div className="ml-6 space-y-3 border-l-2 pl-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="stripePublishableKey">Stripe Publishable Key</Label>
                      <Input 
                        id="stripePublishableKey"
                        name="stripePublishableKey"
                        value={paymentSettings.stripePublishableKey}
                        onChange={handlePaymentChange}
                        placeholder="pk_test_..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stripeSecretKey">Stripe Secret Key</Label>
                      <Input 
                        id="stripeSecretKey"
                        name="stripeSecretKey"
                        type="password"
                        value={paymentSettings.stripeSecretKey}
                        onChange={handlePaymentChange}
                        placeholder="sk_test_..."
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowPayPal" className="text-base">PayPal</Label>
                    <p className="text-sm text-gray-500">Accept payments through PayPal</p>
                  </div>
                  <Switch 
                    id="allowPayPal"
                    name="allowPayPal"
                    checked={paymentSettings.allowPayPal}
                    onCheckedChange={(checked) => {
                      setPaymentSettings(prev => ({
                        ...prev,
                        allowPayPal: checked
                      }));
                    }}
                  />
                </div>
                
                {paymentSettings.allowPayPal && (
                  <div className="ml-6 space-y-2 border-l-2 pl-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="payPalEmail">PayPal Email</Label>
                      <Input 
                        id="payPalEmail"
                        name="payPalEmail"
                        type="email"
                        value={paymentSettings.payPalEmail}
                        onChange={handlePaymentChange}
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowCashOnDelivery" className="text-base">Cash on Delivery</Label>
                    <p className="text-sm text-gray-500">Allow customers to pay when they receive their order</p>
                  </div>
                  <Switch 
                    id="allowCashOnDelivery"
                    name="allowCashOnDelivery"
                    checked={paymentSettings.allowCashOnDelivery}
                    onCheckedChange={(checked) => {
                      setPaymentSettings(prev => ({
                        ...prev,
                        allowCashOnDelivery: checked
                      }));
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
              <CardDescription>Configure tax rates and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                <Input 
                  id="taxRate"
                  name="taxRate"
                  type="number"
                  value={paymentSettings.taxRate}
                  onChange={handlePaymentChange}
                  min="0"
                  max="100"
                  step="0.01"
                />
                <p className="text-xs text-gray-500">This rate will be applied to all products unless specified otherwise</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Email Settings */}
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>Set up email sending for notifications and customer communications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input 
                    id="fromName"
                    name="fromName"
                    value={emailSettings.fromName}
                    onChange={handleEmailChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input 
                    id="fromEmail"
                    name="fromEmail"
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input 
                    id="smtpHost"
                    name="smtpHost"
                    value={emailSettings.smtpHost}
                    onChange={handleEmailChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input 
                    id="smtpPort"
                    name="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">SMTP Username</Label>
                  <Input 
                    id="smtpUser"
                    name="smtpUser"
                    value={emailSettings.smtpUser}
                    onChange={handleEmailChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input 
                    id="smtpPassword"
                    name="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="enableSsl"
                  checked={emailSettings.enableSsl}
                  onCheckedChange={(checked) => {
                    setEmailSettings(prev => ({
                      ...prev,
                      enableSsl: checked
                    }));
                  }}
                />
                <Label htmlFor="enableSsl">Enable SSL/TLS</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast.success('Test email sent')}>
                Send Test Email
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Customize email templates for different notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Email template customization will be available in a future update. 
                  Currently using default templates.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Control which notifications are sent and to whom</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">New Order Notifications</Label>
                    <p className="text-sm text-gray-500">Notify when a new order is placed</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="newOrderAdmin"
                        checked={notificationSettings.newOrderAdmin}
                        onCheckedChange={(checked) => handleToggleNotification('newOrderAdmin', checked)}
                      />
                      <Label htmlFor="newOrderAdmin" className="text-sm">Admin</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="newOrderCustomer"
                        checked={notificationSettings.newOrderCustomer}
                        onCheckedChange={(checked) => handleToggleNotification('newOrderCustomer', checked)}
                      />
                      <Label htmlFor="newOrderCustomer" className="text-sm">Customer</Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Order Status Change</Label>
                    <p className="text-sm text-gray-500">Notify when an order status is updated</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="orderStatusChangeAdmin"
                        checked={notificationSettings.orderStatusChangeAdmin}
                        onCheckedChange={(checked) => handleToggleNotification('orderStatusChangeAdmin', checked)}
                      />
                      <Label htmlFor="orderStatusChangeAdmin" className="text-sm">Admin</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="orderStatusChangeCustomer"
                        checked={notificationSettings.orderStatusChangeCustomer}
                        onCheckedChange={(checked) => handleToggleNotification('orderStatusChangeCustomer', checked)}
                      />
                      <Label htmlFor="orderStatusChangeCustomer" className="text-sm">Customer</Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newCustomerRegistration" className="text-base">New Customer Registration</Label>
                    <p className="text-sm text-gray-500">Notify admin when a new customer registers</p>
                  </div>
                  <Switch 
                    id="newCustomerRegistration"
                    checked={notificationSettings.newCustomerRegistration}
                    onCheckedChange={(checked) => handleToggleNotification('newCustomerRegistration', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="lowStockAlert" className="text-base">Low Stock Alerts</Label>
                    <p className="text-sm text-gray-500">Notify admin when products are running low</p>
                  </div>
                  <Switch 
                    id="lowStockAlert"
                    checked={notificationSettings.lowStockAlert}
                    onCheckedChange={(checked) => handleToggleNotification('lowStockAlert', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newsletterSignup" className="text-base">Newsletter Signup</Label>
                    <p className="text-sm text-gray-500">Notify admin when someone subscribes to the newsletter</p>
                  </div>
                  <Switch 
                    id="newsletterSignup"
                    checked={notificationSettings.newsletterSignup}
                    onCheckedChange={(checked) => handleToggleNotification('newsletterSignup', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Security Notifications</CardTitle>
              <CardDescription>Security-related notification settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4 text-amber-500" />
                      <Label className="text-base">Admin Login Notifications</Label>
                    </div>
                    <p className="text-sm text-gray-500">Send email when an admin user logs in</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4 text-amber-500" />
                      <Label className="text-base">Failed Login Attempts</Label>
                    </div>
                    <p className="text-sm text-gray-500">Send email when there are multiple failed login attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettingsPage;
