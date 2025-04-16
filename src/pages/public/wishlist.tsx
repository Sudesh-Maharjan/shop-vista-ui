
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { ProductCard } from '@/components/ui/product-card';
import { products, currentUser } from '@/lib/data';
import { formatPrice } from '@/lib/utils/formatters';

const WishlistPage = () => {
  // Get wishlist items from the current user
  const [wishlistItems, setWishlistItems] = useState(
    products.filter(product => currentUser.wishlist.includes(product.id))
  );
  
  const [isRemoving, setIsRemoving] = useState<number | null>(null);
  
  const handleRemoveFromWishlist = (productId: number) => {
    setIsRemoving(productId);
    
    // Simulate API call
    setTimeout(() => {
      setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
      setIsRemoving(null);
      toast.success('Item removed from wishlist');
    }, 300);
  };
  
  const handleAddToCart = (productId: number) => {
    // In a real app, this would add to cart
    console.log('Adding to cart:', productId);
    toast.success('Item added to cart');
  };
  
  // Recommended products (products not in wishlist)
  const recommendedProducts = products
    .filter(product => !currentUser.wishlist.includes(product.id))
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Wishlist</h1>
        <div className="ml-auto flex items-center space-x-1 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-gray-700">Wishlist</span>
        </div>
      </div>
      
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Saved Items ({wishlistItems.length})</h2>
              </div>
              
              <div className="divide-y">
                {wishlistItems.map(item => (
                  <div key={item.id} className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="relative aspect-square w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                      <img 
                        src={item.images[0].replace('/placeholder.svg', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300')} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <Link to={`/products/${item.slug}`} className="text-lg font-medium text-gray-900 hover:text-primary">
                        {item.name}
                      </Link>
                      
                      <div className="flex flex-wrap gap-2 mt-1">
                        {item.colors.length > 0 && (
                          <span className="text-sm text-gray-500">
                            {item.colors.length > 1 
                              ? `${item.colors.length} colors available` 
                              : `Color: ${item.colors[0]}`}
                          </span>
                        )}
                        
                        {item.sizes.length > 0 && (
                          <span className="text-sm text-gray-500">
                            {item.sizes.length > 1 
                              ? `${item.sizes.length} sizes available` 
                              : `Size: ${item.sizes[0]}`}
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-2">
                        {item.discountPrice ? (
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-semibold text-gray-900">{formatPrice(item.discountPrice)}</span>
                            <span className="text-sm text-gray-500 line-through">{formatPrice(item.price)}</span>
                            <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-700 rounded">
                              {Math.round(((item.price - item.discountPrice) / item.price) * 100)}% OFF
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-semibold text-gray-900">{formatPrice(item.price)}</span>
                        )}
                      </div>
                      
                      <div className="mt-2 text-sm">
                        <span className={item.inStock ? 'text-green-600' : 'text-red-600'}>
                          {item.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:items-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={!item.inStock}
                        onClick={() => handleAddToCart(item.id)}
                        className="w-full sm:w-auto whitespace-nowrap"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="text-gray-500 hover:text-red-600 w-full sm:w-auto"
                        disabled={isRemoving === item.id}
                      >
                        {isRemoving === item.id ? (
                          <span>Removing...</span>
                        ) : (
                          <>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Summary</h3>
                  <span className="text-gray-500 text-sm">{wishlistItems.length} items</span>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    Items in your wishlist remain saved for 30 days. Move them to your cart to checkout.
                  </p>
                  
                  <div className="flex flex-col gap-2 mt-4">
                    <Button onClick={() => toast.success('Items moved to cart')}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Move All to Cart
                    </Button>
                    
                    <Button variant="outline" asChild>
                      <Link to="/products" className="w-full flex items-center justify-center">
                        Continue Shopping
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
            <Heart className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Items added to your wishlist will be saved here</p>
          <Button asChild>
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      )}
      
      {/* Recommended products */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {recommendedProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={{
                ...product,
                images: product.images.map(img => img.replace('/placeholder.svg', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500'))
              }}
              onAddToCart={handleAddToCart}
              onAddToWishlist={() => {
                toast.success('Item added to wishlist');
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default WishlistPage;
