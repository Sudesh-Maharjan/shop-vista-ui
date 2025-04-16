
import React, { useState } from 'react';
import { 
  Plus, Search, Edit, Trash2, Copy, MoreHorizontal, Check, X, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Sample coupons data
const coupons = [
  { 
    id: 1, 
    code: 'SUMMER20', 
    discountType: 'percentage', 
    discountValue: 20, 
    validFrom: '2025-05-01', 
    validTo: '2025-06-30', 
    minOrderValue: 50, 
    isActive: true, 
    usageLimit: 100, 
    usageCount: 42,
    products: 'All Products',
    categories: 'All Categories'
  },
  { 
    id: 2, 
    code: 'WELCOME10', 
    discountType: 'percentage', 
    discountValue: 10, 
    validFrom: '2025-01-01', 
    validTo: '2025-12-31', 
    minOrderValue: 0, 
    isActive: true, 
    usageLimit: null, 
    usageCount: 213,
    products: 'All Products',
    categories: 'All Categories'
  },
  { 
    id: 3, 
    code: 'FREESHIP', 
    discountType: 'fixed', 
    discountValue: 10, 
    validFrom: '2025-04-01', 
    validTo: '2025-04-30', 
    minOrderValue: 75, 
    isActive: true, 
    usageLimit: 500, 
    usageCount: 182,
    products: 'All Products',
    categories: 'All Categories'
  },
  { 
    id: 4, 
    code: 'FLASH50', 
    discountType: 'percentage', 
    discountValue: 50, 
    validFrom: '2025-03-15', 
    validTo: '2025-03-20', 
    minOrderValue: 100, 
    isActive: false, 
    usageLimit: 200, 
    usageCount: 200,
    products: 'Electronics',
    categories: 'Electronics'
  },
  { 
    id: 5, 
    code: 'SPRING15', 
    discountType: 'percentage', 
    discountValue: 15, 
    validFrom: '2025-03-01', 
    validTo: '2025-05-31', 
    minOrderValue: 25, 
    isActive: true, 
    usageLimit: 300, 
    usageCount: 78,
    products: 'All Products',
    categories: 'Clothing, Shoes'
  }
];

// Coupon form validation schema
const couponFormSchema = z.object({
  code: z.string().min(3, { message: 'Coupon code must be at least 3 characters' }).toUpperCase(),
  discountType: z.enum(['percentage', 'fixed']),
  discountValue: z.coerce.number().positive({ message: 'Discount value must be positive' }),
  validFrom: z.string().min(1, { message: 'Valid from date is required' }),
  validTo: z.string().min(1, { message: 'Valid to date is required' }),
  minOrderValue: z.coerce.number().nonnegative({ message: 'Min order value must be 0 or positive' }),
  isActive: z.boolean().default(true),
  usageLimit: z.coerce.number().nonnegative().nullable(),
  categories: z.string().optional(),
  products: z.string().optional(),
});

type CouponFormValues = z.infer<typeof couponFormSchema>;

const AdminCouponsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCoupon, setEditingCoupon] = useState<any | null>(null);
  const [couponDialogOpen, setCouponDialogOpen] = useState(false);
  
  // Filter coupons based on search term
  const filteredCoupons = coupons.filter(coupon => 
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Initialize form
  const form = useForm<CouponFormValues>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      code: '',
      discountType: 'percentage',
      discountValue: 0,
      validFrom: new Date().toISOString().split('T')[0],
      validTo: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
      minOrderValue: 0,
      isActive: true,
      usageLimit: null,
      categories: 'All Categories',
      products: 'All Products',
    },
  });
  
  // Handle form submission
  const onSubmit = (data: CouponFormValues) => {
    console.log('Form data:', data);
    
    if (editingCoupon) {
      toast.success(`Coupon "${data.code}" updated successfully`);
    } else {
      toast.success(`Coupon "${data.code}" created successfully`);
    }
    
    setEditingCoupon(null);
    setCouponDialogOpen(false);
    form.reset();
  };
  
  // Open dialog for new coupon
  const handleAddCoupon = () => {
    setEditingCoupon(null);
    form.reset();
    setCouponDialogOpen(true);
  };
  
  // Open dialog for editing coupon
  const handleEditCoupon = (coupon: any) => {
    setEditingCoupon(coupon);
    form.reset({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      validFrom: coupon.validFrom,
      validTo: coupon.validTo,
      minOrderValue: coupon.minOrderValue,
      isActive: coupon.isActive,
      usageLimit: coupon.usageLimit,
      categories: coupon.categories,
      products: coupon.products,
    });
    setCouponDialogOpen(true);
  };
  
  // Handle delete coupon
  const handleDeleteCoupon = (id: number, code: string) => {
    if (window.confirm(`Are you sure you want to delete coupon "${code}"?`)) {
      toast.success(`Coupon "${code}" deleted successfully`);
    }
  };
  
  // Handle duplicate coupon
  const handleDuplicateCoupon = (coupon: any) => {
    const newCode = `${coupon.code}_COPY`;
    toast.success(`Coupon duplicated as "${newCode}"`);
  };
  
  // Handle discount type select change
  const handleSelectChange = (value: 'percentage' | 'fixed') => {
    form.setValue('discountType', value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Coupons</h1>
        
        <Button onClick={handleAddCoupon}>
          <Plus className="h-4 w-4 mr-2" />
          Add Coupon
        </Button>
      </div>
      
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search coupons..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Coupons Table */}
      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Code</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Discount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Min Order</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Validity</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Usage</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredCoupons.map(coupon => (
                <tr key={coupon.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium">{coupon.code}</div>
                    <div className="text-xs text-gray-500">
                      {coupon.categories === 'All Categories' ? 'All Categories' : `Limited Categories`}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {coupon.discountType === 'percentage' ? (
                      <span>{coupon.discountValue}% off</span>
                    ) : (
                      <span>${coupon.discountValue} off</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {coupon.minOrderValue > 0 ? `$${coupon.minOrderValue}` : 'None'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <div>{coupon.validFrom} to</div>
                      <div>{coupon.validTo}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-medium">{coupon.usageCount}</span>
                      <span className="text-xs text-gray-500">
                        {coupon.usageLimit ? `of ${coupon.usageLimit}` : 'unlimited'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {coupon.isActive ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                        Inactive
                      </Badge>
                    )}
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
                        <DropdownMenuItem onClick={() => handleEditCoupon(coupon)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicateCoupon(coupon)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteCoupon(coupon.id, coupon.code)}
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
              
              {filteredCoupons.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    No coupons found. Try adjusting your search or create a new coupon.
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
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
      {/* Coupon Dialog */}
      <Dialog open={couponDialogOpen} onOpenChange={setCouponDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}</DialogTitle>
            <DialogDescription>
              {editingCoupon 
                ? 'Edit the details of this coupon.' 
                : 'Fill in the details to create a new coupon.'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coupon Code</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="e.g. SUMMER20" 
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter a memorable code for customers to use at checkout.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="discountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Type</FormLabel>
                      <Select 
                        onValueChange={(value) => handleSelectChange(value as 'percentage' | 'fixed')} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select discount type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage (%)</SelectItem>
                          <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="discountValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Value</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          min="0" 
                          step={form.getValues('discountType') === 'percentage' ? '1' : '0.01'}
                        />
                      </FormControl>
                      <FormDescription>
                        {form.getValues('discountType') === 'percentage' 
                          ? 'Enter percentage value (e.g. 20 for 20% off)'
                          : 'Enter fixed amount in dollars (e.g. 10 for $10 off)'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="validFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valid From</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input 
                            type="date" 
                            {...field} 
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="validTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valid To</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input 
                            type="date" 
                            {...field} 
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="minOrderValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Order Value ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        min="0" 
                        step="0.01"
                      />
                    </FormControl>
                    <FormDescription>
                      Set to 0 if there's no minimum order value required.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="usageLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usage Limit</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        value={field.value === null ? '' : field.value}
                        onChange={(e) => {
                          const value = e.target.value === '' ? null : parseInt(e.target.value);
                          field.onChange(value);
                        }}
                        min="0" 
                        step="1"
                      />
                    </FormControl>
                    <FormDescription>
                      Leave empty for unlimited usage.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Active</FormLabel>
                      <FormDescription>
                        Coupon will be immediately available for use if checked.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => setCouponDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCouponsPage;
