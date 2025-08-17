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
  
        // SweetAlert success
        MySwal.fire({
          title: `${statusText}!`,
          text: `User has been ${statusText.toLowerCase()}.`,
          icon: status === 'approved' ? 'success' : status === 'rejected' ? 'error' : 'info',
          timer: 1500,
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
          
          // Success popup
          await MySwal.fire({
            title: 'Deleted!',
            text: res.data.message,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
    
          fetchUsers(); // Refresh the users list
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
  
    return matchesSearch && matchesStatus ;
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <span className="ml-4 text-gray-600">Loading users...</span>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-red-700 font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage and monitor user registrations and payments
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{userStats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">{userStats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-semibold text-gray-900">{userStats.approved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-red-50 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-semibold text-gray-900">{userStats.rejected}</p>
              </div>
            </div>
          </div>

         
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Users
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Search by name, email or phone..."
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

           
          </div>

          {/* Results Info */}
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600">
              Showing {filteredUsers.length} of {users.length} users
            </p>
            {(searchQuery || statusFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setPaymentFilter('all');
                }}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                 
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration Date
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Screenshot
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-gray-500 text-lg font-medium">No users found</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                              <span className="text-white font-semibold text-sm">
                                {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.fullName || 'Unknown User'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email || 'No email provided'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
  <div className="text-sm text-gray-900">
    {user.whatsapp ? (
      <div className="flex items-center">
        <svg
          className="w-4 h-4 text-green-500 mr-2"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
        <a
          href={`https://wa.me/${user.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-600"
        >
          {user.whatsapp}
        </a>
      </div>
    ) : (
      <span className="text-gray-400">N/A</span>
    )}
  </div>
</td>

                     
                      {/* Status Select in table row */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="relative">
          <select
            value={user.status}
            onChange={(e) => updateUserStatus(user._id, e.target.value)}
            disabled={updatingStatus === user._id}
            className={`pr-8 pl-3 py-1.5 rounded-lg text-sm font-medium border-0 cursor-pointer focus:ring-2 focus:ring-indigo-500 transition-all ${
              user.status === 'approved' 
                ? 'bg-green-100 text-green-800 hover:bg-green-200' :
              user.status === 'rejected' 
                ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
            } ${updatingStatus === user._id ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          {updatingStatus === user._id && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
            </div>
          )}
        </div>
      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(user.createdAt).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <a 
                            href={user.paymentScreenshot} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
                            title="View Payment Screenshot"
                          >
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </a>
                        </div>
                      </td>
<td className="px-6 py-4 whitespace-nowrap text-center">
  <div className="flex items-center justify-center space-x-2">
   

    {/* Delete Icon Button */}
    <button
      onClick={() => handleDelete(user._id)}
      disabled={loading}
      className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
      title="Delete User"
    >
      <Trash2 className="w-5 h-5 text-red-600" />
    </button>
  </div>
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