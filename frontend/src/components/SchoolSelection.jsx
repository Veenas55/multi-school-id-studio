import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  MapPin, 
  Users, 
  CheckCircle, 
  Clock, 
  Printer, 
  ChevronRight, 
  LogOut, 
  Edit3, 
  Trash2, 
  Sparkles,
  School,
  IdCard,
  X
} from 'lucide-react';
import { SAMPLE_SCHOOLS } from '../data/mockData';

export default function SchoolSelection({ userSession, onSelectSchool, onLogout }) {
  const [schools, setSchools] = useState(SAMPLE_SCHOOLS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSchoolId, setEditingSchoolId] = useState(null);
  
  // New / Edit School Form state
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    affiliation: '',
    address: '',
    contactPhone: '',
    contactEmail: '',
    totalStudents: 1200,
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=160&auto=format&fit=crop&q=80'
  });

  const filteredSchools = schools.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingSchoolId(null);
    setFormData({
      name: '',
      code: '',
      affiliation: 'CBSE Affiliated',
      address: '',
      contactPhone: '',
      contactEmail: '',
      totalStudents: 1500,
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=160&auto=format&fit=crop&q=80'
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (school, e) => {
    e.stopPropagation();
    setEditingSchoolId(school.id);
    setFormData({ ...school });
    setIsAddModalOpen(true);
  };

  const handleDeleteSchool = (schoolId, schoolName, e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to remove "${schoolName}" from the ID Studio?`)) {
      setSchools(schools.filter(s => s.id !== schoolId));
    }
  };

  const handleSaveSchool = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.address) return;

    if (editingSchoolId) {
      setSchools(schools.map(s => s.id === editingSchoolId ? { ...s, ...formData } : s));
    } else {
      const newSchool = {
        ...formData,
        id: `SCH-${String(schools.length + 1).padStart(3, '0')}`,
        generatedCards: 0,
        pendingCards: Number(formData.totalStudents),
        printedCards: 0,
        badgeColor: '#1e3a8a',
        tagline: 'Excellence in Education'
      };
      setSchools([newSchool, ...schools]);
    }
    setIsAddModalOpen(false);
  };

  return (
    <div style={styles.container}>
      {/* Top Navigation Bar */}
      <header style={styles.topBar}>
        <div style={styles.topBarContent}>
          <div style={styles.branding}>
            <div style={styles.logoBadgeSmall}>
              <IdCard size={20} color="#ffffff" />
            </div>
            <div>
              <h1 style={styles.brandTitle}>Multi-School ID Studio</h1>
              <span style={styles.brandSubtitle}>Enterprise Student Identity & Batch Print</span>
            </div>
          </div>

          <div style={styles.userControls}>
            <div style={styles.userBadge}>
              <div style={styles.avatarCircle}>
                {userSession?.profile?.userFullName?.charAt(0) || 'U'}
              </div>
              <div style={styles.userInfo}>
                <span style={styles.userName}>{userSession?.profile?.userFullName || 'Authorized User'}</span>
                <span style={styles.userRole}>
                  {userSession?.role === 'ADMIN' ? 'Print Studio Administrator' : 'Parent Account'}
                </span>
              </div>
            </div>

            <button onClick={onLogout} style={styles.logoutButton} title="Logout">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={styles.main}>
        {/* Banner Section */}
        <div style={styles.heroBanner}>
          <div style={styles.bannerText}>
            <div style={styles.tag}>
              <Sparkles size={14} color="#2563eb" />
              <span>Multi-Tenant Identity Console</span>
            </div>
            <h2 style={styles.heading}>Select a School to Manage ID Cards</h2>
            <p style={styles.subtext}>
              Choose an active school campus to register students, generate identity cards, or dispatch high-speed bulk print jobs.
            </p>
          </div>

          {userSession?.role === 'ADMIN' && (
            <button onClick={handleOpenAddModal} style={styles.addSchoolBtn}>
              <Plus size={18} />
              <span>Add New School</span>
            </button>
          )}
        </div>

        {/* Search & Statistics Bar */}
        <div style={styles.filterBar}>
          <div style={styles.searchWrapper}>
            <Search size={18} color="#64748b" style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by school name, campus code, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.metricChips}>
            <div style={styles.chip}>
              <School size={16} color="#2563eb" />
              <span>Total Campuses: <strong>{schools.length}</strong></span>
            </div>
            <div style={styles.chip}>
              <Users size={16} color="#059669" />
              <span>Enrolled Students: <strong>{schools.reduce((acc, curr) => acc + (Number(curr.totalStudents) || 0), 0).toLocaleString()}</strong></span>
            </div>
          </div>
        </div>

        {/* Schools Grid */}
        <div style={styles.grid}>
          {filteredSchools.map((school) => (
            <div 
              key={school.id} 
              style={styles.card}
              onClick={() => onSelectSchool(school)}
            >
              {/* Card Top: Logo & Info */}
              <div style={styles.cardHeader}>
                <img 
                  src={school.logo} 
                  alt={school.name} 
                  style={styles.schoolLogo}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=160&auto=format&fit=crop&q=80';
                  }}
                />
                <div style={styles.headerInfo}>
                  <div style={styles.codeRow}>
                    <span style={styles.schoolCode}>{school.code}</span>
                    <span style={styles.schoolIdBadge}>{school.id}</span>
                  </div>
                  <h3 style={styles.schoolName}>{school.name}</h3>
                  <span style={styles.affiliation}>{school.affiliation}</span>
                </div>
              </div>

              {/* Address */}
              <div style={styles.addressRow}>
                <MapPin size={15} color="#64748b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={styles.addressText}>{school.address}</span>
              </div>

              {/* Progress & Card Counters */}
              <div style={styles.statsContainer}>
                <div style={styles.statBox}>
                  <Users size={14} color="#1e3a8a" />
                  <span style={styles.statLabel}>Total Students</span>
                  <strong style={styles.statVal}>{school.totalStudents?.toLocaleString()}</strong>
                </div>
                <div style={styles.statBox}>
                  <CheckCircle size={14} color="#15803d" />
                  <span style={styles.statLabel}>Generated</span>
                  <strong style={{ ...styles.statVal, color: '#15803d' }}>
                    {school.generatedCards?.toLocaleString()}
                  </strong>
                </div>
                <div style={styles.statBox}>
                  <Clock size={14} color="#d97706" />
                  <span style={styles.statLabel}>Pending</span>
                  <strong style={{ ...styles.statVal, color: '#d97706' }}>
                    {school.pendingCards?.toLocaleString()}
                  </strong>
                </div>
                <div style={styles.statBox}>
                  <Printer size={14} color="#4338ca" />
                  <span style={styles.statLabel}>Printed</span>
                  <strong style={{ ...styles.statVal, color: '#4338ca' }}>
                    {school.printedCards?.toLocaleString()}
                  </strong>
                </div>
              </div>

              {/* Actions Footer */}
              <div style={styles.cardFooter}>
                {userSession?.role === 'ADMIN' && (
                  <div style={styles.adminBtns} onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={(e) => handleOpenEditModal(school, e)}
                      style={styles.iconBtn}
                      title="Edit School Campus"
                    >
                      <Edit3 size={15} color="#475569" />
                    </button>
                    <button 
                      onClick={(e) => handleDeleteSchool(school.id, school.name, e)}
                      style={{ ...styles.iconBtn, color: '#dc2626' }}
                      title="Delete School"
                    >
                      <Trash2 size={15} color="#dc2626" />
                    </button>
                  </div>
                )}

                <button 
                  onClick={() => onSelectSchool(school)} 
                  style={styles.selectBtn}
                >
                  <span>Select School</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredSchools.length === 0 && (
          <div style={styles.emptyState}>
            <School size={48} color="#94a3b8" />
            <h4 style={styles.emptyTitle}>No matching schools found</h4>
            <p style={styles.emptySub}>Try searching with a different campus code or school name.</p>
          </div>
        )}
      </main>

      {/* Add / Edit School Modal */}
      {isAddModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent} className="animate-fade-in">
            <div style={styles.modalHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <School size={20} color="#1e3a8a" />
                <h3 style={styles.modalTitle}>
                  {editingSchoolId ? 'Edit School Campus' : 'Register New School Campus'}
                </h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} style={styles.closeBtn}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveSchool} style={styles.modalForm}>
              <div style={styles.formGrid}>
                <div style={styles.inputGroupFull}>
                  <label style={styles.formLabel}>School Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hyderabad Public Heritage School"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={styles.modalInput}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.formLabel}>Campus Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HPHS-HYD"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    style={styles.modalInput}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.formLabel}>Affiliation / Board</label>
                  <input
                    type="text"
                    placeholder="e.g. CBSE Affiliated #3630129"
                    value={formData.affiliation}
                    onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                    style={styles.modalInput}
                  />
                </div>

                <div style={styles.inputGroupFull}>
                  <label style={styles.formLabel}>Campus Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="Street, Landmark, City, State & PIN"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    style={styles.modalInput}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.formLabel}>Primary Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98480 12345"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    style={styles.modalInput}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.formLabel}>Enrolled Student Count</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.totalStudents}
                    onChange={(e) => setFormData({ ...formData, totalStudents: e.target.value })}
                    style={styles.modalInput}
                  />
                </div>

                <div style={styles.inputGroupFull}>
                  <label style={styles.formLabel}>Logo Image URL</label>
                  <input
                    type="url"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    style={styles.modalInput}
                  />
                </div>
              </div>

              <div style={styles.modalActions}>
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)} 
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button type="submit" style={styles.saveBtn}>
                  {editingSchoolId ? 'Save Changes' : 'Create School Campus'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
  topBar: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    position: 'sticky',
    top: 0,
    zIndex: 30,
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  topBarContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  branding: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  logoBadgeSmall: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: '#1e3a8a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px -1px rgba(30, 58, 138, 0.25)'
  },
  brandTitle: {
    fontSize: '17px',
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: '1.2'
  },
  brandSubtitle: {
    fontSize: '11px',
    color: '#64748b',
    fontWeight: '500'
  },
  userControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  userBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  avatarCircle: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#eff6ff',
    border: '1.5px solid #bfdbfe',
    color: '#1d4ed8',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  userName: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#1e293b'
  },
  userRole: {
    fontSize: '11px',
    color: '#64748b'
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '7px 12px',
    backgroundColor: '#f1f5f9',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    color: '#475569',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  main: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 24px',
    width: '100%',
    flex: 1
  },
  heroBanner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '28px',
    gap: '20px',
    flexWrap: 'wrap'
  },
  bannerText: {
    maxWidth: '680px'
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#eff6ff',
    color: '#1d4ed8',
    padding: '4px 10px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '8px'
  },
  heading: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.02em',
    marginBottom: '8px'
  },
  subtext: {
    fontSize: '14px',
    color: '#475569',
    lineHeight: '1.5'
  },
  addSchoolBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#1e3a8a',
    color: '#ffffff',
    border: 'none',
    padding: '11px 18px',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(30, 58, 138, 0.25)'
  },
  filterBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  },
  searchWrapper: {
    position: 'relative',
    flex: '1',
    minWidth: '280px',
    maxWidth: '520px'
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  searchInput: {
    width: '100%',
    padding: '11px 16px 11px 42px',
    fontSize: '14px',
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    outline: 'none'
  },
  metricChips: {
    display: 'flex',
    gap: '12px'
  },
  chip: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '8px 14px',
    fontSize: '13px',
    color: '#334155'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
    gap: '24px'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
    padding: '22px',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 12px 20px -3px rgba(0,0,0,0.08)'
    }
  },
  cardHeader: {
    display: 'flex',
    gap: '14px',
    marginBottom: '14px'
  },
  schoolLogo: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    objectFit: 'cover',
    border: '1px solid #e2e8f0'
  },
  headerInfo: {
    flex: 1
  },
  codeRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginBottom: '4px'
  },
  schoolCode: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#1d4ed8',
    backgroundColor: '#eff6ff',
    padding: '2px 8px',
    borderRadius: '4px'
  },
  schoolIdBadge: {
    fontSize: '11px',
    color: '#64748b',
    fontWeight: '600'
  },
  schoolName: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0f172a',
    lineHeight: '1.3',
    marginBottom: '2px'
  },
  affiliation: {
    fontSize: '12px',
    color: '#64748b'
  },
  addressRow: {
    display: 'flex',
    gap: '6px',
    alignItems: 'flex-start',
    marginBottom: '16px',
    color: '#475569',
    fontSize: '12px',
    lineHeight: '1.4'
  },
  addressText: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    padding: '12px 10px',
    marginBottom: '18px',
    border: '1px solid #f1f5f9'
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '2px'
  },
  statLabel: {
    fontSize: '10px',
    color: '#64748b',
    fontWeight: '500'
  },
  statVal: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#0f172a'
  },
  cardFooter: {
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12px',
    borderTop: '1px solid #f1f5f9'
  },
  adminBtns: {
    display: 'flex',
    gap: '8px'
  },
  iconBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  selectBtn: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#1e3a8a',
    color: '#ffffff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px dashed #cbd5e1'
  },
  emptyTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
    marginTop: '12px',
    marginBottom: '4px'
  },
  emptySub: {
    fontSize: '13px',
    color: '#64748b'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    padding: '20px'
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: '18px',
    width: '100%',
    maxWidth: '560px',
    padding: '28px',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '14px',
    borderBottom: '1px solid #e2e8f0'
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0f172a'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#64748b'
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  inputGroupFull: {
    gridColumn: '1 / -1',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  formLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#334155'
  },
  modalInput: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '13px',
    outline: 'none'
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '10px'
  },
  cancelBtn: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    fontSize: '13px',
    fontWeight: '600',
    color: '#475569',
    cursor: 'pointer'
  },
  saveBtn: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#1e3a8a',
    fontSize: '13px',
    fontWeight: '700',
    color: '#ffffff',
    cursor: 'pointer'
  }
};

