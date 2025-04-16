
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, 
  Share2, 
  ShoppingCart, 
  Truck, 
  Shield, 
  RefreshCw, 
  Star,
  ChevronDown,
  ChevronRight,
  Minus,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductCard } from '@/components/ui/product-card';
import { formatPrice } from '@/lib/utils/formatters';
import { products, reviews, brands, categories } from '@/lib/data';

export default function ProductDetailPage() {
  const { slug } = useParams();
  
  // Find the product by slug
  const product = products.find(p => p.slug === slug);
  
  // If product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }
  
  // Extract product details
  const {
    id,
    name,
    price,
    discountPrice,
    description,
    rating,
    reviewCount,
    images,
    colors,
    sizes,
    variants,
    brandId,
    categoryId,
    inStock
  } = product;
  
  // States for product options
  const [selectedColor, setSelectedColor] = useState(colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(images[0]);
  
  // Get selected variant
  const selectedVariant = variants.find(
    v => v.color === selectedColor && (!sizes.length || v.size === selectedSize)
  );
  
  // Check if variant is in stock
  const variantInStock = selectedVariant?.inStock ?? inStock;
  
  // Get final price
  const finalPrice = discountPrice || price;
  
  // Get current rating
  const productRating = Math.floor(rating);
  
  // Get brand and category
  const brand = brands.find(b => b.id === brandId);
  const category = categories.find(c => c.id === categoryId);
  
  // Get product reviews
  const productReviews = reviews.filter(r => r.productId === id);
  
  // Similar products (in same category)
  const similarProducts = products
    .filter(p => p.id !== id && p.categoryId === categoryId)
    .slice(0, 4);
  
  // Handle Add to Cart
  const handleAddToCart = () => {
    console.log('Adding to cart:', {
      productId: id,
      variantId: selectedVariant?.id,
      quantity,
      color: selectedColor,
      size: selectedSize
    });
    // Here you would dispatch to your cart context/state
  };
  
  // Handle Add to Wishlist
  const handleAddToWishlist = () => {
    console.log('Adding to wishlist:', id);
    // Here you would dispatch to your wishlist context/state
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to="/products" className="hover:text-primary">Products</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          {category && (
            <>
              <Link to={`/category/${category.slug}`} className="hover:text-primary">
                {category.name}
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
            </>
          )}
          <span className="text-gray-900 font-medium truncate">{name}</span>
        </nav>
        
        {/* Product Details Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="mb-4 bg-gray-50 rounded-lg overflow-hidden">
              <img 
                src={mainImage} 
                alt={name} 
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {images.map((image, index) => (
                <button 
                  key={index}
                  className={`
                    border rounded aspect-square overflow-hidden 
                    ${mainImage === image ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'}
                  `}
                  onClick={() => setMainImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${name} ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="lg:w-1/2">
            {/* Product Title and Badges */}
            <div className="mb-4">
              {brand && (
                <Link to={`/brands/${brand.slug}`} className="text-sm text-gray-500 hover:text-primary">
                  {brand.name}
                </Link>
              )}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1 mb-2">{name}</h1>
              
              {/* Rating and Review Count */}
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < productRating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {rating} ({reviewCount} reviews)
                </span>
              </div>
              
              {/* Price */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(finalPrice)}
                </span>
                {discountPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(price)}
                    </span>
                    <Badge className="bg-red-500">
                      Save {Math.round(((price - discountPrice) / price) * 100)}%
                    </Badge>
                  </>
                )}
              </div>
              
              {/* Availability */}
              <div className="mb-4">
                <span className={`text-sm font-medium ${variantInStock ? 'text-green-600' : 'text-red-600'}`}>
                  {variantInStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              <Separator className="my-4" />
              
              {/* Color Selection */}
              {colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        className={`
                          w-10 h-10 rounded-full border flex items-center justify-center
                          ${selectedColor === color 
                            ? 'border-primary ring-2 ring-primary/20' 
                            : 'border-gray-200'}
                        `}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select ${color} color`}
                      >
                        <span 
                          className="w-8 h-8 rounded-full"
                          style={{ 
                            backgroundColor: 
                              color.toLowerCase() === 'white' ? '#f9fafb' :
                              color.toLowerCase() === 'black' ? '#111827' :
                              color.toLowerCase() === 'red' ? '#ef4444' :
                              color.toLowerCase() === 'blue' ? '#3b82f6' :
                              color.toLowerCase() === 'green' ? '#10b981' :
                              color.toLowerCase() === 'yellow' ? '#f59e0b' :
                              color.toLowerCase() === 'purple' ? '#8b5cf6' :
                              color.toLowerCase() === 'pink' ? '#ec4899' :
                              color.toLowerCase() === 'gray' ? '#6b7280' :
                              color.toLowerCase() === 'orange' ? '#f97316' :
                              color.toLowerCase() === 'brown' ? '#92400e' :
                              color.toLowerCase() === 'silver' ? '#e5e7eb' :
                              color.toLowerCase() === 'gold' ? '#fbbf24' :
                              color.toLowerCase() === 'navy' ? '#1e3a8a' :
                              color.toLowerCase() === 'multicolor' ? 'linear-gradient(135deg, red, blue, green)' :
                              color
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Size Selection */}
              {sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <button className="text-sm text-primary hover:text-primary-700">
                      Size guide
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {sizes.map((size) => {
                      const sizeVariant = variants.find(v => v.size === size && v.color === selectedColor);
                      const isSizeInStock = sizeVariant?.inStock ?? true;
                      
                      return (
                        <button
                          key={size}
                          className={`
                            h-10 px-3 rounded border font-medium text-sm
                            ${selectedSize === size 
                              ? 'border-primary bg-primary/5 text-primary' 
                              : 'border-gray-200 text-gray-800'}
                            ${!isSizeInStock && 'opacity-50 cursor-not-allowed'}
                          `}
                          onClick={() => isSizeInStock && setSelectedSize(size)}
                          disabled={!isSizeInStock}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center">
                  <button
                    className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center text-gray-600 hover:bg-gray-50"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val > 0) {
                        setQuantity(val);
                      }
                    }}
                    className="w-16 h-10 border-t border-b border-gray-300 text-center"
                  />
                  <button
                    className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center text-gray-600 hover:bg-gray-50"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Add to Cart and Wishlist Buttons */}
              <div className="flex flex-col md:flex-row gap-3 mb-6">
                <Button
                  className="flex-1 gap-2"
                  size="lg"
                  disabled={!variantInStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-5 w-5" />
                  Wishlist
                </Button>
              </div>
              
              {/* Short Description */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-gray-700">{description}</p>
              </div>
              
              {/* Shipping and Returns */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Truck className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Free Shipping</h4>
                    <p className="text-sm text-gray-500">On orders over $100</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Easy Returns</h4>
                    <p className="text-sm text-gray-500">30 day return policy</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Secure Checkout</h4>
                    <p className="text-sm text-gray-500">100% protected payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mb-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start bg-transparent border-b px-0 mb-6">
              <TabsTrigger 
                value="description" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="specifications"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger 
                value="reviews"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Reviews ({reviewCount})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-0">
              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  {description}
                </p>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros quis nisl aliquam tincidunt. 
                  Nulla facilisi. Sed vel urna vel velit fringilla feugiat. Sed eget justo vel nisl aliquam tincidunt.
                </p>
                <p>
                  Donec euismod, nisl eget consectetur sagittis, nisl nunc consectetur nisl, eget consectetur nisl nisl eget
                  consectetur. Donec euismod, nisl eget consectetur sagittis, nisl nunc consectetur nisl, eget consectetur nisl nisl eget.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Product Details</h3>
                  <table className="w-full text-left text-sm">
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-2 font-medium text-gray-900">Brand</td>
                        <td className="py-2 text-gray-700">{brand?.name || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-gray-900">Category</td>
                        <td className="py-2 text-gray-700">{category?.name || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-gray-900">Material</td>
                        <td className="py-2 text-gray-700">Premium Quality</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-gray-900">Available Colors</td>
                        <td className="py-2 text-gray-700">{colors.join(', ') || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-gray-900">Available Sizes</td>
                        <td className="py-2 text-gray-700">{sizes.join(', ') || 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3">Care Instructions</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary text-xs">1</span>
                      </div>
                      <span>Handle with care</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary text-xs">2</span>
                      </div>
                      <span>Store in a cool, dry place</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary text-xs">3</span>
                      </div>
                      <span>Clean with a soft, dry cloth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary text-xs">4</span>
                      </div>
                      <span>Avoid exposure to direct sunlight</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-0">
              {/* Reviews Summary */}
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="md:w-1/3">
                  <h3 className="font-semibold text-lg mb-4">Customer Reviews</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < productRating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-lg font-medium">{rating} out of 5</span>
                  </div>
                  <p className="text-gray-500 mb-4">{reviewCount} global ratings</p>
                  
                  {/* Rating breakdown */}
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = productReviews.filter(r => Math.floor(r.rating) === star).length;
                      const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
                      
                      return (
                        <div key={star} className="flex items-center">
                          <div className="w-12 text-sm text-gray-700">
                            {star} stars
                          </div>
                          <div className="w-full h-2 mx-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-amber-400 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <div className="w-12 text-right text-sm text-gray-700">
                            {percentage.toFixed(0)}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <Button className="mt-6">Write a Review</Button>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="font-semibold text-lg mb-4">Recent Reviews</h3>
                  
                  {productReviews.length > 0 ? (
                    <div className="space-y-6">
                      {productReviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-0">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">{review.title}</h4>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-700">
                              by {review.userName}
                            </span>
                          </div>
                          
                          <p className="text-gray-700 mb-2">{review.comment}</p>
                          
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              Helpful ({review.helpful})
                            </Button>
                            <Button variant="ghost" size="sm">Report</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border rounded-lg">
                      <p className="text-gray-500 mb-4">No reviews yet</p>
                      <Button>Be the first to review</Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* FAQs Accordion */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How long is the warranty?</AccordionTrigger>
              <AccordionContent>
                This product comes with a standard 1-year manufacturer warranty that covers defects in materials and workmanship.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I return this product?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer a 30-day return policy. If you're not satisfied with your purchase, you can return it within 30 days for a full refund.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How long does shipping take?</AccordionTrigger>
              <AccordionContent>
                Standard shipping takes 3-5 business days. Express shipping options are available at checkout for faster delivery.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
              <AccordionContent>
                Yes, we ship to most countries worldwide. Shipping times and costs will vary depending on your location.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Similar Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {similarProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
