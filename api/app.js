import express from 'express';
import cors from 'cors';
import { 
  MOCK_FLIGHTS, 
  MOCK_HOTELS, 
  MOCK_TRAINS, 
  MOCK_CABS, 
  MOCK_BUSES, 
  OFFERS 
} from '../src/data/mockData.js';

const app = express();

// Standard Middlewares
app.use(cors());
app.use(express.json());

// Request Logger Middleware (Displays real-time logs in terminal for Postman demos!)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const color = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl} -> ${color}${res.statusCode}\x1b[0m (${duration}ms)`);
  });
  next();
});

// In-Memory Database for Bookings and Users (Initialized with demo data)
let bookingsDatabase = [
  {
    pnr: 'WL-100001',
    bookingDate: '15 Nov 2026',
    status: 'CONFIRMED',
    type: 'flight',
    passengerName: 'Indrajit Gupta',
    passengerPhone: '+91 9876543210',
    passengerEmail: 'indrajit@wanderlux.com',
    item: {
      id: 'fl-101',
      airline: 'IndiGo',
      flightNo: '6E-2041',
      depCity: 'Delhi',
      arrCity: 'Mumbai',
      depTime: '06:00',
      arrTime: '08:15',
      seat: '12A'
    },
    seat: '12A',
    totalPrice: 4850
  }
];

let usersDatabase = [
  {
    id: 'usr_1',
    name: 'Indrajit Gupta',
    email: 'indrajit@wanderlux.com',
    phone: '+91 9876543210',
    createdAt: '2026-10-01'
  }
];

// ============================================================================
// 1. SYSTEM & HEALTH CHECK ENDPOINTS
// ============================================================================

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'OPERATIONAL',
    service: 'Wanderlux Travel REST API',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()) + 's'
  });
});

// ============================================================================
// 2. FLIGHTS REST ENDPOINTS
// ============================================================================

// GET /api/flights?from=DEL&to=BOM&maxPrice=10000&stops=0
app.get('/api/flights', (req, res) => {
  const { from, to, maxPrice, stops, sort } = req.query;
  let results = [...MOCK_FLIGHTS];

  if (from) {
    const q = from.toLowerCase();
    results = results.filter(f => 
      f.depCity.toLowerCase().includes(q) || f.depCode.toLowerCase() === q
    );
  }

  if (to) {
    const q = to.toLowerCase();
    results = results.filter(f => 
      f.arrCity.toLowerCase().includes(q) || f.arrCode.toLowerCase() === q
    );
  }

  if (maxPrice) {
    results = results.filter(f => f.price <= Number(maxPrice));
  }

  if (stops && stops !== 'All') {
    results = results.filter(f => f.stops.toLowerCase().includes(stops.toLowerCase()));
  }

  if (sort === 'cheapest') {
    results.sort((a, b) => a.price - b.price);
  } else if (sort === 'fastest') {
    results.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
  }

  res.status(200).json({
    success: true,
    count: results.length,
    filters: { from: from || 'any', to: to || 'any', maxPrice: maxPrice || 'none' },
    data: results
  });
});

// GET /api/flights/:id
app.get('/api/flights/:id', (req, res) => {
  const flight = MOCK_FLIGHTS.find(f => f.id.toLowerCase() === req.params.id.toLowerCase());
  if (!flight) {
    return res.status(404).json({
      success: false,
      message: `Flight with ID '${req.params.id}' was not found.`
    });
  }
  res.status(200).json({
    success: true,
    data: flight
  });
});

// ============================================================================
// 3. HOTELS REST ENDPOINTS
// ============================================================================

// GET /api/hotels?city=Mumbai&minRating=4.5
app.get('/api/hotels', (req, res) => {
  const { city, minRating, maxPrice } = req.query;
  let results = [...MOCK_HOTELS];

  if (city) {
    results = results.filter(h => h.city.toLowerCase() === city.toLowerCase());
  }

  if (minRating) {
    results = results.filter(h => h.rating >= Number(minRating));
  }

  if (maxPrice) {
    results = results.filter(h => h.price <= Number(maxPrice));
  }

  res.status(200).json({
    success: true,
    count: results.length,
    city: city || 'all',
    data: results
  });
});

// GET /api/hotels/:id
app.get('/api/hotels/:id', (req, res) => {
  const hotel = MOCK_HOTELS.find(h => h.id.toLowerCase() === req.params.id.toLowerCase());
  if (!hotel) {
    return res.status(404).json({
      success: false,
      message: `Hotel with ID '${req.params.id}' was not found.`
    });
  }
  res.status(200).json({
    success: true,
    data: hotel
  });
});

// GET /api/trains
app.get('/api/trains', (req, res) => {
  res.status(200).json({
    success: true,
    count: MOCK_TRAINS.length,
    data: MOCK_TRAINS
  });
});

// GET /api/buses
app.get('/api/buses', (req, res) => {
  res.status(200).json({
    success: true,
    count: MOCK_BUSES.length,
    data: MOCK_BUSES
  });
});

// ============================================================================
// 4. AUTHENTICATION REST ENDPOINTS
// ============================================================================

// POST /api/auth/send-otp
app.post('/api/auth/send-otp', (req, res) => {
  const { phone } = req.body;
  if (!phone || String(phone).replace(/\D/g, '').length !== 10) {
    return res.status(400).json({
      success: false,
      message: 'A valid 10-digit mobile number is required.'
    });
  }

  res.status(200).json({
    success: true,
    message: `Verification OTP dispatched to +91 ${phone}`,
    phone,
    demoOtp: '1234',
    expiresInSeconds: 300
  });
});

