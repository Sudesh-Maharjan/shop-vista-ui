
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, ChevronDown, ChevronUp, Check, Grid3X3, Menu } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ui/product-card';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { products, categories, brands } from '@/lib/data';
import { Separator } from '@/components/ui/separator';

export default function ProductListingPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  
  // States for filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Get category from slug if present
  useEffect(() => {
    if (slug) {
      const category = categories.find(cat => cat.slug === slug);
      if (category) {
        setSelectedCategory(category.id);
      }
    }
  }, [slug]);
  
  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    // Filter by category
    if (selectedCategory && product.categoryId !== selectedCategory) {
      return false;
    }
    
    // Filter by price range
    if (
      (product.discountPrice || product.price) < priceRange[0] || 
      (product.discountPrice || product.price) > priceRange[1]
    ) {
      return false;
    }
    
    // Filter by brands
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brandId)) {
      return false;
    }
    
    // Filter by rating
    if (
      selectedRatings.length > 0 && 
      !selectedRatings.includes(Math.floor(product.rating))
    ) {
      return false;
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      case 'price-desc':
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      case 'newest':
        return a.isNewArrival ? -1 : 1;
      case 'rating':
        return b.rating - a.rating;
      default: // featured
        return a.isFeatured ? -1 : 1;
    }
  });
  
  // Toggle brand selection
  const toggleBrand = (brandId: number) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId) 
        : [...prev, brandId]
    );
  };
  
  // Toggle rating selection
  const toggleRating = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating) 
        : [...prev, rating]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedBrands([]);
    setSelectedRatings([]);
    if (!slug) {
      setSelectedCategory(null);
    }
  };
  
  // Get active filters count
  const activeFiltersCount = 
    (selectedBrands.length > 0 ? 1 : 0) + 
    (selectedRatings.length > 0 ? 1 : 0) + 
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0);
  
  // Show current category name
  const categoryName = selectedCategory 
    ? categories.find(cat => cat.id === selectedCategory)?.name 
    : 'All Products';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{categoryName}</h1>
        <p className="text-gray-500 mt-2">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Filters Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border p-4 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Filters</h2>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-8 text-xs"
                >
                  Clear All
                </Button>
              )}
            </div>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategory === category.id}
                      onCheckedChange={() => setSelectedCategory(
                        selectedCategory === category.id ? null : category.id
                      )}
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 1000]}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="mb-6"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">${priceRange[0]}</span>
                  <span className="text-sm text-gray-500">${priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Brands */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Brands</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center">
                    <Checkbox
                      id={`brand-${brand.id}`}
                      checked={selectedBrands.includes(brand.id)}
                      onCheckedChange={() => toggleBrand(brand.id)}
                    />
                    <label
                      htmlFor={`brand-${brand.id}`}
                      className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      {brand.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Ratings */}
            <div>
              <h3 className="font-medium mb-2">Customer Ratings</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={selectedRatings.includes(rating)}
                      onCheckedChange={() => toggleRating(rating)}
                    />
                    <label
                      htmlFor={`rating-${rating}`}
                      className="ml-2 text-sm font-medium text-gray-700 cursor-pointer flex items-center"
                    >
                      <div className="flex mr-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-500">{rating === 1 ? '& up' : ''}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Filter Button + Sheet */}
        <div className="md:hidden mb-4">
          <Sheet open={showFiltersMobile} onOpenChange={setShowFiltersMobile}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter & Sort</span>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              
              <div className="py-4 flex flex-col h-full overflow-y-auto">
                {/* Sort Options */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Sort By</h3>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="rating">Top Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator className="my-4" />
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox
                          id={`mobile-category-${category.id}`}
                          checked={selectedCategory === category.id}
                          onCheckedChange={() => setSelectedCategory(
                            selectedCategory === category.id ? null : category.id
                          )}
                        />
                        <label
                          htmlFor={`mobile-category-${category.id}`}
                          className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 1000]}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">${priceRange[0]}</span>
                      <span className="text-sm text-gray-500">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                {/* Brands */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Brands</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand.id} className="flex items-center">
                        <Checkbox
                          id={`mobile-brand-${brand.id}`}
                          checked={selectedBrands.includes(brand.id)}
                          onCheckedChange={() => toggleBrand(brand.id)}
                        />
                        <label
                          htmlFor={`mobile-brand-${brand.id}`}
                          className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          {brand.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                {/* Ratings */}
                <div>
                  <h3 className="font-medium mb-2">Customer Ratings</h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <Checkbox
                          id={`mobile-rating-${rating}`}
                          checked={selectedRatings.includes(rating)}
                          onCheckedChange={() => toggleRating(rating)}
                        />
                        <label
                          htmlFor={`mobile-rating-${rating}`}
                          className="ml-2 text-sm font-medium text-gray-700 cursor-pointer flex items-center"
                        >
                          <div className="flex mr-1">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-gray-500">{rating === 1 ? '& up' : ''}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <SheetFooter className="flex-row gap-3 sm:space-x-0">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
                <SheetClose asChild>
                  <Button className="flex-1">Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Products Grid/List */}
        <div className="flex-1">
          {/* Sorting and View Controls (desktop) */}
          <div className="hidden md:flex justify-between items-center mb-6 pb-4 border-b">
            {/* Sort Options */}
            <div className="flex items-center">
              <span className="mr-2 text-sm font-medium">Sort by:</span>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-40 h-9">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* View mode toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">View:</span>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Active filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategory && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <span>
                    Category: {categories.find(cat => cat.id === selectedCategory)?.name}
                  </span>
                  <button
                    onClick={() => {
                      if (!slug) setSelectedCategory(null);
                    }}
                    className="ml-1 hover:text-primary"
                    disabled={!!slug}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              
              {selectedBrands.length > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <span>
                    Brands: {selectedBrands.length}
                  </span>
                  <button
                    onClick={() => setSelectedBrands([])}
                    className="ml-1 hover:text-primary"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              
              {selectedRatings.length > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <span>
                    Ratings: {selectedRatings.length}
                  </span>
                  <button
                    onClick={() => setSelectedRatings([])}
                    className="ml-1 hover:text-primary"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              
              {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <span>
                    Price: ${priceRange[0]} - ${priceRange[1]}
                  </span>
                  <button
                    onClick={() => setPriceRange([0, 1000])}
                    className="ml-1 hover:text-primary"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-7 text-xs"
              >
                Clear All
              </Button>
            </div>
          )}
          
          {/* Products Display */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                : "space-y-4"
            }>
              {sortedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  className={viewMode === 'list' ? "sm:flex sm:h-36" : ""} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
