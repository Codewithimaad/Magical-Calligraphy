import { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import axios from 'axios';
import { AuthContext } from "../context/authContext";
import { Trash2 } from "lucide-react";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Users = () => {
  const { backendUrl } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  // Fetch users on component mount
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/admin/users`, { 
        withCredentials: true 
      });
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (err) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update user status
  const updateUserStatus = async (userId, status) => {
    const statusText = status.charAt(0).toUpperCase() + status.slice(1);
    
    try {
      setUpdatingStatus(userId);
      
      const response = await axios.put(
        `${backendUrl}/api/admin/users/${userId}/status`,
        { status },
        { withCredentials: true }
      );
  
      if (response.data.success) {
        setUsers(users.map(user =>
          user._id === userId ? { ...user, status } : user
        ));
  
        MySwal.fire({
          title: `${statusText}!`,
          text: 
            status === 'approved'
              ? `User has been approved and the course link has been sent to the customer's email.`
              : status === 'rejected'
                ? `User has been rejected.`
                : `User status has been set to pending.`,
          icon: status === 'approved' ? 'success' : status === 'rejected' ? 'error' : 'info',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (err) {
      console.error("Error updating user status:", err);
      MySwal.fire('Error', 'Failed to update user status.', 'error');
    } finally {
      setUpdatingStatus(null);
    }
  };
  
  // Delete user handler
  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
  
    if (result.isConfirmed) {
      try {
        setLoading(true);
        const res = await axios.delete(`${backendUrl}/api/admin/users/${id}`);
        
        await MySwal.fire({
          title: 'Deleted!',
          text: res.data.message,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
  
        fetchUsers();
      } catch (error) {
        console.error("Delete user error:", error);
        MySwal.fire('Error', 'Failed to delete user.', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  // Filter users based on search query and filters
  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = (
      (user.fullName?.toLowerCase().includes(searchLower)) ||
      (user.email?.toLowerCase().includes(searchLower)) ||
      (user.whatsapp?.toString().includes(searchQuery))
    );
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
  
    return matchesSearch && matchesStatus;
  });

  // Get user stats
  const userStats = {
    total: users.length,
    pending: users.filter(u => u.status === 'pending').length,
    approved: users.filter(u => u.status === 'approved').length,
    rejected: users.filter(u => u.status === 'rejected').length,
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 bg-gradient-to-r from-indigo-500 to-purple-600 p-1">
              <div className="bg-white rounded-full h-full w-full"></div>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 blur-lg opacity-30 animate-pulse"></div>
          </div>
          <span className="ml-6 text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Loading users...
          </span>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <div className="bg-gradient-to-br from-red-50/90 to-pink-50/90 backdrop-blur-xl border border-red-200/60 rounded-3xl p-8 max-w-md mx-auto shadow-2xl shadow-red-500/10 ring-1 ring-red-100">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl mx-auto mb-6 shadow-lg shadow-red-500/25">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-red-800 mb-2">Something went wrong</h3>
            <p className="text-red-600 font-medium mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-red-500/25 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Try Again
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/60 shadow-2xl shadow-slate-900/5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-3">
                  User Management
                </h1>
                <p className="text-lg text-slate-600 font-medium">
                  Manage and monitor user registrations and payments
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: 'Total Users', 
              value: userStats.total, 
              icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
              gradient: 'from-blue-500 to-cyan-500',
              bgGradient: 'from-blue-50/90 to-cyan-50/90',
              shadowColor: 'shadow-blue-500/20'
            },
            { 
              title: 'Pending', 
              value: userStats.pending, 
              icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
              gradient: 'from-yellow-500 to-orange-500',
              bgGradient: 'from-yellow-50/90 to-orange-50/90',
              shadowColor: 'shadow-yellow-500/20'
            },
            { 
              title: 'Approved', 
              value: userStats.approved, 
              icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
              gradient: 'from-green-500 to-emerald-500',
              bgGradient: 'from-green-50/90 to-emerald-50/90',
              shadowColor: 'shadow-green-500/20'
            },
            { 
              title: 'Rejected', 
              value: userStats.rejected, 
              icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
              gradient: 'from-red-500 to-pink-500',
              bgGradient: 'from-red-50/90 to-pink-50/90',
              shadowColor: 'shadow-red-500/20'
            }
          ].map((stat, index) => (
            <div key={index} className="group">
              <div className={`relative bg-gradient-to-br ${stat.bgGradient} backdrop-blur-xl rounded-3xl p-6 border border-white/40 shadow-2xl ${stat.shadowColor} hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl pointer-events-none"></div>
                <div className="relative flex items-center">
                  <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-lg ${stat.shadowColor} group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">{stat.title}</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters Section */}
        <div className="bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-2xl shadow-slate-900/5 overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Search */}
              <div className="md:col-span-2">
                <label htmlFor="search" className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                  Search Users
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-lg shadow-slate-200/50 focus:shadow-xl focus:shadow-indigo-500/10 text-slate-800 font-medium"
                    placeholder="Search by name, email or phone..."
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label htmlFor="status-filter" className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                  Status
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full px-4 py-4 bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-lg shadow-slate-200/50 focus:shadow-xl focus:shadow-indigo-500/10 text-slate-800 font-medium"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Results Info */}
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-200/60">
              <p className="text-slate-600 font-semibold">
                Showing <span className="text-indigo-600 font-bold">{filteredUsers.length}</span> of <span className="text-slate-800 font-bold">{users.length}</span> users
              </p>
              {(searchQuery || statusFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-2xl shadow-slate-900/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-slate-50/90 to-slate-100/90 backdrop-blur-sm border-b border-slate-200/60">
                <tr>
                  {['User', 'Contact', 'Payment', 'Registration Date', 'Screenshot', 'Actions'].map((header) => (
                    <th key={header} className="px-8 py-6 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/40">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-8 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-slate-200/50">
                          <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-700 mb-2">No users found</h3>
                        <p className="text-slate-500 font-medium">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50/50 transition-all duration-200 group">
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-xl group-hover:shadow-indigo-500/30 transition-all duration-200 ring-2 ring-white/50">
                              <span className="text-white font-bold text-sm">
                                {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-slate-900">
                              {user.fullName || 'Unknown User'}
                            </div>
                            <div className="text-sm text-slate-600 font-medium">
                              {user.email || 'No email provided'}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="text-sm text-slate-900">
                          {user.whatsapp ? (
                            <div className="flex items-center">
                              <div className="p-2 bg-green-50 rounded-xl mr-3 shadow-sm">
                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                </svg>
                              </div>
                              <a
                                href={`https://wa.me/${user.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-slate-800 hover:text-green-600 transition-colors"
                              >
                                {user.whatsapp}
                              </a>
                            </div>
                          ) : (
                            <span className="text-slate-400 font-medium">N/A</span>
                          )}
                        </div>
                      </td>

                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="relative">
                          <select
                            value={user.status}
                            onChange={(e) => updateUserStatus(user._id, e.target.value)}
                            disabled={updatingStatus === user._id}
                            className={`pr-10 pl-4 py-3 rounded-xl text-sm font-bold border-0 cursor-pointer focus:ring-2 focus:ring-offset-2 transition-all shadow-lg backdrop-blur-sm ${
                              user.status === 'approved' 
                                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 focus:ring-green-500 hover:shadow-green-200' :
                              user.status === 'rejected' 
                                ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 focus:ring-red-500 hover:shadow-red-200' :
                                'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 focus:ring-yellow-500 hover:shadow-yellow-200'
                            } ${updatingStatus === user._id ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          {updatingStatus === user._id && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="text-sm font-bold text-slate-900">
                          {new Date(user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="text-xs text-slate-600 font-medium">
                          {new Date(user.createdAt).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </td>

                      <td className="px-8 py-6 whitespace-nowrap text-center">
                        <a 
                          href={user.paymentScreenshot} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 text-sm font-semibold transform hover:scale-105 active:scale-95 group"
                          title="View Payment Screenshot"
                        >
                          <svg className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </a>
                      </td>

                      <td className="px-8 py-6 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleDelete(user._id)}
                          disabled={loading}
                          className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-red-500/25 transform hover:scale-110 active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete User"
                        >
                          <Trash2 className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-200" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Users;