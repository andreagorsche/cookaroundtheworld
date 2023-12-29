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
            <img className="d-block w-100" src={slide.image} alt={`Slide ${idx + 1}`} style={{ height: '85vh' }} />
          ) : (
            slide.image
          )}
          <Carousel.Caption>
            <h3>{slide.title}</h3>
            <p>{slide.message}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;
