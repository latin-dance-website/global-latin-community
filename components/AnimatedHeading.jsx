import React from 'react';

const AnimatedHeading = () => {
  const headingStyle = {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: '700',
    color: '#c643fc',
    textShadow: '0 0 2px rgba(198, 67, 252, 0.3)', // ✨ Softer shadow
    lineHeight: '1.3',
    letterSpacing: '-0.01em',
    animation: 'softGlow 2s ease-in-out infinite alternate',
    transition: 'all 0.4s ease',
    whiteSpace: 'nowrap',
  };

  const containerStyle = {
    width: '95%',
    maxWidth: '1200px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2rem auto 1rem',
    padding: '0.5rem 1.5rem',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
  };

  const scrollWrapperStyle = {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    animation: 'scrollLeft 10s linear infinite',
  };

  return (
    <>
      <style jsx global>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes softGlow {
          0% {
            text-shadow: 0 0 2px rgba(198, 67, 252, 0.3);
          }
          100% {
            text-shadow: 0 0 4px rgba(198, 67, 252, 0.4);
          }
        }
      `}</style>

      <div style={containerStyle}>
        <div style={scrollWrapperStyle}>
          <div className="animated-heading" style={headingStyle}>
            Today's Social Nights
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedHeading;
