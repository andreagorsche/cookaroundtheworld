import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ImageBlock from './ImageBlock';
import '../styles/components/Intro.module.css';

function Intro({
  firstWord,
  secondWord,
  secondPhrase,
  firstParagraph,
  secondParagraph,
  imageBlock,
  listItems,
  heading,
  timeEffort,
}) {
  const paragraphStyle = {
    fontFamily: 'AnHanken Grotesk',
    fontSize: '1.2rem',
  };

  const rightColumnStyle = {
    backgroundColor: 'black',
    padding: '20px', 
    color: 'white',
  };

  return (
    <Container fluid id="Intro2">
      <Row style={{ display: 'flex', alignItems: 'stretch' }}>
        <Col className='intro-text' md={6}>
          <h1>
            {firstWord} <span style={{ color: '#F6BE00' }}>{secondWord}</span>{' '}
            {secondPhrase}
          </h1>
          <p style={paragraphStyle}>{firstParagraph}</p>
          <p style={paragraphStyle}>{secondParagraph}</p>
        </Col>
        <Col style={rightColumnStyle} md={6}>
          {imageBlock && <ImageBlock {...imageBlock} />}
          {timeEffort && <p style={{ ...paragraphStyle, color: 'white' }}>Time Effort: {timeEffort}</p>}
          <h3>{heading}</h3>
          {Array.isArray(listItems) && listItems.length > 0 && (
            <ul style={{ ...paragraphStyle, listStyleType: 'disc' }}>
              {listItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Intro;
