import React from 'react';
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


  const recentActivity = [
    { type: 'order', message: 'New order #1234 from Ahmed Khan', time: '2 minutes ago', amount: '₨1,499' },
    { type: 'user', message: 'New user registration: Fatima Ali', time: '5 minutes ago' },
    { type: 'payment', message: 'Payment received: ₨1,499', time: '10 minutes ago', status: 'success' },
    { type: 'product', message: 'Product updated: Handwriting Mastery Kit', time: '15 minutes ago' },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'order': return 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z';
      case 'user': return 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M19 8.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z';
      case 'payment': return 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z';
      case 'product': return 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4';
      default: return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'order': return 'from-blue-400 to-cyan-400';
      case 'user': return 'from-emerald-400 to-teal-400';
      case 'payment': return 'from-violet-400 to-purple-400';
      case 'product': return 'from-orange-400 to-amber-400';
      default: return 'from-gray-400 to-slate-400';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Page header with floating effect */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient bg-300">
                Analytics Dashboard
              </h1>
              <p className="mt-3 text-gray-600 text-lg">
                Track your business performance and insights
              </p>
            </div>
            <button className="mt-6 md:mt-0 group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <svg className="relative w-5 h-5 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="relative text-white font-semibold text-lg">Export Report</span>
            </button>
          </div>
        </div>

        {/* Key metrics with glass morphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Total Revenue', value: '₨45,678', change: '+23%', changeType: 'positive', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1', gradient: 'from-purple-500 to-pink-500' },
            { name: 'Active Users', value: '2,847', change: '+8%', changeType: 'positive', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', gradient: 'from-emerald-500 to-teal-500' },
            { name: 'Conversion Rate', value: '3.2%', change: '+0.5%', changeType: 'positive', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', gradient: 'from-blue-500 to-cyan-500' },
          ].map((stat, index) => (
            <div key={stat.name} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-7 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{stat.name}</p>
                    <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        stat.changeType === 'positive' 
                          ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700' 
                          : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-gray-500">vs last month</span>
                    </div>
                  </div>
                  <div className={`p-4 bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-lg`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={stat.icon} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and data grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart with modern design */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Sales Overview</h3>
                  <p className="text-sm text-gray-500 mt-1">Monthly performance metrics</p>
                </div>
                <select className="text-sm border-2 border-gray-200 rounded-xl px-4 py-2.5 bg-white/50 backdrop-blur-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 font-medium">
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className="space-y-6">
                {chartData.map((data, index) => (
                  <div key={data.month} className="group/item">
                    <div className="flex items-center mb-2">
                      <div className="w-14 text-sm font-bold text-gray-700">{data.month}</div>
                      <div className="flex-1 text-right">
                        <span className="text-sm font-bold text-gray-900">₨{data.sales.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="relative h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden shadow-inner">
                      <div 
                        style={{ width: `${(data.sales / 30000) * 100}%` }}
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full shadow-lg transition-all duration-700 ease-out group-hover/item:shadow-xl"
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
           {/* User Growth */}
           <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-7 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-gray-900">User Growth</h3>
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="space-y-4">
                {chartData.slice(-3).map((data) => (
                  <div key={data.month} className="flex justify-between items-center p-3 bg-white/50 backdrop-blur rounded-xl hover:bg-white/70 transition-all duration-300">
                    <span className="text-sm font-semibold text-gray-600">{data.month}</span>
                    <span className="text-sm font-bold text-gray-900">{data.users} users</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        
        </div>

        {/* Recent Activity with timeline design */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-black text-gray-900">Recent Activity</h3>
              <p className="text-sm text-gray-500 mt-1">Real-time updates from your platform</p>
            </div>
            <div className="space-y-5">
              {recentActivity.map((activity, index) => (
                <div key={index} className="group/activity flex items-start">
                  <div className="relative flex-shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-r ${getActivityColor(activity.type)} rounded-2xl blur-lg opacity-50 group-hover/activity:opacity-75 transition-opacity`}></div>
                    <div className={`relative h-12 w-12 bg-gradient-to-r ${getActivityColor(activity.type)} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={getActivityIcon(activity.type)} />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 flex-1">
                    <div className="bg-white/50 backdrop-blur rounded-2xl p-4 border border-gray-100 hover:border-purple-200 transition-all duration-300">
                      <p className="text-sm font-semibold text-gray-900">{activity.message}</p>
                      <div className="flex items-center mt-2 space-x-3">
                        <p className="text-xs text-gray-500">{activity.time}</p>
                        {activity.amount && (
                          <span className="text-xs font-bold text-purple-600">{activity.amount}</span>
                        )}
                        {activity.status === 'success' && (
                          <span className="px-2 py-0.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-xs font-bold rounded-full">
                            Success
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .bg-300 {
          background-size: 300%;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Analytics;