
import React from 'react';
import { ArrowDown, ArrowUp, DollarSign, Package, ShoppingCart, Users, BarChart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { adminStats, products } from '@/lib/data';
import { formatPrice } from '@/lib/utils/formatters';

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const DashboardPage = () => {
  const { totalSales, totalOrders, totalUsers, totalProducts, recentSales, topProducts } = adminStats;
  
  // Calculate percentage change (mock data)
  const salesGrowth = 12.5;
  const ordersGrowth = 8.3;
  const usersGrowth = 15.7;
  const productsGrowth = -3.2;
  
  // Additional reports data
  const categoryData = [
    { name: 'Electronics', value: 42 },
    { name: 'Clothing', value: 28 },
    { name: 'Home & Kitchen', value: 15 },
    { name: 'Beauty', value: 10 },
    { name: 'Sports', value: 5 },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Tabs defaultValue="overview" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Sales Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(totalSales)}</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              {salesGrowth > 0 ? (
                <>
                  <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500">{salesGrowth}%</span>
                </>
              ) : (
                <>
                  <ArrowDown className="h-3 w-3 mr-1 text-red-500" />
                  <span className="text-red-500">{Math.abs(salesGrowth)}%</span>
                </>
              )}
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Orders Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              {ordersGrowth > 0 ? (
                <>
                  <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500">{ordersGrowth}%</span>
                </>
              ) : (
                <>
                  <ArrowDown className="h-3 w-3 mr-1 text-red-500" />
                  <span className="text-red-500">{Math.abs(ordersGrowth)}%</span>
                </>
              )}
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Users Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              {usersGrowth > 0 ? (
                <>
                  <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500">{usersGrowth}%</span>
                </>
              ) : (
                <>
                  <ArrowDown className="h-3 w-3 mr-1 text-red-500" />
                  <span className="text-red-500">{Math.abs(usersGrowth)}%</span>
                </>
              )}
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Products Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              {productsGrowth > 0 ? (
                <>
                  <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500">{productsGrowth}%</span>
                </>
              ) : (
                <>
                  <ArrowDown className="h-3 w-3 mr-1 text-red-500" />
                  <span className="text-red-500">{Math.abs(productsGrowth)}%</span>
                </>
              )}
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="w-full space-y-6">
        <TabsContent value="overview" className="space-y-6">
          {/* Sales Overview Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Monthly sales for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={recentSales}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatPrice(Number(value))} />
                    <Legend />
                    <Bar 
                      dataKey="amount" 
                      name="Sales" 
                      fill="#4f46e5" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Top Products & Category Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Products with the highest sales volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-50 text-primary font-medium">
                        {index + 1}
                      </div>
                      <div className="ml-3 flex-grow">
                        <div className="text-sm font-medium">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.sales} units sold</div>
                      </div>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Sales distribution by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity & Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest orders and customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100">
                      <ShoppingCart className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">New order #ORD-2023-1087</div>
                      <div className="text-xs text-gray-500">John Doe placed a new order for $1299.97</div>
                      <div className="text-xs text-gray-400">10 minutes ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-green-100">
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">Payment received</div>
                      <div className="text-xs text-gray-500">Payment for order #ORD-2023-1042 received</div>
                      <div className="text-xs text-gray-400">1 hour ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-100">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">New customer</div>
                      <div className="text-xs text-gray-500">Sarah Williams created an account</div>
                      <div className="text-xs text-gray-400">3 hours ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Inventory Status */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
                <CardDescription>Products with low stock and best sellers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Out of Stock Products</span>
                    <span className="font-medium text-red-500">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Low Stock Products</span>
                    <span className="font-medium text-amber-500">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Well Stocked Products</span>
                    <span className="font-medium text-green-500">121</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Products to Restock</h4>
                  
                  <div className="space-y-2">
                    {products
                      .filter(product => !product.inStock)
                      .slice(0, 3)
                      .map(product => (
                        <div key={product.id} className="flex items-center justify-between">
                          <span className="text-sm truncate" style={{maxWidth: '200px'}}>{product.name}</span>
                          <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">Out of Stock</span>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>View detailed analytics data and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-gray-500">
                <BarChart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium">Advanced Analytics</h3>
                <p className="max-w-md mx-auto mt-2">
                  Detailed analytics module is in development. Coming soon with conversion rates, traffic sources, and more.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>Download or schedule reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-gray-500">
                <BarChart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium">Report Center</h3>
                <p className="max-w-md mx-auto mt-2">
                  The reporting module is in development. Soon you'll be able to generate custom reports on sales, inventory, and customer data.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
