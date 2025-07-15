import React, { useState } from 'react';
import './Services.css';

const Services = () => {
  const [toggleModal, setToggleModal] = useState(0);

  const services = [
    {
      title: 'Full-Stack Web Development',
      icon: 'uil-web-grid',
      modalContent: [
        'Build and maintain websites and web applications using HTML, CSS, JavaScript, and frameworks like React, Angular, or Vue.',
        'Your portfolio and calculator projects show this capability.',
        'Design responsive websites and applications with a focus on performance, security, and scalability.'
      ]
    },
    {
      title: 'Web Developer',
      icon: 'uil-arrow',
      modalContent: [
        'I develop the user interface.',
        'Webpage development.',
        'I create UX element interactions.',
        'Well trained in WordPress.'
      ]
    }
  ];

  const toggleTab = (index) => {
    setToggleModal(index);
  };

  return (
    <section className="services section" id="services">
      <h2 className="section__title">Services</h2>
      <span className="section__subtitle">What I offer</span>

      <div className="services__container container grid">
        {services.map((service, index) => (
          <div className="services__content" key={index}>
            <div>
              <i className={`uil ${service.icon} services__icon`}></i>
              <h3 className="services__title">{service.title}</h3>
            </div>

            <span className="button button--flex button--small button--link services__button" onClick={() => toggleTab(index + 1)}>
              View More
              <i className="uil uil-arrow-right button__icon"></i>
            </span>

            <div className={toggleModal === index + 1 ? "services__modal active-modal" : "services__modal"}>
              <div className="services__modal-content">
                <h4 className="services__modal-title">{service.title}</h4>
                <i className="uil uil-times services__modal-close" onClick={() => toggleTab(0)}></i>

                <ul className="services__modal-services grid">
                  {service.modalContent.map((item, itemIndex) => (
                    <li className="services__modal-service" key={itemIndex}>
                      <i className="uil uil-check-circle services__modal-icon"></i>
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;