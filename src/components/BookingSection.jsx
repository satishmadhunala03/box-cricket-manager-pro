
import React from 'react';
import { Clock } from 'lucide-react';

const BookingSection = ({ slots, user, onBookSlot }) => {
  return (
    <main className="py-8">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Book Your Slot</h2>
              <p className="text-gray-600">Select your preferred time slot for cricket</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slots.map(slot => (
              <div
                key={slot.id}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  !slot.isBooked 
                    ? 'border-green-200 bg-green-50 hover:border-green-300 hover:shadow-md' 
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className={`w-5 h-5 ${!slot.isBooked ? 'text-green-600' : 'text-red-500'}`} />
                    <div>
                      <p className="font-semibold text-gray-800">{slot.time}</p>
                      <p className="text-sm text-gray-600">₹{slot.price}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {!slot.isBooked ? (
                      <button
                        onClick={() => onBookSlot(slot)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        Book Now
                      </button>
                    ) : (
                      <div className="text-center">
                        <span className="text-red-600 font-semibold text-sm">Booked</span>
                        {slot.bookedBy && (
                          <p className="text-xs text-gray-500 mt-1">by {slot.bookedBy}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingSection;
