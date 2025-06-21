
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginComponent from '../components/auth/Login';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    // Handle login logic here
    console.log('User logged in:', userData);
    navigate('/booking');
  };

  const handleSwitchToRegister = () => {
    navigate('/register');
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <LoginComponent
        onLogin={handleLogin}
        onSwitchToRegister={handleSwitchToRegister}
        onClose={handleClose}
      />
    </div>
  );
};

export default Login;
