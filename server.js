import app from './api/app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  ==============================================================
    ✈️  WANDERLUX REST API SERVER IS RUNNING
  ==============================================================
    📍 Local URL:     http://localhost:${PORT}
    🩺 Health Check:  http://localhost:${PORT}/api/health
    🛫 Flights API:   http://localhost:${PORT}/api/flights
    🏨 Hotels API:    http://localhost:${PORT}/api/hotels
    🎫 Bookings API:  http://localhost:${PORT}/api/bookings
  ==============================================================
    Ready to accept test requests from Postman!
  ==============================================================
  `);
});
