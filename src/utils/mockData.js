
// Dummy data for time slots
export const generateTimeSlots = () => {
  const slots = [];
  const users = ['John Doe', 'Alice Smith', 'Bob Johnson', 'Sarah Wilson', 'Mike Brown', 'Emma Davis'];
  
  for (let hour = 6; hour < 22; hour++) {
    const startTime = `${hour}:00`;
    const endTime = `${hour + 1}:00`;
    const timeString = `${hour < 10 ? '0' + hour : hour}:00 - ${(hour + 1) < 10 ? '0' + (hour + 1) : (hour + 1)}:00`;
    
    const isBooked = Math.random() > 0.6;
    const bookedBy = isBooked ? users[Math.floor(Math.random() * users.length)] : null;
    
    slots.push({
      id: `slot-${hour}`,
      time: timeString,
      startHour: hour,
      price: 500,
      isBooked,
      bookedBy,
      bookedAt: isBooked ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : null,
      userEmail: isBooked ? `${bookedBy?.toLowerCase().replace(' ', '.')}@email.com` : null,
      userPhone: isBooked ? `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}` : null
    });
  }
  return slots;
};

// Sample user data
export const generateUsers = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@email.com', phone: '+91 9876543210', joinedAt: new Date('2024-01-15'), totalBookings: 12, totalSpent: 6000 },
    { id: 2, name: 'Alice Smith', email: 'alice.smith@email.com', phone: '+91 9876543211', joinedAt: new Date('2024-02-20'), totalBookings: 8, totalSpent: 4000 },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@email.com', phone: '+91 9876543212', joinedAt: new Date('2024-03-10'), totalBookings: 15, totalSpent: 7500 },
    { id: 4, name: 'Sarah Wilson', email: 'sarah.wilson@email.com', phone: '+91 9876543213', joinedAt: new Date('2024-01-25'), totalBookings: 6, totalSpent: 3000 },
    { id: 5, name: 'Mike Brown', email: 'mike.brown@email.com', phone: '+91 9876543214', joinedAt: new Date('2024-04-05'), totalBookings: 10, totalSpent: 5000 },
  ];
  return users;
};
