import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Portfolio.css';

const Portfolio = () => {
  const portfolioData = [
    {
      title: 'Modern Dashboard',
      description: 'Data analytical dashboard adaptable to all devices, with ui components and animated interactions.',
      image: '/packages/images/portfolio1.webp',
      demoLink: '#'
    },
    {
      title: 'E-Commerce website',
      description: 'Amazon clone is adaptable to all devices, with ui components and animated interactions.',
      image: '/packages/images/portfolio2.webp',
      demoLink: '#'
    },
    {
      title: 'Brand Design',
      description: 'Tesla Clone is adaptable to all devices, with ui components and animated interactions.',
      image: '/packages/images/portfolio3.webp',
      demoLink: '#'
    }
  ];

  return (
    <section className="portfolio section" id="portfolio">
      <h2 className="section__title">Portfolio</h2>
      <span className="section__subtitle">Most recent works</span>

      <div className="portfolio__container container">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
          }}
          className="portfolio__container container swiper-container"
        >
          {portfolioData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="portfolio__content grid">
                <img 
                  src={item.image} 
                  alt="" 
                  className="portfolio__img" 
                  loading="lazy"
                />

                <div className="portfolio_">
                  <h3 className="portfolio__title">{item.title}</h3>
                  <p className="portfolio__description">{item.description}</p>
                  <a href={item.demoLink} className="button button--flex button--small portfolio__button">
                    Demo
                    <i className="uil uil-arrow-right button__icon"></i>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="swiper-button-next">
            <i className="uil uil-angle-right-b swiper-portfolio-icon"></i>
          </div>

          <div className="swiper-button-prev">
            <i className="uil uil-angle-left-b swiper-portfolio-icon"></i>
          </div>

          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </section>
  );
};

export default Portfolio;