import React, { useState } from 'react';
import { 
  Plane, 
  Building2, 
  Train, 
  Car, 
  Bus, 
  Palmtree, 
  Briefcase, 
  User, 
  LogOut, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onGoHome,
  user, 
  onOpenLogin, 
  onLogout, 
  onOpenMyTrips, 
  tripsCount 
}) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Building2 },
    { id: 'trains', label: 'Trains', icon: Train },
    { id: 'cabs', label: 'Cabs', icon: Car },
    { id: 'bus', label: 'Bus', icon: Bus },
    { id: 'holidays', label: 'Holidays', icon: Palmtree },
  ];

  const handleLogoClick = () => {
    setActiveTab('flights');
    if (onGoHome) onGoHome();
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Wanderlux Brand Logo */}
        <div className="brand-logo" onClick={handleLogoClick} title="Go to Homepage">
          <div className="brand-icon">
            <Plane size={24} style={{ transform: 'rotate(-25deg)' }} />
          </div>
          <span>
            <span className="brand-name-wander">wander</span>
            <span className="brand-name-lux">lux</span>
          </span>
        </div>

        {/* Central Nav Tabs */}
        <nav className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-tab ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={18} className="tab-icon" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Utilities */}
        <div className="nav-utilities">
          <button className="btn-my-trips" onClick={onOpenMyTrips}>
            <Briefcase size={16} />
            <span>Manage Booking / My Trips</span>
            {tripsCount > 0 && <span className="badge-count">{tripsCount}</span>}
          </button>

          {user ? (
            <div 
              className="user-profile-badge" 
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            >
              <div className="avatar-circle">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.name ? user.name.split(' ')[0] : user.phone}
              </span>

              {showUserDropdown && (
                <div className="popover-dropdown" style={{ width: '190px', right: 0, top: '45px' }}>
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid #E2E8F0' }}>
                    <div style={{ fontWeight: 700, fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user.name || 'User'}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user.phone || user.email}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenMyTrips();
                      setShowUserDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      color: '#1E293B'
                    }}
                  >
                    <Briefcase size={14} /> My Bookings
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLogout();
                      setShowUserDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      color: '#E11D48'
                    }}
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn-login" onClick={onOpenLogin}>
              <User size={16} />
              <span>Login / Signup</span>
            </button>
          )}

          {/* Mobile menu trigger */}
          <button 
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
