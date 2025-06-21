
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterComponent from '../components/auth/Register';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (userData) => {
    // Handle registration logic here
    console.log('User registered:', userData);
    navigate('/booking');
  };

  const handleSwitchToLogin = () => {
    navigate('/login');
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <RegisterComponent
        onRegister={handleRegister}
        onSwitchToLogin={handleSwitchToLogin}
        onClose={handleClose}
      />
    </div>
  );
};

export default Register;
