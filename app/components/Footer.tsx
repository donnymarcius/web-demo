import React from 'react';

const Footer = () => {
  return (
    <footer className="p-4 text-white" style={{ backgroundColor: 'var(--button-primary)' }}>
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Synbio ID. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;