// POST /api/auth/verify-otp
app.post('/api/auth/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({
      success: false,
      message: 'Both phone number and OTP code are required.'
    });
  }

  if (otp === '1234' || otp.length === 4) {
    const user = {
      id: `usr_${Date.now()}`,
      name: `Traveler (${String(phone).slice(-4)})`,
      phone: `+91 ${phone}`,
      email: `user_${phone}@wanderlux.com`
    };

    return res.status(200).json({
      success: true,
      message: 'Phone number verified successfully.',
      authToken: `wl_jwt_${Buffer.from(phone).toString('base64')}_demo`,
      user
    });
  }

  res.status(400).json({
    success: false,
    message: 'Invalid OTP code. Please use demo code 1234.'
  });
});

// POST /api/auth/register
app.post('/api/auth/register', (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Name must have at least 2 characters.' });
  }
  if (!email || !email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ success: false, message: 'Valid email address is required.' });
  }
  if (!phone || String(phone).replace(/\D/g, '').length !== 10) {
    return res.status(400).json({ success: false, message: 'Valid 10-digit phone number is required.' });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
  }

  const newUser = {
    id: `usr_${Date.now()}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: String(phone).replace(/\D/g, ''),
    createdAt: new Date().toISOString()
  };

  usersDatabase.push(newUser);

  res.status(201).json({
    success: true,
    message: 'Account created successfully! Welcome to Wanderlux Privileges.',
    user: newUser,
    welcomeBonus: 'Flat ₹800 OFF Voucher + 500 LuxCoins Credited'
  });
});

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Sign-in successful.',
    authToken: `wl_jwt_${Date.now()}_auth`,
    user: {
      name: email.split('@')[0],
      email,
      phone: '+91 9876543210'
    }
  });
});

// ============================================================================
// 5. BOOKINGS & TICKETS REST ENDPOINTS (CRUD)
// ============================================================================

// GET /api/bookings
app.get('/api/bookings', (req, res) => {
  res.status(200).json({
    success: true,
    count: bookingsDatabase.length,
    data: bookingsDatabase
  });
});

// POST /api/bookings
app.post('/api/bookings', (req, res) => {
  const { passengerName, passengerPhone, passengerEmail, type, itemId, seat, totalPrice } = req.body;

  if (!passengerName || !passengerPhone) {
    return res.status(400).json({
      success: false,
      message: 'passengerName and passengerPhone are required to confirm booking.'
    });
  }

  const pnr = `WL-${Math.floor(100000 + Math.random() * 900000)}`;

  let item = null;
  if (type === 'flight' || !type) {
    item = MOCK_FLIGHTS.find(f => f.id === itemId) || MOCK_FLIGHTS[0];
  } else if (type === 'hotel') {
    item = MOCK_HOTELS.find(h => h.id === itemId) || MOCK_HOTELS[0];
  }

  const newBooking = {
    pnr,
    bookingDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    status: 'CONFIRMED',
    type: type || 'flight',
    passengerName,
    passengerPhone,
    passengerEmail: passengerEmail || 'guest@wanderlux.com',
    seat: seat || '12A',
    item,
    totalPrice: totalPrice || (item ? item.price : 4850)
  };

  bookingsDatabase.unshift(newBooking);

  res.status(201).json({
    success: true,
    message: 'Booking confirmed! E-Ticket and Boarding Pass generated.',
    booking: newBooking
  });
});

// GET /api/bookings/:pnr
app.get('/api/bookings/:pnr', (req, res) => {
  const pnrToFind = req.params.pnr.toUpperCase();
  const booking = bookingsDatabase.find(b => b.pnr.toUpperCase() === pnrToFind);

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: `No active booking found with PNR '${req.params.pnr}'.`
    });
  }

  res.status(200).json({
    success: true,
    data: booking
  });
});

// DELETE /api/bookings/:pnr
app.delete('/api/bookings/:pnr', (req, res) => {
  const pnrToCancel = req.params.pnr.toUpperCase();
  const index = bookingsDatabase.findIndex(b => b.pnr.toUpperCase() === pnrToCancel);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `No active booking found with PNR '${req.params.pnr}'.`
    });
  }

  const cancelledBooking = bookingsDatabase.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: `Booking ${pnrToCancel} cancelled successfully.`,
    refund: {
      status: 'INITIATED',
      amount: cancelledBooking.totalPrice,
      estimatedDays: '3-5 business days'
    }
  });
});

// ============================================================================
// 6. PROMO CODE / COUPON VALIDATION
// ============================================================================

// POST /api/coupons/validate
app.post('/api/coupons/validate', (req, res) => {
  const { code, amount } = req.body;
  if (!code) {
    return res.status(400).json({
      success: false,
      message: 'Coupon code is required.'
    });
  }

  const cleanCode = code.toUpperCase().trim();
  const baseAmount = Number(amount) || 5000;

  if (cleanCode === 'WELCOMENEXT') {
    return res.status(200).json({
      success: true,
      code: cleanCode,
      discount: 800,
      finalAmount: Math.max(0, baseAmount - 800),
      message: 'Coupon WELCOMENEXT applied! Flat ₹800 discount deducted.'
    });
  }

  if (cleanCode === 'GOBIGO') {
    return res.status(200).json({
      success: true,
      code: cleanCode,
      discount: 500,
      finalAmount: Math.max(0, baseAmount - 500),
      message: 'Coupon GOBIGO applied! ₹500 instant discount.'
    });
  }

  res.status(400).json({
    success: false,
    message: `Coupon code '${code}' is invalid or expired. Try 'WELCOMENEXT'.`
  });
});

export default app;
