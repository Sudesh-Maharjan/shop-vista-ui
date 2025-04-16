
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/product-card';
import { products } from '@/lib/data';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Search products based on query
  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate search delay
    const timer = setTimeout(() => {
      const results = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Search Results</h1>
      
      {/* Search form */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>
      
      {/* Search results */}
      <div>
        {query && (
          <div className="mb-6">
            <p className="text-gray-500">
              {isLoading 
                ? 'Searching...' 
                : `Found ${searchResults.length} results for "${query}"`
              }
            </p>
          </div>
        )}
        
        {isLoading ? (
          // Loading state - skeleton loaders
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-lg animate-pulse">
                <div className="aspect-square w-full bg-gray-200 rounded-t-lg"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {query && searchResults.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-4">No results found</h2>
                <p className="text-gray-500 mb-6">
                  We couldn't find any products matching your search for "{query}".
                </p>
                <div className="max-w-md mx-auto space-y-4">
                  <h3 className="font-medium">Suggestions:</h3>
                  <ul className="text-left list-disc list-inside text-gray-600">
                    <li>Check the spelling of your search term</li>
                    <li>Try using fewer or different keywords</li>
                    <li>Try browsing by category instead</li>
                    <li>Search for a similar product</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
