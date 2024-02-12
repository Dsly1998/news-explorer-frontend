import React from 'react';
import './Footer.css'; // Import your CSS styles
// Import icons for the icon buttons if needed

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__text">
        © 2020 Supersite, Powered by News API
      </div>
      <div className="footer__buttons">
        <button className="footer__button">Home</button>
        <button className="footer__button">Triple Ten</button>
        {/* Replace these with actual icon buttons */}
        <button className="footer__icon-button">Icon1</button>
        <button className="footer__icon-button">Icon2</button>
      </div>
    </footer>
  );
}

export default Footer;
