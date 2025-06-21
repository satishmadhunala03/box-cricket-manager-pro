
import React, { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import BookingSection from '../components/BookingSection';
import Footer from '../components/Footer';
import { generateTimeSlots } from '../utils/mockData';

const BoxBooking = () => {
  const [user, setUser] = useState(null);
  const [slots, setSlots] = useState(generateTimeSlots());

  const handleLogout = () => {
    setUser(null);
  };

  const handleBookSlot = (slot) => {
    if (!user) {
      // Redirect to login will be handled by navigation
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header user={user} onLogout={handleLogout} />
      <HeroSection />
      <BookingSection 
        slots={slots}
        user={user}
        onBookSlot={handleBookSlot}
      />
      <Footer />
    </div>
  );
};

export default BoxBooking;
