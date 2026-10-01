import React, { useState } from 'react';
import { 
  MOCK_FLIGHTS, 
  MOCK_HOTELS, 
  MOCK_TRAINS,
  MOCK_CABS,
  MOCK_BUSES,
  MOCK_HOLIDAYS
} from '../data/mockData';
import { 
  Filter, 
  ArrowLeft, 
  CheckCircle2, 
  Star, 
  MapPin, 
  Train, 
  Car, 
  Bus, 
  Palmtree, 
  Sparkles,
  Tag
} from 'lucide-react';

export default function SearchResults({ searchParams, onSelectBooking, onBackToSearch }) {
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedStops, setSelectedStops] = useState('All');
  const [sortBy, setSortBy] = useState('cheapest');

  const type = searchParams?.type || 'flights';
  
  // Title & Location displays
  let searchTitle = 'Flight Search Results';
  let locationText = `${searchParams?.fromCity?.city || 'Delhi'} ➔ ${searchParams?.toCity?.city || 'Mumbai'}`;
  
  if (type === 'hotels') {
    const selectedHotelCity = searchParams?.hotelCity || 'Mumbai';
    searchTitle = `Hotels in ${selectedHotelCity}`;
    locationText = `Check-in: ${searchParams?.checkIn || '30 Sep'} • Check-out: ${searchParams?.checkOut || '02 Oct'} • ${searchParams?.guestsCount || '2 Guests'}`;
  } else if (type === 'trains') {
    searchTitle = `IRCTC Trains Available`;
    locationText = `${searchParams?.trainFrom || 'New Delhi (NDLS)'} ➔ ${searchParams?.trainTo || 'Mumbai Central (MMCT)'}`;
  } else if (type === 'cabs') {
    searchTitle = `Outstation Cabs Available`;
    locationText = `${searchParams?.cabFrom || 'Delhi NCR'} ➔ ${searchParams?.cabTo || 'Agra / Jaipur'}`;
  } else if (type === 'bus') {
    searchTitle = `Volvo & AC Bus Tickets`;
    locationText = `${searchParams?.busFrom || 'Delhi'} ➔ ${searchParams?.busTo || 'Manali'}`;
  } else if (type === 'holidays') {
    searchTitle = `Tour & Holiday Packages`;
    locationText = `Destination: ${searchParams?.holidayDest || 'Kashmir'} • 5N / 6D`;
  }

  // Filter Hotels by city if applicable
  const displayedHotels = MOCK_HOTELS.filter((ht) => {
    if (searchParams?.hotelCity) {
      return ht.city.toLowerCase().includes(searchParams.hotelCity.toLowerCase()) || searchParams.hotelCity.toLowerCase().includes(ht.city.toLowerCase());
    }
    return true;
  });

  return (
    <div className="search-results-page">
      {/* Top Banner Navigation Bar */}
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '18px 24px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          border: '1px solid #E2E8F0'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={onBackToSearch}
            style={{
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              padding: '10px 18px',
              borderRadius: '24px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#1E293B',
              transition: 'all 0.2s ease'
            }}
          >
            <ArrowLeft size={16} /> Back to Previous Page
          </button>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>SEARCH RESULTS</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>
              {searchTitle}
            </h2>
            <div style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>
              {locationText}
            </div>
          </div>
        </div>

        <button 
          onClick={onBackToSearch}
          style={{
            background: 'var(--accent-blue-light)',
            color: 'var(--accent-blue)',
            border: '1px solid var(--accent-blue-border)',
            padding: '10px 20px',
            borderRadius: '24px',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          Modify Search
        </button>
      </div>

      <div className="results-layout">
        {/* Left Filter Sidebar */}
        <div className="filter-sidebar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontWeight: 800, fontSize: '15px' }}>
            <Filter size={18} color="#2276E3" /> Filters
          </div>

          <div className="filter-group">
            <div className="filter-title">Max Price</div>
            <input
              type="range"
              min={1000}
              max={35000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#FF4F17', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginTop: '6px' }}>
              <span>₹1,000</span>
              <span style={{ color: '#FF4F17' }}>₹{maxPrice.toLocaleString()}</span>
              <span>₹35,000</span>
            </div>
          </div>

          <div style={{ background: '#EFF6FF', padding: '14px', borderRadius: '12px', border: '1px dashed #99C3FB' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#2276E3', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={14} /> Bank Offer Active
            </div>
            <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>
              Use coupon code <strong>WELCOMENEXT</strong> for ₹800 instant discount.
            </div>
          </div>
        </div>

        {/* Right Main Results List */}
        <div>
          {/* FLIGHT RESULTS */}
          {type === 'flights' && (
            <div>
              {MOCK_FLIGHTS.map((flight) => (
                <div key={flight.id} className="flight-card">
                  <div className="flight-card-main">
                    <div className="airline-info">
                      <div 
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: flight.color,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '12px'
                        }}
                      >
                        {flight.airlineCode}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '15px' }}>{flight.airline}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>{flight.flightNo}</div>
                      </div>
                    </div>

                    <div className="time-box">
                      <div className="time-val">{flight.depTime}</div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>{searchParams?.fromCity?.city || flight.depCity} ({searchParams?.fromCity?.code || flight.depCode})</div>
                    </div>

                    <div className="duration-line">
                      <span className="duration-text">{flight.duration}</span>
                      <div className="line-graphic" />
                      <span style={{ fontSize: '11px', color: '#2276E3', fontWeight: 700 }}>{flight.stops}</span>
                    </div>

                    <div className="time-box">
                      <div className="time-val">{flight.arrTime}</div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>{searchParams?.toCity?.city || flight.arrCity} ({searchParams?.toCity?.code || flight.arrCode})</div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '11px', color: '#E11D48', fontWeight: 700 }}>{flight.discount}</div>
                      <div className="price-main">₹{flight.price.toLocaleString()}</div>
                      <button 
                        className="btn-book-flight"
                        style={{ marginTop: '8px' }}
                        onClick={() => onSelectBooking(flight)}
                      >
                        BOOK FLIGHT
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* HOTEL RESULTS */}
          {type === 'hotels' && (
            <div>
              {displayedHotels.length === 0 ? (
                <div style={{ background: 'white', padding: '30px', borderRadius: '16px', textAlign: 'center' }}>
                  <h3>Showing All Luxury Hotels</h3>
                  <p style={{ fontSize: '13px', color: '#64748B' }}>Find top rated stays with free breakfast and instant refund.</p>
                </div>
              ) : null}

              {(displayedHotels.length > 0 ? displayedHotels : MOCK_HOTELS).map((ht) => (
                <div key={ht.id} className="flight-card" style={{ display: 'flex', gap: '20px' }}>
                  <img src={ht.image} alt={ht.name} style={{ width: '220px', height: '150px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: '#2276E3', color: 'white', fontSize: '11px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                          ★ {ht.rating}
                        </span>
                        <span style={{ fontSize: '12px', color: '#64748B' }}>({ht.reviewsCount} Reviews)</span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, marginTop: '4px' }}>{ht.name}</h3>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>📍 {ht.location}</div>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                        {ht.tags.map((t) => (
                          <span key={t} style={{ background: '#EBF3FE', color: '#2276E3', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '12px' }}>
                      <div>
                        <span style={{ textDecoration: 'line-through', color: '#94A3B8', fontSize: '13px' }}>₹{ht.originalPrice}</span>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800 }}>₹{ht.price.toLocaleString()} <span style={{ fontSize: '12px', fontWeight: 500 }}>/ night</span></div>
                      </div>
                      <button className="btn-book-flight" onClick={() => onSelectBooking(ht)}>
                        BOOK HOTEL
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TRAIN RESULTS */}
          {type === 'trains' && (
            <div>
              {MOCK_TRAINS.map((tr) => (
                <div key={tr.id} className="flight-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 800 }}>{tr.trainName} ({tr.trainNo})</h3>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>{searchParams?.trainFrom || tr.depStation} ➔ {searchParams?.trainTo || tr.arrStation} • Runs: {tr.runsOn}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, fontSize: '16px' }}>{tr.duration}</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {tr.classes.map((c) => (
                      <div key={c.type} style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                          <span>Class {c.type}</span>
                          <span style={{ color: '#22C55E', fontSize: '12px' }}>{c.status}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', alignItems: 'center' }}>
                          <span style={{ fontWeight: 800, fontSize: '16px' }}>₹{c.price}</span>
                          <button 
                            style={{ background: '#FF4F17', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                            onClick={() => onSelectBooking({ ...tr, name: `${tr.trainName} (Class ${c.type})`, price: c.price })}
                          >
                            Book {c.type}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CAB RESULTS */}
          {type === 'cabs' && (
            <div>
              {MOCK_CABS.map((cab) => (
                <div key={cab.id} className="flight-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '54px', height: '54px', borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
                      <Car size={30} />
                    </div>
                    <div>
                      <span style={{ background: '#EFF6FF', color: '#2563EB', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                        {cab.category} ★ {cab.driverRating}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, marginTop: '4px' }}>{cab.cabType}</h3>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>{searchParams?.cabFrom || 'Delhi NCR'} ➔ {searchParams?.cabTo || 'Agra/Jaipur'}</div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                        {cab.features.map((f) => (
                          <span key={f} style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>✓ {f}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ textDecoration: 'line-through', color: '#94A3B8', fontSize: '12px' }}>₹{cab.originalPrice}</span>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800 }}>₹{cab.price.toLocaleString()}</div>
                    <button 
                      className="btn-book-flight" 
                      style={{ marginTop: '8px' }}
                      onClick={() => onSelectBooking({ ...cab, name: cab.cabType })}
                    >
                      BOOK CAB
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* BUS RESULTS */}
          {type === 'bus' && (
            <div>
              {MOCK_BUSES.map((b) => (
                <div key={b.id} className="flight-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '54px', height: '54px', borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
                      <Bus size={30} />
                    </div>
                    <div>
                      <span style={{ background: '#10B981', color: 'white', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                        ★ {b.rating} Rating
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, marginTop: '4px' }}>{b.operator}</h3>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>{searchParams?.busFrom || 'Delhi'} ➔ {searchParams?.busTo || 'Manali'} • {b.depTime} to {b.arrTime}</div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                        {b.features.map((f) => (
                          <span key={f} style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>✓ {f}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 800 }}>{b.seatsLeft} Seats Left</div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800 }}>₹{b.price.toLocaleString()}</div>
                    <button 
                      className="btn-book-flight" 
                      style={{ marginTop: '8px' }}
                      onClick={() => onSelectBooking({ ...b, name: b.operator })}
                    >
                      BOOK SEAT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* HOLIDAY RESULTS */}
          {type === 'holidays' && (
            <div>
              {MOCK_HOLIDAYS.map((h) => (
                <div key={h.id} className="flight-card" style={{ display: 'flex', gap: '20px' }}>
                  <img src={h.image} alt={h.title} style={{ width: '220px', height: '150px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ background: '#EFF6FF', color: '#2563EB', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                        {h.duration} ★ {h.rating}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, marginTop: '4px' }}>{h.title}</h3>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>📍 {h.destinations}</div>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                        {h.inclusions.map((inc) => (
                          <span key={inc} style={{ background: '#F8FAFC', color: '#475569', fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', border: '1px solid #E2E8F0' }}>
                            ✓ {inc}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '12px' }}>
                      <div>
                        <span style={{ textDecoration: 'line-through', color: '#94A3B8', fontSize: '12px' }}>₹{h.originalPrice}</span>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800 }}>₹{h.price.toLocaleString()} <span style={{ fontSize: '12px', fontWeight: 500 }}>/ person</span></div>
                      </div>
                      <button className="btn-book-flight" onClick={() => onSelectBooking({ ...h, name: h.title })}>
                        BOOK PACKAGE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
