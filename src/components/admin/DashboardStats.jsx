
import React from 'react';
import { Calendar, Star, Users, Clock } from 'lucide-react';

const DashboardStats = ({ slots, users }) => {
  const bookedSlots = slots.filter(slot => slot.isBooked);
  const todayRevenue = bookedSlots.length * 500;
  const totalUsers = users.length;
  const occupancyRate = ((bookedSlots.length / slots.length) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-900">{bookedSlots.length}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
            <p className="text-2xl font-bold text-gray-900">₹{todayRevenue.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Star className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
            <p className="text-2xl font-bold text-gray-900">{occupancyRate}%</p>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
