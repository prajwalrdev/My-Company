import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about section" id="about">
      <h2 className="section__title">About Me</h2>
      <span className="section__subtitle">My Introduction</span>

      <div className="about__container container grid">
        <img
          className="about__img"
          src="/packages/images/pra1.webp"
          srcSet="
            /packages/images/pra1.webp 400w,
            /packages/images/pra1.webp 800w,
            /packages/images/pra1.webp 1200w"
          sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
          alt="Prajwal's profile"
          width="600"
          height="400"
          loading="lazy"
        />

        <div className="about__data">
          <p className="about__description">
            <strong><b style={{ fontSize: '1.3rem' }}>Hi, I'm Prajwal R </b></strong> <br />
            An aspiring Software Developer and a 4th-year B.Tech Computer Science student with a strong passion for building efficient, real-world tech solutions. 
            I thrive on solving complex problems through clean, scalable code and turning innovative ideas into user-centric applications.
          </p>
          
          <p className="about__description">
            <strong><b style={{ fontSize: '1.3rem' }}>🚀 What drives me?</b></strong><br />
            I'm motivated by the challenge of learning new technologies, creating meaningful software, and contributing to impactful, real-world projects.
            I believe in continuous growth, collaboration, and pushing the boundaries of what's possible through technology.
          </p>

          <div className="about__info">
            <div>
              <span className="about__info-title">03+</span>
              <span className="about__info-name">Advanced <br /> Projects</span>
            </div>
            <div>
              <span className="about__info-title">05+</span>
              <span className="about__info-name">Completed <br /> certifications</span>
            </div>
            <div>
              <span className="about__info-title">02+</span>
              <span className="about__info-name">Companies<br />Internship Worked</span>
            </div>
          </div>

          <div className="about__buttons">
            <a 
              href="/packages/PRAJWAL R.pdf" 
              download=""
              className="button button--flex"
            >
              Download CV<i className="uil uil-download-alt button__icon"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;