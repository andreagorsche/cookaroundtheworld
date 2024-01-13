import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/components/Intro.module.css';

function Intro({
  firstWord,
  secondWord,
  secondPhrase,
  firstParagraph,
  secondParagraph,
  heading,
  timeEffort,
}) {
  const paragraphStyle = {
    fontFamily: 'AnHanken Grotesk',
    fontSize: '1.2rem',
  };


  return (
    <Container fluid id="Intro2">
      <Row style={{ display: 'flex', alignItems: 'stretch' }}>
        <Col className='intro-text'>
          <h1>
            {firstWord} <span style={{ color: '#F6BE00' }}>{secondWord}</span>{' '}
            {secondPhrase}
          </h1>
          <p style={paragraphStyle}>{firstParagraph}</p>
          <p style={paragraphStyle}>{secondParagraph}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Intro;
