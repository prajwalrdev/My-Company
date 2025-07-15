import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__bg">
        <div className="footer__container container grid">
          <div>
            <h1 className="footer__title">Prajwal</h1>
            <span className="footer__subtitle">Software Engineer</span>
          </div>

          <ul className="footer__links">
            <li>
              <a href="#services" className="footer__link">Services</a>
            </li>
            <li>
              <a href="#portfolio" className="footer__link">Portfolio</a>
            </li>
            <li>
              <a href="#contact" className="footer__link">Contact</a>
            </li>
          </ul>

          <div className="footer__socials">
            <a 
              href="https://github.com/prajwalrdev" 
              target="_blank" 
              rel="noreferrer" 
              className="footer__social"
            >
              <i className="uil uil-github-alt"></i>
            </a>
            <a 
              href="https://www.instagram.com/prajwal_dev_24" 
              target="_blank" 
              rel="noreferrer" 
              className="footer__social"
            >
              <i className="uil uil-instagram"></i>
            </a>
            <a 
              href="https://x.com/BtechBlock" 
              target="_blank" 
              rel="noreferrer" 
              className="footer__social"
            >
              <i className="uil uil-twitter-alt"></i>
            </a>
            <a 
              href="https://www.linkedin.com/in/prajwal--r/" 
              target="_blank" 
              rel="noreferrer" 
              className="footer__social"
            >
              <i className="uil uil-linkedin-alt"></i>
            </a>
          </div>
        </div>
        <p className="footer__copy">&#169; Prajwal All rights reserved @2025.</p>
      </div>
    </footer>
  );
};

export default Footer;