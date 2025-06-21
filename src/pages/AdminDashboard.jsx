
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboardComponent from '../components/admin/AdminDashboard';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle admin logout logic here
    console.log('Admin logged out');
    navigate('/');
  };

  // Mock admin data - in real app, this would come from authentication context
  const admin = {
    username: 'admin',
    name: 'Admin User',
    role: 'admin'
  };

  return (
    <AdminDashboardComponent
      admin={admin}
      onLogout={handleLogout}
    />
  );
};

export default AdminDashboard;
