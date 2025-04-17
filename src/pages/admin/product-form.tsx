
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Save, Trash2, Plus, X, Image as ImageIcon
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
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { products, categories, brands } from '@/lib/data';

// Form validation schema
const productSchema = z.object({
  name: z.string().min(3, { message: 'Product name must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  price: z.coerce.number().positive({ message: 'Price must be positive' }),
  discountPrice: z.coerce.number().positive({ message: 'Discount price must be positive' }).optional().nullable(),
  categoryId: z.coerce.number().positive({ message: 'Please select a category' }),
  brandId: z.coerce.number().positive({ message: 'Please select a brand' }),
  inStock: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isNewArrival: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  slug: z.string().min(3, { message: 'Slug must be at least 3 characters' }),
});

type ProductFormValues = z.infer<typeof productSchema>;

// Real product image URLs for random selection
const productImagePlaceholders = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300", // Nike shoes
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=300", // Watch
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300", // Watch on wrist
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300", // Headphones
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=300", // Sunglasses
  "https://images.unsplash.com/photo-1593998066526-65fcab3021a2?q=80&w=300", // Game controller
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=300", // Perfume
  "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=300", // Shoes
];

const ProductFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  
  // Image handling
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  
  // Initialize form with default values
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      discountPrice: null,
      categoryId: categories[0]?.id || 1,
      brandId: brands[0]?.id || 1,
      inStock: true,
      isFeatured: false,
      isNewArrival: false,
      isBestSeller: false,
      slug: '',
    },
  });
  
  // Fetch product data if editing
  useEffect(() => {
    if (isEditing && id) {
      const productId = parseInt(id);
      const product = products.find(p => p.id === productId);
      
      if (product) {
        // Update form fields
        form.reset({
          name: product.name,
          description: product.description,
          price: product.price,
          discountPrice: product.discountPrice || null,
          categoryId: product.categoryId || categories[0]?.id || 1,
          brandId: product.brandId || brands[0]?.id || 1,
          inStock: product.inStock,
          isFeatured: product.isFeatured,
          isNewArrival: product.isNewArrival,
          isBestSeller: product.isBestSeller,
          slug: product.slug,
        });
        
        // Set images
        setImageUrls(product.images || []);
      } else {
        toast.error('Product not found');
        navigate('/admin/products');
      }
    }
  }, [isEditing, id, form, navigate]);
  
  // Handle form submission
  const onSubmit = (data: ProductFormValues) => {
    // For a real app, this would submit data to an API
    console.log('Product data submitted:', data);
    console.log('Product images:', imageUrls);
    
    toast.success(isEditing ? 'Product updated successfully' : 'Product created successfully');
    navigate('/admin/products');
  };
  
  // Handle delete product
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // In a real app, this would make an API call
      toast.success('Product deleted successfully');
      navigate('/admin/products');
    }
  };
  
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // In a real app, you would upload these to a storage service
    // For now, we'll just assign random image URLs from our placeholder array
    const newImageUrls: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const randomIndex = Math.floor(Math.random() * productImagePlaceholders.length);
      newImageUrls.push(productImagePlaceholders[randomIndex]);
    }
    
    setImageUrls([...imageUrls, ...newImageUrls]);
    toast.success(`${newImageUrls.length} images added`);
  };
  
  // Remove image
  const removeImage = (index: number) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
  };
  
  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    form.setValue('slug', slug);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/admin/products')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
        
        <div className="flex gap-2">
          {isEditing && (
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Product
            </Button>
          )}
          <Button type="submit" form="product-form">
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main product information */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <Form {...form}>
                <form id="product-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Enter product name" 
                            onChange={(e) => {
                              field.onChange(e);
                              // Auto-generate slug when name changes if we're creating a new product
                              if (!isEditing) {
                                generateSlug(e.target.value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price ($)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.01" 
                              min="0" 
                              {...field} 
                              placeholder="0.00" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="discountPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount Price ($)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.01" 
                              min="0" 
                              {...field} 
                              value={field.value !== null ? field.value : ''}
                              onChange={(e) => {
                                const value = e.target.value !== '' ? parseFloat(e.target.value) : null;
                                field.onChange(value);
                              }}
                              placeholder="0.00" 
                            />
                          </FormControl>
                          <FormDescription>
                            Leave empty for no discount
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Enter product description" 
                            rows={6}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select 
                            onValueChange={(value) => field.onChange(parseInt(value))} 
                            value={field.value.toString()} 
                            defaultValue={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map(category => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="brandId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand</FormLabel>
                          <Select 
                            onValueChange={(value) => field.onChange(parseInt(value))} 
                            value={field.value.toString()} 
                            defaultValue={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a brand" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {brands.map(brand => (
                                <SelectItem key={brand.id} value={brand.id.toString()}>
                                  {brand.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="product-url-slug" />
                        </FormControl>
                        <FormDescription>
                          URL-friendly version of the product name
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
          
          {/* Product Images */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Product Images</h3>
              
              <div className="flex flex-wrap gap-4 mb-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={url} 
                      alt={`Product image ${index + 1}`} 
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                    <button 
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                {imageUrls.length === 0 && (
                  <div className="w-full p-8 border-2 border-dashed rounded-md flex items-center justify-center text-gray-400">
                    No images added yet
                  </div>
                )}
              </div>
              
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  id="product-images"
                  className="hidden"
                />
                <Button asChild variant="outline" className="w-full">
                  <label htmlFor="product-images" className="flex items-center justify-center cursor-pointer">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Upload Images
                  </label>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Product status and options */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Product Status</h3>
              
              <Form {...form}>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="inStock"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>In Stock</FormLabel>
                          <FormDescription>
                            Product is available for purchase
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Separator />
                  
                  <h3 className="text-lg font-medium mb-2">Featured Status</h3>
                  
                  <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Featured Product</FormLabel>
                          <FormDescription>
                            Display on the homepage featured section
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="isNewArrival"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>New Arrival</FormLabel>
                          <FormDescription>
                            Mark as a new product
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="isBestSeller"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Best Seller</FormLabel>
                          <FormDescription>
                            Mark as a best selling product
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductFormPage;
