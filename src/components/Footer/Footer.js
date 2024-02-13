import React from 'react';
import './Footer.css'; // Import your CSS styles
import github from '../../images/github.svg';
import facebook from '../../images/fb.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__text">
        © 2020 Supersite, Powered by News API
      </div>
      <div className="footer__buttons-right">
        <button className="footer__button">Home</button>
        <button className="footer__button">Triple Ten</button>
        <button className="footer__icon-button">
  <img src={github} alt="github icon" />
</button>
<button className="footer__icon-button">
  <img src={facebook} alt="facebook icon" />
</button>

      </div>
    </footer>
  );
}

export default Footer;
