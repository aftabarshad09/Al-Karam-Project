import React, { useState, useEffect } from 'react';
import './style/advertise.css';

import image1 from '../asserts/advertise/image1.png';
import image2 from '../asserts/advertise/image2.png';
import image3 from '../asserts/advertise/image3.png'; 
import image4 from '../asserts/advertise/image4.png';
import image5 from '../asserts/advertise/image5.png';

const Advertise = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      image: image1
    },
    {
      id: 2,
      image: image2
    },
    {
      id: 3,
      image: image3
    },
    {
      id: 4,
      image: image4
    },
    {
      id: 5,
      image: image5
    }
  ];

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="banner-carousel">
      <div className="carousel-container">
        {/* Navigation Buttons */}
        <button className="nav-button prev-button" onClick={prevSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>
        
        <button className="nav-button next-button" onClick={nextSlide}>
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Banner Slides */}
        <div className="slides-container">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`slide ${index === currentSlide ? 'active' : ''} ${
                index === currentSlide - 1 || (currentSlide === 0 && index === banners.length - 1)
                  ? 'prev'
                  : ''
              } ${
                index === currentSlide + 1 || (currentSlide === banners.length - 1 && index === 0)
                  ? 'next'
                  : ''
              }`}
            >
              <img 
                src={banner.image} 
                alt={`Banner ${banner.id}`}
                className="banner-image"
              />
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="indicators">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advertise;