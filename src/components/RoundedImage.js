import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import '../styles/components/RoundedImage.module.css';

function RoundedImage({ img, style }) {
  return (
    <div className="rounded-image-container" style={style}>
      <Image src={img} rounded className="rounded-image" />
    </div>
  );
}

export default RoundedImage;