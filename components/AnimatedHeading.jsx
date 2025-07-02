import React from 'react';

const AnimatedHeading = () => {
  const headingStyle = {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: '800',
    background: 'linear-gradient(90deg, #ff4d4d 0%, #f9cb28 25%, #25d366 50%, #4a6cf7 75%, #c643fc 100%)',
    backgroundSize: '400% 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: '1.3',
    letterSpacing: '-0.01em',
    textShadow: '0 2px 10px rgba(0,0,0,0.2)',
    animation: 'gradientShift 6s ease-in-out infinite, glow 2s ease-in-out infinite alternate, scrollLeft 5s linear infinite',
    transition: 'all 0.4s ease',
    cursor: 'default',
    position: 'relative',
    padding: '0.25rem 0.5rem',
    borderRadius: '8px',
    display: 'inline-block',
    whiteSpace: 'nowrap',
  };

 const containerStyle = {
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '1.5rem auto 0.5rem',
  position: 'relative',
  border: '1px solid rgba(0, 0, 0, 0.06)', // very light border
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.03)', // soft transparent white
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)', // subtle shadow
  padding: '0.25rem 0.5rem',  // slight internal spacing
};


  const particleBaseStyle = {
    position: 'absolute',
    borderRadius: '50%',
    pointerEvents: 'none',
    filter: 'blur(2px)',
    animation: 'float 5s ease-in-out infinite',
  };

  const particle1Style = {
    ...particleBaseStyle,
    top: '-5px',
    left: '10%',
    width: '12px',
    height: '12px',
    background: 'radial-gradient(circle, #ff4d4d, transparent 70%)',
    opacity: 0.8,
  };

  const particle2Style = {
    ...particleBaseStyle,
    top: '40%',
    right: '15%',
    width: '16px',
    height: '16px',
    background: 'radial-gradient(circle, #4a6cf7, transparent 70%)',
    opacity: 0.7,
  };

  const particle3Style = {
    ...particleBaseStyle,
    bottom: '-5px',
    left: '30%',
    width: '14px',
    height: '14px',
    background: 'radial-gradient(circle, #f9cb28, transparent 70%)',
    opacity: 0.9,
  };

  const particle4Style = {
    ...particleBaseStyle,
    top: '20%',
    right: '30%',
    width: '10px',
    height: '10px',
    background: 'radial-gradient(circle, #25d366, transparent 70%)',
    opacity: 0.7,
  };

  return (
    <>
      <style jsx global>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes glow {
          0% {
            filter: drop-shadow(0 6px 25px rgba(255, 77, 77, 0.4));
          }
          50% {
            filter: drop-shadow(0 8px 35px rgba(74, 108, 247, 0.5));
          }
          100% {
            filter: drop-shadow(0 6px 25px rgba(198, 67, 252, 0.4));
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -20px) scale(1.2);
          }
        }

        @keyframes scrollLeft {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>

      <div style={containerStyle}>
        <div className="animated-heading" style={headingStyle}>
          Today's Social Nights
        </div>
        <div style={particle1Style} />
        <div style={particle2Style} />
        <div style={particle3Style} />
        <div style={particle4Style} />
      </div>
    </>
  );
};

export default AnimatedHeading;
