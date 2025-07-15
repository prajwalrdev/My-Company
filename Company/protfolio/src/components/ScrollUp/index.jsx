import React, { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import './ScrollUp.css';

const ScrollUp = () => {
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show scroll up button when scrolled down enough
      if (window.scrollY >= 560) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <a 
      href="#" 
      className={`scrollup ${showScrollUp ? 'show-scroll' : ''}`} 
      id="scroll-up"
      onClick={(e) => {
        e.preventDefault();
        scrollToTop();
      }}
      aria-label="Scroll to top"
    >
      <FiArrowUp className="scrollup__icon" />
    </a>
  );
};

export default ScrollUp;