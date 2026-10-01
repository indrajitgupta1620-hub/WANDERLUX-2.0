import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Ticket, QrCode, CreditCard, Sparkles, Download, Printer } from 'lucide-react';

export default function BookingModal({ item, searchParams, user, onClose, onBookingComplete }) {
  const [step, setStep] = useState(1); // 1: Seats & Passenger, 2: Payment, 3: Ticket View
  const [selectedSeat, setSelectedSeat] = useState('12A');
  const [passengerName, setPassengerName] = useState(user?.name || '');
  const [passengerPhone, setPassengerPhone] = useState(user?.phone || '9876543210');
  const [passengerEmail, setPassengerEmail] = useState(user?.email || 'traveler@goibibo.com');
  const [coupon, setCoupon] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [pnrCode, setPnrCode] = useState('');

  const basePrice = item.price || 4850;
  const seatFee = selectedSeat.includes('A') || selectedSeat.includes('F') ? 250 : 150; // Window seats fee
  const taxes = Math.round(basePrice * 0.12);
  const totalPrice = Math.max(0, basePrice + seatFee + taxes - discountApplied);

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'WELCOMENEXT') {
      setDiscountApplied(800);
      setCouponError('');
    } else if (coupon.toUpperCase() === 'GOBIGO') {
      setDiscountApplied(500);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try WELCOMENEXT for ₹800 OFF.');
    }
  };

  const handleConfirmPayment = () => {
    const generatedPnr = 'GB' + Math.floor(100000 + Math.random() * 900000);
    setPnrCode(generatedPnr);

    const newBooking = {
      pnr: generatedPnr,
      bookingDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      item,
      searchParams,
      seat: selectedSeat,
      passengerName: passengerName || 'Valued Guest',
      passengerPhone,
      passengerEmail,
      totalPrice,
      status: 'CONFIRMED'
    };

    onBookingComplete(newBooking);
    setStep(3); // View Ticket
  };

  // Seat layout grid generator
  const seatsList = ['10A', '10B', '10C', '11A', '11B', '11C', '12A', '12B', '12C', '14A', '14B', '14C'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: step === 3 ? '600px' : '720px', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ padding: '24px 28px' }}>
          {step === 1 && (
            <>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>
                Complete Flight Booking
              </h2>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>
                {item.airline || 'Goibibo Express'} ({item.flightNo || '6E-2041'}) • {searchParams?.fromCity?.city || 'Delhi'} ➔ {searchParams?.toCity?.city || 'Mumbai'}
              </p>

              {/* Seat Selection Widget */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '14px', border: '1px solid #CBD5E1', marginBottom: '20px' }}>
                <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>💺 Select Preferred Seat</span>
                  <span style={{ color: '#2276E3', fontSize: '12px' }}>Selected: <strong>{selectedSeat}</strong></span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
                  {seatsList.map((st) => {
                    const isSelected = selectedSeat === st;
                    const isWindow = st.endsWith('A') || st.endsWith('F');
                    return (
                      <button
                        key={st}
                        onClick={() => setSelectedSeat(st)}
                        style={{
                          padding: '8px',
                          borderRadius: '8px',
                          border: isSelected ? '2px solid #2276E3' : '1px solid #CBD5E1',
                          background: isSelected ? '#EBF3FE' : '#FFFFFF',
                          color: isSelected ? '#2276E3' : '#1E293B',
                          fontWeight: 700,
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        {st} {isWindow ? '🪟' : ''}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Passenger Inputs */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '10px' }}>Passenger Details</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>Full Name (as on ID)</label>
                    <input
                      type="text"
                      className="search-input-box"
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      placeholder="e.g. Indrajit Gupta"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>Mobile Number</label>
                    <input
                      type="tel"
                      className="search-input-box"
                      value={passengerPhone}
                      onChange={(e) => setPassengerPhone(e.target.value)}
                      placeholder="10-digit mobile"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Promo code bar */}
              <div style={{ background: '#EFF6FF', padding: '14px', borderRadius: '12px', marginBottom: '20px', border: '1px dashed #99C3FB' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#2276E3', marginBottom: '8px' }}>
                  🎁 Apply Discount Coupon Code
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Enter WELCOMENEXT"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', textTransform: 'uppercase', fontWeight: 700 }}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    style={{ background: '#2276E3', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Apply
                  </button>
                </div>
                {discountApplied > 0 && (
                  <div style={{ color: '#22C55E', fontSize: '12px', fontWeight: 700, marginTop: '6px' }}>
                    ✓ Coupon WELCOMENEXT Applied! ₹800 Discounted.
                  </div>
                )}
                {couponError && (
                  <div style={{ color: '#E11D48', fontSize: '12px', fontWeight: 600, marginTop: '6px' }}>
                    {couponError}
                  </div>
                )}
              </div>

              {/* Price summary */}
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '14px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span>Base Fare:</span> <span>₹{basePrice.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span>Seat Add-on ({selectedSeat}):</span> <span>₹{seatFee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span>Taxes & Airport Fee:</span> <span>₹{taxes}</span>
                </div>
                {discountApplied > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#22C55E', fontWeight: 700, marginBottom: '4px' }}>
                    <span>Promo Code Discount:</span> <span>-₹{discountApplied}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #E2E8F0' }}>
                  <span>Total Payable:</span> <span style={{ color: '#FF4F17' }}>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                className="btn-modal-continue active"
                onClick={() => setStep(2)}
              >
                Proceed to Payment
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>
                Payment Checkout
              </h2>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>
                Amount to pay: <strong style={{ color: '#FF4F17' }}>₹{totalPrice.toLocaleString()}</strong>
              </p>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {[
                  { id: 'upi', label: 'UPI / GPay QR', icon: QrCode },
                  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard }
                ].map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    style={{
                      flex: 1,
                      padding: '14px',
                      borderRadius: '12px',
                      border: paymentMethod === pm.id ? '2px solid #2276E3' : '1px solid #CBD5E1',
                      background: paymentMethod === pm.id ? '#EBF3FE' : '#FFFFFF',
                      color: paymentMethod === pm.id ? '#2276E3' : '#1E293B',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <pm.icon size={18} /> {pm.label}
                  </button>
                ))}
              </div>

              {paymentMethod === 'upi' ? (
                <div style={{ textAlign: 'center', padding: '20px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #CBD5E1', marginBottom: '20px' }}>
                  <div style={{ background: 'white', display: 'inline-block', padding: '16px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                    <QrCode size={120} color="#1E293B" />
                  </div>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginTop: '10px' }}>
                    Scan QR using GPay, PhonePe, Paytm or BHIM UPI
                  </p>
                </div>
              ) : (
                <div style={{ marginBottom: '20px' }}>
                  <input type="text" placeholder="Card Number (4532 XXXX XXXX 8912)" className="search-input-box" style={{ marginBottom: '10px' }} />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder="MM/YY" className="search-input-box" />
                    <input type="password" placeholder="CVV" className="search-input-box" />
                  </div>
                </div>
              )}

              <button
                className="btn-modal-continue active"
                onClick={handleConfirmPayment}
              >
                PAY ₹{totalPrice.toLocaleString()} NOW
              </button>
            </>
          )}

          {step === 3 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <CheckCircle size={56} color="#22C55E" style={{ margin: '0 auto 8px auto' }} />
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: '#121827' }}>
                  Booking Confirmed!
                </h2>
                <p style={{ fontSize: '13px', color: '#64748B' }}>
                  Your e-ticket has been sent to <strong>{passengerEmail}</strong>
                </p>
              </div>

              {/* Printable E-Ticket Card */}
              <div 
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
                  borderRadius: '16px',
                  border: '2px dashed #99C3FB',
                  padding: '24px',
                  marginBottom: '20px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px', marginBottom: '14px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>PNR NUMBER</span>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800, color: '#2276E3' }}>{pnrCode}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>AIRLINE</span>
                    <div style={{ fontWeight: 800, fontSize: '16px' }}>{item.airline || 'IndiGo'} ({item.flightNo || '6E-2041'})</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>PASSENGER</div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>{passengerName || 'Valued Guest'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>SEAT</div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#FF4F17' }}>{selectedSeat}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>STATUS</div>
                    <div style={{ fontWeight: 800, fontSize: '14px', color: '#22C55E' }}>CONFIRMED</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', background: '#FFFFFF', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 800 }}>{searchParams?.fromCity?.city || 'Delhi'}</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>{item.depTime || '06:00 AM'}</div>
                  </div>
                  <div style={{ alignSelf: 'center', fontSize: '12px', fontWeight: 700, color: '#2276E3' }}>
                    ✈ 2h 15m ➔
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '18px', fontWeight: 800 }}>{searchParams?.toCity?.city || 'Mumbai'}</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>{item.arrTime || '08:15 AM'}</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => window.print()}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid #CBD5E1',
                    background: '#FFFFFF',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Printer size={16} /> Print e-Ticket
                </button>
                <button
                  onClick={onClose}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'var(--primary-orange-gradient)',
                    color: 'white',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Back to Homepage
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
