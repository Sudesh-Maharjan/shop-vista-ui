import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Star } from 'lucide-react';
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

      {/* Special Offers Banner - ENHANCED */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-secondary-600 to-secondary-800 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-[1.02]">
              <div className="p-6 md:p-8 flex flex-col h-full relative">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-30">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white">
                    <path d="M12 1.5V3M12 21v1.5M4.5 12H3M21 12h-1.5M18.364 18.364l-1.061-1.061M6.697 6.697L5.636 5.636M18.364 5.636l-1.061 1.061M6.697 17.303L5.636 18.364M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Tech Gadgets</h3>
                <p className="text-white/90 mb-4 text-lg">Experience the future today with our premium selection of cutting-edge devices.</p>
                <div className="bg-white/20 rounded-lg p-3 mb-4 backdrop-blur-sm">
                  <p className="text-white font-medium text-xl">Up to 30% off on select items</p>
                </div>
                <Button asChild variant="default" className="self-start mt-auto bg-white text-secondary-700 hover:bg-white/90 hover:text-secondary-800">
                  <Link to="/category/electronics" className="flex items-center gap-2">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-accent-500 to-accent-700 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-[1.02]">
              <div className="p-6 md:p-8 flex flex-col h-full relative">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-30">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white">
                    <path d="M16 4H8.5M16 4C16.8284 4 17.5 4.67157 17.5 5.5V6.5C17.5 7.32843 16.8284 8 16 8H8.5M16 4H17.5C18.3284 4 19 4.67157 19 5.5V18.5C19 19.3284 18.3284 20 17.5 20H6.5C5.67157 20 5 19.3284 5 18.5V5.5C5 4.67157 5.67157 4 6.5 4H8.5M8.5 8C7.67157 8 7 7.32843 7 6.5V5.5C7 4.67157 7.67157 4 8.5 4M8.5 8C9.32843 8 10 7.32843 10 6.5V5.5C10 4.67157 9.32843 4 8.5 4" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Summer Fashion</h3>
                <p className="text-white/90 mb-4 text-lg">Make a statement with our breathtaking new summer collection.</p>
                <div className="bg-white/20 rounded-lg p-3 mb-4 backdrop-blur-sm">
                  <p className="text-white font-medium text-xl">New collection available now</p>
                </div>
                <Button asChild variant="default" className="self-start mt-auto bg-white text-accent-700 hover:bg-white/90 hover:text-accent-800">
                  <Link to="/category/clothing" className="flex items-center gap-2">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel - ENHANCED */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">What Our Customers Say</h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">Discover why thousands of shoppers trust us for their everyday needs</p>
          
          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {[
                {
                  name: "Sarah Johnson",
                  role: "Fashion Enthusiast",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop&q=80",
                  text: "The quality of the products exceeded my expectations. Fast shipping and excellent customer service. Will definitely shop here again!"
                },
                {
                  name: "Michael Chen",
                  role: "Tech Professional",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop&q=80",
                  text: "I've been a regular customer for over a year now. The tech gadgets are always up-to-date and the prices are competitive. Highly recommend!"
                },
                {
                  name: "Emma Rodriguez",
                  role: "Interior Designer",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&auto=format&fit=crop&q=80",
                  text: "The home decor collection is simply stunning. Every piece I've purchased has received countless compliments from my clients and friends."
                }
              ].map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/1">
                  <div className="bg-white p-8 rounded-xl shadow-md mx-4 border border-gray-100 transform transition-all hover:shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className="w-5 h-5 text-yellow-400 fill-current" 
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 overflow-hidden">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-1/2" />
            <CarouselNext className="right-0 translate-x-1/2" />
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
