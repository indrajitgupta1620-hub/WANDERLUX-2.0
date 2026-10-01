// Mock Data for Wanderlux Travel Platform

export const POPULAR_AIRPORTS = [
  { city: 'Delhi', code: 'DEL', name: 'Delhi Airport India', country: 'India' },
  { city: 'Mumbai', code: 'BOM', name: 'Chhatrapati Shivaji Maharaj Intl Airport', country: 'India' },
  { city: 'Bengaluru', code: 'BLR', name: 'Kempegowda International Airport', country: 'India' },
  { city: 'Goa', code: 'GOI', name: 'Dabolim / Mopa Airport', country: 'India' },
  { city: 'Hyderabad', code: 'HYD', name: 'Rajiv Gandhi International Airport', country: 'India' },
  { city: 'Chennai', code: 'MAA', name: 'Chennai International Airport', country: 'India' },
  { city: 'Kolkata', code: 'CCU', name: 'Netaji Subhash Chandra Bose Intl', country: 'India' },
  { city: 'Dubai', code: 'DXB', name: 'Dubai International Airport', country: 'UAE' },
  { city: 'London', code: 'LHR', name: 'London Heathrow Airport', country: 'UK' },
  { city: 'Singapore', code: 'SIN', name: 'Changi Airport', country: 'Singapore' },
  { city: 'New York', code: 'JFK', name: 'John F. Kennedy International', country: 'USA' },
];

export const POPULAR_HOTEL_CITIES = [
  { city: 'Mumbai', count: '1,420 Hotels' },
  { city: 'Goa', count: '1,890 Resorts' },
  { city: 'Delhi', count: '1,150 Hotels' },
  { city: 'Bengaluru', count: '980 Hotels' },
  { city: 'Dubai', count: '750 Luxury Hotels' },
  { city: 'Kashmir', count: '450 Resorts & Homestays' },
  { city: 'Jaipur', count: '620 Heritage Palaces' },
  { city: 'Udaipur', count: '380 Lake View Hotels' },
  { city: 'Chennai', count: '540 Hotels' },
  { city: 'Kolkata', count: '490 Hotels' },
  { city: 'Singapore', count: '320 Hotels' }
];

export const SPECIAL_FARES = [
  { id: 'regular', label: 'Regular', subtitle: 'Regular fares' },
  { id: 'student', label: 'Student', subtitle: 'Extra discounts/baggage' },
  { id: 'armed', label: 'Armed Forces', subtitle: 'Up to ₹ 600 off' },
  { id: 'gst', label: 'Have a GST number ?', isNew: true, subtitle: 'Upto 10% Extra Savings !' },
  { id: 'senior', label: 'Senior Citizen', subtitle: 'Up to ₹ 600 off' },
  { id: 'doctor', label: 'Doctor and Nurses', subtitle: 'Up to ₹ 600 off' },
];

