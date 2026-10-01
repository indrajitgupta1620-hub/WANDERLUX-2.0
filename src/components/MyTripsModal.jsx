import React from 'react';
import { X, Briefcase, Ticket, Trash2, Calendar, CheckCircle2, MapPin } from 'lucide-react';

export default function MyTripsModal({ isOpen, onClose, trips, onCancelBooking }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Briefcase size={24} color="#2276E3" />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800 }}>
              My Trips & Bookings
            </h2>
          </div>

          {trips.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', background: '#F8FAFC', borderRadius: '16px' }}>
              <Ticket size={48} color="#94A3B8" style={{ margin: '0 auto 12px auto' }} />
              <h3 style={{ fontSize: '16px', fontWeight: 800 }}>No Bookings Found</h3>
              <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                You haven't booked any trips yet. Search and book flights, hotels or trains to see them here!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {trips.map((tr) => (
                <div 
                  key={tr.pnr} 
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '20px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 700, background: '#EBF3FE', color: '#2276E3', padding: '3px 8px', borderRadius: '6px' }}>
                        PNR: {tr.pnr}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800, marginTop: '6px' }}>
                        {tr.searchParams?.fromCity?.city || 'Delhi'} ➔ {tr.searchParams?.toCity?.city || 'Mumbai'}
                      </h3>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>
                        {tr.item?.airline || 'Goibibo Flight'} ({tr.item?.flightNo || '6E-2041'}) • Seat: {tr.seat}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#22C55E', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={14} /> CONFIRMED
                      </span>
                      <div style={{ fontWeight: 800, fontSize: '18px', marginTop: '6px', color: '#1E293B' }}>
                        ₹{tr.totalPrice?.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>
                      Passenger: <strong>{tr.passengerName}</strong> • Date: {tr.bookingDate}
                    </div>
                    <button
                      onClick={() => onCancelBooking(tr.pnr)}
                      style={{
                        background: '#FFE4E6',
                        color: '#E11D48',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Trash2 size={13} /> Cancel Booking
                    </button>
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
