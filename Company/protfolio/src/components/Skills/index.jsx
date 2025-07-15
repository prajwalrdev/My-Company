import React, { useState } from 'react';
import { FiBarChart2, FiCode, FiChevronDown, FiMonitor } from 'react-icons/fi';
import './Skills.css';

const Skills = () => {
  const [toggleProgramming, setToggleProgramming] = useState(true);
  const [toggleTools, setToggleTools] = useState(false);
  const [toggleWeb, setToggleWeb] = useState(false);

  const programmingSkills = [
    { name: 'Python', percentage: '60' },
    { name: 'C', percentage: '50' },
    { name: 'SQL', percentage: '70' },
    { name: 'PHP', percentage: '60' }
  ];

  const toolsSkills = [
    { name: 'Git', percentage: '85' },
    { name: 'VS Code', percentage: '90' },
    { name: 'Figma', percentage: '75' },
    { name: 'Docker', percentage: '60' }
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
              <FiBarChart2 className="skills__icon" />
              <div>
                <h1 className="skills__title">Programming</h1>
                <span className="skills__subtitle">More than 2 years</span>
              </div>
              <FiChevronDown className="skills__arrow" />
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
                      className="skills__percentage"
                      style={{ width: `${skill.percentage}%` }}
                    ></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Skills */}
          <div className={`skills__content ${toggleTools ? 'skills__open' : 'skills__close'}`}>
            <div className="skills__header" onClick={() => setToggleTools(!toggleTools)}>
              <FiMonitor className="skills__icon" />
              <div>
                <h1 className="skills__title">Tools</h1>
                <span className="skills__subtitle">More than 3 years</span>
              </div>
              <FiChevronDown className="skills__arrow" />
            </div>

            <div className="skills__list grid">
              {toolsSkills.map((skill, index) => (
                <div className="skills__data" key={index}>
                  <div className="skills__titles">
                    <h3 className="skills__name">{skill.name}</h3>
                    <span className="skills__number">{skill.percentage}%</span>
                  </div>
                  <div className="skills__bar">
                    <span 
                      className="skills__percentage"
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
              <FiCode className="skills__icon" />
              <div>
                <h1 className="skills__title">Web Developer</h1>
                <span className="skills__subtitle">More than 3 years</span>
              </div>
              <FiChevronDown className="skills__arrow" />
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
                      className="skills__percentage"
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