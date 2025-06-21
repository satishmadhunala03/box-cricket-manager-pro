
# Cricket Turf Booking System - Backend

This is the backend API for the Cricket Turf Booking System built with Express.js and MongoDB.

## Features

- User authentication (registration, login, JWT tokens)
- Slot management (create, read, update, delete)
- Booking system (create, cancel, view bookings)
- Admin panel functionality
- User management
- Real-time availability checking

## Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/cricket-turf
   JWT_SECRET=your-secret-key-here
   PORT=5000
   NODE_ENV=development
   ```

5. Start MongoDB service on your system

6. Seed the database with default slots:
   ```bash
   node scripts/seedSlots.js
   ```

7. Create an admin user:
   ```bash
   node scripts/createAdmin.js
   ```

8. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID (Admin only)
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user (Admin only)

### Slots
- `GET /api/slots` - Get all slots with availability
- `POST /api/slots` - Create new slot (Admin only)
- `PUT /api/slots/:id` - Update slot (Admin only)
- `DELETE /api/slots/:id` - Delete slot (Admin only)

### Bookings
- `GET /api/bookings` - Get bookings (user's own or all if admin)
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `DELETE /api/bookings/:id` - Delete booking (Admin only)

## Database Models

### User
- name, email, phone, password
- role (user/admin)
- totalBookings, totalSpent
- timestamps

### Slot
- timeSlot, startTime, endTime
- price, isActive, capacity
- description, timestamps

### Booking
- user (ref), slot (ref)
- bookingDate, timeSlot, price
- status (confirmed/cancelled/completed)
- paymentStatus, notes, timestamps

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Admin Credentials

Default admin credentials:
- Email: admin@cricketturf.com
- Password: admin123

## Development

Run in development mode with auto-reload:
```bash
npm run dev
```

## Production

For production deployment:
1. Set NODE_ENV=production in .env
2. Use a production MongoDB instance
3. Set a strong JWT_SECRET
4. Run: `npm start`
