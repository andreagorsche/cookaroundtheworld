import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components/Slider.module.css';

function Slider({ slides }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel id="myCarousel"  activeIndex={index} onSelect={handleSelect}>
      {slides.map((slide, idx) => (
        <Carousel.Item key={idx}>
          {typeof slide.image === 'string' ? (
            <img className="d-block w-100 " src={slide.image} alt={`Slide ${idx + 1}`} style={ { objectFit: 'cover', height: '80vh' }} />
          ) : (
            slide.image
          )}
          <Carousel.Caption style={{ backgroundColor: 'rgba(75, 0, 130, 0.7)' }}>
            <h3 style={{ fontSize: '3rem' }}>{slide.title}</h3>
            <p style={{ fontSize: '2rem', color:'white', fontWeight: 'bold' }}>{slide.message}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;
