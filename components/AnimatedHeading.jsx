import React from 'react';

const AnimatedHeading = () => {
  return (
    <>
      <style jsx global>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes softGlow {
          0% { text-shadow: 0 0 2px rgba(198, 67, 252, 0.3); }
          100% { text-shadow: 0 0 8px rgba(198, 67, 252, 0.6); }
        }

        .marquee-wrapper {
          overflow: hidden;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .marquee-container {
          display: flex;
          flex-direction: row;
          width: fit-content;
          animation: scrollLeft 10s linear infinite;
        }

        .marquee-text {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: -0.01em;
          white-space: nowrap;
          padding: 0.5rem 2rem;
          background: linear-gradient(90deg, #ff6ec4 0%, #7873f5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: softGlow 2s ease-in-out infinite alternate;
        }
      `}</style>

      <div className="marquee-wrapper">
        <div className="marquee-container">
          <span className="marquee-text">Today's Social Nights •&nbsp;</span>
          <span className="marquee-text">Today's Social Nights •&nbsp;</span>
          {/* Duplicate text for seamless loop */}
        </div>
      </div>
    </>
  );
};

export default AnimatedHeading;
