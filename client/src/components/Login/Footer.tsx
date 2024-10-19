import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className='bg-dark text-white' style={{ padding: '10px', textAlign: 'center' }}>
      <p>&copy; 2023 FORMOTEX. All rights reserved.</p>
      <nav>
        <a href="/privacy-policy" style={{ margin: '0 10px' }}>Privacy Policy</a>
        <a href="/terms-of-service" style={{ margin: '0 10px' }}>Terms of Service</a>
        <a href="/contact" style={{ margin: '0 10px' }}>Contact</a>
      </nav>
    </footer>
  );
};

