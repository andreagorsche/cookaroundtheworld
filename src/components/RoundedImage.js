import React from 'react';
import Image from 'react-bootstrap/Image';
import '../styles/components/RoundedImage.module.css';

function RoundedImage({ img, style }) {
  return (
    <div className="rounded-image-container" style={style}>
      <Image src={img} rounded style={{ width: '200px' }} />
    </div>
  );
}

export default RoundedImage;