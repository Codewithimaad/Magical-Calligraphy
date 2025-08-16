import DashboardLayout from '../components/DashboardLayout';

const Analytics = () => {
  const chartData = [
    { month: 'Jan', sales: 12000, orders: 45, users: 120 },
    { month: 'Feb', sales: 15000, orders: 52, users: 145 },
    { month: 'Mar', sales: 18000, orders: 61, users: 168 },
    { month: 'Apr', sales: 22000, orders: 73, users: 195 },
    { month: 'May', sales: 25000, orders: 82, users: 220 },
    { month: 'Jun', sales: 28000, orders: 91, users: 245 },
  ];

  const topProducts = [
    { name: 'Handwriting Mastery Kit', sales: 234, revenue: '₨35,166' },
    { name: 'Printable Worksheets Pack', sales: 156, revenue: '₨15,600' },
    { name: 'WhatsApp Coaching Group', sales: 89, revenue: '₨8,900' },
    { name: 'Complete Package', sales: 67, revenue: '₨16,743' },
  ];

  const recentActivity = [
    { type: 'order', message: 'New order #1234 from Ahmed Khan', time: '2 minutes ago' },
    { type: 'user', message: 'New user registration: Fatima Ali', time: '5 minutes ago' },
    { type: 'payment', message: 'Payment received: ₨1,499', time: '10 minutes ago' },
    { type: 'product', message: 'Product updated: Handwriting Mastery Kit', time: '15 minutes ago' },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'order': return 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z';
      case 'user': return 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z';
      case 'payment': return 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z';
      case 'product': return 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4';
      default: return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'order': return 'bg-blue-50 text-blue-600';
      case 'user': return 'bg-green-50 text-green-600';
      case 'payment': return 'bg-purple-50 text-purple-600';
      case 'product': return 'bg-orange-50 text-orange-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="mt-2 text-gray-500">
              Track your business performance and insights
            </p>
          </div>
          <button className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
            <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-white font-medium">Export Report</span>
          </button>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Total Revenue', value: '₨45,678', change: '+23%', changeType: 'positive', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' },
            { name: 'Total Orders', value: '1,234', change: '+12%', changeType: 'positive', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
            { name: 'Active Users', value: '2,847', change: '+8%', changeType: 'positive', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' },
            { name: 'Conversion Rate', value: '3.2%', change: '+0.5%', changeType: 'positive', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
          ].map((stat) => (
            <div key={stat.name} className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm font-medium mt-1 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={stat.icon} />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and data grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Sales Overview</h3>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="space-y-5">
              {chartData.map((data) => (
                <div key={data.month} className="flex items-center">
                  <div className="w-12 text-sm font-medium text-gray-500">{data.month}</div>
                  <div className="flex-1 mx-4">
                    <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${(data.sales / 30000) * 100}%` }}
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">₨{data.sales.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Top Products</h3>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} sales</p>
                  </div>
                  <div className="ml-4 text-sm font-bold text-gray-900">{product.revenue}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start group">
                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={getActivityIcon(activity.type)} />
                  </svg>
                </div>
                <div className="ml-4 flex-1 border-b border-gray-100 pb-4 group-last:border-0">
                  <p className="text-sm text-gray-700">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Growth */}
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">User Growth</h3>
            <div className="space-y-3">
              {chartData.slice(-3).map((data) => (
                <div key={data.month} className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{data.month}</span>
                  <span className="text-sm font-medium text-gray-900">{data.users} users</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Trends */}
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Trends</h3>
            <div className="space-y-3">
              {chartData.slice(-3).map((data) => (
                <div key={data.month} className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{data.month}</span>
                  <span className="text-sm font-medium text-gray-900">{data.orders} orders</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center">
                <svg className="w-5 h-5 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium text-gray-900">Export Report</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-sm font-medium text-gray-900">Detailed Analytics</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span className="text-sm font-medium text-gray-900">Generate Insights</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;