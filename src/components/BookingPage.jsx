import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle, 
  ShieldCheck, 
  Ticket, 
  QrCode, 
  CreditCard, 
  Sparkles, 
  Printer, 
  User, 
  UserPlus,
  Trash2,
  Phone, 
  Mail, 
  Plane, 
  Building2, 
  Train, 
  Car, 
  Gift, 
  Check, 
  Info 
} from 'lucide-react';

export default function BookingPage({ 
  item, 
  searchParams, 
  user, 
  onBackToResults, 
  onBookingComplete 
}) {
  const [step, setStep] = useState(1); // 1: Passengers & Seat, 2: Payment, 3: Confirmation
  
  // Passengers array state
  const [passengers, setPassengers] = useState([
    {
      id: 1,
      fullName: user?.name || '',
      gender: 'Male',
      age: '28',
      seat: '12A'
    }
  ]);
  const [activePassengerIndex, setActivePassengerIndex] = useState(0);

  // Contact info
  const [passengerPhone, setPassengerPhone] = useState(user?.phone || '9876543210');
  const [passengerEmail, setPassengerEmail] = useState(user?.email || 'traveler@wanderlux.com');

  // Promo code
  const [coupon, setCoupon] = useState('WELCOMENEXT');
  const [discountApplied, setDiscountApplied] = useState(800);
  const [couponMsg, setCouponMsg] = useState('WELCOMENEXT applied! ₹800 extra discount');
  
  // Payment
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [pnrCode, setPnrCode] = useState('');

  const seatsList = ['10A', '10B', '10C', '11A', '11B', '11C', '12A', '12B', '12C', '14A', '14B', '14C', '15A', '15B', '15C'];

  // Add new passenger
  const handleAddPassenger = () => {
    const usedSeats = passengers.map((p) => p.seat);
    const nextSeat = seatsList.find((s) => !usedSeats.includes(s)) || '15B';

    const newPassenger = {
      id: Date.now(),
      fullName: '',
      gender: 'Male',
      age: '25',
      seat: nextSeat
    };
    setPassengers([...passengers, newPassenger]);
    setActivePassengerIndex(passengers.length);
  };

  // Remove passenger
  const handleRemovePassenger = (id) => {
    if (passengers.length === 1) return;
    const updated = passengers.filter((p) => p.id !== id);
    setPassengers(updated);
    if (activePassengerIndex >= updated.length) {
      setActivePassengerIndex(updated.length - 1);
    }
  };

  // Update specific passenger field
  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  // Select seat for active passenger
  const handleSelectSeat = (seatCode) => {
    const updated = [...passengers];
    updated[activePassengerIndex].seat = seatCode;
    setPassengers(updated);
  };

  // Pricing calculations
  const perPassengerBase = item?.price || 4850;
  const totalBasePrice = perPassengerBase * passengers.length;
  const totalSeatFee = passengers.reduce((sum, p) => sum + (p.seat?.includes('A') || p.seat?.includes('F') ? 250 : 150), 0);
  const totalTaxes = Math.round(totalBasePrice * 0.12);
  const totalPrice = Math.max(0, totalBasePrice + totalSeatFee + totalTaxes - discountApplied);

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'WELCOMENEXT') {
      setDiscountApplied(800);
      setCouponMsg('WELCOMENEXT applied! ₹800 extra discount');
    } else if (coupon.toUpperCase() === 'HOTELMAX') {
      setDiscountApplied(1200);
      setCouponMsg('HOTELMAX applied! ₹1200 extra discount');
    } else {
      setDiscountApplied(0);
      setCouponMsg('Invalid coupon code');
    }
  };

  const handleConfirmPayment = () => {
    const generatedPnr = 'WX' + Math.floor(100000 + Math.random() * 900000);
    setPnrCode(generatedPnr);

    const newBooking = {
      pnr: generatedPnr,
      bookingDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      item,
      searchParams,
      passengers,
      passengerPhone,
      passengerEmail,
      totalPrice,
      status: 'CONFIRMED'
    };

    onBookingComplete(newBooking);
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Top Header Navigation Bar */}
      <div style={{ background: '#0B0F17', color: 'white', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={onBackToResults}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ArrowLeft size={16} /> Back to Search Results
          </button>

          {/* Stepper progress */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', fontSize: '13px', fontWeight: 700 }}>
            <span style={{ color: step >= 1 ? '#00F0FF' : '#64748B' }}>1. Passengers & Seats</span>
            <span style={{ color: '#475569' }}>➔</span>
            <span style={{ color: step >= 2 ? '#00F0FF' : '#64748B' }}>2. Payment</span>
            <span style={{ color: '#475569' }}>➔</span>
            <span style={{ color: step >= 3 ? '#10B981' : '#64748B' }}>3. Confirmed E-Ticket</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '30px auto', padding: '0 20px' }}>
        {step < 3 ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '28px' }}>
            {/* Main Form Area */}
            <div>
              {/* Trip Overview Banner */}
              <div style={{ background: 'white', borderRadius: '18px', padding: '24px', border: '1.5px solid #E2E8F0', marginBottom: '24px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', fontWeight: 800 }}>
                      <Plane size={22} />
                    </div>
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800 }}>
                        {item.airline || item.name || 'Wanderlux Trip Booking'}
                      </h2>
                      <p style={{ fontSize: '12px', color: '#64748B' }}>
                        {item.flightNo || item.location || 'Express Line'} • Departure: {searchParams?.depDate || '30 Sep 2026'}
                      </p>
                    </div>
                  </div>
                  <span style={{ background: '#EFF6FF', color: '#2563EB', fontSize: '12px', fontWeight: 800, padding: '6px 14px', borderRadius: '20px' }}>
                    {passengers.length} Passenger{passengers.length > 1 ? 's' : ''} Selected
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', background: '#F8FAFC', padding: '16px 20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>FROM</span>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800 }}>{item.depCity || searchParams?.fromCity?.city || 'Delhi'} ({item.depCode || 'DEL'})</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Departure: {item.depTime || '06:00 AM'}</div>
                  </div>
                  <div style={{ textAlign: 'center', alignSelf: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB' }}>{item.duration || '2h 15m'}</span>
                    <div style={{ width: '100px', height: '2px', background: '#BFDBFE', position: 'relative', margin: '4px 0' }}>
                      <span style={{ position: 'absolute', top: '-7px', left: '42%', fontSize: '10px' }}>✈</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>{item.stops || 'Non-stop'}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>TO</span>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800 }}>{item.arrCity || searchParams?.toCity?.city || 'Mumbai'} ({item.arrCode || 'BOM'})</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Arrival: {item.arrTime || '08:15 AM'}</div>
                  </div>
                </div>
              </div>

              {step === 1 && (
                <>
                  {/* PASSENGER DETAILS CARD */}
                  <div style={{ background: 'white', borderRadius: '18px', padding: '24px', border: '1.5px solid #E2E8F0', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800 }}>
                          Passenger Information ({passengers.length})
                        </h3>
                        <p style={{ fontSize: '12px', color: '#64748B' }}>Enter traveller names exactly as stated on government ID cards.</p>
                      </div>
                      <button
                        onClick={handleAddPassenger}
                        style={{
                          background: 'var(--accent-blue-light)',
                          color: 'var(--accent-blue)',
                          border: '1.5px solid var(--accent-blue-border)',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontWeight: 800,
                          fontSize: '13px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <UserPlus size={16} /> + Add Passenger
                      </button>
                    </div>

                    {/* Passenger Input Cards */}
                    {passengers.map((p, idx) => (
                      <div 
                        key={p.id}
                        onClick={() => setActivePassengerIndex(idx)}
                        style={{
                          background: activePassengerIndex === idx ? '#EFF6FF' : '#F8FAFC',
                          borderRadius: '14px',
                          padding: '18px',
                          border: activePassengerIndex === idx ? '2px solid #2563EB' : '1px solid #E2E8F0',
                          marginBottom: '16px',
                          position: 'relative'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontWeight: 800, fontSize: '14px', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <User size={16} color="#2563EB" /> Passenger {idx + 1} {idx === 0 ? '(Primary Traveler)' : ''}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB', background: 'white', padding: '4px 10px', borderRadius: '12px', border: '1px solid #BFDBFE' }}>
                              Seat: {p.seat}
                            </span>
                            {passengers.length > 1 && (
                              <button
                                onClick={(e) => { e.stopPropagation(); handleRemovePassenger(p.id); }}
                                style={{ background: '#FEE2E2', border: 'none', color: '#DC2626', padding: '6px', borderRadius: '8px', cursor: 'pointer' }}
                                title="Remove Passenger"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '14px' }}>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                              Full Name (as per Govt ID)
                            </label>
                            <input
                              type="text"
                              value={p.fullName}
                              onChange={(e) => handlePassengerChange(idx, 'fullName', e.target.value)}
                              placeholder={`e.g. ${idx === 0 ? 'Indrajit Gupta' : 'Passenger Full Name'}`}
                              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #CBD5E1', outline: 'none', fontWeight: 600, background: 'white' }}
                              required
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Gender</label>
                            <select
                              value={p.gender}
                              onChange={(e) => handlePassengerChange(idx, 'gender', e.target.value)}
                              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #CBD5E1', outline: 'none', fontWeight: 600, background: 'white' }}
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Age</label>
                            <input
                              type="number"
                              value={p.age}
                              onChange={(e) => handlePassengerChange(idx, 'age', e.target.value)}
                              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #CBD5E1', outline: 'none', fontWeight: 600, background: 'white' }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Primary Contact Details */}
                    <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '12px' }}>Ticket & Booking Contact Info</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Mobile Phone Number</label>
                          <input
                            type="tel"
                            value={passengerPhone}
                            onChange={(e) => setPassengerPhone(e.target.value)}
                            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #CBD5E1', outline: 'none', fontWeight: 600 }}
                            required
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Email Address (for E-Ticket)</label>
                          <input
                            type="email"
                            value={passengerEmail}
                            onChange={(e) => setPassengerEmail(e.target.value)}
                            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #CBD5E1', outline: 'none', fontWeight: 600 }}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Seat Map Selector */}
                  <div style={{ background: 'white', borderRadius: '18px', padding: '24px', border: '1.5px solid #E2E8F0', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800 }}>
                        Select Seat for Passenger {activePassengerIndex + 1} ({passengers[activePassengerIndex]?.fullName || 'Passenger'})
                      </h3>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#2563EB' }}>
                        Active Seat: <strong style={{ color: '#FF4F17' }}>{passengers[activePassengerIndex]?.seat}</strong>
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                      {seatsList.map((st) => {
                        const isAssignedToOther = passengers.some((p, i) => i !== activePassengerIndex && p.seat === st);
                        const isSelectedByCurrent = passengers[activePassengerIndex]?.seat === st;
                        const isWindow = st.endsWith('A') || st.endsWith('F');
                        return (
                          <button
                            key={st}
                            disabled={isAssignedToOther}
                            onClick={() => handleSelectSeat(st)}
                            style={{
                              padding: '12px 8px',
                              borderRadius: '10px',
                              border: isSelectedByCurrent ? '2px solid #2563EB' : '1px solid #CBD5E1',
                              background: isSelectedByCurrent ? '#EFF6FF' : isAssignedToOther ? '#F1F5F9' : '#FFFFFF',
                              color: isSelectedByCurrent ? '#2563EB' : isAssignedToOther ? '#94A3B8' : '#1E293B',
                              fontFamily: 'var(--font-heading)',
                              fontWeight: 800,
                              fontSize: '13px',
                              cursor: isAssignedToOther ? 'not-allowed' : 'pointer',
                              opacity: isAssignedToOther ? 0.5 : 1
                            }}
                          >
                            {st} {isWindow ? '🪟' : ''} {isAssignedToOther ? '🔒' : ''}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    style={{
                      width: '100%',
                      background: 'var(--primary-orange-gradient)',
                      color: 'white',
                      fontFamily: 'var(--font-display)',
                      fontSize: '18px',
                      fontWeight: 800,
                      padding: '16px',
                      borderRadius: '30px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 8px 24px rgba(255, 79, 23, 0.4)'
                    }}
                  >
                    Proceed to Payment (₹{totalPrice.toLocaleString()})
                  </button>
                </>
              )}

              {step === 2 && (
                <div style={{ background: 'white', borderRadius: '18px', padding: '24px', border: '1.5px solid #E2E8F0' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>
                    Select Payment Method
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>
                    Total amount for {passengers.length} passenger{passengers.length > 1 ? 's' : ''}: <strong style={{ color: '#FF4F17', fontSize: '18px' }}>₹{totalPrice.toLocaleString()}</strong>
                  </p>

                  <div style={{ display: 'flex', gap: '14px', marginBottom: '24px' }}>
                    <button
                      onClick={() => setPaymentMethod('upi')}
                      style={{
                        flex: 1,
                        padding: '16px',
                        borderRadius: '12px',
                        border: paymentMethod === 'upi' ? '2px solid #2563EB' : '1px solid #CBD5E1',
                        background: paymentMethod === 'upi' ? '#EFF6FF' : '#FFFFFF',
                        color: paymentMethod === 'upi' ? '#2563EB' : '#1E293B',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      <QrCode size={20} /> Instant UPI / GPay QR
                    </button>
                    <button
                      onClick={() => setPaymentMethod('card')}
                      style={{
                        flex: 1,
                        padding: '16px',
                        borderRadius: '12px',
                        border: paymentMethod === 'card' ? '2px solid #2563EB' : '1px solid #CBD5E1',
                        background: paymentMethod === 'card' ? '#EFF6FF' : '#FFFFFF',
                        color: paymentMethod === 'card' ? '#2563EB' : '#1E293B',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      <CreditCard size={20} /> Credit / Debit Card
                    </button>
                  </div>

                  {paymentMethod === 'upi' ? (
                    <div style={{ textAlign: 'center', padding: '24px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #CBD5E1', marginBottom: '24px' }}>
                      <div style={{ background: 'white', display: 'inline-block', padding: '20px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
                        <QrCode size={140} color="#0B0F17" />
                      </div>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#475569', marginTop: '12px' }}>
                        Scan & Pay ₹{totalPrice.toLocaleString()} using GPay, PhonePe, Paytm or BHIM
                      </p>
                    </div>
                  ) : (
                    <div style={{ marginBottom: '24px' }}>
                      <input type="text" placeholder="Card Number (4532 XXXX XXXX 8912)" className="search-input-box" style={{ marginBottom: '12px' }} />
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <input type="text" placeholder="MM / YY" className="search-input-box" />
                        <input type="password" placeholder="CVV" className="search-input-box" />
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={() => setStep(1)}
                      style={{ padding: '14px 24px', borderRadius: '30px', border: '1px solid #CBD5E1', background: 'white', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleConfirmPayment}
                      style={{
                        flex: 1,
                        background: 'var(--primary-orange-gradient)',
                        color: 'white',
                        fontFamily: 'var(--font-display)',
                        fontSize: '18px',
                        fontWeight: 800,
                        padding: '16px',
                        borderRadius: '30px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 8px 24px rgba(255, 79, 23, 0.4)'
                      }}
                    >
                      Pay ₹{totalPrice.toLocaleString()} & Confirm Booking
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side Price Sidebar */}
            <div>
              <div style={{ background: 'white', borderRadius: '18px', padding: '22px', border: '1.5px solid #E2E8F0', position: 'sticky', top: '90px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, marginBottom: '14px' }}>
                  Price Summary ({passengers.length} Passenger{passengers.length > 1 ? 's' : ''})
                </h3>

                <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '14px', borderBottom: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Base Fare ({passengers.length} x ₹{perPassengerBase.toLocaleString()})</span>
                    <span style={{ fontWeight: 700 }}>₹{totalBasePrice.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Seat Selection Add-ons</span>
                    <span style={{ fontWeight: 700 }}>₹{totalSeatFee}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Taxes & Operator Charges</span>
                    <span style={{ fontWeight: 700 }}>₹{totalTaxes.toLocaleString()}</span>
                  </div>
                  {discountApplied > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981', fontWeight: 700 }}>
                      <span>Promo Discount</span>
                      <span>-₹{discountApplied}</span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0', paddingTop: '4px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 800 }}>Total Payable:</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: '#FF4F17' }}>
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Coupon Code Input */}
                <div style={{ background: '#EFF6FF', borderRadius: '12px', padding: '12px', border: '1px dashed #BFDBFE', marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#2563EB', marginBottom: '6px' }}>
                    <Gift size={14} style={{ display: 'inline', marginRight: '4px' }} /> Have a Promo Code?
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      style={{ flex: 1, padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}
                    />
                    <button
                      onClick={handleApplyCoupon}
                      style={{ background: '#2563EB', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <div style={{ fontSize: '11px', color: discountApplied > 0 ? '#10B981' : '#E11D48', fontWeight: 700, marginTop: '6px' }}>
                      {couponMsg}
                    </div>
                  )}
                </div>

                <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px', color: '#475569', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <ShieldCheck size={20} color="#10B981" />
                  <span>100% Instant Refund on Cancellation Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Step 3: Full Page E-Ticket Confirmation View with All Passengers */
          <div style={{ maxWidth: '720px', margin: '20px auto', background: 'white', borderRadius: '24px', padding: '36px', border: '1.5px solid #E2E8F0', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <CheckCircle size={64} color="#10B981" style={{ margin: '0 auto 12px auto' }} />
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: '#0B0F17' }}>
                Booking Successfully Confirmed!
              </h2>
              <p style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
                Official e-tickets for <strong>{passengers.length} passenger{passengers.length > 1 ? 's' : ''}</strong> sent to <strong>{passengerEmail}</strong>
              </p>
            </div>

            {/* Printable E-Ticket Card */}
            <div 
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
                borderRadius: '18px',
                border: '2px dashed #BFDBFE',
                padding: '24px',
                marginBottom: '28px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '14px', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 800 }}>PNR NUMBER</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: '#2563EB' }}>{pnrCode}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 800 }}>AIRLINE / VEHICLE</span>
                  <div style={{ fontWeight: 800, fontSize: '16px' }}>{item.airline || item.name || 'IndiGo'}</div>
                </div>
              </div>

              {/* Passengers Breakdown */}
              <div style={{ marginBottom: '20px', background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#2563EB', marginBottom: '10px', textTransform: 'uppercase' }}>
                  PASSENGER & SEAT LIST ({passengers.length})
                </div>
                {passengers.map((p, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', padding: '6px 0', borderBottom: i < passengers.length - 1 ? '1px dashed #E2E8F0' : 'none' }}>
                    <span><strong>{i + 1}. {p.fullName || 'Passenger'}</strong> ({p.gender}, {p.age} yrs)</span>
                    <span style={{ fontWeight: 800, color: '#FF4F17' }}>Seat {p.seat}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 800 }}>{searchParams?.fromCity?.city || 'Delhi'}</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>{item.depTime || '06:00 AM'}</div>
                </div>
                <div style={{ alignSelf: 'center', fontSize: '13px', fontWeight: 700, color: '#2563EB' }}>
                  ✈ 2h 15m ➔
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 800 }}>{searchParams?.toCity?.city || 'Mumbai'}</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>{item.arrTime || '08:15 AM'}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px' }}>
              <button
                onClick={() => window.print()}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '30px',
                  border: '1.5px solid #CBD5E1',
                  background: 'white',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Printer size={18} /> Print E-Ticket
              </button>
              <button
                onClick={onBackToResults}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '30px',
                  border: 'none',
                  background: 'var(--primary-orange-gradient)',
                  color: 'white',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '15px',
                  cursor: 'pointer'
                }}
              >
                Return to Search Results
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
