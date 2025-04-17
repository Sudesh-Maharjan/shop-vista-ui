
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Save, Trash2, User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { customers } from '@/lib/data';

// Extended customer type for this form
interface ExtendedCustomer {
  id: number;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  orders: number;
  totalSpent: number;
  isActive?: boolean; // Add the missing property
  phone?: string;
  address?: string;
  notes?: string;
}

// Form validation schema
const customerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  role: z.string(),
  phone: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
  isActive: z.boolean().default(true),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

const CustomerFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  
  // Sample avatar images
  const avatarImageUrls = [
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1546456073-92b9f0a8d413?w=150&h=150&fit=crop&crop=faces"
  ];
  
  // Initialize form
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'customer',
      phone: '',
      address: '',
      notes: '',
      isActive: true,
    },
  });
  
  // Add customer data to customers array with isActive property
  const extendedCustomers: ExtendedCustomer[] = customers.map(customer => ({
    ...customer,
    isActive: true, // Default to true for existing customers
    phone: '+1 (555) 123-' + (4000 + customer.id),
    address: '123 Main St, City, State, Zip',
    notes: ''
  }));
  
  // Fetch customer data if editing
  useEffect(() => {
    if (isEditing && id) {
      const customerId = parseInt(id);
      const customer = extendedCustomers.find(c => c.id === customerId);
      
      if (customer) {
        // Update form fields
        form.reset({
          name: customer.name,
          email: customer.email,
          role: customer.role,
          phone: customer.phone || '',
          address: customer.address || '',
          notes: customer.notes || '',
          isActive: customer.isActive !== undefined ? customer.isActive : true,
        });
      } else {
        toast.error('Customer not found');
        navigate('/admin/customers');
      }
    }
  }, [isEditing, id, form, navigate, extendedCustomers]);
  
  // Handle form submission
  const onSubmit = (data: CustomerFormValues) => {
    // For a real app, this would submit data to an API
    console.log('Customer data submitted:', data);
    
    toast.success(isEditing ? 'Customer updated successfully' : 'Customer created successfully');
    navigate('/admin/customers');
  };
  
  // Handle delete customer
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      // In a real app, this would make an API call
      toast.success('Customer deleted successfully');
      navigate('/admin/customers');
    }
  };

  // Choose a random avatar
  const randomAvatar = avatarImageUrls[Math.floor(Math.random() * avatarImageUrls.length)];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/admin/customers')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Customers
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            {isEditing ? 'Edit Customer' : 'Add New Customer'}
          </h1>
        </div>
        
        <div className="flex gap-2">
          {isEditing && (
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Customer
            </Button>
          )}
          <Button type="submit" form="customer-form">
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? 'Update Customer' : 'Create Customer'}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main customer information */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <Form {...form}>
                <form id="customer-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={randomAvatar} />
                      <AvatarFallback>
                        <User className="h-10 w-10" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-medium">{isEditing ? form.getValues('name') : 'New Customer'}</h3>
                      <p className="text-sm text-gray-500">{isEditing ? form.getValues('email') : 'Enter customer details'}</p>
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter customer's full name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="Enter customer's email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter customer's phone number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer Role</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="customer">Regular Customer</SelectItem>
                              <SelectItem value="wholesale">Wholesale Customer</SelectItem>
                              <SelectItem value="vip">VIP Customer</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Enter customer's address" 
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Any additional notes about this customer" 
                            rows={4}
                          />
                        </FormControl>
                        <FormDescription>
                          Internal notes about this customer (not visible to the customer)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        {/* Customer status */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Customer Status</h3>
              
              <Form {...form}>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Active Account</FormLabel>
                          <FormDescription>
                            Customer can login and place orders if checked
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  {isEditing && (
                    <>
                      <Separator className="my-4" />
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Orders</h4>
                        <div className="text-2xl font-bold">
                          {customers.find(c => c.id === parseInt(id as string))?.orders || 0}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Total Spent</h4>
                        <div className="text-2xl font-bold">
                          ${customers.find(c => c.id === parseInt(id as string))?.totalSpent.toFixed(2) || '0.00'}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Customer Since</h4>
                        <div className="text-sm">
                          {customers.find(c => c.id === parseInt(id as string))?.joinDate || 'N/A'}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerFormPage;
