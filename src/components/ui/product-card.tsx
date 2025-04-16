
import { Link } from 'react-router-dom';
import { formatPrice } from '@/lib/utils/formatters';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    price: number;
    discountPrice: number | null;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    isNewArrival?: boolean;
    isFeatured?: boolean;
    isBestSeller?: boolean;
    images: string[];
  };
  className?: string;
  onAddToCart?: (productId: number) => void;
  onAddToWishlist?: (productId: number) => void;
}

export function ProductCard({ product, className, onAddToCart, onAddToWishlist }: ProductCardProps) {
  const {
    id,
    name,
    slug,
    price,
    discountPrice,
    rating,
    reviewCount,
    inStock,
    isNewArrival,
    isBestSeller,
    images
  } = product;
  
  const discount = discountPrice ? Math.round(((price - discountPrice) / price) * 100) : 0;

  return (
    <div className={cn("group relative bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md", className)}>
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {!inStock && (
          <Badge variant="destructive">Out of Stock</Badge>
        )}
        {isNewArrival && (
          <Badge className="bg-secondary">New Arrival</Badge>
        )}
        {isBestSeller && (
          <Badge className="bg-accent">Best Seller</Badge>
        )}
        {discount > 0 && (
          <Badge className="bg-red-500">{discount}% OFF</Badge>
        )}
      </div>
      
      {/* Wishlist button */}
      <button 
        onClick={() => onAddToWishlist?.(id)} 
        className="absolute top-2 right-2 z-10 p-1 bg-white/80 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Add to wishlist"
      >
        <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
      </button>
      
      {/* Product image */}
      <Link to={`/products/${slug}`} className="block relative aspect-square overflow-hidden">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      
      {/* Product details */}
      <div className="p-4">
        <Link to={`/products/${slug}`} className="block">
          <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{name}</h3>
          
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm text-gray-700">{rating}</span>
            <span className="text-xs text-gray-500">({reviewCount})</span>
          </div>
          
          <div className="flex items-baseline gap-2">
            {discountPrice ? (
              <>
                <span className="text-lg font-semibold text-gray-900">{formatPrice(discountPrice)}</span>
                <span className="text-sm text-gray-500 line-through">{formatPrice(price)}</span>
              </>
            ) : (
              <span className="text-lg font-semibold text-gray-900">{formatPrice(price)}</span>
            )}
          </div>
        </Link>
        
        {/* Add to cart button */}
        <div className="mt-3">
          <Button 
            variant="outline" 
            size="sm" 
            disabled={!inStock}
            onClick={() => onAddToCart?.(id)}
            className="w-full gap-2 group-hover:bg-primary group-hover:text-white transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            {inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>
    </div>
  );
}
