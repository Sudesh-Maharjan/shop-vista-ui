
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Trash2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { users } from '@/lib/data';

// Form validation schema
const customerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  role: z.enum(['user', 'admin'], { required_error: 'Please select a role' }),
  isActive: z.boolean().default(true),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

const CustomerFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  
  // Initialize form
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'user',
      isActive: true,
    },
  });
  
  // Fetch customer data if editing
  useEffect(() => {
    if (isEditing && id) {
      const customerId = parseInt(id);
      const customer = users.find(u => u.id === customerId);
      
      if (customer) {
        // Update form fields
        form.reset({
          name: customer.name,
          email: customer.email,
          role: customer.role as 'user' | 'admin',
          isActive: customer.isActive !== undefined ? customer.isActive : true,
        });
      } else {
        toast.error('Customer not found');
        navigate('/admin/customers');
      }
    }
  }, [isEditing, id, form, navigate]);
  
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <Form {...form}>
                <form id="customer-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter customer name" />
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
                          <Input {...field} type="email" placeholder="customer@example.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <Select 
                            onValueChange={field.onChange as (value: string) => void}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="user">Customer</SelectItem>
                              <SelectItem value="admin">Administrator</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Access level for this account
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-8">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Active Account</FormLabel>
                            <FormDescription>
                              Account can log in and place orders
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium">{form.watch('name') || 'New Customer'}</h3>
              <p className="text-sm text-gray-500 mt-1">{form.watch('email') || 'customer@example.com'}</p>
              
              {isEditing && (
                <div className="w-full mt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Orders</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Spent</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Member Since</span>
                    <span className="font-medium">Nov 2023</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerFormPage;
