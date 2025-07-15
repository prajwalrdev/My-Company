import React, { useState } from 'react';
import './Skills.css';

const Skills = () => {
  const [toggleProgramming, setToggleProgramming] = useState(true);
  const [toggleWeb, setToggleWeb] = useState(true);

  const programmingSkills = [
    { name: 'Python', percentage: '60' },
    { name: 'C', percentage: '50' },
    { name: 'SQL', percentage: '70' },
    { name: 'PHP', percentage: '60' }
  ];

  const webSkills = [
    { name: 'HTML', percentage: '90' },
    { name: 'CSS', percentage: '80' },
    { name: 'JavaScript', percentage: '60' },
    { name: 'WordPress', percentage: '85' }
  ];

  return (
    <section className="skills section" id="skills">
      <h2 className="section__title">Skills</h2>
      <span className="section__subtitle">My technical level</span>

      <div className="skills__container container grid">
        <div>
          {/* Programming Skills */}
          <div className={`skills__content ${toggleProgramming ? 'skills__open' : 'skills__close'}`}>
            <div className="skills__header" onClick={() => setToggleProgramming(!toggleProgramming)}>
              <i className="uil uil-analytics skills__icon"></i>
              <div>
                <h1 className="skills__title">Programming</h1>
                <span className="skills__subtitle">More than 2 years</span>
              </div>
              <i className="uil uil-angle-down skills__arrow"></i>
            </div>

            <div className="skills__list grid">
              {programmingSkills.map((skill, index) => (
                <div className="skills__data" key={index}>
                  <div className="skills__titles">
                    <h3 className="skills__name">{skill.name}</h3>
                    <span className="skills__number">{skill.percentage}%</span>
                  </div>
                  <div className="skills__bar">
                    <span 
                      className={`skills__percentage skills__${skill.name.toLowerCase()}`}
                      style={{ width: `${skill.percentage}%` }}
                    ></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Web Development Skills */}
          <div className={`skills__content ${toggleWeb ? 'skills__open' : 'skills__close'}`}>
            <div className="skills__header" onClick={() => setToggleWeb(!toggleWeb)}>
              <i className="uil uil-brackets-curly skills__icon"></i>
              <div>
                <h1 className="skills__title">Web Development</h1>
                <span className="skills__subtitle">More than 2 years</span>
              </div>
              <i className="uil uil-angle-down skills__arrow"></i>
            </div>

            <div className="skills__list grid">
              {webSkills.map((skill, index) => (
                <div className="skills__data" key={index}>
                  <div className="skills__titles">
                    <h3 className="skills__name">{skill.name}</h3>
                    <span className="skills__number">{skill.percentage}%</span>
                  </div>
                  <div className="skills__bar">
                    <span 
                      className={`skills__percentage skills__${skill.name.toLowerCase()}`}
                      style={{ width: `${skill.percentage}%` }}
                    ></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;