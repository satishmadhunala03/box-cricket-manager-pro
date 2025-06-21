
import React, { useState } from 'react';
import { Search, Clock, Eye, Trash2 } from 'lucide-react';

const BookingsTable = ({ slots, onCancelBooking }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const bookedSlots = slots.filter(slot => slot.isBooked);
  
  const filteredBookings = bookedSlots.filter(slot => {
    const matchesSearch = slot.bookedBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         slot.userEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'booked' && slot.isBooked);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Recent Bookings</h3>
        
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="booked">Booked</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Time Slot</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Booked At</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map(slot => (
              <tr key={slot.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-2" />
                    {slot.time}
                  </div>
                </td>
                <td className="py-3 px-4 font-medium text-gray-800">{slot.bookedBy}</td>
                <td className="py-3 px-4 text-gray-600">{slot.userEmail}</td>
                <td className="py-3 px-4 text-gray-600">{slot.userPhone}</td>
                <td className="py-3 px-4 text-gray-600">
                  {slot.bookedAt ? slot.bookedAt.toLocaleDateString() : 'N/A'}
                </td>
                <td className="py-3 px-4 font-semibold text-green-600">₹{slot.price}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onCancelBooking(slot.id)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No bookings found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default BookingsTable;
