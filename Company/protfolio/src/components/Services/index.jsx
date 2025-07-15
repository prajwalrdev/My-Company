import React, { useState, useEffect } from 'react';
import { FiCode, FiServer, FiMonitor, FiArrowRight, FiX, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './Services.css';

const services = [
  {
    title: 'Web Developer',
    icon: <FiCode />,
    modalContent: [
      'Frontend development with React, Angular, or Vue',
      'Responsive web design with modern CSS',
      'Interactive UI/UX implementation',
      'WordPress theme customization and development'
    ]
  },
  {
    title: 'Software Testing',
    icon: <FiServer />,
    modalContent: [
      'Manual and automated testing',
      'Test case development and execution',
      'Bug tracking and reporting',
      'Performance and security testing'
    ]
  },
  {
    title: 'Web Developer',
    icon: <FiMonitor />,
    modalContent: [
      'Full-stack web application development',
      'API integration and development',
      'Database design and optimization',
      'Deployment and maintenance'
    ]
  },
  // Add more services here as needed
];

const Services = () => {
  const [toggleModal, setToggleModal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (toggleModal !== 0) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [toggleModal]);

  const showViewMore = services.length > 3;

  return (
    <section className="services section" id="services">
      <h2 className="section__title">Services</h2>
      <span className="section__subtitle">What I offer</span>

      <div className="services__container container grid">
        {services.slice(0, 3).map((service, index) => (
          <div className={`services__content${toggleModal === index + 1 ? ' active-modal' : ''}`} key={index}>
            <div>
              <span className="services__icon">{service.icon}</span>
              <h3 className="services__title">{service.title}</h3>
            </div>

            <span className="services__button" onClick={() => setToggleModal(index + 1)}>
              View more
              <FiArrowRight className="services__button-icon" />
            </span>
          </div>
        ))}
        {showViewMore && (
          <div className="services__view-more-wrapper">
            <button className="services__view-more-btn" onClick={() => navigate('/more-services')}>
              View More Services
            </button>
          </div>
        )}
      </div>

      {/* Render only one modal for the active service */}
      {toggleModal !== 0 && (
        <div className="services__modal active-modal">
          <div className="services__modal-content">
            <h4 className="services__modal-title">{services[toggleModal - 1].title}</h4>
            <FiX className="services__modal-close" onClick={() => setToggleModal(0)} />

            <ul className="services__modal-services grid">
              {services[toggleModal - 1].modalContent.map((item, itemIndex) => (
                <li className="services__modal-service" key={itemIndex}>
                  <FiCheckCircle className="services__modal-icon" />
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export const MoreServicesPage = () => {
  const navigate = useNavigate();
  const [toggleModal, setToggleModal] = useState(0);

  useEffect(() => {
    if (toggleModal !== 0) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [toggleModal]);

  return (
    <section className="services section" id="more-services">
      <div className="services__header-row">
        <button className="services__back-btn" onClick={() => navigate('/')}>Back</button>
        <h2 className="section__title">More Services</h2>
      </div>
      <div className="services__container container grid">
        {services.slice(3).map((service, index) => (
          <div className={`services__content${toggleModal === index + 1 ? ' active-modal' : ''}`} key={index}>
            <div>
              <span className="services__icon">{service.icon}</span>
              <h3 className="services__title">{service.title}</h3>
            </div>
            <span className="services__button" onClick={() => setToggleModal(index + 1)}>
              View more
              <FiArrowRight className="services__button-icon" />
            </span>
          </div>
        ))}
      </div>
      {/* Render only one modal for the active service */}
      {toggleModal !== 0 && (
        <div className="services__modal active-modal">
          <div className="services__modal-content">
            <h4 className="services__modal-title">{services.slice(3)[toggleModal - 1].title}</h4>
            <FiX className="services__modal-close" onClick={() => setToggleModal(0)} />
            <ul className="services__modal-services grid">
              {services.slice(3)[toggleModal - 1].modalContent.map((item, itemIndex) => (
                <li className="services__modal-service" key={itemIndex}>
                  <FiCheckCircle className="services__modal-icon" />
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;