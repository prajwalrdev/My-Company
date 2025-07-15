import React, { useRef, useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiMessageSquare, FiSend, FiUser } from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
  const form = useRef();
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <section className="contact section" id="contact">
      <h2 className="section__title">Contact Me</h2>
      <span className="section__subtitle">Get in touch</span>

      <div className="contact__container container">
        <div className="contact__tabs">
          <div
            className={toggleState === 1 ? "contact__button contact__active button--flex" : "contact__button button--flex"}
            onClick={() => toggleTab(1)}
          >
            <FiMessageSquare className="contact__icon-tab" />
            Write Me
          </div>

          <div
            className={toggleState === 2 ? "contact__button contact__active button--flex" : "contact__button button--flex"}
            onClick={() => toggleTab(2)}
          >
            <FiUser className="contact__icon-tab" />
            Contact Info
          </div>
        </div>

        <div className="contact__sections">
          {/* Write Me Form */}
          <div className={toggleState === 1 ? "contact__content contact__content-active" : "contact__content"}>
            <form ref={form} onSubmit={handleSubmit} className="contact__form grid">
              <div className="contact__inputs grid">
                <div className="contact__form-content">
                  <label className="contact__label">Name</label>
                  <input type="text" name="name" className="contact__input" required />
                </div>
                <div className="contact__form-content">
                  <label className="contact__label">Email</label>
                  <input type="email" name="email" className="contact__input" required />
                </div>
              </div>
              <div className="contact__form-content">
                <label className="contact__label">Project</label>
                <input type="text" name="project" className="contact__input" required />
              </div>
              <div className="contact__form-content">
                <label className="contact__label">Message</label>
                <textarea 
                  name="message" 
                  cols="0" 
                  rows="7" 
                  className="contact__input" 
                  required
                ></textarea>
              </div>

              <div>
                <button type="submit" className="button button--flex">
                  Send Message
                  <FiSend className="button__icon" />
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className={toggleState === 2 ? "contact__content contact__content-active" : "contact__content"}>
            <div className="contact__info">
              <div className="contact__information">
                <FiPhone className="contact__icon" />
                <div>
                  <h3 className="contact__title">Call Me</h3>
                  <span className="contact__subtitle">+91-XXX-XXX-XXXX</span>
                </div>
              </div>

              <div className="contact__information">
                <FiMail className="contact__icon" />
                <div>
                  <h3 className="contact__title">Email</h3>
                  <span className="contact__subtitle">contact@example.com</span>
                </div>
              </div>

              <div className="contact__information">
                <FiMapPin className="contact__icon" />
                <div>
                  <h3 className="contact__title">Location</h3>
                  <span className="contact__subtitle">Bangalore, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;