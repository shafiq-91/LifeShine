import React from 'react';

const NetError = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f4f9ff',
        color: '#000',
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
            color: '#e74c3c',
            textShadow: '0px 8px 20px rgba(231, 76, 60, 0.6)',
          }}
        >
          500
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
        Network Error
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
        It looks like we are having trouble connecting. Please check your internet
        connection or try again later.
      </p>

      {/* Button */}
      <a
        href="/"
        style={{
          padding: '18px 45px',
          backgroundColor: '#e74c3c',
          color: '#fff',
          fontSize: '1.3rem',
          fontWeight: '700',
          textDecoration: 'none',
          borderRadius: '50px',
          boxShadow: '0px 20px 40px rgba(231, 76, 60, 0.3)',
          transform: 'scale(1)',
          transition: 'transform 0.3s ease, background-color 0.3s ease',
          cursor: 'pointer',
          display: 'inline-block',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#c0392b';
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#e74c3c';
          e.target.style.transform = 'scale(1)';
        }}
      >
        Try Again
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

export default NetError;
