import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSearchWidget from './components/HeroSearchWidget';
import SearchResults from './components/SearchResults';
import BookingPage from './components/BookingPage';
import MyTripsModal from './components/MyTripsModal';
import LoginModal from './components/LoginModal';
import OffersSection from './components/OffersSection';
import TrendingDestinations from './components/TrendingDestinations';
import StudentGoPassBadge from './components/StudentGoPassBadge';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('flights');
  const [viewMode, setViewMode] = useState('home'); // 'home' | 'results' | 'booking'
  const [searchParams, setSearchParams] = useState(null);
  const [selectedBookingItem, setSelectedBookingItem] = useState(null);
  const [pendingBookingItem, setPendingBookingItem] = useState(null);

  // Modals
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMyTripsOpen, setIsMyTripsOpen] = useState(false);

  // User & Bookings State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('wanderlux_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem('wanderlux_trips');
    return saved ? JSON.parse(saved) : [];
  });

  // History stack for browser back button
  const [historyStack, setHistoryStack] = useState([
    { viewMode: 'home', activeTab: 'flights', searchParams: null, selectedBookingItem: null }
  ]);

  const navigateTo = (newViewMode, newParams = null, newBookingItem = null, newTab = null) => {
    const targetTab = newTab || activeTab;
    const newState = {
      viewMode: newViewMode,
      activeTab: targetTab,
      searchParams: newParams !== null ? newParams : searchParams,
      selectedBookingItem: newBookingItem !== null ? newBookingItem : selectedBookingItem
    };

    setViewMode(newViewMode);
    if (newTab) setActiveTab(newTab);
    if (newParams !== null) setSearchParams(newParams);
    if (newBookingItem !== null) setSelectedBookingItem(newBookingItem);

    setHistoryStack((prev) => [...prev, newState]);
    try {
      window.history.pushState(newState, '');
    } catch (e) {
      // fallback
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoBack = () => {
    if (viewMode === 'booking') {
      // Going back from Booking page ALWAYS returns to Search Results!
      setViewMode('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (viewMode === 'results') {
      // Going back from Search Results returns to Home page!
      setViewMode('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setViewMode('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle browser's native Back / Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      handleGoBack();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [viewMode]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('wanderlux_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('wanderlux_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('wanderlux_trips', JSON.stringify(trips));
  }, [trips]);

  // Handle Search Trigger
  const handleSearch = (params) => {
    navigateTo('results', params, null, params.type || activeTab);
  };

  // Handle Selecting a destination card
  const handleSelectDestination = (dest) => {
    const customParams = {
      type: 'flights',
      tripType: 'oneway',
      fromCity: { city: 'Delhi', code: 'DEL', name: 'Delhi Airport' },
      toCity: { city: dest.name, code: dest.code, name: dest.title },
      depDate: '2026-09-30',
      specialFare: 'regular'
    };
    handleSearch(customParams);
  };

  // Handle Select Booking Item
  const handleSelectBookingItem = (item) => {
    if (!user) {
      setPendingBookingItem(item);
      setIsLoginOpen(true);
      return;
    }
    navigateTo('booking', searchParams, item, activeTab);
  };

  // Handle Login Success -> Automatically resume booking if pending
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    if (pendingBookingItem) {
      const itemToBook = pendingBookingItem;
      setPendingBookingItem(null);
      navigateTo('booking', searchParams, itemToBook, activeTab);
    }
  };

  // Handle Booking Complete
  const handleBookingComplete = (newBooking) => {
    setTrips([newBooking, ...trips]);
  };

  // Handle Cancel Booking
  const handleCancelBooking = (pnr) => {
    if (window.confirm(`Are you sure you want to cancel booking PNR: ${pnr}? 100% Instant refund will be processed.`)) {
      setTrips(trips.filter((t) => t.pnr !== pnr));
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setViewMode('home');
        }}
        onGoHome={() => navigateTo('home', null, null, 'flights')}
        user={user}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={() => setUser(null)}
        onOpenMyTrips={() => setIsMyTripsOpen(true)}
        tripsCount={trips.length}
      />

      {/* Main View Area */}
      <main style={{ flex: 1 }}>
        {viewMode === 'home' && (
          <>
            <HeroSearchWidget
              activeTab={activeTab}
              onSearch={handleSearch}
            />
            <TrendingDestinations onSelectDestination={handleSelectDestination} />
          </>
        )}

        {viewMode === 'results' && (
          <SearchResults
            searchParams={searchParams}
            onSelectBooking={handleSelectBookingItem}
            onBackToSearch={() => {
              setViewMode('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {viewMode === 'booking' && selectedBookingItem && (
          <BookingPage
            item={selectedBookingItem}
            searchParams={searchParams}
            user={user}
            onBackToResults={() => {
              setViewMode('results');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBookingComplete={handleBookingComplete}
          />
        )}
      </main>

      {/* Sticky Right Badge */}
      <StudentGoPassBadge onClick={() => setIsLoginOpen(true)} />

      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <MyTripsModal
        isOpen={isMyTripsOpen}
        onClose={() => setIsMyTripsOpen(false)}
        trips={trips}
        onCancelBooking={handleCancelBooking}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
