
import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import BookingSection from '../components/BookingSection';
import Footer from '../components/Footer';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import AdminLogin from '../components/auth/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';
import { generateTimeSlots } from '../utils/mockData';

const BoxBooking = () => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [slots, setSlots] = useState(generateTimeSlots());

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setShowRegister(false);
  };

  const handleAdminLogin = (adminData) => {
    setAdmin(adminData);
    setShowAdminLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAdminLogout = () => {
    setAdmin(null);
  };

  const handleBookSlot = (slot) => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    setSlots(prevSlots =>
      prevSlots.map(s =>
        s.id === slot.id
          ? { ...s, isBooked: true, bookedBy: user.name }
          : s
      )
    );

    alert(`Successfully booked ${slot.time} for ₹${slot.price}!`);
  };

  // Show admin dashboard if admin is logged in
  if (admin) {
    return <AdminDashboard admin={admin} onLogout={handleAdminLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header 
        user={user}
        onLogin={() => setShowLogin(true)}
        onRegister={() => setShowRegister(true)}
        onAdminLogin={() => setShowAdminLogin(true)}
        onLogout={handleLogout}
      />
      
      <HeroSection />
      
      <BookingSection 
        slots={slots}
        user={user}
        onBookSlot={handleBookSlot}
      />
      
      <Footer />

      {/* Modals */}
      {showLogin && (
        <Login
          onLogin={handleLogin}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          onClose={() => setShowLogin(false)}
        />
      )}

      {showRegister && (
        <Register
          onRegister={handleRegister}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
          onClose={() => setShowRegister(false)}
        />
      )}

      {showAdminLogin && (
        <AdminLogin
          onLogin={handleAdminLogin}
          onClose={() => setShowAdminLogin(false)}
        />
      )}
    </div>
  );
};

export default BoxBooking;
