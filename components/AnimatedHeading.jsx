import React from 'react';

const AnimatedHeading = () => {
  const headingStyle = {
  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
  fontWeight: '800',
  color: '#c643fc',
  textShadow: '0 0 10px #c643fc, 0 0 20px #c643fc',
  lineHeight: '1.3',
  letterSpacing: '-0.01em',
  animation: 'purpleGlow 2s ease-in-out infinite alternate',
  transition: 'all 0.4s ease',
  cursor: 'default',
  position: 'relative',
  padding: '0.25rem 0.5rem',
  borderRadius: '8px',
  display: 'inline-block',
  whiteSpace: 'nowrap',
};


 const containerStyle = {
  width: '95%', // ⬅ increased from 100% to give room for horizontal margin
  maxWidth: '1200px', // ⬅ ensures it grows wider on large screens
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '2rem auto 0.5rem', // ⬅ reduced top margin slightly
  position: 'relative',
  border: '1px solid rgba(0, 0, 0, 0.06)',
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
  padding: '0.2rem 1.5rem', // ⬅ reduced vertical padding, increased horizontal
};


  const particleBaseStyle = {
    position: 'absolute',
    borderRadius: '50%',
    pointerEvents: 'none',
    filter: 'blur(2px)',
    animation: 'float 5s ease-in-out infinite',
  };
const scrollWrapperStyle = {
  display: 'inline-block',
  whiteSpace: 'nowrap',
  animation: 'scrollLeft 5s linear infinite',
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

        @keyframes purpleGlow {
  0% {
    text-shadow: 0 0 8px #c643fc, 0 0 14px #c643fc;
  }
  100% {
    text-shadow: 0 0 16px #c643fc, 0 0 28px #c643fc;
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
  <div style={scrollWrapperStyle}>
    <div className="animated-heading" style={headingStyle}>
      Today's Social Nights
    </div>
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
