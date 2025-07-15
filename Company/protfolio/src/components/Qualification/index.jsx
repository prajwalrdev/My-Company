import React, { useState } from 'react';
import { FiBookOpen, FiBriefcase, FiCalendar, FiChevronDown } from 'react-icons/fi';
import './Qualification.css';

const Qualification = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <section className="qualification section" id="qualification">
      <h2 className="section__title">Qualification</h2>
      <span className="section__subtitle">My personal journey</span>

      <div className="qualification__container container">
        <div className="qualification__tabs">
          <div
            className={toggleState === 1 ? "qualification__button qualification__active button--flex" : "qualification__button button--flex"}
            onClick={() => toggleTab(1)}
          >
            <FiBookOpen className="qualification__icon" />
            Education
          </div>

          <div
            className={toggleState === 2 ? "qualification__button qualification__active button--flex" : "qualification__button button--flex"}
            onClick={() => toggleTab(2)}
          >
            <FiBriefcase className="qualification__icon" />
            Certificates
          </div>
        </div>

        <div className="qualification__sections">
          {/* Education */}
          <div className={toggleState === 1 ? "qualification__content qualification__content-active" : "qualification__content"}>
            {[
              {
                title: "SSLC",
                subtitle: "Shree RamaKrishna Vasathi Vidyalaya, Sagara",
                date: "2019 - 2020",
                left: true
              },
              {
                title: "PUC",
                subtitle: "PoornaPrajna PU College, Udupi",
                date: "2021 - 2022",
                left: false
              },
              {
                title: "B.Tech in Computer Science and Engineering",
                subtitle: "Srinivas University, Mukka",
                date: "2022 - 2026",
                left: true
              }
            ].map((item, idx, arr) => (
              <div className="qualification__data" key={item.title}>
                {item.left ? (
                  <div>
                    <h3 className="qualification__title">{item.title}</h3>
                    <span className="qualification__subtitle">{item.subtitle}</span>
                    <div className="qualification__calendar">
                      <FiCalendar className="qualification__calendar-icon" />
                      {item.date}
                    </div>
                  </div>
                ) : <div></div>}
                <div>
                  <span className="qualification__rounder"></span>
                  {idx !== arr.length - 1 && <span className="qualification__line"></span>}
                </div>
                {!item.left ? (
                  <div>
                    <h3 className="qualification__title">{item.title}</h3>
                    <span className="qualification__subtitle">{item.subtitle}</span>
                    <div className="qualification__calendar">
                      <FiCalendar className="qualification__calendar-icon" />
                      {item.date}
                    </div>
                  </div>
                ) : <div></div>}
              </div>
            ))}
          </div>

          {/* Certificates */}
          <div className={toggleState === 2 ? "qualification__content qualification__content-active" : "qualification__content"}>
            {[
              {
                title: "Generative AI Expert",
                subtitle: "Microsoft",
                date: "2024",
                left: true
              },
              {
                title: "AWS Academy Cloud Foundation Certificate",
                subtitle: "AWS",
                date: "2025",
                left: false
              },
              {
                title: "Hackathon",
                subtitle: "IEEE Mangalore Subsection and Industry Relations Committee",
                date: "2025",
                left: true
              }
            ].map((item, idx, arr) => (
              <div className="qualification__data" key={item.title}>
                {item.left ? (
                  <div>
                    <h3 className="qualification__title">{item.title}</h3>
                    <span className="qualification__subtitle">{item.subtitle}</span>
                    <div className="qualification__calendar">
                      <FiCalendar className="qualification__calendar-icon" />
                      {item.date}
                    </div>
                  </div>
                ) : <div></div>}
                <div>
                  <span className="qualification__rounder"></span>
                  {idx !== arr.length - 1 && <span className="qualification__line"></span>}
                </div>
                {!item.left ? (
                  <div>
                    <h3 className="qualification__title">{item.title}</h3>
                    <span className="qualification__subtitle">{item.subtitle}</span>
                    <div className="qualification__calendar">
                      <FiCalendar className="qualification__calendar-icon" />
                      {item.date}
                    </div>
                  </div>
                ) : <div></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;