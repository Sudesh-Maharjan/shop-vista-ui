
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
import NotificationsPage from "./pages/public/notifications";
import OrdersPage from "./pages/public/orders";
import ProfilePage from "./pages/public/profile";
import OrderTrackingPage from "./pages/public/order-tracking";

// Admin pages
import AdminDashboardPage from "./pages/admin/dashboard";
import AdminProductsPage from "./pages/admin/products";
import ProductFormPage from "./pages/admin/product-form";
import AdminOrdersPage from "./pages/admin/orders";
import AdminCustomersPage from "./pages/admin/customers";
import CustomerFormPage from "./pages/admin/customer-form";
import AdminCouponsPage from "./pages/admin/coupons";
import AdminSettingsPage from "./pages/admin/settings";
import AdminProfilePage from "./pages/admin/profile";

// Auth pages
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";

// Other pages
import NotFound from "./pages/NotFound";

// Placeholder components for pages we haven't built yet
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="container mx-auto px-4 py-12">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <p>This page is under construction.</p>
  </div>
);

// User account pages (some implemented, others as placeholders)
const OrderDetailPage = () => <PlaceholderPage title="Order Details" />;
const AddressesPage = () => <PlaceholderPage title="My Addresses" />;
const ChangePasswordPage = () => <PlaceholderPage title="Change Password" />;

// Admin order detail page
const AdminOrderDetailPage = () => <PlaceholderPage title="Order Details" />;

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
              <Route path="/notifications" element={<NotificationsPage />} />
              
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
              <Route path="profile" element={<AdminProfilePage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="products/new" element={<ProductFormPage />} />
              <Route path="products/edit/:id" element={<ProductFormPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="orders/:id" element={<AdminOrderDetailPage />} />
              <Route path="customers" element={<AdminCustomersPage />} />
              <Route path="customers/new" element={<CustomerFormPage />} />
              <Route path="customers/edit/:id" element={<CustomerFormPage />} />
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
