
import React, { useState } from 'react';
import { Search, Download, Eye, Edit } from 'lucide-react';

const UsersTable = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">User Management</h3>
        
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Bookings</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Spent</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-800">{user.name}</td>
                <td className="py-3 px-4 text-gray-600">{user.email}</td>
                <td className="py-3 px-4 text-gray-600">{user.phone}</td>
                <td className="py-3 px-4 text-gray-600">{user.joinedAt.toLocaleDateString()}</td>
                <td className="py-3 px-4 text-center">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {user.totalBookings}
                  </span>
                </td>
                <td className="py-3 px-4 font-semibold text-green-600">₹{user.totalSpent.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-600 hover:bg-green-100 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