export const MOCK_FLIGHTS = [
  {
    id: 'fl-101',
    airline: 'IndiGo',
    airlineCode: '6E',
    flightNo: '6E-2041',
    logo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=80&q=80',
    color: '#003399',
    depTime: '06:00',
    depCity: 'Delhi',
    depCode: 'DEL',
    arrTime: '08:15',
    arrCity: 'Mumbai',
    arrCode: 'BOM',
    duration: '2h 15m',
    stops: 'Non-stop',
    price: 4850,
    originalPrice: 5600,
    discount: '15% OFF',
    seatsLeft: 4,
    features: ['Free Meal included', 'Flexi cancellation', 'Standard Baggage 15kg']
  },
  {
    id: 'fl-102',
    airline: 'Air India',
    airlineCode: 'AI',
    flightNo: 'AI-805',
    logo: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=80&q=80',
    color: '#E31837',
    depTime: '09:30',
    depCity: 'Delhi',
    depCode: 'DEL',
    arrTime: '11:45',
    arrCity: 'Mumbai',
    arrCode: 'BOM',
    duration: '2h 15m',
    stops: 'Non-stop',
    price: 5299,
    originalPrice: 6200,
    discount: '14% OFF',
    seatsLeft: 8,
    features: ['Hot Meal included', 'Baggage 25kg', 'Free Seat Selection']
  },
  {
    id: 'fl-103',
    airline: 'Vistara',
    airlineCode: 'UK',
    flightNo: 'UK-995',
    logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=80&q=80',
    color: '#4B286D',
    depTime: '14:20',
    depCity: 'Delhi',
    depCode: 'DEL',
    arrTime: '16:35',
    arrCity: 'Mumbai',
    arrCode: 'BOM',
    duration: '2h 15m',
    stops: 'Non-stop',
    price: 5890,
    originalPrice: 6900,
    discount: '14% OFF',
    seatsLeft: 2,
    features: ['Premium Dining', 'Complimentary Drinks', 'Wi-Fi Streaming']
  },
  {
    id: 'fl-104',
    airline: 'Akasa Air',
    airlineCode: 'QP',
    flightNo: 'QP-1102',
    logo: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=80&q=80',
    color: '#FF6B00',
    depTime: '18:45',
    depCity: 'Delhi',
    depCode: 'DEL',
    arrTime: '21:00',
    arrCity: 'Mumbai',
    arrCode: 'BOM',
    duration: '2h 15m',
    stops: 'Non-stop',
    price: 4199,
    originalPrice: 4999,
    discount: '16% OFF',
    seatsLeft: 12,
    features: ['Usb Charging Port', 'Extra Legroom Available']
  },
  {
    id: 'fl-105',
    airline: 'SpiceJet',
    airlineCode: 'SG',
    flightNo: 'SG-8164',
    logo: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=80&q=80',
    color: '#FF2400',
    depTime: '21:30',
    depCity: 'Delhi',
    depCode: 'DEL',
    arrTime: '00:10',
    arrCity: 'Mumbai',
    arrCode: 'BOM',
    duration: '2h 40m',
    stops: '1 Stop via Jaipur',
    price: 3890,
    originalPrice: 4500,
    discount: '13% OFF',
    seatsLeft: 6,
    features: ['Budget Choice', 'Standard Baggage 15kg']
  }
];

export const MOCK_HOTELS = [
  {
    id: 'ht-1',
    city: 'Mumbai',
    name: 'The Taj Mahal Palace & Tower',
    location: 'Colaba, Mumbai',
    rating: 4.9,
    reviewsCount: 3420,
    stars: 5,
    price: 18500,
    originalPrice: 22000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    tags: ['Luxury Stay', 'Sea Facing View', 'Free Breakfast', 'Infinity Pool']
  },
  {
    id: 'ht-2',
    city: 'Mumbai',
    name: 'JW Marriott Hotel Juhu',
    location: 'Juhu Beach, Mumbai',
    rating: 4.8,
    reviewsCount: 2190,
    stars: 5,
    price: 14200,
    originalPrice: 17500,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    tags: ['Beachfront', 'Spa & Wellness', 'Free Cancellation']
  },
  {
    id: 'ht-3',
    city: 'Goa',
    name: 'Grand Hyatt Goa Resort',
    location: 'Bambolim, Goa',
    rating: 4.9,
    reviewsCount: 1950,
    stars: 5,
    price: 12400,
    originalPrice: 15500,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80',
    tags: ['Private Beach', 'Water Sports', 'Complimentary Breakfast']
  },
  {
    id: 'ht-4',
    city: 'Dubai',
    name: 'Atlantis The Palm Dubai',
    location: 'Palm Jumeirah, Dubai',
    rating: 4.9,
    reviewsCount: 4210,
    stars: 5,
    price: 32000,
    originalPrice: 38000,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    tags: ['Aquaventure Waterpark Pass', 'Luxury Suite', 'Michelin Dining']
  },
  {
    id: 'ht-5',
    city: 'Delhi',
    name: 'The Leela Palace New Delhi',
    location: 'Chanakyapuri, New Delhi',
    rating: 4.8,
    reviewsCount: 1680,
    stars: 5,
    price: 15800,
    originalPrice: 19000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    tags: ['Rooftop Pool', 'Fine Dining', 'City View']
  },
  {
    id: 'ht-6',
    city: 'Kashmir',
    name: 'The Khyber Himalayan Resort & Spa',
    location: 'Gulmarg, Kashmir',
    rating: 4.9,
    reviewsCount: 1450,
    stars: 5,
    price: 21500,
    originalPrice: 26000,
    image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80',
    tags: ['Snow Mountain View', 'Heated Pool', 'Gondola Ride Nearby']
  }
];

