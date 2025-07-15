import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiFileText, FiBriefcase, FiImage, FiMessageSquare, FiX, FiGrid, FiMenu, FiBookOpen } from 'react-icons/fi';
import './Header.css';

/*=============== Sections Active Link ===============*/
const sections = [
  'home',
  'about',
  'skills',
  'qualification',
  'services',
  'projects',
  'contact'
];

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollHeader, setScrollHeader] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrollHeader(window.scrollY >= 80);

      // Update active section based on scroll position
      const scrollY = window.pageYOffset;
      sections.forEach(section => {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
          const sectionHeight = sectionElement.offsetHeight;
          const sectionTop = sectionElement.offsetTop - 50;
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setShowMenu(!showMenu);
  const closeMenu = () => setShowMenu(false);

  return (
    <header className={`header ${scrollHeader ? 'scroll-header' : ''}`} id="header">
      <nav className="nav container">
        <Link to="/" className="nav__logo">Prajwal R</Link>

        <div className={`nav__menu ${showMenu ? 'show-menu' : ''}`} id="nav-menu">
          <ul className="nav__list grid">
            <li className="nav__item">
              <a href="#home" className={`nav__link ${activeSection === 'home' ? 'active-link' : ''}`} onClick={closeMenu}>
                <FiHome className="nav__icon" />Home
              </a>
            </li>
            <li className="nav__item">
              <a href="#about" className={`nav__link ${activeSection === 'about' ? 'active-link' : ''}`} onClick={closeMenu}>
                <FiUser className="nav__icon" />About
              </a>
            </li>
            <li className="nav__item">
              <a href="#skills" className={`nav__link ${activeSection === 'skills' ? 'active-link' : ''}`} onClick={closeMenu}>
                <FiFileText className="nav__icon" />Skills
              </a>
            </li>
            <li className="nav__item">
              <a href="#qualification" className={`nav__link ${activeSection === 'qualification' ? 'active-link' : ''}`} onClick={closeMenu}>
                <FiBookOpen className="nav__icon" />Qualification
              </a>
            </li>
            <li className="nav__item">
              <a href="#services" className={`nav__link ${activeSection === 'services' ? 'active-link' : ''}`} onClick={closeMenu}>
                <FiBriefcase className="nav__icon" />Services
              </a>
            </li>
            <li className="nav__item">
              <a href="#projects" className={`nav__link ${activeSection === 'projects' ? 'active-link' : ''}`} onClick={closeMenu}>
                <FiImage className="nav__icon" />Projects
              </a>
            </li>
            <li className="nav__item">
              <a href="#contact" className={`nav__link ${activeSection === 'contact' ? 'active-link' : ''}`} onClick={closeMenu}>
                <FiMessageSquare className="nav__icon" />Contact
              </a>
            </li>
          </ul>
          <FiX className="nav__close" id="nav-close" onClick={closeMenu} />
        </div>

        <div className="nav__btns">
          <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
            <FiMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;