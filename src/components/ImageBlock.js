import React from 'react';
import Asset from './Asset';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ImageBlock({ image1, image2 }) {
  const customStyle = {
    imageBlockContainer: {
      background: 'black', 
      paddingTop: '10%',
      paddingBottom: '10%',
    },
    roundedImageContainer: {
      border: '3px solid white',
      borderRadius: '20px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '0',
    },
    roundedImage: {
      width: '150px',
      height: 'auto',
    },
  };

  return (
    <Container className="image-block-container" style={customStyle.imageBlockContainer}>
      <Row className='p-2'>
        <Col className="mt-2" md={6}>
          <Asset src={image1} style={customStyle} />
        </Col>
        <Col className="mt-2">
          <Asset src={image2} style={customStyle} />
        </Col>
      </Row>
    </Container>
  );
}

export default ImageBlock;