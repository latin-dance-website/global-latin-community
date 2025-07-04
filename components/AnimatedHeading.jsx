import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const weekdays = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

const AnimatedHeading = () => {
  const [todayEvents, setTodayEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodayEvents = async () => {
      try {
        setLoading(true);
        const today = dayjs();
        const todayFullDay = today.format("dddd");

        const response = await fetch('/api/events');
        if (!response.ok) throw new Error('Failed to fetch events');

        const data = await response.json();

        const processedEvents = data
          .filter(e => e.id && weekdays.includes(e.day))
          .map(e => ({
            ...e,
            originalDay: e.day,
            title: e.title?.replace(/\s+/g, " ").trim() || "",
          }))
          .filter(e => e.originalDay === todayFullDay);

        setTodayEvents(processedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayEvents();
  }, []);

  const createScrollingContent = () => {
    if (loading) {
      return (
        <>
          <span className="main-heading">Today's Social Nights</span>
          {' • '}
          <span className="status-message">Loading events...</span>
          {' • '}
        </>
      );
    }

    if (todayEvents.length === 0) {
      return (
        <>
          <span className="main-heading">Today's Social Nights</span>
          {' • '}
          <span className="no-events-message">No events today</span>
          {' • '}
          <span className="status-message">Check back soon!</span>
          {' • '}
        </>
      );
    }

    return (
      <>
        <span className="main-heading">Today's Social Nights</span>
        {' • '}
        {todayEvents.map((event, index) => (
          <React.Fragment key={index}>
            <span className="event-title">
              {event.title || 'Social Night'}
            </span>
            {index < todayEvents.length - 1 ? ' • ' : ' • '}
          </React.Fragment>
        ))}
      </>
    );
  };

  const scrollingContent = createScrollingContent();
  const duplicatedContent = (
    <>
      {scrollingContent}
      {scrollingContent}
      {scrollingContent}
    </>
  );

  const animationDuration = Math.max(10, todayEvents.length * 3);

  const containerStyle = {
    width: '95%',
    maxWidth: '1200px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    padding: '0.5rem 0',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
    position: 'relative',
  };

  return (
    <>
      <style jsx global>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${100 / 3}%); }
        }

        @keyframes softGlow {
          0% { text-shadow: 0 0 2px rgba(198, 67, 252, 0.3); }
          100% { text-shadow: 0 0 8px rgba(198, 67, 252, 0.6); }
        }

        @keyframes shine {
          0% { background-position: -200px; }
          100% { background-position: 200px; }
        }

        .scroll-wrapper {
          display: flex;
          white-space: nowrap;
          animation: scrollLeft ${animationDuration}s linear infinite;
          will-change: transform;
        }

        .scroll-wrapper:hover {
          animation-play-state: paused;
          cursor: pointer;
        }

        .animated-heading {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: -0.01em;
          transition: all 0.4s ease;
          white-space: nowrap;
          padding: 0 1rem;
          display: inline-flex;
          align-items: center;
        }

        .main-heading {
          background: linear-gradient(90deg, #ff6ec4 0%, #7873f5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: softGlow 2s ease-in-out infinite alternate, shine 4s ease-in-out infinite;
          position: relative;
        }

        .event-title {
          color: #E53E3E;
          font-weight: 600;
        }

        .status-message {
          color: #4fd1c5;
        }

        .no-events-message {
          color: #f687b3;
        }
      `}</style>

      <div style={containerStyle}>
        <div className="scroll-wrapper">
          <div className="animated-heading">
            {duplicatedContent}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedHeading;
