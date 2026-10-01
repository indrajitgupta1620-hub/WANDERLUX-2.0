import React, { useState } from 'react';
import { TRENDING_DESTINATIONS } from '../data/mockData';
import { Compass, MapPin, Plane, ArrowRight } from 'lucide-react';

export default function TrendingDestinations({ onSelectDestination }) {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Beaches', 'Mountains', 'International', 'Heritage'];

  const filteredDestinations = activeTab === 'All'
    ? TRENDING_DESTINATIONS
    : TRENDING_DESTINATIONS.filter((d) => d.category === activeTab || (activeTab === 'Popular' && d.category === 'Popular'));

  return (
    <section className="section-wrapper" style={{ marginTop: '50px', marginBottom: '60px' }}>
      <div className="section-header">
        <div>
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass color="#FF4F17" size={26} /> Trending Travel Destinations
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
            Explore top rated holiday getaways with the lowest flight & hotel rates
          </p>
        </div>
      </div>

      {/* Destination Category Pills */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            style={{
              padding: '9px 20px',
              borderRadius: '24px',
              border: activeTab === cat ? '1.5px solid #FF4F17' : '1px solid #E2E8F0',
              background: activeTab === cat ? '#FFF5F2' : '#FFFFFF',
              color: activeTab === cat ? '#FF4F17' : '#1E293B',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '13px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: activeTab === cat ? '0 2px 8px rgba(255,79,23,0.15)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {cat} Getaways
          </button>
        ))}
      </div>

      {/* Destinations Cards Grid */}
      <div className="destinations-grid">
        {filteredDestinations.map((dest) => (
          <div 
            key={dest.id} 
            className="dest-card"
            onClick={() => onSelectDestination(dest)}
          >
            <img src={dest.image} alt={dest.name} className="dest-image" />
            <div className="dest-overlay">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#FDBA74', letterSpacing: '0.5px' }}>
                  FLIGHTS FROM
                </span>
                <span style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', color: 'white', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>
                  {dest.category}
                </span>
              </div>
              <div className="dest-price" style={{ fontSize: '18px', fontWeight: 800 }}>{dest.price}</div>
              <h3 className="dest-name" style={{ marginTop: '2px' }}>{dest.name}</h3>
              <div style={{ fontSize: '12px', color: '#E2E8F0', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={13} color="#FDBA74" /> {dest.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
