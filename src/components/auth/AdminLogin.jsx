
import React, { useState } from 'react';
import { X, Shield } from 'lucide-react';

const AdminLogin = ({ onLogin, onClose }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = () => {
    // Simple admin login - in real app, validate against backend
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      onLogin({ username: 'admin', name: 'Admin User', role: 'admin' });
    } else {
      alert('Invalid credentials. Use admin/admin123');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
        
        <div className="text-center mb-6">
          <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Login</h2>
          <p className="text-gray-600">Access the admin dashboard</p>
          <p className="text-sm text-gray-500 mt-2">Demo: admin/admin123</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter password"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
