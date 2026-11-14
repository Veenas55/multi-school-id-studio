import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import SchoolSelection from './components/SchoolSelection';
import ParentPortal from './components/ParentPortal';

export default function App() {
  const [userSession, setUserSession] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [notification, setNotification] = useState(null);

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleLoginSuccess = (sessionData) => {
    setUserSession(sessionData);
    if (sessionData.role === 'ADMIN') {
      showToast(`Welcome back, ${sessionData.profile.userFullName || 'Admin'}! Continuing to School Selection...`);
    } else {
      showToast(`Welcome to Parent Portal, ${sessionData.profile.userFullName || 'Parent'}!`);
    }
  };

  const handleLogout = () => {
    setUserSession(null);
    setSelectedSchool(null);
    showToast('Session ended. Securely logged out.');
  };

  const handleSelectSchool = (school) => {
    setSelectedSchool(school);
    showToast(`Campus "${school.name}" active. Preparing Student Registry & ID Studio...`);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Toast Notification */}
      {notification && (
        <div style={styles.toast}>
          <span>{notification}</span>
        </div>
      )}

      {/* Screen Routing */}
      {!userSession ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : userSession.role === 'PARENT' ? (
        <ParentPortal userSession={userSession} onLogout={handleLogout} />
      ) : (
        <SchoolSelection 
          userSession={userSession}
          onSelectSchool={handleSelectSchool}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

const styles = {
  toast: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: '12px 20px',
    borderRadius: '10px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
    fontSize: '13px',
    fontWeight: '600',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    animation: 'fadeIn 0.25s ease'
  }
};