export const MOCK_TRAINS = [
  {
    id: 'tr-1',
    trainName: 'MUMBAI RAJDHANI',
    trainNo: '12952',
    depTime: '16:55',
    depStation: 'NEW DELHI (NDLS)',
    arrTime: '08:35',
    arrStation: 'MUMBAI CENTRAL (MMCT)',
    duration: '15h 40m',
    runsOn: 'DAILY',
    classes: [
      { type: '1A', status: 'AVAILABLE 12', price: 4750 },
      { type: '2A', status: 'AVAILABLE 42', price: 2890 },
      { type: '3A', status: 'AVAILABLE 88', price: 2050 }
    ]
  },
  {
    id: 'tr-2',
    trainName: 'VANDE BHARAT EXP',
    trainNo: '20902',
    depTime: '06:00',
    depStation: 'NEW DELHI (NDLS)',
    arrTime: '14:25',
    arrStation: 'MUMBAI CENTRAL (MMCT)',
    duration: '8h 25m',
    runsOn: 'EXCEPT WED',
    classes: [
      { type: 'EC', status: 'AVAILABLE 06', price: 3150 },
      { type: 'CC', status: 'AVAILABLE 65', price: 1680 }
    ]
  }
];

export const MOCK_CABS = [
  {
    id: 'cab-1',
    cabType: 'Dzire / Etios (Sedan)',
    category: 'AC Sedan',
    driverRating: 4.8,
    tripsDone: 840,
    price: 3450,
    originalPrice: 4000,
    features: ['4 Seats', '2 Bags', 'AC Cab', 'Doorstep Pickup']
  },
  {
    id: 'cab-2',
    cabType: 'Ertiga / Carens (SUV)',
    category: 'AC SUV',
    driverRating: 4.9,
    tripsDone: 1120,
    price: 4890,
    originalPrice: 5500,
    features: ['6 Seats', '4 Bags', 'Extra Legroom', 'Free Cancellation']
  }
];

export const MOCK_BUSES = [
  {
    id: 'bus-1',
    operator: 'Zingbus AC Multi-Axle Sleeper',
    depTime: '21:00',
    arrTime: '06:30',
    duration: '9h 30m',
    rating: 4.7,
    seatsLeft: 14,
    price: 1250,
    originalPrice: 1500,
    features: ['Live Tracking', 'Charging Point', 'Blanket Provided', 'Water Bottle']
  }
];

export const MOCK_HOLIDAYS = [
  {
    id: 'hol-1',
    title: 'Kashmir Paradise & Houseboat Tour',
    duration: '5 Nights / 6 Days',
    destinations: 'Srinagar • Gulmarg • Pahalgam',
    rating: 4.9,
    price: 18999,
    originalPrice: 24000,
    image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80',
    inclusions: ['4★ Hotel Stay', 'Shikara Ride', 'Daily Breakfast & Dinner', 'Sightseeing Transfers']
  }
];

