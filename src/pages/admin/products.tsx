
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Copy, Eye, DownloadCloud, ArrowUpDown,
  Check, X
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
import { products, categories, brands } from '@/lib/data';
import { formatPrice } from '@/lib/utils/formatters';

const AdminProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  
  // Filter products based on search term, category, and stock
  const filteredProducts = products.filter(product => {
    // Search filter
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === 'all' || product.categoryId === Number(selectedCategory);
    
    // Stock filter
    const matchesStock = 
      stockFilter === 'all' || 
      (stockFilter === 'in-stock' && product.inStock) || 
      (stockFilter === 'out-of-stock' && !product.inStock);
    
    return matchesSearch && matchesCategory && matchesStock;
  });
  
  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      case 'price-desc':
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      case 'newest':
        return b.id - a.id; // Assuming higher IDs are newer
      default:
        return 0;
    }
  });
  
  const toggleSelectAll = () => {
    if (selectedProducts.length === sortedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(sortedProducts.map(product => product.id));
    }
  };
  
  const toggleSelectProduct = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  
  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) return;
    
    toast.success(`${selectedProducts.length} products deleted successfully`);
    setSelectedProducts([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/admin/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
          
          {selectedProducts.length > 0 && (
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
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Stock Filter */}
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock Status</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Sort Order */}
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Products Table */}
      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-12 px-4 py-3 text-left">
                  <Checkbox 
                    checked={selectedProducts.length === sortedProducts.length && sortedProducts.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  <div className="flex items-center gap-1">
                    Product
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Category</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                  <div className="flex items-center justify-end gap-1">
                    Price
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Stock</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sortedProducts.map(product => {
                const category = categories.find(c => c.id === product.categoryId);
                
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Checkbox 
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => toggleSelectProduct(product.id)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                          <img 
                            src={product.images[0].replace('/placeholder.svg', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300')} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">SKU: PRD-{product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm">{category?.name || 'Uncategorized'}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {product.discountPrice ? (
                        <div>
                          <div className="font-medium">{formatPrice(product.discountPrice)}</div>
                          <div className="text-xs text-gray-500 line-through">{formatPrice(product.price)}</div>
                        </div>
                      ) : (
                        <div className="font-medium">{formatPrice(product.price)}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {product.inStock ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>
                      ) : (
                        <Badge variant="destructive">Out of Stock</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {product.isFeatured && (
                          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Featured</Badge>
                        )}
                        {product.isNewArrival && (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">New</Badge>
                        )}
                        {product.isBestSeller && (
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Best Seller</Badge>
                        )}
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
                            <Link to={`/admin/products/edit/${product.id}`} className="cursor-pointer">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/products/${product.slug}`} className="cursor-pointer">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success('Product duplicated')}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => toast.success('Product deleted')}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
              
              {sortedProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    No products found. Try adjusting your filters or create a new product.
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

export default AdminProductsPage;
