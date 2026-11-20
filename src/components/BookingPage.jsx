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
  Info,
  MapPin,
  Calendar,
  Bed,
  Coffee
} from 'lucide-react';

export default function BookingPage({ 
  item, 
  searchParams, 
  user, 
  onBackToResults, 
  onBookingComplete 
}) {
  const [step, setStep] = useState(1);
  
  const bookingType = searchParams?.type || (item?.stars || item?.rating ? 'hotels' : item?.trainNo ? 'trains' : 'flights');
  const isHotel = bookingType === 'hotels';
  const isTrain = bookingType === 'trains';
  const isFlight = !isHotel && !isTrain;

  const [passengers, setPassengers] = useState([
    {
      id: 1,
      fullName: user?.name || '',
      gender: 'Male',
      age: '28',
      seat: isHotel ? 'Room 304' : isTrain ? 'Berth 14A' : '12A'
    }
  ]);
  const [activePassengerIndex, setActivePassengerIndex] = useState(0);

  const [passengerPhone, setPassengerPhone] = useState(user?.phone || '9876543210');
  const [passengerEmail, setPassengerEmail] = useState(user?.email || 'traveler@wanderlux.com');

  const [selectedRoomType, setSelectedRoomType] = useState('Deluxe King Suite (Complimentary Breakfast)');
  const [selectedBerthType, setSelectedBerthType] = useState('Lower Berth (Window Side)');

  const [coupon, setCoupon] = useState('WELCOMENEXT');
  const [discountApplied, setDiscountApplied] = useState(800);
  const [couponMsg, setCouponMsg] = useState('WELCOMENEXT applied! 800 extra discount');
  
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [pnrCode, setPnrCode] = useState('');

  const seatsList = ['10A', '10B', '10C', '11A', '11B', '11C', '12A', '12B', '12C', '14A', '14B', '14C', '15A', '15B', '15C'];
  const berthOptions = ['Lower Berth', 'Upper Berth', 'Middle Berth', 'Side Lower', 'Side Upper'];
  const hotelRoomsList = [
    { name: 'Deluxe King Suite (Complimentary Breakfast)', fee: 0, tag: 'Most Popular' },
    { name: 'Luxury Sea Facing Room with Balcony', fee: 500, tag: 'High Floor' },
    { name: 'Executive Club Suite with Lounge Access', fee: 1200, tag: 'VIP Perks' }
  ];

  const handleAddPassenger = () => {
    const nextSeat = isHotel ? `Room ${304 + passengers.length}` : isTrain ? `Berth ${14 + passengers.length}B` : `14${String.fromCharCode(65 + passengers.length)}`;
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

  const handleRemovePassenger = (id) => {
    if (passengers.length === 1) return;
    const updated = passengers.filter((p) => p.id !== id);
    setPassengers(updated);
    if (activePassengerIndex >= updated.length) {
      setActivePassengerIndex(updated.length - 1);
    }
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleSelectSeat = (seatCode) => {
    const updated = [...passengers];
    updated[activePassengerIndex].seat = seatCode;
    setPassengers(updated);
  };

  const perPassengerBase = item?.price || 4850;
  const totalBasePrice = perPassengerBase * passengers.length;
  const totalSeatFee = isFlight ? passengers.reduce((sum, p) => sum + (p.seat?.includes('A') || p.seat?.includes('F') ? 250 : 150), 0) : 0;
  const totalTaxes = Math.round(totalBasePrice * (isHotel ? 0.18 : isTrain ? 0.05 : 0.12));
  const totalPrice = Math.max(0, totalBasePrice + totalSeatFee + totalTaxes - discountApplied);

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'WELCOMENEXT') {
      setDiscountApplied(800);
      setCouponMsg('WELCOMENEXT applied! 800 extra discount');
    } else {
      setDiscountApplied(0);
      setCouponMsg('Invalid coupon code');
    }
  };

  const handleConfirmPayment = () => {
    const prefix = isHotel ? 'HT' : isTrain ? 'TR' : 'WX';
    const generatedPnr = prefix + Math.floor(100000 + Math.random() * 900000);
    setPnrCode(generatedPnr);

    const newBooking = {
      pnr: generatedPnr,
      bookingDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      item,
      searchParams,
      bookingType,
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

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', fontSize: '13px', fontWeight: 700 }}>
            <span style={{ color: step >= 1 ? '#00F0FF' : '#64748B' }}>
              {isHotel ? '1. Guest Details' : isTrain ? '1. Passenger & Berth' : '1. Passengers & Seats'}
            </span>
            <span style={{ color: '#475569' }}>➔</span>
            <span style={{ color: step >= 2 ? '#00F0FF' : '#64748B' }}>2. Payment Checkout</span>
            <span style={{ color: '#475569' }}>➔</span>
            <span style={{ color: step >= 3 ? '#10B981' : '#64748B' }}>
              {isHotel ? '3. Confirmed Hotel Voucher' : isTrain ? '3. Confirmed Train E-Ticket' : '3. Confirmed E-Ticket'}
            </span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '30px auto', padding: '0 20px' }}>
        {step < 3 ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '28px' }}>
            <div>
              {/* TRIP / HOTEL / TRAIN OVERVIEW BANNER */}
              <div style={{ background: 'white', borderRadius: '18px', padding: '24px', border: '1.5px solid #E2E8F0', marginBottom: '24px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', fontWeight: 800 }}>
                      {isHotel ? <Building2 size={22} /> : isTrain ? <Train size={22} /> : <Plane size={22} />}
                    </div>
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800 }}>
                        {isHotel ? (item.name || 'Luxury Hotel Reservation') : isTrain ? (item.trainName || item.name || 'Express Line') : (item.airline || item.name || 'Wanderlux Flight')}
                      </h2>
                      <p style={{ fontSize: '12px', color: '#64748B' }}>
                        {isHotel ? `${item.location || item.city || 'City Center'} • 5-Star Luxury Rating` : isTrain ? `${item.trainNo || '22436'} • Superfast Express` : `${item.flightNo || '6E-2041'} • Non-Stop Service`}
                      </p>
                    </div>
                  </div>
                  <span style={{ background: '#EFF6FF', color: '#2563EB', fontSize: '12px', fontWeight: 800, padding: '6px 14px', borderRadius: '20px' }}>
                    {isHotel ? `${passengers.length} Guest(s)` : `${passengers.length} Passenger(s)`}
                  </span>
                </div>

                {isHotel ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr', background: '#F8FAFC', padding: '16px 20px', borderRadius: '14px', border: '1px solid #E2E8F0', gap: '10px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>CHECK-IN</span>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800 }}>{searchParams?.checkIn || '15 Nov 2026'}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>From 02:00 PM</div>
                    </div>
                    <div style={{ textAlign: 'center', alignSelf: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB' }}>2 Nights</span>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>1 Deluxe Room</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>CHECK-OUT</span>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800 }}>{searchParams?.checkOut || '17 Nov 2026'}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>Until 12:00 PM</div>
                    </div>
                  </div>
                ) : isTrain ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: '#F8FAFC', padding: '16px 20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>FROM STATION</span>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800 }}>{searchParams?.trainFrom || item.depStation || 'New Delhi (NDLS)'}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>Departure: {item.depTime || '06:00 AM'}</div>
                    </div>
                    <div style={{ textAlign: 'center', alignSelf: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB' }}>{item.duration || '8h 10m'}</span>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>Daily Express</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>TO STATION</span>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800 }}>{searchParams?.trainTo || item.arrStation || 'Mumbai Central (MMCT)'}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>Arrival: {item.arrTime || '14:10 PM'}</div>
                    </div>
                  </div>
                ) : (
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
                )}
              </div>

              {step === 1 && (
                <>
                  <div style={{ background: 'white', borderRadius: '18px', padding: '24px', border: '1.5px solid #E2E8F0', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800 }}>
                          {isHotel ? 'Guest Information' : 'Passenger Information'}
                        </h3>
                        <p style={{ fontSize: '12px', color: '#64748B' }}>
                          {isHotel ? 'Enter primary guest name as stated on government ID.' : 'Enter traveller names exactly as stated on official ID.'}
                        </p>
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
                          gap: '6px'
                        }}
                      >
                        <UserPlus size={16} /> + Add {isHotel ? 'Guest' : 'Passenger'}
                      </button>
                    </div>

                    {passengers.map((p, idx) => (
                      <div 
                        key={p.id}
                        onClick={() => setActivePassengerIndex(idx)}
                        style={{
                          background: activePassengerIndex === idx ? '#EFF6FF' : '#F8FAFC',
                          borderRadius: '14px',
                          padding: '18px',
                          border: activePassengerIndex === idx ? '2px solid #2563EB' : '1px solid #E2E8F0',
                          marginBottom: '16px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontWeight: 800, fontSize: '14px', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <User size={16} color="#2563EB" /> {isHotel ? 'Guest' : 'Passenger'} {idx + 1} {idx === 0 ? '(Primary Contact)' : ''}
                          </span>
                          {passengers.length > 1 && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleRemovePassenger(p.id); }}
                              style={{ background: '#FEE2E2', border: 'none', color: '#DC2626', padding: '6px', borderRadius: '8px', cursor: 'pointer' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '14px' }}>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Full Name (as per Govt ID)</label>
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

                    <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '12px' }}>Reservation Contact Info</h4>
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
                          <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Email Address (for Confirmation)</label>
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

                  {/* SPECIFIC SELECTION CARD: ROOM FOR HOTELS, BERTH FOR TRAINS, SEATS FOR FLIGHTS */}
                  {isHotel ? (
                    <div style={{ background: 'white', borderRadius: '18px', padding: '24px', border: '1.5px solid #E2E8F0', marginBottom: '24px' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>
                        Select Room Category & Inclusions
                      </h3>
                      <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>All categories include free Wi-Fi, swimming pool access and sanitized linen.</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {hotelRoomsList.map((rm) => (
                          <div 
                            key={rm.name}
                            onClick={() => setSelectedRoomType(rm.name)}
                            style={{
                              padding: '14px 18px',
                              borderRadius: '12px',
                              border: selectedRoomType === rm.name ? '2px solid #2563EB' : '1px solid #CBD5E1',
                              background: selectedRoomType === rm.name ? '#EFF6FF' : '#FFFFFF',
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: 800, fontSize: '14px', color: selectedRoomType === rm.name ? '#2563EB' : '#0F172A' }}>{rm.name}</div>
                              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{rm.tag} • Instant Confirmation</div>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 800, color: selectedRoomType === rm.name ? '#2563EB' : '#10B981' }}>Included</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : isTrain ? (
                    <div style={{ background: 'white', borderRadius: '18px', padding: '24px', border: '1.5px solid #E2E8F0', marginBottom: '24px' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>
                        IRCTC Berth Preference
                      </h3>
                      <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>Berth allotment is subject to IRCTC algorithm availability.</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                        {berthOptions.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setSelectedBerthType(b)}
                            style={{
                              padding: '12px',
                              borderRadius: '10px',
                              border: selectedBerthType === b ? '2px solid #2563EB' : '1px solid #CBD5E1',
                              background: selectedBerthType === b ? '#EFF6FF' : '#FFFFFF',
                              color: selectedBerthType === b ? '#2563EB' : '#0F172A',
                              fontWeight: 700,
                              fontSize: '13px',
                              cursor: 'pointer'
                            }}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div style={{ background: 'white', borderRadius: '18px', padding: '24px', border: '1.5px solid #E2E8F0', marginBottom: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800 }}>
                          Select Seat for Passenger {activePassengerIndex + 1}
                        </h3>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#2563EB' }}>
                          Selected Seat: <strong style={{ color: '#FF4F17' }}>{passengers[activePassengerIndex]?.seat}</strong>
                        </span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                        {seatsList.map((st) => {
                          const isAssignedToOther = passengers.some((p, i) => i !== activePassengerIndex && p.seat === st);
                          const isSelectedByCurrent = passengers[activePassengerIndex]?.seat === st;
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
                                cursor: isAssignedToOther ? 'not-allowed' : 'pointer'
                              }}
                            >
                              {st}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

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
                    Total amount payable: <strong style={{ color: '#FF4F17', fontSize: '18px' }}>₹{totalPrice.toLocaleString()}</strong>
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
                  Price Summary
                </h3>

                <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '14px', borderBottom: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>{isHotel ? 'Room Tariff (Base)' : isTrain ? 'IRCTC Rail Base Fare' : 'Base Flight Fare'}</span>
                    <span style={{ fontWeight: 700 }}>₹{totalBasePrice.toLocaleString()}</span>
                  </div>
                  {isFlight && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748B' }}>Seat Selection Fee</span>
                      <span style={{ fontWeight: 700 }}>₹{totalSeatFee}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Taxes & GST Charges</span>
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

                <div style={{ background: '#EFF6FF', borderRadius: '12px', padding: '12px', border: '1px dashed #BFDBFE', marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#2563EB', marginBottom: '6px' }}>
                    <Gift size={14} style={{ display: 'inline', marginRight: '4px' }} /> Promo Code
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
                  {discountApplied > 0 && (
                    <div style={{ color: '#10B981', fontSize: '11px', fontWeight: 700, marginTop: '6px' }}>
                      ✓ WELCOMENEXT applied (-₹800)
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* STEP 3 CONFIRMATION E-TICKET / VOUCHER VIEW */
          <div style={{ maxWidth: '720px', margin: '20px auto', background: 'white', borderRadius: '24px', padding: '36px', border: '1.5px solid #E2E8F0', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <CheckCircle size={64} color="#10B981" style={{ margin: '0 auto 12px auto' }} />
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: '#0B0F17' }}>
                {isHotel ? 'Hotel Booking Successfully Confirmed!' : isTrain ? 'Train Ticket Successfully Confirmed!' : 'Flight Booking Successfully Confirmed!'}
              </h2>
              <p style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
                Official confirmation voucher dispatched to <strong>{passengerEmail}</strong>
              </p>
            </div>

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
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 800 }}>{isHotel ? 'HOTEL PROPERTY' : isTrain ? 'TRAIN SERVICE' : 'AIRLINE'}</span>
                  <div style={{ fontWeight: 800, fontSize: '16px' }}>{item.name || item.airline || item.trainName || 'Wanderlux Travel'}</div>
                </div>
              </div>

              {isHotel ? (
                <div>
                  <div style={{ marginBottom: '16px', background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#2563EB', marginBottom: '6px', textTransform: 'uppercase' }}>
                      PRIMARY GUEST & ROOM DETAILS
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span><strong>Guest: {passengers[0]?.fullName || 'Indrajit Gupta'}</strong> ({passengers[0]?.gender}, {passengers[0]?.age} yrs)</span>
                      <span style={{ fontWeight: 800, color: '#10B981' }}>Confirmed</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#475569', marginTop: '6px' }}>
                      Room: <strong>{selectedRoomType}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 800 }}>Check-in: {searchParams?.checkIn || '15 Nov 2026'}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>After 02:00 PM</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '16px', fontWeight: 800 }}>Check-out: {searchParams?.checkOut || '17 Nov 2026'}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>Before 12:00 PM</div>
                    </div>
                  </div>
                </div>
              ) : isTrain ? (
                <div>
                  <div style={{ marginBottom: '16px', background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#2563EB', marginBottom: '6px', textTransform: 'uppercase' }}>
                      PASSENGER & BERTH DETAILS
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span><strong>1. {passengers[0]?.fullName || 'Indrajit Gupta'}</strong> ({passengers[0]?.gender}, {passengers[0]?.age} yrs)</span>
                      <span style={{ fontWeight: 800, color: '#FF4F17' }}>Coach B3 / Berth 14A</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#475569', marginTop: '6px' }}>
                      Berth Preference: <strong>{selectedBerthType}</strong> (Status: CNF)
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 800 }}>{searchParams?.trainFrom || item.depStation || 'New Delhi (NDLS)'}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>Dep: {item.depTime || '06:00 AM'}</div>
                    </div>
                    <div style={{ alignSelf: 'center', fontSize: '13px', fontWeight: 700, color: '#2563EB' }}>
                      ➔ {item.duration || '8h 10m'} ➔
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '16px', fontWeight: 800 }}>{searchParams?.trainTo || item.arrStation || 'Mumbai Central (MMCT)'}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>Arr: {item.arrTime || '14:10 PM'}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ marginBottom: '16px', background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#2563EB', marginBottom: '6px', textTransform: 'uppercase' }}>
                      PASSENGER & SEAT LIST
                    </div>
                    {passengers.map((p, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', padding: '4px 0' }}>
                        <span><strong>{i + 1}. {p.fullName || 'Passenger'}</strong> ({p.gender}, {p.age} yrs)</span>
                        <span style={{ fontWeight: 800, color: '#FF4F17' }}>Seat {p.seat}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: 800 }}>{searchParams?.fromCity?.city || item.depCity || 'Delhi'}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>{item.depTime || '06:00 AM'}</div>
                    </div>
                    <div style={{ alignSelf: 'center', fontSize: '13px', fontWeight: 700, color: '#2563EB' }}>
                      ✈ {item.duration || '2h 15m'} ➔
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '20px', fontWeight: 800 }}>{searchParams?.toCity?.city || item.arrCity || 'Mumbai'}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>{item.arrTime || '08:15 AM'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => window.print()}
              style={{
                width: '100%',
                background: '#0B0F17',
                color: 'white',
                padding: '14px',
                borderRadius: '30px',
                border: 'none',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer'
              }}
            >
              Print Confirmation Voucher
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
