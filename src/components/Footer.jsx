import React from 'react';
import { Plane, ShieldCheck, Headphones, RefreshCw } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#0F172A', color: '#94A3B8', padding: '60px 20px 30px 20px', marginTop: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Why Choose Us */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', paddingBottom: '40px', borderBottom: '1px solid #1E293B' }}>
          <div style={{ display: 'flex', gap: '14px' }}>
            <RefreshCw size={28} color="#FF4F17" />
            <div>
              <h4 style={{ color: '#F8FAFC', fontWeight: 800, fontSize: '15px' }}>Instant Refund</h4>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>Get 100% instant refunds into your bank account on cancellations.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '14px' }}>
            <ShieldCheck size={28} color="#2276E3" />
            <div>
              <h4 style={{ color: '#F8FAFC', fontWeight: 800, fontSize: '15px' }}>Price Drop Protection</h4>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>If ticket price drops after booking, we refund the difference automatically.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '14px' }}>
            <Headphones size={28} color="#22C55E" />
            <div>
              <h4 style={{ color: '#F8FAFC', fontWeight: 800, fontSize: '15px' }}>24x7 Customer Support</h4>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>Round-the-clock helpline assistance for smooth booking and travel.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px', margin: '40px 0' }}>
          <div>
            <h4 style={{ color: '#F8FAFC', fontWeight: 800, fontSize: '14px', marginBottom: '12px' }}>OUR PRODUCTS</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <a href="#flights" style={{ color: '#CBD5E1', textDecoration: 'none' }}>Domestic Flights</a>
              <a href="#hotels" style={{ color: '#CBD5E1', textDecoration: 'none' }}>International Flights</a>
              <a href="#trains" style={{ color: '#CBD5E1', textDecoration: 'none' }}>IRCTC Train Tickets</a>
              <a href="#cabs" style={{ color: '#CBD5E1', textDecoration: 'none' }}>Outstation Cabs</a>
            </div>
          </div>
          <div>
            <h4 style={{ color: '#F8FAFC', fontWeight: 800, fontSize: '14px', marginBottom: '12px' }}>ABOUT WANDERLUX</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <a href="#about" style={{ color: '#CBD5E1', textDecoration: 'none' }}>About Us</a>
              <a href="#careers" style={{ color: '#CBD5E1', textDecoration: 'none' }}>Careers</a>
              <a href="#press" style={{ color: '#CBD5E1', textDecoration: 'none' }}>Press & Media</a>
              <a href="#investors" style={{ color: '#CBD5E1', textDecoration: 'none' }}>Investor Relations</a>
            </div>
          </div>
          <div>
            <h4 style={{ color: '#F8FAFC', fontWeight: 800, fontSize: '14px', marginBottom: '12px' }}>TRAVEL ESSENTIALS</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <a href="#pnraction" style={{ color: '#CBD5E1', textDecoration: 'none' }}>PNR Status Check</a>
              <a href="#flightstatus" style={{ color: '#CBD5E1', textDecoration: 'none' }}>Live Flight Tracker</a>
              <a href="#gopass" style={{ color: '#CBD5E1', textDecoration: 'none' }}>Student goPass</a>
              <a href="#gst" style={{ color: '#CBD5E1', textDecoration: 'none' }}>Business GST Invoicing</a>
            </div>
          </div>
          <div>
            <h4 style={{ color: '#F8FAFC', fontWeight: 800, fontSize: '14px', marginBottom: '12px' }}>PAYMENT PARTNERS</h4>
            <div style={{ fontSize: '12px', color: '#94A3B8', lineHeight: 1.6 }}>
              UPI • Visa • MasterCard • RuPay • NetBanking • PayPal • EMI Options Available
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #1E293B', fontSize: '12px', color: '#64748B' }}>
          © 2026 ibibo Group Private Limited. All Rights Reserved. Travel Booking Website Inspired by Goibibo.
        </div>
      </div>
    </footer>
  );
}
