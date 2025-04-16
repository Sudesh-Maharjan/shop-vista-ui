import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { AdminLayout } from "@/components/layout/admin-layout";
import { currentUser } from "@/lib/data";

// Public pages
import HomePage from "./pages/public/home";
import ProductListingPage from "./pages/public/product-listing";
import ProductDetailPage from "./pages/public/product-detail";
import SearchPage from "./pages/public/search";
import CartPage from "./pages/public/cart";
import CheckoutPage from "./pages/public/checkout";
import OrderConfirmationPage from "./pages/public/order-confirmation";
import WishlistPage from "./pages/public/wishlist";
import ProfilePage from "./pages/public/profile";

// Admin pages
import AdminDashboardPage from "./pages/admin/dashboard";
import AdminProductsPage from "./pages/admin/products";
import AdminOrdersPage from "./pages/admin/orders";
import AdminCustomersPage from "./pages/admin/customers";
import AdminCouponsPage from "./pages/admin/coupons";
import AdminSettingsPage from "./pages/admin/settings";

// Other pages
import NotFound from "./pages/NotFound";

// Placeholder components for pages we haven't built yet
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="container mx-auto px-4 py-12">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <p>This page is under construction.</p>
  </div>
);

// Auth pages
const LoginPage = () => <PlaceholderPage title="Login" />;
const RegisterPage = () => <PlaceholderPage title="Register" />;

// User account pages (some implemented, others as placeholders)
const OrdersPage = () => <PlaceholderPage title="My Orders" />;
const OrderDetailPage = () => <PlaceholderPage title="Order Details" />;
const AddressesPage = () => <PlaceholderPage title="My Addresses" />;
const ChangePasswordPage = () => <PlaceholderPage title="Change Password" />;

// Placeholder for admin pages that need completion
const AdminProductFormPage = () => <PlaceholderPage title="Add/Edit Product" />;
const AdminOrderDetailPage = () => <PlaceholderPage title="Order Details" />;

// For tracking pages
const OrderTrackingPage = () => <PlaceholderPage title="Order Tracking" />;

const queryClient = new QueryClient();

// Mock authentication state
const App = () => {
  // In a real app, this would come from an auth provider
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  
  // Protected route component
  const ProtectedRoute = ({ children, adminOnly = false }: { children: JSX.Element, adminOnly?: boolean }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    if (adminOnly && !isAdmin) {
      return <Navigate to="/" replace />;
    }
    
    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes wrapped in MainLayout */}
            <Route element={<MainLayout isAuthenticated={isAuthenticated} userName={currentUser.name} />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductListingPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/category/:slug" element={<ProductListingPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
              <Route path="/order-tracking/:id" element={<OrderTrackingPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              
              {/* Protected account routes */}
              <Route path="/account/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/account/orders" element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              } />
              <Route path="/account/orders/:id" element={
                <ProtectedRoute>
                  <OrderDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/account/addresses" element={
                <ProtectedRoute>
                  <AddressesPage />
                </ProtectedRoute>
              } />
              <Route path="/account/change-password" element={
                <ProtectedRoute>
                  <ChangePasswordPage />
                </ProtectedRoute>
              } />
            </Route>
            
            {/* Auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminLayout userName={currentUser.name} />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboardPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="products/new" element={<AdminProductFormPage />} />
              <Route path="products/edit/:id" element={<AdminProductFormPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="orders/:id" element={<AdminOrderDetailPage />} />
              <Route path="customers" element={<AdminCustomersPage />} />
              <Route path="coupons" element={<AdminCouponsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
