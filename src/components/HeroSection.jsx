
import React from 'react';
import { MapPin, Star, Clock } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Premium Box Cricket Turf
        </h2>
        <p className="text-xl mb-6">
          Book your slot and enjoy the best cricket experience in the city
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Prime Location</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5" />
            <span>5-Star Rated</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>6 AM - 10 PM</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
