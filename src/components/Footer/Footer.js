import React from "react";
import "./Footer.css"; // Import your CSS styles
import github from "../../images/github.svg";
import facebook from "../../images/fb.svg";
import { Link } from "react-router-dom"; // Import Link component

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__text">© 2020 Supersite, Powered by News API</div>
      <div className="footer__buttons-right">
        <div className="footer__middle-right">
        <Link to="/" className="footer__button">
          Home
        </Link>{" "}
        {/* Using Link for internal routing */}
        <a
          href="https://tripleten.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__button"
        >
          Triple Ten
        </a>
      </div>
      <div className="footer__far-right">
        <a
          href="https://github.com/Dsly1998"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__icon-button"
        >
          <img src={github} alt="github icon" />
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__icon-button"
        >
          <img src={facebook} alt="facebook icon" />
        </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
