import React from 'react';
import { FiGithub, FiInstagram, FiTwitter, FiLinkedin } from 'react-icons/fi';
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
              <a href="#projects" className="footer__link">Projects</a>
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
              <FiGithub />
            </a>
            <a 
              href="https://www.instagram.com/prajwal_dev_24" 
              target="_blank" 
              rel="noreferrer" 
              className="footer__social"
            >
              <FiInstagram />
            </a>
            <a 
              href="https://x.com/BtechBlock" 
              target="_blank" 
              rel="noreferrer" 
              className="footer__social"
            >
              <FiTwitter />
            </a>
            <a 
              href="https://www.linkedin.com/in/prajwal--r/" 
              target="_blank" 
              rel="noreferrer" 
              className="footer__social"
            >
              <FiLinkedin />
            </a>
          </div>
        </div>
        <p className="footer__copy">&#169; Prajwal All rights reserved @2025.</p>
      </div>
    </footer>
  );
};

export default Footer;