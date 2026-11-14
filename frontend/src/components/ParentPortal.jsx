import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  LogOut, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Phone, 
  MapPin, 
  Download, 
  Printer, 
  IdCard,
  Building2
} from 'lucide-react';

export default function ParentPortal({ userSession, onLogout }) {
  const [requestSent, setRequestSent] = useState(false);
  const [correctionText, setCorrectionText] = useState('');

  // Sample verified student for the parent
  const student = {
    name: "Aditya Sharma",
    fatherName: "Venkat Rao S.",
    studentClass: "Grade 10 - Section B",
    dob: "14-Aug-2009",
    rollNumber: "DPGA-2026-0842",
    mobile: "9123456789",
    bloodGroup: "O+ Positive",
    address: "Flat 402, Sunshine Heights, Madhapur, Hyderabad - 500081",
    schoolName: "Delhi Public Global Academy",
    schoolAffiliation: "CBSE Affiliated #3630129",
    emergencyContact: "+91 98480 12345",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
  };

  const handleSendCorrection = (e) => {
    e.preventDefault();
    if (!correctionText.trim()) return;
    setRequestSent(true);
    setTimeout(() => {
      setCorrectionText('');
    }, 1000);
  };

  return (
    <div style={styles.container}>
      {/* Top Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.branding}>
            <div style={styles.logoBadge}>
              <IdCard size={20} color="#ffffff" />
            </div>
            <div>
              <h1 style={styles.title}>Multi-School ID Studio</h1>
              <span style={styles.badge}>Authorized Parent Portal</span>
            </div>
          </div>

          <div style={styles.userSection}>
            <div style={styles.parentNameBadge}>
              <User size={16} color="#1d4ed8" />
              <span>Parent: <strong>{userSession?.profile?.userFullName || 'Venkat Rao'}</strong></span>
            </div>
            <button onClick={onLogout} style={styles.logoutBtn}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.banner}>
          <div style={styles.bannerBadge}>
            <ShieldCheck size={16} color="#16a34a" />
            <span>Secure Student Data Verification & Privacy Sandbox</span>
          </div>
          <h2 style={styles.bannerTitle}>Review & Verify Your Child's ID Card</h2>
          <p style={styles.bannerText}>
            Below is the verified digital identity card prepared by the school administration. Please review the spelling, class, date of birth, and address.
          </p>
        </div>

        <div style={styles.contentGrid}>
          {/* Left Column: ID Card Preview */}
          <div style={styles.cardPreviewCol}>
            <h3 style={styles.sectionTitle}>Digital ID Card Preview</h3>
            
            {/* Realistic PVC CR-80 Vertical Card */}
            <div style={styles.pvcCard}>
              <div style={styles.cardTopHeader}>
                <Building2 size={24} color="#ffffff" />
                <div style={styles.schoolTitleBlock}>
                  <h4 style={styles.schoolHeaderName}>{student.schoolName}</h4>
                  <span style={styles.schoolSubHeader}>{student.schoolAffiliation}</span>
                </div>
              </div>

              <div style={styles.photoContainer}>
                <img 
                  src={student.photoUrl} 
                  alt={student.name}
                  style={styles.studentImg}
                />
                <div style={styles.bloodBadge}>{student.bloodGroup}</div>
              </div>

              <div style={styles.studentNameBlock}>
                <h3 style={styles.studentName}>{student.name}</h3>
                <span style={styles.studentClassBadge}>{student.studentClass}</span>
              </div>

              <div style={styles.detailsList}>
                <div style={styles.detailRow}>
                  <span style={styles.detailKey}>Roll No:</span>
                  <span style={styles.detailVal}>{student.rollNumber}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailKey}>Father:</span>
                  <span style={styles.detailVal}>{student.fatherName}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailKey}>DOB:</span>
                  <span style={styles.detailVal}>{student.dob}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailKey}>Mobile:</span>
                  <span style={styles.detailVal}>{student.mobile}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailKey}>Address:</span>
                  <span style={{ ...styles.detailVal, fontSize: '11px' }}>{student.address}</span>
                </div>
              </div>

              <div style={styles.cardFooterBar}>
                <span>AUTHORIZED STUDENT IDENTITY</span>
                <span style={{ fontWeight: '700' }}>BATCH 2026-27</span>
              </div>
            </div>

            <div style={styles.cardActionRow}>
              <button 
                type="button" 
                onClick={() => window.print()} 
                style={styles.printSampleBtn}
              >
                <Printer size={16} />
                <span>Print Card Copy</span>
              </button>
            </div>
          </div>

          {/* Right Column: Verification & Correction Request Form */}
          <div style={styles.verificationCol}>
            <div style={styles.verifyBox}>
              <h3 style={styles.sectionTitle}>Verification Status</h3>
              
              <div style={styles.statusSuccessBanner}>
                <CheckCircle2 size={20} color="#15803d" />
                <div>
                  <h4 style={styles.statusHeading}>Details Verified by Parent Contact</h4>
                  <p style={styles.statusSub}>
                    Linked to primary contact phone: <strong>{userSession?.mobile || '9123456789'}</strong>
                  </p>
                </div>
              </div>

              {requestSent && (
                <div style={styles.requestSentAlert}>
                  <CheckCircle2 size={18} color="#15803d" />
                  <span>
                    Your correction request has been securely submitted to the School ID Studio administration.
                  </span>
                </div>
              )}

              {/* Request Correction Form */}
              <form onSubmit={handleSendCorrection} style={styles.correctionForm}>
                <h4 style={styles.formTitle}>
                  Need a correction?
                </h4>
                <p style={styles.formNote}>
                  If the name spelling, date of birth, blood group, or address is incorrect, enter the corrected details below. The school administrator will approve it before bulk printing.
                </p>

                <textarea
                  rows={4}
                  required
                  value={correctionText}
                  onChange={(e) => setCorrectionText(e.target.value)}
                  placeholder="e.g. Please update student name spelling to 'Aaditya Sharma' or change the address to..."
                  style={styles.textarea}
                />

                <button type="submit" style={styles.sendCorrectionBtn}>
                  <Send size={16} />
                  <span>Submit Correction Request</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    position: 'sticky',
    top: 0,
    zIndex: 20
  },
  headerInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '14px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  branding: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  logoBadge: {
    width: '38px',
    height: '38px',
    borderRadius: '8px',
    backgroundColor: '#1e3a8a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#0f172a'
  },
  badge: {
    fontSize: '11px',
    color: '#1e40af',
    fontWeight: '600'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },
  parentNameBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#eff6ff',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    color: '#1e40af'
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: '#f1f5f9',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#475569',
    cursor: 'pointer'
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 24px',
    flex: 1,
    width: '100%'
  },
  banner: {
    marginBottom: '28px'
  },
  bannerBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    color: '#15803d',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '10px'
  },
  bannerTitle: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '6px'
  },
  bannerText: {
    fontSize: '14px',
    color: '#475569'
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(320px, 380px) 1fr',
    gap: '32px',
    alignItems: 'start'
  },
  cardPreviewCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '14px',
    alignSelf: 'flex-start'
  },
  pvcCard: {
    width: '320px',
    minHeight: '500px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
    border: '1.5px solid #cbd5e1',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  cardTopHeader: {
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    color: '#ffffff',
    padding: '16px 14px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px'
  },
  schoolTitleBlock: {
    textAlign: 'center'
  },
  schoolHeaderName: {
    fontSize: '13px',
    fontWeight: '800',
    letterSpacing: '-0.01em'
  },
  schoolSubHeader: {
    fontSize: '9px',
    opacity: 0.85
  },
  photoContainer: {
    position: 'relative',
    margin: '16px auto 10px',
    width: '110px',
    height: '135px'
  },
  studentImg: {
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    objectFit: 'cover',
    border: '3px solid #1e3a8a',
    boxShadow: '0 4px 6px rgba(0,0,0,0.15)'
  },
  bloodBadge: {
    position: 'absolute',
    bottom: '-8px',
    right: '-8px',
    backgroundColor: '#dc2626',
    color: '#ffffff',
    fontSize: '9px',
    fontWeight: '800',
    padding: '2px 6px',
    borderRadius: '4px',
    border: '1.5px solid #ffffff'
  },
  studentNameBlock: {
    textAlign: 'center',
    marginBottom: '14px'
  },
  studentName: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#0f172a'
  },
  studentClassBadge: {
    display: 'inline-block',
    marginTop: '4px',
    backgroundColor: '#eff6ff',
    color: '#1d4ed8',
    padding: '2px 8px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '700'
  },
  detailsList: {
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '16px'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    paddingBottom: '4px',
    borderBottom: '1px dotted #e2e8f0'
  },
  detailKey: {
    color: '#64748b',
    fontWeight: '600'
  },
  detailVal: {
    color: '#0f172a',
    fontWeight: '700',
    textAlign: 'right'
  },
  cardFooterBar: {
    marginTop: 'auto',
    backgroundColor: '#1e3a8a',
    color: '#ffffff',
    fontSize: '9px',
    padding: '8px 12px',
    display: 'flex',
    justifyContent: 'space-between',
    letterSpacing: '0.05em'
  },
  cardActionRow: {
    marginTop: '16px'
  },
  printSampleBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#334155',
    cursor: 'pointer'
  },
  verificationCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  verifyBox: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    padding: '28px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
  },
  statusSuccessBanner: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '24px'
  },
  statusHeading: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#15803d',
    marginBottom: '2px'
  },
  statusSub: {
    fontSize: '12px',
    color: '#166534'
  },
  requestSentAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '10px',
    padding: '14px',
    color: '#1e40af',
    fontSize: '13px',
    marginBottom: '20px'
  },
  correctionForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  formTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#0f172a'
  },
  formNote: {
    fontSize: '12px',
    color: '#64748b',
    lineHeight: '1.4'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    border: '1.5px solid #cbd5e1',
    fontSize: '13px',
    outline: 'none',
    resize: 'vertical'
  },
  sendCorrectionBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#1e3a8a',
    color: '#ffffff',
    border: 'none',
    padding: '11px 18px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer'
  }
};
