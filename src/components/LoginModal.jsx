import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ChevronDown, 
  CheckCircle2, 
  Lock, 
  UserCheck, 
  UserPlus, 
  Mail, 
  Phone, 
  User, 
  Sparkles, 
  Plane, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  ShieldCheck,
  Gift
} from 'lucide-react';

const COUNTRY_CODES = [
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+1', flag: '🇺🇸', name: 'USA/Canada' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
];

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' | 'email'
  const [loginStep, setLoginStep] = useState('input'); // 'input' | 'otp'
  
  // Phone OTP state
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [loginPhone, setLoginPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Email login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [claimBonus, setClaimBonus] = useState(true);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successInfo, setSuccessInfo] = useState(null);
  const [resetSentNotice, setResetSentNotice] = useState(false);

  const otpInputsRef = useRef([]);

  // Countdown timer for OTP
  useEffect(() => {
    let timer;
    if (loginStep === 'otp' && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [loginStep, resendTimer]);

  if (!isOpen) return null;

  // Validation helpers
  const isPhoneValid = loginPhone.replace(/\D/g, '').length === 10;
  const isSignupValid = 
    signupName.trim().length >= 2 && 
    signupEmail.includes('@') && 
    signupEmail.includes('.') && 
    signupPhone.replace(/\D/g, '').length === 10 &&
    signupPassword.length >= 6;

  // Password Strength Calculator
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: '#E2E8F0' };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: '#EF4444' };
    if (score <= 2) return { score: 2, label: 'Medium', color: '#F59E0B' };
    return { score: 3, label: 'Strong', color: '#10B981' };
  };

  const strength = getPasswordStrength(signupPassword);

  const triggerSuccess = (userData) => {
    setSuccessInfo(userData);
    setIsLoading(false);
    setTimeout(() => {
      onLoginSuccess(userData);
      onClose();
      resetForm();
    }, 800);
  };

  // OTP handlers
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!isPhoneValid) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLoginStep('otp');
      setResendTimer(30);
      setCanResend(false);
      setTimeout(() => {
        if (otpInputsRef.current[0]) otpInputsRef.current[0].focus();
      }, 100);
    }, 400);
  };

  const handleOtpChange = (index, value) => {
    const cleaned = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = cleaned.slice(-1);
    setOtp(newOtp);

    if (cleaned && index < 3) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim().replace(/\D/g, '').slice(0, 4);
    if (pasted) {
      const newOtp = ['', '', '', ''];
      for (let i = 0; i < pasted.length; i++) {
        newOtp[i] = pasted[i];
      }
      setOtp(newOtp);
      const focusIndex = Math.min(pasted.length, 3);
      otpInputsRef.current[focusIndex]?.focus();
    }
  };

  const handleFillDemoOtp = () => {
    setOtp(['1', '2', '3', '4']);
    setErrorMessage('');
    setTimeout(() => {
      otpInputsRef.current[3]?.focus();
    }, 50);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 4) {
      setErrorMessage('Please enter all 4 digits of the OTP.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      if (code === '1234' || code.length === 4) {
        triggerSuccess({
          name: `Traveler (${loginPhone.slice(-4)})`,
          phone: `${selectedCountry.code} ${loginPhone}`,
          email: `traveler_${loginPhone.slice(-4)}@wanderlux.com`,
          isLoggedIn: true
        });
      } else {
        setIsLoading(false);
        setErrorMessage('Invalid verification code. Use demo code 1234.');
      }
    }, 500);
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    setCanResend(false);
    setResendTimer(30);
    setErrorMessage('');
    setOtp(['', '', '', '']);
    setTimeout(() => {
      otpInputsRef.current[0]?.focus();
    }, 50);
  };

  // Email login
  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setErrorMessage('Please fill in both your email and password.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      triggerSuccess({
        name: loginEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: loginEmail,
        phone: '+91 9876543210',
        isLoggedIn: true
      });
    }, 500);
  };

  const handleFillDemoEmail = () => {
    setLoginEmail('indrajit.gupta@wanderlux.com');
    setLoginPassword('Traveler2026!');
    setErrorMessage('');
  };

  // Google 1-Click Login
  const handleGoogleLogin = () => {
    setIsLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      triggerSuccess({
        name: 'Indrajit Gupta',
        email: 'indrajit.gupta@gmail.com',
        phone: '+91 9876543210',
        isLoggedIn: true
      });
    }, 600);
  };

  // Signup Submit
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!isSignupValid) {
      setErrorMessage('Please complete all fields with valid information (Password min 6 chars).');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      triggerSuccess({
        name: signupName.trim(),
        email: signupEmail.trim(),
        phone: `${selectedCountry.code} ${signupPhone.replace(/\D/g, '')}`,
        isLoggedIn: true
      });
    }, 600);
  };

  const resetForm = () => {
    setAuthMode('login');
    setLoginMethod('phone');
    setLoginStep('input');
    setLoginPhone('');
    setOtp(['', '', '', '']);
    setLoginEmail('');
    setLoginPassword('');
    setSignupName('');
    setSignupEmail('');
    setSignupPhone('');
    setSignupPassword('');
    setErrorMessage('');
    setSuccessInfo(null);
    setResetSentNotice(false);
    setIsLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="auth-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={18} />
        </button>

        {/* Header Visual Banner */}
        <div className="auth-banner">
          <div className="auth-banner-badge">
            <Sparkles size={12} /> Wanderlux Privileges
          </div>
          <h2 className="auth-banner-title">
            {authMode === 'login' ? 'Welcome Back!' : 'Unlock Exclusive Privileges'}
          </h2>
          <p className="auth-banner-sub">
            {authMode === 'login' 
              ? 'Access member rates, manage your bookings & fast-track checkouts.' 
              : 'Join over 1M+ travelers and get instant VIP flight & hotel benefits.'}
          </p>
          <div className="auth-banner-perk">
            <Gift size={15} color="#FF7832" />
            <span><strong>Flat ₹800 OFF</strong> on your first booking + 500 LuxCoins</span>
          </div>
        </div>

        {/* Success Screen */}
        {successInfo ? (
          <div className="auth-body-container auth-success-screen">
            <div className="auth-success-icon-wrap">
              <CheckCircle2 size={40} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>
              Welcome, {successInfo.name}!
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
              You are signed in successfully. Taking you to your travel plans...
            </p>
            <div className="auth-spinner" style={{ margin: '0 auto', borderColor: 'rgba(34, 118, 227, 0.2)', borderTopColor: 'var(--accent-blue)' }} />
          </div>
        ) : (
          <div className="auth-body-container">
            {/* Top Switcher Tabs */}
            <div className="auth-tabs-nav">
              <button
                type="button"
                className={`auth-tab-item ${authMode === 'login' ? 'active' : ''}`}
                onClick={() => { setAuthMode('login'); setLoginStep('input'); setErrorMessage(''); }}
              >
                <UserCheck size={16} /> Sign In
              </button>
              <button
                type="button"
                className={`auth-tab-item ${authMode === 'signup' ? 'active' : ''}`}
                onClick={() => { setAuthMode('signup'); setErrorMessage(''); }}
              >
                <UserPlus size={16} /> Create Account
              </button>
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div className="auth-error-box">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* ======================================================== */}
            {/* SIGN IN FLOW                                             */}
            {/* ======================================================== */}
            {authMode === 'login' && (
              <>
                {/* Switch between Phone and Email login */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '18px' }}>
                  <button
                    type="button"
                    onClick={() => { setLoginMethod('phone'); setLoginStep('input'); setErrorMessage(''); }}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: loginMethod === 'phone' ? 'var(--accent-blue)' : '#94A3B8',
                      cursor: 'pointer',
                      borderBottom: loginMethod === 'phone' ? '2px solid var(--accent-blue)' : '2px solid transparent',
                      paddingBottom: '4px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Mobile Number (OTP)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLoginMethod('email'); setErrorMessage(''); }}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: loginMethod === 'email' ? 'var(--accent-blue)' : '#94A3B8',
                      cursor: 'pointer',
                      borderBottom: loginMethod === 'email' ? '2px solid var(--accent-blue)' : '2px solid transparent',
                      paddingBottom: '4px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Email & Password
                  </button>
                </div>

                {/* 1A. PHONE LOGIN -> INPUT STEP */}
                {loginMethod === 'phone' && loginStep === 'input' && (
                  <form onSubmit={handleSendOtp}>
                    <div className="auth-form-field">
                      <label className="auth-field-label">
                        <span>Mobile Number</span>
                        <span style={{ fontSize: '11px', color: '#94A3B8' }}>SMS Verification</span>
                      </label>
                      <div className="auth-phone-container">
                        <select
                          className="auth-country-select-btn"
                          value={selectedCountry.code}
                          onChange={(e) => {
                            const found = COUNTRY_CODES.find(c => c.code === e.target.value);
                            if (found) setSelectedCountry(found);
                          }}
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          className="auth-phone-input"
                          placeholder="10-digit mobile number"
                          maxLength={10}
                          value={loginPhone}
                          onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, ''))}
                          autoFocus
                        />
                        {isPhoneValid && (
                          <div style={{ display: 'flex', alignItems: 'center', paddingRight: '12px', color: '#16A34A' }}>
                            <CheckCircle2 size={18} />
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="auth-primary-btn"
                      disabled={!isPhoneValid || isLoading}
                    >
                      {isLoading ? (
                        <div className="auth-spinner" />
                      ) : (
                        <>
                          <span>Get Verification Code</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* 1B. PHONE LOGIN -> OTP STEP */}
                {loginMethod === 'phone' && loginStep === 'otp' && (
                  <form onSubmit={handleVerifyOtp}>
                    <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                      <p style={{ fontSize: '13px', color: '#64748B' }}>
                        Enter 4-digit code sent to <strong>{selectedCountry.code} {loginPhone}</strong>
                      </p>
                      <button
                        type="button"
                        onClick={() => { setLoginStep('input'); setErrorMessage(''); }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--accent-blue)',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          marginTop: '4px'
                        }}
                      >
                        Change Mobile Number
                      </button>
                    </div>

                    {/* 4 Digit OTP Tiles */}
                    <div className="auth-otp-row" onPaste={handleOtpPaste}>
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => (otpInputsRef.current[idx] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className={`auth-otp-tile ${digit ? 'filled' : ''}`}
                        />
                      ))}
                    </div>

                    {/* Resend & Demo Chip */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '14px 0 18px 0' }}>
                      <button
                        type="button"
                        onClick={handleFillDemoOtp}
                        className="auth-demo-chip"
                        title="Click to auto-fill test OTP"
                      >
                        ✨ Demo Code: 1234
                      </button>

                      <div>
                        {canResend ? (
                          <button
                            type="button"
                            onClick={handleResendOtp}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--accent-blue)',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            Resend OTP
                          </button>
                        ) : (
                          <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>
                            Resend in <strong>{resendTimer}s</strong>
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="auth-primary-btn"
                      disabled={otp.join('').length < 4 || isLoading}
                    >
                      {isLoading ? (
                        <div className="auth-spinner" />
                      ) : (
                        <>
                          <ShieldCheck size={18} />
                          <span>Verify & Sign In</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* 2. EMAIL & PASSWORD LOGIN */}
                {loginMethod === 'email' && (
                  <form onSubmit={handleEmailLogin}>
                    <div className="auth-form-field">
                      <label className="auth-field-label">Email Address</label>
                      <div className="auth-input-wrapper">
                        <span className="auth-input-icon"><Mail size={16} /></span>
                        <input
                          type="email"
                          className="auth-input-element"
                          placeholder="name@example.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="auth-form-field">
                      <div className="auth-field-label">
                        <span>Password</span>
                        <button
                          type="button"
                          onClick={() => setResetSentNotice(true)}
                          style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="auth-input-wrapper">
                        <span className="auth-input-icon"><Lock size={16} /></span>
                        <input
                          type={showLoginPassword ? 'text' : 'password'}
                          className="auth-input-element"
                          placeholder="Enter your password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="auth-input-action-btn"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                        >
                          {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    {resetSentNotice && (
                      <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', fontSize: '12px', padding: '8px 12px', borderRadius: '8px', marginBottom: '12px' }}>
                        ✓ Password reset link has been dispatched to your email!
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '8px' }}>
                      <button
                        type="button"
                        onClick={handleFillDemoEmail}
                        className="auth-demo-chip"
                      >
                        ⚡ Use Demo Account
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="auth-primary-btn"
                      disabled={!loginEmail || !loginPassword || isLoading}
                    >
                      {isLoading ? <div className="auth-spinner" /> : <span>Sign In</span>}
                    </button>
                  </form>
                )}

                {/* Social Login Options */}
                <div className="auth-divider">or continue with</div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="auth-google-btn"
                  disabled={isLoading}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </>
            )}

            {/* ======================================================== */}
            {/* SIGN UP FLOW                                             */}
            {/* ======================================================== */}
            {authMode === 'signup' && (
              <form onSubmit={handleSignupSubmit}>
                {/* Full Name */}
                <div className="auth-form-field">
                  <label className="auth-field-label">Full Name</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon"><User size={16} /></span>
                    <input
                      type="text"
                      className="auth-input-element"
                      placeholder="e.g. Indrajit Gupta"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="auth-form-field">
                  <label className="auth-field-label">Email Address</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon"><Mail size={16} /></span>
                    <input
                      type="email"
                      className="auth-input-element"
                      placeholder="name@example.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="auth-form-field">
                  <label className="auth-field-label">Mobile Number</label>
                  <div className="auth-phone-container">
                    <select
                      className="auth-country-select-btn"
                      value={selectedCountry.code}
                      onChange={(e) => {
                        const found = COUNTRY_CODES.find(c => c.code === e.target.value);
                        if (found) setSelectedCountry(found);
                      }}
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      className="auth-phone-input"
                      placeholder="10-digit mobile"
                      maxLength={10}
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value.replace(/\D/g, ''))}
                      required
                    />
                  </div>
                </div>

                {/* Password & Strength Meter */}
                <div className="auth-form-field">
                  <label className="auth-field-label">Create Password</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon"><Lock size={16} /></span>
                    <input
                      type={showSignupPassword ? 'text' : 'password'}
                      className="auth-input-element"
                      placeholder="Minimum 6 characters"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="auth-input-action-btn"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                    >
                      {showSignupPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  {signupPassword && (
                    <div className="auth-strength-container">
                      <div className="auth-strength-bar" style={{ background: strength.score >= 1 ? strength.color : '#E2E8F0' }} />
                      <div className="auth-strength-bar" style={{ background: strength.score >= 2 ? strength.color : '#E2E8F0' }} />
                      <div className="auth-strength-bar" style={{ background: strength.score >= 3 ? strength.color : '#E2E8F0' }} />
                      <span className="auth-strength-label" style={{ color: strength.color }}>
                        {strength.label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bonus Checkbox */}
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '14px 0 10px 0', fontSize: '12px', color: '#334155', cursor: 'pointer', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={claimBonus}
                    onChange={(e) => setClaimBonus(e.target.checked)}
                    style={{ accentColor: 'var(--primary-orange)', width: '15px', height: '15px' }}
                  />
                  <span>Claim ₹800 instant voucher & 500 LuxCoins</span>
                </label>

                <button
                  type="submit"
                  className="auth-primary-btn"
                  disabled={!isSignupValid || isLoading}
                >
                  {isLoading ? (
                    <div className="auth-spinner" />
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Create Account & Join</span>
                    </>
                  )}
                </button>

                <div className="auth-divider">or signup with</div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="auth-google-btn"
                  disabled={isLoading}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Sign Up with Google</span>
                </button>
              </form>
            )}

            {/* Legal Disclaimers */}
            <p style={{ marginTop: '18px', textAlign: 'center', fontSize: '11px', color: '#94A3B8', lineHeight: 1.5 }}>
              By continuing, you agree to Wanderlux's{' '}
              <a href="#privacy" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</a>
              {' '}and{' '}
              <a href="#terms" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}>Terms of Service</a>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