export const OFFERS = [
  {
    id: 'off-1',
    title: 'Flat ₹2,000 Instant Discount on Flights',
    subTitle: 'HDFC & ICICI Bank Cards',
    category: 'Flights',
    validTill: '31 Oct 2026',
    discountText: 'Save up to ₹2,000 on all domestic & international flight bookings today.',
    badge: 'BANK OFFER',
    tagColor: '#2563EB'
  },
  {
    id: 'off-2',
    title: 'Luxury Hotel Sale: Up to 40% OFF',
    subTitle: '5-Star Stays & Resorts',
    category: 'Hotels',
    validTill: '15 Nov 2026',
    discountText: 'Enjoy complimentary breakfast, room upgrades & spa vouchers worldwide.',
    badge: 'LUXURY SALE',
    tagColor: '#FF4F17'
  },
  {
    id: 'off-3',
    title: 'Zero Convenience Fee on IRCTC Trains',
    subTitle: '100% Free Cancellation',
    category: 'Trains',
    validTill: '20 Oct 2026',
    discountText: 'Get instant 100% refund directly into your bank on train cancellations.',
    badge: 'ZERO FEES',
    tagColor: '#10B981'
  },
  {
    id: 'off-4',
    title: 'Outstation Cab Special: ₹500 Cashback',
    subTitle: 'Airport & Intercity Rides',
    category: 'Cabs',
    validTill: '31 Oct 2026',
    discountText: 'Sanitized cabs with door-to-door pickup & zero surge pricing guarantee.',
    badge: 'CAB SPECIAL',
    tagColor: '#8B5CF6'
  },
  {
    id: 'off-5',
    title: 'Student goPass: Extra 15kg Baggage Free',
    subTitle: 'Special Fares for Students',
    category: 'Flights',
    validTill: '31 Dec 2026',
    discountText: 'Extra baggage allowance & 10% discount on flight tickets for students.',
    badge: 'STUDENT GO',
    tagColor: '#EC4899'
  },
  {
    id: 'off-6',
    title: 'International Holiday Super Sale',
    subTitle: 'Dubai, Bali & Singapore',
    category: 'Hotels',
    validTill: '30 Nov 2026',
    discountText: 'Handcrafted tour packages starting at just ₹18,999 with flight + hotel included.',
    badge: 'HOLIDAY SALE',
    tagColor: '#F59E0B'
  }
];

export const TRENDING_DESTINATIONS = [
  {
    id: 'dest-1',
    name: 'Goa',
    category: 'Beaches',
    title: 'Sun, Sand & Beach Clubs',
    price: '₹3,499',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
    code: 'GOI'
  },
  {
    id: 'dest-2',
    name: 'Dubai',
    category: 'International',
    title: 'Skyscrapers & Desert Safaris',
    price: '₹14,999',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    code: 'DXB'
  },
  {
    id: 'dest-3',
    name: 'Kashmir',
    category: 'Mountains',
    title: 'Heaven on Earth & Houseboats',
    price: '₹5,999',
    image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80',
    code: 'SXR'
  },
  {
    id: 'dest-4',
    name: 'Bengaluru',
    category: 'Popular',
    title: 'Garden City & Tech Hub',
    price: '₹3,899',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80',
    code: 'BLR'
  },
  {
    id: 'dest-5',
    name: 'Jaipur',
    category: 'Heritage',
    title: 'Pink City Palaces & Forts',
    price: '₹3,199',
    image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=600&q=80',
    code: 'JAI'
  },
  {
    id: 'dest-6',
    name: 'Manali',
    category: 'Mountains',
    title: 'Snow Peaks & Adventure Sports',
    price: '₹4,499',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80',
    code: 'KUU'
  },
  {
    id: 'dest-7',
    name: 'Singapore',
    category: 'International',
    title: 'Marina Bay & Universal Studios',
    price: '₹13,999',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80',
    code: 'SIN'
  },
  {
    id: 'dest-8',
    name: 'Kerala',
    category: 'Popular',
    title: 'Backwaters & Tea Gardens',
    price: '₹4,999',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80',
    code: 'COK'
  }
];
