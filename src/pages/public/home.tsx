import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/ui/product-card';
import { products, categories } from '@/lib/data';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<'featured' | 'bestsellers' | 'new'>('featured');
  
  const featuredProducts = products.filter(product => product.isFeatured);
  const bestSellers = products.filter(product => product.isBestSeller);
  const newArrivals = products.filter(product => product.isNewArrival);
  
  const productsToDisplay = 
    activeTab === 'featured' ? featuredProducts :
    activeTab === 'bestsellers' ? bestSellers : 
    newArrivals;

  return (
    <div className="space-y-12 pb-8">
      {/* Hero Banner */}
      <section className="relative">
        <div className="w-full h-[500px] relative overflow-hidden rounded-lg">
          <img 
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&h=700&auto=format&fit=crop"
            alt="Shop the latest collection" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-lg text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Summer Collection 2025</h1>
                <p className="text-lg mb-6">Discover the latest trends and styles for the upcoming season.</p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" asChild>
                    <Link to="/products">Shop Now</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white" asChild>
                    <Link to="/category/new-arrivals">New Arrivals</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shop by Category</h2>
            <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 mt-2 md:mt-0">
              <span>View All Categories</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.slice(0, 8).map((category) => (
              <Link 
                key={category.id} 
                to={`/category/${category.slug}`}
                className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-square bg-gray-200 relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-lg font-semibold">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Products</h2>
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <Button
                variant={activeTab === 'featured' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('featured')}
              >
                Featured
              </Button>
              <Button
                variant={activeTab === 'bestsellers' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('bestsellers')}
              >
                Best Sellers
              </Button>
              <Button
                variant={activeTab === 'new' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('new')}
              >
                New Arrivals
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {productsToDisplay.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button asChild>
              <Link to="/products" className="inline-flex items-center gap-2">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-secondary-500 to-secondary-700 rounded-lg overflow-hidden shadow-md">
              <div className="p-6 md:p-8 flex flex-col h-full">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Tech Gadgets</h3>
                <p className="text-white/80 mb-4">Up to 30% off on select items</p>
                <Button asChild variant="outline" className="self-start mt-auto border-white text-white hover:bg-white/10">
                  <Link to="/category/electronics">Shop Now</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-accent-500 to-accent-700 rounded-lg overflow-hidden shadow-md">
              <div className="p-6 md:p-8 flex flex-col h-full">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Summer Fashion</h3>
                <p className="text-white/80 mb-4">New collection available now</p>
                <Button asChild variant="outline" className="self-start mt-auto border-white text-white hover:bg-white/10">
                  <Link to="/category/clothing">Shop Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">What Our Customers Say</h2>
          
          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {[1, 2, 3].map((index) => (
                <CarouselItem key={index} className="md:basis-1/1">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm mx-4">
                    <div className="flex items-center gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star} 
                          className="w-5 h-5 text-yellow-400 fill-current" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4">
                      "The quality of the products exceeded my expectations. Fast shipping and excellent customer service. Will definitely shop here again!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                      <div>
                        <h4 className="font-semibold">Sarah Johnson</h4>
                        <p className="text-sm text-gray-500">Loyal Customer</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-6">Get the latest updates on new products and upcoming sales.</p>
            
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
