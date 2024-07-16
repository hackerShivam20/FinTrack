import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={contentStyle}>
        <p>© {new Date().getFullYear()} FinTrack. All rights reserved.</p>
        <p>
          Developed by <a href="https://yourwebsite.com" style={linkStyle}>Shivam & Shivansh</a>
        </p>
      </div>
    </footer>
  );
};

// const footerStyle = { position: 'fixed', left: 350, bottom: 0, width: '100%', background: '#ccc', textAlign: 'center', padding: '1em' };


const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px 0',
  marginTop: 'auto',
};

const contentStyle = {
  margin: '0 auto',
  maxWidth: '1200px',
};

const linkStyle = {
  color: '#61dafb',
  textDecoration: 'none',
};

export default Footer;