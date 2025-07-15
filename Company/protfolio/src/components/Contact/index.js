import React, { useRef } from 'react';
import './Contact.css';

const Contact = () => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <section className="contact section" id="contact">
      <h2 className="section__title">Contact Me</h2>
      <span className="section__subtitle">Get in touch</span>

      <div className="contact__container container grid">
        <div>
          <div className="contact__information">
            <i className="uil uil-phone contact__icon"></i>

            <div>
              <h3 className="contact__title">Call Me</h3>
              <span className="contact__subtitle">+91-XXX-XXX-XXXX</span>
            </div>
          </div>

          <div className="contact__information">
            <i className="uil uil-envelope contact__icon"></i>

            <div>
              <h3 className="contact__title">Email</h3>
              <span className="contact__subtitle">contact@example.com</span>
            </div>
          </div>

          <div className="contact__information">
            <i className="uil uil-map-marker contact__icon"></i>

            <div>
              <h3 className="contact__title">Location</h3>
              <span className="contact__subtitle">Bangalore, India</span>
            </div>
          </div>
        </div>

        <form ref={form} onSubmit={handleSubmit} className="contact__form grid">
          <div className="contact__inputs grid">
            <div className="contact__content">
              <label className="contact__label">Name</label>
              <input type="text" name="name" className="contact__input" required />
            </div>
            <div className="contact__content">
              <label className="contact__label">Email</label>
              <input type="email" name="email" className="contact__input" required />
            </div>
          </div>
          <div className="contact__content">
            <label className="contact__label">Project</label>
            <input type="text" name="project" className="contact__input" required />
          </div>
          <div className="contact__content">
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
              <i className="uil uil-message button__icon"></i>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;