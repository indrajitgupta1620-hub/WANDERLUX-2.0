import React, { useState } from 'react';
import { X, ChevronDown, CheckCircle, Lock, UserCheck, UserPlus, Mail, Phone, User } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [loginStep, setLoginStep] = useState('phone'); // 'phone' | 'otp'
  
  // Login fields
  const [loginPhone, setLoginPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState('');

  // Signup fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupError, setSignupError] = useState('');

  if (!isOpen) return null;

  const isLoginPhoneValid = loginPhone.length === 10 && /^\d+$/.test(loginPhone);
  const isSignupValid = signupName.trim().length >= 2 && signupEmail.includes('@') && signupPhone.length === 10;

  // Handle Login Step 1 -> Send OTP
  const handleSendLoginOtp = (e) => {
    e.preventDefault();
    if (isLoginPhoneValid) {
      setOtpError('');
      setLoginStep('otp');
    }
  };

  // Handle OTP digit change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.charAt(value.length - 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = document.getElementById(`login-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Verify OTP and complete Login (No extra fields needed for Login!)
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code === '1234' || code.length === 4) {
      const userData = {
        name: `Traveler (${loginPhone.slice(-4)})`,
        phone: loginPhone,
        email: `user_${loginPhone}@wanderlux.com`,
        isLoggedIn: true
      };
      onLoginSuccess(userData);
      onClose();
      resetForm();
    } else {
      setOtpError('Invalid verification code. Use demo code 1234.');
    }
  };

  const handleFillDemoOtp = () => {
    setOtp(['1', '2', '3', '4']);
    setOtpError('');
  };

  // Handle Signup submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!isSignupValid) {
      setSignupError('Please provide a valid name, email, and 10-digit phone number.');
      return;
    }
    const userData = {
      name: signupName,
      email: signupEmail,
      phone: signupPhone,
      isLoggedIn: true
    };
    onLoginSuccess(userData);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setAuthMode('login');
    setLoginStep('phone');
    setLoginPhone('');
    setOtp(['', '', '', '']);
    setOtpError('');
    setSignupName('');
    setSignupEmail('');
    setSignupPhone('');
    setSignupError('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="login-modal-body">
          {/* Mode Switcher Tabs */}
          <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '14px', padding: '4px', marginBottom: '24px' }}>
            <button
              onClick={() => { setAuthMode('login'); setLoginStep('phone'); }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                background: authMode === 'login' ? '#FFFFFF' : 'transparent',
                color: authMode === 'login' ? 'var(--accent-blue)' : 'var(--text-muted)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: authMode === 'login' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <UserCheck size={16} /> Login
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                background: authMode === 'signup' ? '#FFFFFF' : 'transparent',
                color: authMode === 'signup' ? 'var(--accent-blue)' : 'var(--text-muted)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: authMode === 'signup' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <UserPlus size={16} /> Sign Up
            </button>
          </div>

          {/* LOGIN FLOW (ONLY OTP) */}
          {authMode === 'login' && (
            <>
              {loginStep === 'phone' && (
                <form onSubmit={handleSendLoginOtp}>
                  <h2 className="login-title" style={{ fontSize: '22px', marginBottom: '8px' }}>
                    Welcome Back!
                  </h2>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                    Enter your mobile number to get a 4-digit verification OTP.
                  </p>

                  <div className="input-field-group">
                    <span className="input-floating-label">Mobile Number</span>
                    <div className="phone-input-container">
                      <div className="country-code-select">
                        <span className="flag-icon">🇮🇳</span>
                        <span>+91</span>
                        <ChevronDown size={14} style={{ color: 'var(--accent-blue)' }} />
                      </div>
                      <input
                        type="tel"
                        className="phone-input-field"
                        placeholder="10-digit mobile"
                        maxLength={10}
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`btn-modal-continue ${isLoginPhoneValid ? 'active' : ''}`}
                    disabled={!isLoginPhoneValid}
                  >
                    Get OTP
                  </button>

                  <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Sign Up Now
                    </button>
                  </div>
                </form>
              )}

              {loginStep === 'otp' && (
                <form onSubmit={handleVerifyOtp}>
                  <h2 className="login-title" style={{ fontSize: '22px', marginBottom: '6px' }}>
                    Verify OTP
                  </h2>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                    Enter 4-digit code sent to <strong>+91 {loginPhone}</strong>
                  </p>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', margin: '20px 0' }}>
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`login-otp-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        style={{
                          width: '54px',
                          height: '56px',
                          fontSize: '24px',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          textAlign: 'center',
                          border: '2px solid var(--accent-blue)',
                          borderRadius: '12px',
                          outline: 'none',
                          background: 'var(--accent-blue-light)'
                        }}
                      />
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <button
                      type="button"
                      onClick={handleFillDemoOtp}
                      style={{
                        background: 'var(--accent-blue-light)',
                        color: 'var(--accent-blue)',
                        border: '1px dashed var(--accent-blue)',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      ✨ Demo OTP: 1234
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginStep('phone')}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '12px', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Change Number
                    </button>
                  </div>

                  {otpError && (
                    <div style={{ color: '#E11D48', fontSize: '12px', marginBottom: '12px', fontWeight: 600, textAlign: 'center' }}>
                      {otpError}
                    </div>
                  )}

                  <button type="submit" className="btn-modal-continue active">
                    Verify & Login
                  </button>
                </form>
              )}
            </>
          )}

          {/* SIGNUP FLOW (NAME, EMAIL, PHONE) */}
          {authMode === 'signup' && (
            <form onSubmit={handleSignupSubmit}>
              <h2 className="login-title" style={{ fontSize: '22px', marginBottom: '6px' }}>
                Create Account
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Sign up to unlock member discounts and manage bookings.
              </p>

              {/* Full Name */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px', color: 'var(--text-dark)' }}>
                  <User size={14} color="var(--accent-blue)" /> Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid var(--border-color)',
                    outline: 'none',
                    fontWeight: 600,
                    fontSize: '14px'
                  }}
                  required
                />
              </div>

              {/* Email Address */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px', color: 'var(--text-dark)' }}>
                  <Mail size={14} color="var(--accent-blue)" /> Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid var(--border-color)',
                    outline: 'none',
                    fontWeight: 600,
                    fontSize: '14px'
                  }}
                  required
                />
              </div>

              {/* Phone Number */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px', color: 'var(--text-dark)' }}>
                  <Phone size={14} color="var(--accent-blue)" /> Mobile Phone Number
                </label>
                <div className="phone-input-container" style={{ border: '1.5px solid var(--border-color)' }}>
                  <div className="country-code-select">
                    <span className="flag-icon">🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    className="phone-input-field"
                    placeholder="10-digit mobile"
                    maxLength={10}
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              {signupError && (
                <div style={{ color: '#E11D48', fontSize: '12px', marginBottom: '14px', fontWeight: 600 }}>
                  {signupError}
                </div>
              )}

              <button
                type="submit"
                className={`btn-modal-continue ${isSignupValid ? 'active' : ''}`}
                disabled={!isSignupValid}
              >
                Complete Sign Up
              </button>

              <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Already registered? </span>
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setLoginStep('phone'); }}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', fontWeight: 700, cursor: 'pointer' }}
                >
                  Login Here
                </button>
              </div>
            </form>
          )}

          <p className="terms-disclaimer" style={{ marginTop: '24px' }}>
            By proceeding, you agree to Wanderlux's{' '}
            <a href="#privacy">Privacy Policy</a> & <a href="#terms">Terms of Service</a>
          </p>
        </div>
      </div>
    </div>
  );
}
