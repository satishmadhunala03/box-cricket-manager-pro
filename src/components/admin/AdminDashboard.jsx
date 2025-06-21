
import React, { useState } from 'react';
import { Calendar, Clock, Users, Shield, User, LogOut } from 'lucide-react';
import DashboardStats from './DashboardStats';
import BookingsTable from './BookingsTable';
import UsersTable from './UsersTable';
import { generateTimeSlots, generateUsers } from '../../utils/mockData';

const AdminDashboard = ({ admin, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [slots, setSlots] = useState(generateTimeSlots());
  const [users] = useState(generateUsers());

  const handleCancelBooking = (slotId) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      setSlots(prevSlots =>
        prevSlots.map(slot =>
          slot.id === slotId
            ? { ...slot, isBooked: false, bookedBy: null, bookedAt: null, userEmail: null, userPhone: null }
            : slot
        )
      );
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Calendar },
    { id: 'bookings', label: 'Bookings', icon: Clock },
    { id: 'users', label: 'Users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">CricketTurf Management</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">{admin.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg shadow-sm">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <div>
            <DashboardStats slots={slots} users={users} />
            <BookingsTable slots={slots} onCancelBooking={handleCancelBooking} />
          </div>
        )}

        {activeTab === 'bookings' && (
          <BookingsTable slots={slots} onCancelBooking={handleCancelBooking} />
        )}

        {activeTab === 'users' && (
          <UsersTable users={users} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
