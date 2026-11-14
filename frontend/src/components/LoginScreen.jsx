import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  User, 
  Lock, 
  Phone, 
  Printer, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Sparkles,
  School
} from 'lucide-react';
import { DEMO_CREDENTIALS } from '../data/mockData';

export default function LoginScreen({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('ADMIN'); // 'ADMIN' or 'PARENT'
  const [passcode, setPasscode] = useState('AGENCY-2026');
  const [mobile, setMobile] = useState('9876543210');
  const [pin, setPin] = useState('123456');
  const [showPin, setShowPin] = useState(false);
  const [rememberTerminal, setRememberTerminal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Switch tabs & fill matching demo credentials automatically
  const handleTabChange = (role) => {
    setActiveTab(role);
    setErrorMessage('');
    if (role === 'ADMIN') {
      setPasscode(DEMO_CREDENTIALS.admin.passcode);
      setMobile(DEMO_CREDENTIALS.admin.mobile);
      setPin('123456');
    } else {
      setPasscode(DEMO_CREDENTIALS.parent.passcode);
      setMobile(DEMO_CREDENTIALS.parent.mobile);
      setPin('123456');
    }
  };

  const handleQuickFill = (role) => {
    handleTabChange(role);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!passcode.trim()) {
      setErrorMessage(
        activeTab === 'ADMIN' 
          ? 'Please enter School / Agency Passcode' 
          : 'Please enter Student Admission Passcode'
      );
      return;
    }

    if (!mobile.trim() || mobile.length < 10) {
      setErrorMessage('Please enter a valid 10-digit primary contact mobile number');
      return;
    }

    setIsLoading(true);

    // Simulate authentication check
    setTimeout(() => {
      setIsLoading(false);
      const userProfile = activeTab === 'ADMIN' 
        ? DEMO_CREDENTIALS.admin 
        : DEMO_CREDENTIALS.parent;
      
      onLoginSuccess({
        role: activeTab,
        passcode,
        mobile,
        profile: userProfile,
        token: `JWT_DEMO_${Date.now()}`
      });
    }, 600);
  };

  return (
    <div style={styles.container}>
      {/* Background Decorative Rings */}
      <div style={styles.bgBlob1} />
      <div style={styles.bgBlob2} />

      {/* Main Login Card */}
      <div style={styles.card} className="animate-fade-in">
        
        {/* Header / Logo */}
        <div style={styles.header}>
          <div style={styles.logoBadge}>
            <div style={styles.logoIconInner}>
              <CreditCard size={28} color="#ffffff" strokeWidth={2.2} />
              <Printer size={16} color="#38bdf8" style={styles.printerMiniIcon} />
            </div>
          </div>
          <h1 style={styles.appTitle}>Multi-School ID Studio</h1>
          <p style={styles.appSubtitle}>Enterprise Student Identity & Batch Print</p>
          <div style={styles.trustBadge}>
            <ShieldCheck size={14} color="#16a34a" />
            <span>256-Bit SSL Secure Terminal &bull; Multi-Tenant Architecture</span>
          </div>
        </div>

        {/* Role Selection Tabs */}
        <div style={styles.tabContainer}>
          <button
            type="button"
            onClick={() => handleTabChange('ADMIN')}
            style={{
              ...styles.tabButton,
              ...(activeTab === 'ADMIN' ? styles.tabButtonActive : styles.tabButtonInactive)
            }}
          >
            <Building2 size={18} />
            <span>Admin / Agency Login</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('PARENT')}
            style={{
              ...styles.tabButton,
              ...(activeTab === 'PARENT' ? styles.tabButtonActive : styles.tabButtonInactive)
            }}
          >
            <User size={18} />
            <span>Parent Login</span>
          </button>
        </div>

        {/* Role Description Note */}
        <div style={styles.infoBox}>
          <p style={styles.infoText}>
            {activeTab === 'ADMIN' 
              ? 'Administrator Mode: Manage schools, register students, configure templates, and trigger high-speed batch printing.' 
              : 'Parent Portal Mode: Securely inspect your child\'s ID card details and submit correction requests before printing.'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div style={styles.errorAlert}>
            <span>⚠️ {errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* Field 1: Passcode */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              <span>{activeTab === 'ADMIN' ? 'School / Agency Passcode' : 'Student Admission Passcode'}</span>
              <span style={styles.requiredStar}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <div style={styles.inputIconLeft}>
                <Building2 size={18} color="#64748b" />
              </div>
              <input
                type="text"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder={activeTab === 'ADMIN' ? 'e.g. AGENCY-2026' : 'e.g. PAR-5501'}
                style={styles.input}
                required
              />
            </div>
            <span style={styles.fieldSubtext}>
              {activeTab === 'ADMIN' ? 'Unique agency or campus access identifier' : 'Student admission or reference code'}
            </span>
          </div>

          {/* Field 2: Primary Contact Mobile */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              <span>Primary Contact Mobile</span>
              <span style={styles.requiredStar}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <div style={styles.inputIconLeft}>
                <Phone size={18} color="#64748b" />
              </div>
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                placeholder="10-digit mobile number"
                style={styles.input}
                required
              />
            </div>
            <span style={styles.fieldSubtext}>Authorized primary phone number</span>
          </div>

          {/* Field 3: Security PIN */}
          <div style={styles.fieldGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={styles.label}>
                <span>Security PIN / Terminal Code</span>
                <span style={styles.requiredStar}>*</span>
              </label>
              <span style={styles.demoPinNotice}>Demo PIN: 123456</span>
            </div>
            <div style={styles.inputWrapper}>
              <div style={styles.inputIconLeft}>
                <Lock size={18} color="#64748b" />
              </div>
              <input
                type={showPin ? 'text' : 'password'}
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="6-digit PIN"
                style={styles.input}
                required
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                style={styles.eyeButton}
                title={showPin ? "Hide PIN" : "Show PIN"}
              >
                {showPin ? <EyeOff size={18} color="#64748b" /> : <Eye size={18} color="#64748b" />}
              </button>
            </div>
          </div>

          {/* Remember Terminal Checkbox */}
          <div style={styles.checkboxRow}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberTerminal}
                onChange={(e) => setRememberTerminal(e.target.checked)}
                style={styles.checkbox}
              />
              <span>Remember this authorized terminal</span>
            </label>
            <span style={styles.sessionType}>Multi-Session Auth</span>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.submitButton,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? (
              <span>Authenticating Secure Terminal...</span>
            ) : (
              <>
                <span>
                  {activeTab === 'ADMIN' ? 'Continue to School Selection' : 'Access Parent Portal'}
                </span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* 1-Click Quick Demo Fill Buttons */}
        <div style={styles.quickFillSection}>
          <div style={styles.quickFillHeader}>
            <Sparkles size={14} color="#d97706" />
            <span>1-Click Test Credentials (Quick Fill):</span>
          </div>
          <div style={styles.quickFillChips}>
            <button
              type="button"
              onClick={() => handleQuickFill('ADMIN')}
              style={{
                ...styles.chipButton,
                borderColor: activeTab === 'ADMIN' ? '#2563eb' : '#cbd5e1',
                backgroundColor: activeTab === 'ADMIN' ? '#eff6ff' : '#f8fafc'
              }}
            >
              <Building2 size={14} color="#1d4ed8" />
              <span>Admin Demo (AGENCY-2026)</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('PARENT')}
              style={{
                ...styles.chipButton,
                borderColor: activeTab === 'PARENT' ? '#0d9488' : '#cbd5e1',
                backgroundColor: activeTab === 'PARENT' ? '#f0fdfa' : '#f8fafc'
              }}
            >
              <User size={14} color="#0f766e" />
              <span>Parent Demo (PAR-5501)</span>
            </button>
          </div>
        </div>

        {/* Footer specs */}
        <div style={styles.footerSpecs}>
          <div style={styles.specItem}>
            <School size={13} color="#64748b" />
            <span>Scale: 5,000+ Cards / School</span>
          </div>
          <span style={styles.dot}>&bull;</span>
          <div style={styles.specItem}>
            <Printer size={13} color="#64748b" />
            <span>PVC & A4 Print Engines</span>
          </div>
          <span style={styles.dot}>&bull;</span>
          <div style={styles.specItem}>
            <CheckCircle2 size={13} color="#16a34a" />
            <span>v2.4 Enterprise</span>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #09122C 0%, #172554 45%, #1E3A8A 100%)',
    padding: '24px 16px',
    position: 'relative',
    overflow: 'hidden'
  },
  bgBlob1: {
    position: 'absolute',
    top: '-10%',
    left: '-5%',
    width: '450px',
    height: '450px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(30, 58, 138, 0) 70%)',
    filter: 'blur(40px)',
    pointerEvents: 'none'
  },
  bgBlob2: {
    position: 'absolute',
    bottom: '-12%',
    right: '-5%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, rgba(2, 132, 199, 0) 70%)',
    filter: 'blur(50px)',
    pointerEvents: 'none'
  },
  card: {
    width: '100%',
    maxWidth: '520px',
    background: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    padding: '36px 32px',
    zIndex: 10,
    position: 'relative'
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  logoBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '64px',
    height: '64px',
    borderRadius: '18px',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    boxShadow: '0 8px 16px -2px rgba(37, 99, 235, 0.4)',
    marginBottom: '14px'
  },
  logoIconInner: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  printerMiniIcon: {
    position: 'absolute',
    bottom: '-4px',
    right: '-6px',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))'
  },
  appTitle: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.02em',
    marginBottom: '4px'
  },
  appSubtitle: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#64748b',
    marginBottom: '10px'
  },
  trustBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    borderRadius: '20px',
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    color: '#15803d',
    fontSize: '11px',
    fontWeight: '600'
  },
  tabContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    backgroundColor: '#f1f5f9',
    padding: '6px',
    borderRadius: '12px',
    marginBottom: '14px'
  },
  tabButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  tabButtonActive: {
    backgroundColor: '#ffffff',
    color: '#1e3a8a',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)'
  },
  tabButtonInactive: {
    backgroundColor: 'transparent',
    color: '#64748b'
  },
  infoBox: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '10px 14px',
    marginBottom: '16px'
  },
  infoText: {
    fontSize: '12px',
    lineHeight: '1.5',
    color: '#475569'
  },
  errorAlert: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    padding: '10px 12px',
    color: '#b91c1c',
    fontSize: '12px',
    fontWeight: '500',
    marginBottom: '16px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#334155'
  },
  requiredStar: {
    color: '#ef4444',
    marginLeft: '3px'
  },
  demoPinNotice: {
    fontSize: '11px',
    color: '#2563eb',
    fontWeight: '600'
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  inputIconLeft: {
    position: 'absolute',
    left: '12px',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    padding: '11px 12px 11px 40px',
    fontSize: '14px',
    borderRadius: '10px',
    border: '1.5px solid #cbd5e1',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s'
  },
  eyeButton: {
    position: 'absolute',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },
  fieldSubtext: {
    fontSize: '11px',
    color: '#64748b',
    marginTop: '2px'
  },
  checkboxRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2px 0'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: '#475569',
    cursor: 'pointer'
  },
  checkbox: {
    accentColor: '#1e3a8a',
    cursor: 'pointer'
  },
  sessionType: {
    fontSize: '11px',
    color: '#94a3b8',
    fontWeight: '500'
  },
  submitButton: {
    marginTop: '8px',
    backgroundColor: '#1e3a8a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    padding: '13px 20px',
    fontSize: '14px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.35)',
    transition: 'all 0.2s ease'
  },
  quickFillSection: {
    marginTop: '20px',
    paddingTop: '16px',
    borderTop: '1px dashed #e2e8f0'
  },
  quickFillHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    fontWeight: '600',
    color: '#64748b',
    marginBottom: '8px'
  },
  quickFillChips: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  chipButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 10px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '11px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  footerSpecs: {
    marginTop: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontSize: '11px',
    color: '#64748b'
  },
  specItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  dot: {
    color: '#cbd5e1'
  }
};
