import React, { useState } from 'react';
import { OFFERS } from '../data/mockData';
import { Sparkles, ArrowRight, ShieldCheck, Tag, Gift } from 'lucide-react';

export default function OffersSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Flights', 'Hotels', 'Trains', 'Cabs'];

  const filteredOffers = activeCategory === 'All'
    ? OFFERS
    : OFFERS.filter((o) => o.category === activeCategory);

  return (
    <section className="section-wrapper" style={{ marginTop: '50px' }}>
      <div className="section-header">
        <div>
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Gift color="#FF4F17" size={26} /> Exclusive Travel Deals & Offers
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
            Handpicked bank discounts, instant cashback & special fares for your next getaway
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '9px 20px',
              borderRadius: '24px',
              border: activeCategory === cat ? '1.5px solid #2276E3' : '1px solid #E2E8F0',
              background: activeCategory === cat ? '#EBF3FE' : '#FFFFFF',
              color: activeCategory === cat ? '#2276E3' : '#1E293B',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '13px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: activeCategory === cat ? '0 2px 8px rgba(34,118,227,0.15)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {cat} Deals
          </button>
        ))}
      </div>

      {/* Offers Grid */}
      <div className="offers-grid">
        {filteredOffers.map((off) => (
          <div key={off.id} className="offer-card" style={{ borderLeft: `4px solid ${off.tagColor || '#FF4F17'}` }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span 
                  style={{ 
                    background: off.tagColor || '#FF4F17', 
                    color: 'white', 
                    fontSize: '10px', 
                    fontWeight: 800, 
                    padding: '3px 8px', 
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  {off.badge}
                </span>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Valid till {off.validTill}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 800, color: '#0F172A', lineHeight: 1.3 }}>
                {off.title}
              </h3>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#2276E3', marginTop: '4px' }}>
                {off.subTitle}
              </div>
              <p style={{ fontSize: '12px', color: '#64748B', margin: '10px 0 18px 0', lineHeight: 1.5 }}>
                {off.discountText}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={16} /> Instant Savings
              </span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                  background: 'var(--accent-blue-light)',
                  border: '1px solid var(--accent-blue-border)',
                  color: 'var(--accent-blue)',
                  fontWeight: 800,
                  fontSize: '12px',
                  padding: '8px 14px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                BOOK & SAVE <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
