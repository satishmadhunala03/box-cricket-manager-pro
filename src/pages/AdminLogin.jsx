
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLoginComponent from '../components/auth/AdminLogin';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (adminData) => {
    // Handle admin login logic here
    console.log('Admin logged in:', adminData);
    navigate('/admin/dashboard');
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <AdminLoginComponent
        onLogin={handleLogin}
        onClose={handleClose}
      />
    </div>
  );
};

export default AdminLogin;
