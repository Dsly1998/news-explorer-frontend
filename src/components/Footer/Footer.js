import React from "react";
import "./Footer.css";
import github from "../../images/github.svg";
import facebook from "../../images/fb.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__text">
          © 2020 Supersite, Powered by News API
        </div>
        <div className="footer__buttons-right">
          <div className="footer__middle-right">
            <Link to="/" className="footer__button">
              Home
            </Link>
            <a
              href="https://tripleten.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__button"
            >
              Practicum
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
              className="footer__icon-button footer__icon-button--facebook"
            >
              <img src={facebook} alt="facebook icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
