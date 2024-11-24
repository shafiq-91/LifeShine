import React from 'react';

const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(45deg, #191e2a, #2c3e50)',
        color: '#fff',
        fontFamily: "'Roboto', sans-serif",
        textAlign: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        animation: 'fadeInBg 1.5s ease-out',
      }}
    >
      {/* Background Decoration */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '-1',
          opacity: '0.15',
          animation: 'zoomInBg 2s ease-out',
        }}
      >
        <h1
          style={{
            fontSize: '15rem',
            fontWeight: 'bold',
            letterSpacing: '10px',
            margin: '0',
            color: '#f2b01e',
            textShadow: '0px 8px 20px rgba(242, 176, 30, 0.6)',
          }}
        >
          404
        </h1>
      </div>

      {/* Error Message */}
      <h2
        style={{
          fontSize: '3.5rem',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '20px',
          opacity: '0',
          animation: 'fadeInText 1.5s ease-in-out 0.5s forwards',
        }}
      >
        Oops! Page Not Found
      </h2>

      {/* Sub-text */}
      <p
        style={{
          fontSize: '1.25rem',
          marginBottom: '30px',
          fontWeight: '300',
          opacity: '0',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          animation: 'fadeInText 2s ease-in-out 1s forwards',
        }}
      >
        Looks like you've reached a dead-end. The page you’re looking for doesn’t exist.
        Return to the homepage or explore the rest of the site.
      </p>

      {/* Button */}
      <a
        href="/"
        style={{
          padding: '18px 45px',
          backgroundColor: '#f2b01e',
          color: '#191e2a',
          fontSize: '1.3rem',
          fontWeight: '700',
          textDecoration: 'none',
          borderRadius: '50px',
          boxShadow: '0px 20px 40px rgba(242, 176, 30, 0.3)',
          transform: 'scale(1)',
          transition: 'transform 0.3s ease, background-color 0.3s ease',
          cursor: 'pointer',
          display: 'inline-block',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#e09e1e';
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#f2b01e';
          e.target.style.transform = 'scale(1)';
        }}
      >
        Go to Homepage
      </a>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeInBg {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes zoomInBg {
            0% {
              transform: translate(-50%, -50%) scale(0.5);
            }
            100% {
              transform: translate(-50%, -50%) scale(1);
            }
          }

          @keyframes fadeInText {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default NotFound;
