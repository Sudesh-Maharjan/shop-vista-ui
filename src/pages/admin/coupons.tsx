
import React, { useState } from 'react';
import { 
  Plus, Search, MoreHorizontal, Edit, Trash2, Copy, Calendar, 
  TagIcon, Percent, DollarSign, Check, X
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { coupons } from '@/lib/data';
import { formatDate } from '@/lib/utils/formatters';

interface CouponFormData {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  validUntil: string;
  isActive: boolean;
  minimumPurchase: number;
}

const AdminCouponsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [editingCoupon, setEditingCoupon] = useState<number | null>(null);
  const [formData, setFormData] = useState<CouponFormData>({
    code: '',
    discount: 10,
    type: 'percentage',
    validUntil: new Date().toISOString().split('T')[0],
    isActive: true,
    minimumPurchase: 0
  });
  
  // Filter coupons based on search and status
  const filteredCoupons = coupons.filter(coupon => {
    // Search filter
    const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && coupon.isActive) ||
      (statusFilter === 'inactive' && !coupon.isActive);
    
    return matchesSearch && matchesStatus;
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleToggleActive = (name: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveCoupon = () => {
    if (editingCoupon !== null) {
      toast.success(`Coupon "${formData.code}" updated successfully`);
    } else {
      toast.success(`Coupon "${formData.code}" created successfully`);
    }
    
    setIsOpenForm(false);
    resetForm();
  };
  
  const handleDeleteCoupon = (couponId: number) => {
    toast.success('Coupon deleted successfully');
  };
  
  const handleEditCoupon = (couponId: number) => {
    const coupon = coupons.find(c => c.id === couponId);
    if (coupon) {
      setFormData({
        code: coupon.code,
        discount: coupon.discount,
        type: coupon.type,
        validUntil: coupon.validUntil,
        isActive: coupon.isActive,
        minimumPurchase: coupon.minimumPurchase
      });
      setEditingCoupon(couponId);
      setIsOpenForm(true);
    }
  };
  
  const resetForm = () => {
    setFormData({
      code: '',
      discount: 10,
      type: 'percentage',
      validUntil: new Date().toISOString().split('T')[0],
      isActive: true,
      minimumPurchase: 0
    });
    setEditingCoupon(null);
  };
  
  const handleOpenChange = (open: boolean) => {
    setIsOpenForm(open);
    if (!open) resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Coupons</h1>
        
        <Dialog open={isOpenForm} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingCoupon !== null ? 'Edit Coupon' : 'Create New Coupon'}</DialogTitle>
              <DialogDescription>
                {editingCoupon !== null 
                  ? 'Update the coupon details and save your changes.' 
                  : 'Fill in the details to create a new coupon code.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  Code
                </Label>
                <Input
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="SUMMER2023"
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="discount" className="text-right">
                  {formData.type === 'percentage' ? 'Percentage' : 'Amount'}
                </Label>
                <div className="col-span-3 flex items-center">
                  <Input
                    id="discount"
                    name="discount"
                    type="number"
                    value={formData.discount}
                    onChange={handleInputChange}
                    min={0}
                    max={formData.type === 'percentage' ? 100 : undefined}
                    className="flex-grow"
                  />
                  <div className="ml-2">
                    {formData.type === 'percentage' ? '%' : '$'}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="validUntil" className="text-right">
                  Valid Until
                </Label>
                <Input
                  id="validUntil"
                  name="validUntil"
                  type="date"
                  value={formData.validUntil}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="minimumPurchase" className="text-right">
                  Min. Purchase
                </Label>
                <div className="col-span-3 flex items-center">
                  <span className="mr-2">$</span>
                  <Input
                    id="minimumPurchase"
                    name="minimumPurchase"
                    type="number"
                    value={formData.minimumPurchase}
                    onChange={handleInputChange}
                    min={0}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Active</Label>
                <div className="flex items-center col-span-3">
                  <Button
                    type="button"
                    variant={formData.isActive ? "default" : "outline"}
                    size="sm"
                    className="mr-2"
                    onClick={() => handleToggleActive('isActive', true)}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Yes
                  </Button>
                  <Button
                    type="button"
                    variant={!formData.isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleToggleActive('isActive', false)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    No
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpenForm(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleSaveCoupon}>
                {editingCoupon !== null ? 'Update Coupon' : 'Create Coupon'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search coupons..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
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
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Discount</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Min. Purchase</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Valid Until</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredCoupons.map(coupon => (
                <tr key={coupon.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <TagIcon className="h-5 w-5 text-primary-600" />
                      <div className="font-medium text-gray-900">{coupon.code}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="inline-flex items-center">
                      {coupon.type === 'percentage' ? (
                        <>
                          <Percent className="h-4 w-4 mr-1 text-amber-500" />
                          <span>{coupon.discount}% off</span>
                        </>
                      ) : (
                        <>
                          <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                          <span>${coupon.discount} off</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {coupon.minimumPurchase > 0 ? (
                      <span className="text-sm">${coupon.minimumPurchase}</span>
                    ) : (
                      <span className="text-sm text-gray-500">None</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-sm">{formatDate(coupon.validUntil)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {coupon.isActive ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">Inactive</Badge>
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
                        <DropdownMenuItem onClick={() => handleEditCoupon(coupon.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteCoupon(coupon.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                          navigator.clipboard.writeText(coupon.code);
                          toast.success('Coupon code copied to clipboard');
                        }}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Code
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              
              {filteredCoupons.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No coupons found. Try adjusting your filters or create a new coupon.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCouponsPage;
