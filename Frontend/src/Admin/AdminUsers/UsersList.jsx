import React, { useEffect, useState } from 'react';
import {
  Search,
  Users,
  UserCheck,
  UserCog,
} from 'lucide-react';
import AdminHeading from '../AdminHeading/AdminHeading';
import { getAllUsers } from '../../State/Authentication/Action';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader/Loader';

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, error, isLoading } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // ✅ Filter users by name, surname, email, mobile, or role
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(term) ||
      user.surname?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.mobile?.toString().includes(term) ||
      user.role?.toLowerCase().includes(term)
    );
  });

  // ✅ Stats
  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === 'ADMIN').length;
  const customerCount = users.filter((u) => u.role === 'CUSTOMER').length;

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500 p-4">Error: {error}</p>;

  const stats = [
    {
      label: 'Total Users',
      value: totalUsers,
      change: '',
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
    },
    {
      label: 'Customers',
      value: customerCount,
      change: '',
      icon: UserCheck,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      label: 'Admins',
      value: adminCount,
      change: '',
      icon: UserCog,
      color: 'from-rose-500 to-pink-600',
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <AdminHeading heading={'Users'} subheading={'Track and manage all customers'} />
      </div>

      {/* Stat Cards (Your style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group relative overflow-hidden"
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}
            ></div>
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
              >
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
            <p className="text-slate-600 text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search bar */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, mobile, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">User ID</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Customer</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Email</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Mobile</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Date</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-4 px-4 font-semibold text-slate-900 truncate max-w-[140px]">
                      {user._id}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                          <span className="text-slate-700 font-semibold text-xs">
                            {user.name?.charAt(0)}
                          </span>
                        </div>
                        <span className="text-slate-900">
                          {user.name} {user.surname}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600">{user.email}</td>
                    <td className="py-4 px-4 text-slate-600">{user.mobile}</td>
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'ADMIN'
                            ? 'bg-rose-100 text-rose-600'
                            : 'bg-emerald-100 text-emerald-600'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-slate-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
