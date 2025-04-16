
import React, { useState } from 'react';
import { 
  Plus, Percent, Edit, Trash2, Clock, Check, X, MoreHorizontal,
  CalendarIcon, Calendar, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils/formatters';

// Example coupon data
const coupons = [
  {
    id: 1,
    code: 'WELCOME10',
    description: 'Welcome discount for new customers',
    type: 'percentage' as const,
    value: 10,
    minOrderValue: 0,
    maxUses: 1,
    isActive: true,
    validFrom: '2023-07-01',
    validTo: '2025-12-31',
    usedCount: 45,
    forNewCustomers: true
  },
  {
    id: 2,
    code: 'SUMMER25',
    description: 'Summer sale discount',
    type: 'percentage' as const,
    value: 25,
    minOrderValue: 50,
    maxUses: 0,
    isActive: true,
    validFrom: '2023-06-01',
    validTo: '2023-09-01',
    usedCount: 112,
    forNewCustomers: false
  },
  {
    id: 3,
    code: 'FLAT20',
    description: 'Flat $20 off on all orders',
    type: 'fixed' as const,
    value: 20,
    minOrderValue: 100,
    maxUses: 0,
    isActive: true,
    validFrom: '2023-01-01',
    validTo: '2023-12-31',
    usedCount: 78,
    forNewCustomers: false
  },
  {
    id: 4,
    code: 'FREESHIP',
    description: 'Free shipping on orders over $50',
    type: 'fixed' as const,
    value: 10,
    minOrderValue: 50,
    maxUses: 0,
    isActive: false,
    validFrom: '2023-10-01',
    validTo: '2023-10-31',
    usedCount: 23,
    forNewCustomers: false
  }
];

type CouponType = 'percentage' | 'fixed';

const AdminCouponsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    type: 'percentage' as CouponType,
    value: 0,
    minOrderValue: 0,
    maxUses: 0,
    isActive: true,
    validFrom: '',
    validTo: '',
    forNewCustomers: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSelectChange = (name: string, value: CouponType) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would submit to an API
    toast.success(
      editingCoupon 
        ? `Coupon ${formData.code} updated successfully`
        : `Coupon ${formData.code} created successfully`
    );
    
    setIsDialogOpen(false);
    setEditingCoupon(null);
    resetForm();
  };
  
  const handleEdit = (couponId: number) => {
    const couponToEdit = coupons.find(c => c.id === couponId);
    if (couponToEdit) {
      setFormData({
        code: couponToEdit.code,
        description: couponToEdit.description,
        type: couponToEdit.type,
        value: couponToEdit.value,
        minOrderValue: couponToEdit.minOrderValue,
        maxUses: couponToEdit.maxUses,
        isActive: couponToEdit.isActive,
        validFrom: couponToEdit.validFrom,
        validTo: couponToEdit.validTo,
        forNewCustomers: couponToEdit.forNewCustomers
      });
      setEditingCoupon(couponId);
      setIsDialogOpen(true);
    }
  };
  
  const handleDelete = (couponId: number, couponCode: string) => {
    if (window.confirm(`Are you sure you want to delete coupon "${couponCode}"?`)) {
      // In a real app, this would make an API call
      toast.success(`Coupon "${couponCode}" deleted successfully`);
    }
  };
  
  const resetForm = () => {
    setFormData({
      code: '',
      description: '',
      type: 'percentage',
      value: 0,
      minOrderValue: 0,
      maxUses: 0,
      isActive: true,
      validFrom: '',
      validTo: '',
      forNewCustomers: false
    });
  };
  
  const openNewCouponDialog = () => {
    resetForm();
    setEditingCoupon(null);
    setIsDialogOpen(true);
  };
  
  const handleToggleActive = (couponId: number, newStatus: boolean) => {
    // In a real app, this would update the API
    toast.success(`Coupon ${newStatus ? 'activated' : 'deactivated'} successfully`);
  };
  
  const couponTypeLabel = (type: string, value: number) => {
    return type === 'percentage' ? `${value}%` : `$${value}`;
  };
  
  const today = new Date().toISOString().split('T')[0];
  
  const isCouponActive = (coupon: typeof coupons[0]) => {
    if (!coupon.isActive) return false;
    
    const now = new Date();
    const validFrom = new Date(coupon.validFrom);
    const validTo = new Date(coupon.validTo);
    
    return now >= validFrom && now <= validTo;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Coupons</h1>
        
        <Button onClick={openNewCouponDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Coupon
        </Button>
      </div>
      
      {/* Coupon Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map(coupon => (
          <Card key={coupon.id} className="relative overflow-hidden">
            {coupon.isActive ? (
              <div className="absolute top-0 right-0">
                <Badge className="rounded-none rounded-bl-lg" variant={isCouponActive(coupon) ? "success" : "outline"}>
                  {isCouponActive(coupon) ? "Active" : "Scheduled"}
                </Badge>
              </div>
            ) : (
              <div className="absolute top-0 right-0">
                <Badge className="rounded-none rounded-bl-lg" variant="destructive">Inactive</Badge>
              </div>
            )}
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2 mb-1">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">{coupon.code}</span>
                    <Badge variant="outline" className="ml-2">
                      {couponTypeLabel(coupon.type, coupon.value)}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{coupon.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(coupon.id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleActive(coupon.id, !coupon.isActive)}>
                      {coupon.isActive ? (
                        <>
                          <X className="h-4 w-4 mr-2" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Activate
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleDelete(coupon.id, coupon.code)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-y-2">
                  <div className="w-1/2 flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>From: {formatDate(coupon.validFrom)}</span>
                  </div>
                  <div className="w-1/2 flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>To: {formatDate(coupon.validTo)}</span>
                  </div>
                </div>
                
                {coupon.minOrderValue > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                    <span>Min. Order: ${coupon.minOrderValue}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>
                    {coupon.maxUses === 0 
                      ? "Unlimited uses" 
                      : `${coupon.maxUses} max uses per customer`}
                  </span>
                </div>
                
                {coupon.forNewCustomers && (
                  <Badge variant="outline" className="bg-amber-50">
                    New customers only
                  </Badge>
                )}
                
                <div className="mt-2 pt-2 border-t text-sm text-gray-500">
                  Used {coupon.usedCount} times
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Add/Edit Coupon Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}</DialogTitle>
            <DialogDescription>
              {editingCoupon 
                ? 'Update the details for this coupon.' 
                : 'Fill in the details to create a new discount coupon.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Coupon Code</Label>
                  <Input 
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="e.g., SUMMER25"
                    className="uppercase"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Discount Type</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => handleSelectChange('type', value as CouponType)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select discount type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of this coupon"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="value">Discount Value</Label>
                  <div className="relative">
                    <Input 
                      id="value"
                      name="value"
                      type="number"
                      min="0"
                      value={formData.value}
                      onChange={handleInputChange}
                      className={formData.type === 'percentage' ? 'pr-8' : 'pl-8'}
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      {formData.type === 'percentage' ? '%' : ''}
                    </div>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      {formData.type === 'fixed' ? '$' : ''}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="minOrderValue">Minimum Order Value</Label>
                  <div className="relative">
                    <Input 
                      id="minOrderValue"
                      name="minOrderValue"
                      type="number"
                      min="0"
                      value={formData.minOrderValue}
                      onChange={handleInputChange}
                      className="pl-8"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      $
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="validFrom">Valid From</Label>
                  <Input 
                    id="validFrom"
                    name="validFrom"
                    type="date"
                    value={formData.validFrom}
                    onChange={handleInputChange}
                    min={today}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="validTo">Valid To</Label>
                  <Input 
                    id="validTo"
                    name="validTo"
                    type="date"
                    value={formData.validTo}
                    onChange={handleInputChange}
                    min={formData.validFrom || today}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxUses">Max Uses Per Customer</Label>
                  <Input 
                    id="maxUses"
                    name="maxUses"
                    type="number"
                    min="0"
                    value={formData.maxUses}
                    onChange={handleInputChange}
                    placeholder="0 for unlimited"
                  />
                  <p className="text-xs text-gray-500">Set to 0 for unlimited uses</p>
                </div>
                
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="isActive">Active</Label>
                    <Switch 
                      id="isActive"
                      name="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, isActive: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="forNewCustomers">New Customers Only</Label>
                    <Switch 
                      id="forNewCustomers"
                      name="forNewCustomers"
                      checked={formData.forNewCustomers}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, forNewCustomers: checked }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit">
                {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCouponsPage;
