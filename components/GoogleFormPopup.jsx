import React, { useEffect, useState } from 'react';

const GoogleFormPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        setTimeout(() => setIsVisible(true), 100);
        sessionStorage.setItem('hasSeenPopup', 'true');
      }, 15000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', checkMobile);
      };
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShowPopup(false), 300);
  };

  const handleRedirect = () => {
    window.open('https://docs.google.com/forms/d/1mQ4eEwHwjWzSqsTOWzKhq9jI-y0vE-qiWAPwx2lFROQ/viewform', '_blank');
  };

  if (!showPopup) return null;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && (
        <div 
          style={{
            ...overlayStyle,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
          onClick={handleClose}
        />
      )}
      
      {/* Popup Container */}
      <div style={isMobile ? mobileContainerStyle : desktopContainerStyle}>
        <div 
          style={{
            ...(isMobile ? mobilePopupStyle : desktopPopupStyle),
            transform: isVisible 
              ? 'translateY(0) scale(1)' 
              : isMobile 
                ? 'translateY(-50%) scale(0.9)' 
                : 'translateY(100%) scale(0.8)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {/* Close Button */}
          <button 
            onClick={handleClose} 
            style={{
              ...closeBtnStyle,
              opacity: isMobile ? 0.3 : 1
            }}
          >
            ×
          </button>
          
          {/* Content */}
        <div style={contentStyle}>
  <h3 style={{
    fontSize: '16px',
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#800080',
    margin: 0,
    marginBottom: '4px'
  }}>
    Join the movement of
  </h3>

  <h3 style={{
    fontSize: '18px',
    fontWeight: '600',
    fontFamily: 'sans-serif',
    color: '#800080',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: 0,
    marginBottom: '8px'
  }}>
    Global Latin Dance Revolution!
  </h3>

  <p style={{ ...descriptionStyle, margin: '16px 0 4px 0' }}>
    <span style={{ fontWeight: 'bold' }}>📝 Got 1 minute?</span> 
  </p>

  <p style={{ ...descriptionStyle, margin: '6px 0', fontStyle: 'italic' }}>
    Help Shape the future of our community
  </p>

  <button onClick={handleRedirect} style={{ ...formBtnStyle, fontSize: '16px', marginTop: '12px' }}>
    Share Your Thoughts
  </button>
</div>


        </div>
      </div>
    </>
  );
};

// Updated Styles with Purple+Reddish Theme
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 9999,
  backdropFilter: 'blur(4px)'
};

const desktopContainerStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 10000,
  maxWidth: '380px',
  width: '380px'
};

const mobileContainerStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 10000,
  width: '90%',
  maxWidth: '340px'
};

const desktopPopupStyle = {
  background: 'rgba(138, 43, 226, 0.15)', // Purple base with low opacity
  borderRadius: '20px',
  boxShadow: '0 20px 40px rgba(138, 43, 226, 0.2), 0 10px 20px rgba(220, 53, 69, 0.1)',
  padding: '0',
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid rgba(220, 53, 69, 0.2)', // Reddish border
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(138, 43, 226, 0.1), rgba(220, 53, 69, 0.05))'
};

const mobilePopupStyle = {
  ...desktopPopupStyle,
  borderRadius: '24px',
  boxShadow: '0 25px 50px rgba(138, 43, 226, 0.25)'
};

const closeBtnStyle = {
  position: 'absolute',
  top: '12px',
  right: '15px',
  background: 'rgba(255, 255, 255, 0.9)',
  border: '1px solid rgba(138, 43, 226, 0.2)',
  borderRadius: '50%',
  width: '28px',
  height: '28px',
  fontSize: '18px',
  cursor: 'pointer',
  color: '#6f42c1', // Purple color
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  backdropFilter: 'blur(4px)',
  zIndex: 1,
  fontWeight: 'bold',
  ':hover': {
    background: 'rgba(220, 53, 69, 0.1)', // Reddish hover
    color: '#dc3545'
  }
};

const contentStyle = {
  padding: '32px 24px 24px',
  textAlign: 'center',
  color: '#2d3748',
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(8px)',
  borderRadius: '16px',
  margin: '8px',
  border: '1px solid rgba(138, 43, 226, 0.1)'
};

const iconStyle = {
  fontSize: '32px',
  marginBottom: '12px',
  display: 'block',
  color: '#6f42c1' // Purple color
};

const titleStyle = {
  fontSize: '20px',
  fontWeight: '700',
  margin: '0 0 8px 0',
  color: '#6f42c1', // Purple color
  fontFamily: 'system-ui, -apple-system, sans-serif'
};

const descriptionStyle = {
  fontSize: '14px',
  margin: '0 0 20px 0',
  color: '#4a5568',
  lineHeight: '1.4',
  fontFamily: 'system-ui, -apple-system, sans-serif'
};

const formBtnStyle = {
  background: 'linear-gradient(135deg, rgba(111, 66, 193, 0.9) 0%, rgba(220, 53, 69, 0.9) 100%)', // Purple to Red
  color: 'white',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '50px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '14px',
  transition: 'all 0.2s ease',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  boxShadow: '0 4px 15px rgba(111, 66, 193, 0.3)',
  ':hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 20px rgba(220, 53, 69, 0.4)',
    background: 'linear-gradient(135deg, rgba(111, 66, 193, 1) 0%, rgba(220, 53, 69, 1) 100%)'
  }
};

export default GoogleFormPopup;