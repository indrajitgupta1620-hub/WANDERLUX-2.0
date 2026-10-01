import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Calendar, 
  ChevronDown, 
  Users, 
  Search, 
  Check, 
  Shield, 
  Sparkles,
  MapPin,
  Building,
  Train,
  Car,
  Palmtree,
  Bus,
  Plus,
  Minus
} from 'lucide-react';
import { POPULAR_AIRPORTS, POPULAR_HOTEL_CITIES, SPECIAL_FARES } from '../data/mockData';

export default function HeroSearchWidget({ activeTab, onSearch }) {
  // Flight form state
  const [tripType, setTripType] = useState('oneway');
  const [fromCity, setFromCity] = useState(POPULAR_AIRPORTS[0]); // Delhi
  const [toCity, setToCity] = useState(POPULAR_AIRPORTS[1]); // Mumbai
  const [depDate, setDepDate] = useState('2026-09-30');
  const [returnDate, setReturnDate] = useState('');
  const [travellers, setTravellers] = useState({ adults: 1, children: 0, infants: 0, classType: 'Economy' });
  const [specialFare, setSpecialFare] = useState('regular');
  const [priceDropProtection, setPriceDropProtection] = useState(true);

  // Hotel form state
  const [hotelCity, setHotelCity] = useState('Goa');
  const [checkIn, setCheckIn] = useState('2026-09-30');
  const [checkOut, setCheckOut] = useState('2026-10-02');
  const [hotelRooms, setHotelRooms] = useState(1);
  const [hotelAdults, setHotelAdults] = useState(2);
  const [hotelChildren, setHotelChildren] = useState(0);

  // Train form state
  const [trainFrom, setTrainFrom] = useState('New Delhi (NDLS)');
  const [trainTo, setTrainTo] = useState('Mumbai Central (MMCT)');
  const [trainDate, setTrainDate] = useState('2026-09-30');
  const [trainClass, setTrainClass] = useState('All Classes');
  const [trainQuota, setTrainQuota] = useState('General');

  // Cab form state
  const [cabFrom, setCabFrom] = useState('Delhi NCR');
  const [cabTo, setCabTo] = useState('Agra / Jaipur');
  const [cabDate, setCabDate] = useState('2026-09-30');

  // Bus form state
  const [busFrom, setBusFrom] = useState('Delhi');
  const [busTo, setBusTo] = useState('Manali');
  const [busDate, setBusDate] = useState('2026-09-30');

  // Holiday form state
  const [holidayDest, setHolidayDest] = useState('Kashmir');

  // Dropdown states
  const [activeDropdown, setActiveDropdown] = useState(null); // 'from', 'to', 'hotelCity', 'hotelGuests', 'travellers', 'trainClass', null
  const [cityFilter, setCityFilter] = useState('');

  // Swap From & To cities
  const handleSwapCities = (e) => {
    e.stopPropagation();
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSelectCity = (airport, type) => {
    if (type === 'from') setFromCity(airport);
    if (type === 'to') setToCity(airport);
    setActiveDropdown(null);
    setCityFilter('');
  };

  const updateTravellers = (type, delta) => {
    const current = travellers[type];
    const updated = Math.max(type === 'adults' ? 1 : 0, current + delta);
    setTravellers({ ...travellers, [type]: updated });
  };

  const updateHotelGuests = (type, delta) => {
    if (type === 'rooms') setHotelRooms(Math.max(1, hotelRooms + delta));
    if (type === 'adults') setHotelAdults(Math.max(1, hotelAdults + delta));
    if (type === 'children') setHotelChildren(Math.max(0, hotelChildren + delta));
  };

  const totalTravellerCount = travellers.adults + travellers.children + travellers.infants;
  const totalHotelGuests = hotelAdults + hotelChildren;
  const hotelGuestsText = `${totalHotelGuests} Guest${totalHotelGuests > 1 ? 's' : ''}, ${hotelRooms} Room${hotelRooms > 1 ? 's' : ''}`;

  const handleTriggerSearch = () => {
    onSearch({
      type: activeTab,
      tripType,
      fromCity,
      toCity,
      depDate,
      returnDate,
      travellers,
      specialFare,
      priceDropProtection,
      hotelCity,
      checkIn,
      checkOut,
      guestsCount: hotelGuestsText,
      hotelRooms,
      hotelAdults,
      hotelChildren,
      trainFrom,
      trainTo,
      trainDate,
      trainClass,
      trainQuota,
      cabFrom,
      cabTo,
      cabDate,
      busFrom,
      busTo,
      busDate,
      holidayDest
    });
  };

  const filteredAirports = POPULAR_AIRPORTS.filter(
    (a) =>
      a.city.toLowerCase().includes(cityFilter.toLowerCase()) ||
      a.code.toLowerCase().includes(cityFilter.toLowerCase()) ||
      a.name.toLowerCase().includes(cityFilter.toLowerCase())
  );

  return (
    <div className="hero-wrapper">
      {/* Banner Title */}
      <h1 className="hero-title">
        {activeTab === 'flights' && 'Book Domestic & International Flights'}
        {activeTab === 'hotels' && 'Book Premium Hotels, Resorts & Homestays'}
        {activeTab === 'trains' && 'Book IRCTC Train Tickets with Instant Refund'}
        {activeTab === 'cabs' && 'Book Outstation & Airport Taxis'}
        {activeTab === 'bus' && 'Book Luxury Bus Tickets Online'}
        {activeTab === 'holidays' && 'Explore Handcrafted Tour Packages'}
      </h1>

      {/* Floating Main Search Box */}
      <div className="search-card-container">
        {/* FLIGHTS TAB */}
        {activeTab === 'flights' && (
          <>
            <div className="trip-type-bar">
              <div className="trip-options">
                <div
                  className={`radio-pill ${tripType === 'oneway' ? 'selected' : ''}`}
                  onClick={() => setTripType('oneway')}
                >
                  <div className="radio-dot" />
                  <span>Oneway</span>
                </div>
                <div
                  className={`radio-pill ${tripType === 'roundtrip' ? 'selected' : ''}`}
                  onClick={() => setTripType('roundtrip')}
                >
                  <div className="radio-dot" />
                  <span>Round Trip</span>
                </div>
              </div>
              <div className="trip-subtext">Book Domestic & International Flights</div>
            </div>

            <div className="search-grid-flights">
              {/* FROM CITY */}
              <div 
                className="search-field-box"
                onClick={() => setActiveDropdown(activeDropdown === 'from' ? null : 'from')}
              >
                <div className="search-field-label"><MapPin size={13} /> FROM</div>
                <div className="search-field-value">{fromCity.city}</div>
                <div className="search-field-sub">{fromCity.code}, {fromCity.name}</div>

                {activeDropdown === 'from' && (
                  <div className="popover-dropdown" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      className="search-input-box"
                      placeholder="Type city or airport code..."
                      value={cityFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                      autoFocus
                    />
                    <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
                      {filteredAirports.map((ap) => (
                        <div
                          key={ap.code}
                          className="airport-item"
                          onClick={() => handleSelectCity(ap, 'from')}
                        >
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '14px' }}>{ap.city}</div>
                            <div style={{ fontSize: '12px', color: '#64748B' }}>{ap.name}</div>
                          </div>
                          <span className="airport-code-badge">{ap.code}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* SWAP BUTTON */}
              <div className="swap-btn-container">
                <button className="btn-swap" onClick={handleSwapCities} title="Swap From and To">
                  <ArrowLeftRight size={16} />
                </button>
              </div>

              {/* TO CITY */}
              <div 
                className="search-field-box"
                onClick={() => setActiveDropdown(activeDropdown === 'to' ? null : 'to')}
              >
                <div className="search-field-label"><MapPin size={13} /> TO</div>
                <div className="search-field-value">{toCity.city}</div>
                <div className="search-field-sub">{toCity.code}, {toCity.name}</div>

                {activeDropdown === 'to' && (
                  <div className="popover-dropdown" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      className="search-input-box"
                      placeholder="Type destination city..."
                      value={cityFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                      autoFocus
                    />
                    <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
                      {filteredAirports.map((ap) => (
                        <div
                          key={ap.code}
                          className="airport-item"
                          onClick={() => handleSelectCity(ap, 'to')}
                        >
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '14px' }}>{ap.city}</div>
                            <div style={{ fontSize: '12px', color: '#64748B' }}>{ap.name}</div>
                          </div>
                          <span className="airport-code-badge">{ap.code}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* DEPARTURE DATE */}
              <div className="search-field-box">
                <div className="search-field-label"><Calendar size={13} /> DEPARTURE</div>
                <input
                  type="date"
                  value={depDate}
                  onChange={(e) => setDepDate(e.target.value)}
                  style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', cursor: 'pointer', width: '100%' }}
                />
              </div>

              {/* RETURN DATE */}
              <div className="search-field-box">
                <div className="search-field-label"><Calendar size={13} /> RETURN</div>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', cursor: 'pointer', width: '100%' }}
                />
              </div>

              {/* INTERACTIVE TRAVELLERS & CLASS DROPDOWN */}
              <div 
                className="search-field-box"
                onClick={() => setActiveDropdown(activeDropdown === 'travellers' ? null : 'travellers')}
              >
                <div className="search-field-label"><Users size={13} /> TRAVELLERS & CLASS</div>
                <div className="search-field-value">{totalTravellerCount} Traveller{totalTravellerCount > 1 ? 's' : ''}</div>
                <div className="search-field-sub">{travellers.classType}</div>

                {activeDropdown === 'travellers' && (
                  <div className="popover-dropdown" style={{ width: '320px', padding: '20px' }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: '16px', color: '#0F172A' }}>
                      Select Travellers & Cabin Class
                    </div>

                    {/* Adults counter */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '13px' }}>Adults (12+ yrs)</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>on day of travel</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                          onClick={() => updateTravellers('adults', -1)}
                          style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #CBD5E1', background: '#F8FAFC', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ fontWeight: 800, fontSize: '15px', width: '16px', textAlign: 'center' }}>{travellers.adults}</span>
                        <button
                          onClick={() => updateTravellers('adults', 1)}
                          style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #CBD5E1', background: '#F8FAFC', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Children counter */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '13px' }}>Children (2-12 yrs)</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>on day of travel</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                          onClick={() => updateTravellers('children', -1)}
                          style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #CBD5E1', background: '#F8FAFC', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ fontWeight: 800, fontSize: '15px', width: '16px', textAlign: 'center' }}>{travellers.children}</span>
                        <button
                          onClick={() => updateTravellers('children', 1)}
                          style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #CBD5E1', background: '#F8FAFC', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Cabin Class Selection */}
                    <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #E2E8F0' }}>
                      <div style={{ fontWeight: 700, fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>CABIN CLASS</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        {['Economy', 'Premium Economy', 'Business', 'First Class'].map((cls) => (
                          <button
                            key={cls}
                            onClick={() => setTravellers({ ...travellers, classType: cls })}
                            style={{
                              padding: '8px 10px',
                              borderRadius: '8px',
                              border: travellers.classType === cls ? '1.5px solid #2276E3' : '1px solid #CBD5E1',
                              background: travellers.classType === cls ? '#EBF3FE' : '#FFFFFF',
                              color: travellers.classType === cls ? '#2276E3' : '#1E293B',
                              fontWeight: 700,
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            {cls}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveDropdown(null)}
                      style={{
                        width: '100%',
                        marginTop: '16px',
                        background: '#2276E3',
                        color: 'white',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '10px',
                        fontWeight: 800,
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      Apply Selection
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Special Fares Selector */}
            <div className="special-fares-row">
              {SPECIAL_FARES.map((fare) => (
                <div
                  key={fare.id}
                  className={`fare-pill ${specialFare === fare.id ? 'selected' : ''}`}
                  onClick={() => setSpecialFare(fare.id)}
                >
                  <div className="fare-pill-header">
                    <span className="fare-pill-title">{fare.label}</span>
                    {fare.isNew && <span className="new-badge">new</span>}
                  </div>
                  <div className="fare-pill-subtitle">{fare.subtitle}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* HOTELS SEARCH TAB */}
        {activeTab === 'hotels' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr', gap: '12px' }}>
            <div 
              className="search-field-box"
              onClick={() => setActiveDropdown(activeDropdown === 'hotelCity' ? null : 'hotelCity')}
            >
              <div className="search-field-label"><Building size={14} /> SELECT CITY / PLACE</div>
              <div className="search-field-value">{hotelCity}</div>
              <div className="search-field-sub">India • 1,240+ verified properties</div>

              {activeDropdown === 'hotelCity' && (
                <div className="popover-dropdown" onClick={(e) => e.stopPropagation()}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', marginBottom: '8px' }}>POPULAR CITIES & PLACES</div>
                  <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
                    {POPULAR_HOTEL_CITIES.map((hc) => (
                      <div
                        key={hc.city}
                        className="airport-item"
                        onClick={() => { setHotelCity(hc.city); setActiveDropdown(null); }}
                      >
                        <div style={{ fontWeight: 700, fontSize: '14px' }}>📍 {hc.city}</div>
                        <span className="airport-code-badge" style={{ background: '#EFF6FF', color: '#2563EB' }}>{hc.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="search-field-box">
              <div className="search-field-label"><Calendar size={13} /> CHECK-IN</div>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800, cursor: 'pointer', width: '100%' }}
              />
            </div>

            <div className="search-field-box">
              <div className="search-field-label"><Calendar size={13} /> CHECK-OUT</div>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800, cursor: 'pointer', width: '100%' }}
              />
            </div>

            <div 
              className="search-field-box"
              onClick={() => setActiveDropdown(activeDropdown === 'hotelGuests' ? null : 'hotelGuests')}
            >
              <div className="search-field-label"><Users size={14} /> GUESTS & ROOMS</div>
              <div className="search-field-value">{hotelGuestsText}</div>
              <div className="search-field-sub">Manage Rooms & Guests</div>

              {activeDropdown === 'hotelGuests' && (
                <div className="popover-dropdown" style={{ width: '300px', padding: '20px' }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: '16px', color: '#0F172A' }}>
                    Select Rooms & Guests
                  </div>

                  {/* Rooms counter */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13px' }}>Rooms</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>Minimum 1 room</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        onClick={() => updateHotelGuests('rooms', -1)}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #CBD5E1', background: '#F8FAFC', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontWeight: 800, fontSize: '15px', width: '16px', textAlign: 'center' }}>{hotelRooms}</span>
                      <button
                        onClick={() => updateHotelGuests('rooms', 1)}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #CBD5E1', background: '#F8FAFC', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Adults counter */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13px' }}>Adults</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>12+ years</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        onClick={() => updateHotelGuests('adults', -1)}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #CBD5E1', background: '#F8FAFC', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontWeight: 800, fontSize: '15px', width: '16px', textAlign: 'center' }}>{hotelAdults}</span>
                      <button
                        onClick={() => updateHotelGuests('adults', 1)}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #CBD5E1', background: '#F8FAFC', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Children counter */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13px' }}>Children</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>0-12 years</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        onClick={() => updateHotelGuests('children', -1)}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #CBD5E1', background: '#F8FAFC', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontWeight: 800, fontSize: '15px', width: '16px', textAlign: 'center' }}>{hotelChildren}</span>
                      <button
                        onClick={() => updateHotelGuests('children', 1)}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #CBD5E1', background: '#F8FAFC', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveDropdown(null)}
                    style={{
                      width: '100%',
                      marginTop: '12px',
                      background: '#2276E3',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    Apply Selection
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TRAINS SEARCH TAB */}
        {activeTab === 'trains' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr', gap: '12px' }}>
            <div className="search-field-box">
              <div className="search-field-label"><Train size={14} /> FROM STATION</div>
              <select
                value={trainFrom}
                onChange={(e) => setTrainFrom(e.target.value)}
                style={{ width: '100%', border: 'none', background: 'transparent', fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, cursor: 'pointer', outline: 'none' }}
              >
                <option value="New Delhi (NDLS)">New Delhi (NDLS)</option>
                <option value="Mumbai Central (MMCT)">Mumbai Central (MMCT)</option>
                <option value="Bengaluru (SBC)">Bengaluru (SBC)</option>
                <option value="Chennai (MAS)">Chennai (MAS)</option>
                <option value="Kolkata (HWH)">Kolkata (HWH)</option>
              </select>
            </div>
            <div className="search-field-box">
              <div className="search-field-label"><Train size={14} /> TO STATION</div>
              <select
                value={trainTo}
                onChange={(e) => setTrainTo(e.target.value)}
                style={{ width: '100%', border: 'none', background: 'transparent', fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, cursor: 'pointer', outline: 'none' }}
              >
                <option value="Mumbai Central (MMCT)">Mumbai Central (MMCT)</option>
                <option value="New Delhi (NDLS)">New Delhi (NDLS)</option>
                <option value="Goa (MAO)">Madgaon Goa (MAO)</option>
                <option value="Jaipur (JP)">Jaipur (JP)</option>
              </select>
            </div>
            <div className="search-field-box">
              <div className="search-field-label">TRAVEL DATE</div>
              <input
                type="date"
                value={trainDate}
                onChange={(e) => setTrainDate(e.target.value)}
                style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800, cursor: 'pointer', width: '100%' }}
              />
            </div>
            <div 
              className="search-field-box"
              onClick={() => setActiveDropdown(activeDropdown === 'trainClass' ? null : 'trainClass')}
            >
              <div className="search-field-label">CLASS & QUOTA</div>
              <div className="search-field-value">{trainClass}</div>
              <div className="search-field-sub">{trainQuota} Quota</div>

              {activeDropdown === 'trainClass' && (
                <div className="popover-dropdown" style={{ width: '320px', padding: '20px' }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: '12px', color: '#0F172A' }}>
                    Select Travel Class
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                    {['All Classes', 'AC 1st Class (1A)', 'AC 2 Tier (2A)', 'AC 3 Tier (3A)', 'Sleeper (SL)', 'Chair Car (CC)'].map((tc) => (
                      <button
                        key={tc}
                        onClick={() => setTrainClass(tc)}
                        style={{
                          padding: '8px 10px',
                          borderRadius: '8px',
                          border: trainClass === tc ? '1.5px solid #2276E3' : '1px solid #CBD5E1',
                          background: trainClass === tc ? '#EBF3FE' : '#FFFFFF',
                          color: trainClass === tc ? '#2276E3' : '#1E293B',
                          fontWeight: 700,
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        {tc}
                      </button>
                    ))}
                  </div>

                  <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: '12px', color: '#0F172A', paddingTop: '12px', borderTop: '1px solid #E2E8F0' }}>
                    Select Quota
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {['General', 'Tatkal', 'Ladies', 'Senior Citizen'].map((q) => (
                      <button
                        key={q}
                        onClick={() => setTrainQuota(q)}
                        style={{
                          padding: '8px 10px',
                          borderRadius: '8px',
                          border: trainQuota === q ? '1.5px solid #2276E3' : '1px solid #CBD5E1',
                          background: trainQuota === q ? '#EBF3FE' : '#FFFFFF',
                          color: trainQuota === q ? '#2276E3' : '#1E293B',
                          fontWeight: 700,
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveDropdown(null)}
                    style={{
                      width: '100%',
                      marginTop: '16px',
                      background: '#2276E3',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    Apply Selection
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CABS TAB */}
        {activeTab === 'cabs' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr', gap: '12px' }}>
            <div className="search-field-box">
              <div className="search-field-label"><Car size={14} /> PICKUP LOCATION</div>
              <input
                type="text"
                value={cabFrom}
                onChange={(e) => setCabFrom(e.target.value)}
                style={{ width: '100%', border: 'none', background: 'transparent', fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, outline: 'none' }}
              />
            </div>
            <div className="search-field-box">
              <div className="search-field-label"><Car size={14} /> DROP DESTINATION</div>
              <input
                type="text"
                value={cabTo}
                onChange={(e) => setCabTo(e.target.value)}
                style={{ width: '100%', border: 'none', background: 'transparent', fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, outline: 'none' }}
              />
            </div>
            <div className="search-field-box">
              <div className="search-field-label">PICKUP DATE</div>
              <input
                type="date"
                value={cabDate}
                onChange={(e) => setCabDate(e.target.value)}
                style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800, cursor: 'pointer', width: '100%' }}
              />
            </div>
          </div>
        )}

        {/* BUS TAB */}
        {activeTab === 'bus' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr', gap: '12px' }}>
            <div className="search-field-box">
              <div className="search-field-label"><Bus size={14} /> FROM CITY</div>
              <input
                type="text"
                value={busFrom}
                onChange={(e) => setBusFrom(e.target.value)}
                style={{ width: '100%', border: 'none', background: 'transparent', fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, outline: 'none' }}
              />
            </div>
            <div className="search-field-box">
              <div className="search-field-label"><Bus size={14} /> TO CITY</div>
              <input
                type="text"
                value={busTo}
                onChange={(e) => setBusTo(e.target.value)}
                style={{ width: '100%', border: 'none', background: 'transparent', fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, outline: 'none' }}
              />
            </div>
            <div className="search-field-box">
              <div className="search-field-label">DEPARTURE DATE</div>
              <input
                type="date"
                value={busDate}
                onChange={(e) => setBusDate(e.target.value)}
                style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800, cursor: 'pointer', width: '100%' }}
              />
            </div>
          </div>
        )}

        {/* HOLIDAYS TAB */}
        {activeTab === 'holidays' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
            <div className="search-field-box">
              <div className="search-field-label"><Palmtree size={14} /> TOUR DESTINATION</div>
              <select
                value={holidayDest}
                onChange={(e) => setHolidayDest(e.target.value)}
                style={{ width: '100%', border: 'none', background: 'transparent', fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, outline: 'none', cursor: 'pointer' }}
              >
                <option value="Kashmir">Kashmir (Heaven on Earth)</option>
                <option value="Goa">Goa (Beaches & Cruise)</option>
                <option value="Dubai">Dubai (Desert Safari & Skyscrapers)</option>
                <option value="Himachal">Himachal (Manali & Shimla Snow Tour)</option>
                <option value="Kerala">Kerala (Backwaters & Houseboat)</option>
              </select>
            </div>
            <div className="search-field-box">
              <div className="search-field-label">DURATION</div>
              <div className="search-field-value">5N / 6D</div>
            </div>
            <div className="search-field-box">
              <div className="search-field-label">TRAVELERS</div>
              <div className="search-field-value">2 Adults</div>
            </div>
          </div>
        )}

        {/* Centered SEARCH CTA Button */}
        <div className="search-btn-wrapper">
          <button className="btn-search-main" onClick={handleTriggerSearch}>
            SEARCH {activeTab.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
}
