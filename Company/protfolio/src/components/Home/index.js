import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import './Home.css';

const Home = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "<strong>I'm Web Developer</strong>",
        "<strong>I'm Full Stack Developer</strong>",
        "<strong>I'm Gamer</strong>"
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true
    };

    const typed = new Typed(typedRef.current, options);
    return () => typed.destroy();
  }, []);

  return (
    <section className="home section" id="home">
      <div className="home__container container grid">
        <div className="home__content grid">
          <div className="home__social">
            <a href="https://www.linkedin.com/in/prajwal--r/" target="_blank" rel="noreferrer" className="home__social-icon">
              <i className="uil uil-linkedin-alt"></i>
            </a>
            <a href="https://x.com/BtechBlock" target="_blank" rel="noreferrer" className="home__social-icon">
              <i className="uil uil-twitter-alt"></i>
            </a>
            <a href="https://github.com/prajwalrdev" target="_blank" rel="noreferrer" className="home__social-icon">
              <i className="uil uil-github-alt"></i>
            </a>
            <a href="https://www.instagram.com/prajwal_dev_24" target="_blank" rel="noreferrer" className="home__social-icon">
              <i className="uil uil-instagram"></i>
            </a>
          </div>
          {/*  home svg image and shape */}
          <div className="home__img">
                            <svg className="home__blob" viewBox="0 0 200 187" xmlns="http://www.w3.org/2000/svg"  xmlnsXlink="http://www.w3.org/1999/xlink">
                                <mask id="mask0" mask-type="alpha">
                                    <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 
                                    130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 
                                    97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 
                                    0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z" fill="#fff"/>
                                </mask>
                                <g mask="url(#mask0)">
                                    <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 
                                    165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 
                                    129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 
                                    -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"/>
                                    <image className="home__blob-img" x="0" y="0" width="200" height="200" xlinkHref="/packages/images/pra29.webp" preserveAspectRatio="xMidYMid slice" loading="lazy"/>
                                </g>
                            </svg>
            </div>
          <div className="home__data">
            <h1 className="home__title">Hi, <br />I'm Prajwal</h1>
            <span ref={typedRef}></span>
            <h3 className="home__subtitle">Software Engineer</h3>
            <p className="home__description">Creativity is intelligence having fun.</p>
            <a href="#contact" className="button button--flex home__button">
              Contact Me<i className="uil uil-message button__icon"></i>
            </a>
          </div>
        </div>

        <div className="home__scroll">
          <a href="#about" className="home__scroll-button button--flex">
            <i className="uil uil-mouse-alt home__scroll-mouse"></i>
            <span className="home__scroll-name">Scroll Down</span>
            <i className="uil uil-arrow-down home__scroll-arrow"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;